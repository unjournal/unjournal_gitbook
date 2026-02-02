"""Main pipeline orchestrator."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

from .comment_template import render_comment_html, render_comment_text
from .config import Config
from .dedup import already_commented
from .forum_client.eaforum import EAForumClient
from .matching import find_matches, generate_search_variants
from .models import CommentRecord, MatchResult, Paper
from .papers import load_papers
from .rate_limiter import RateLimiter
from .state import StateStore

logger = logging.getLogger(__name__)


@dataclass
class RunReport:
    """Summary of a pipeline run."""

    papers_scanned: int = 0
    candidates_found: int = 0
    type_a_matches: int = 0
    type_b_matches: int = 0
    comments_posted: int = 0
    skipped_dedup: int = 0
    skipped_state: int = 0
    skipped_not_prominent: int = 0
    errors: int = 0
    matches: list[MatchResult] = field(default_factory=list)

    def summary(self) -> str:
        lines = [
            "=== Run Summary ===",
            f"Papers scanned:        {self.papers_scanned}",
            f"Candidate posts found: {self.candidates_found}",
            f"Type A matches:        {self.type_a_matches}",
            f"Type B matches:        {self.type_b_matches}",
            f"Comments posted:       {self.comments_posted}",
            f"Skipped (dedup API):   {self.skipped_dedup}",
            f"Skipped (dedup local): {self.skipped_state}",
            f"Skipped (low prom.):   {self.skipped_not_prominent}",
            f"Errors:                {self.errors}",
        ]
        return "\n".join(lines)


async def run_pipeline(
    config: Config,
    paper_filter: str | None = None,
    limit: int | None = None,
    tfidf_threshold: float | None = None,
) -> RunReport:
    """Run the full scan-match-comment pipeline.

    Args:
        config: Loaded configuration.
        paper_filter: If set, only process papers whose title contains this string.
        limit: Max number of papers to process.
        tfidf_threshold: Override the config threshold for Type B matching.
    """
    report = RunReport()
    threshold = tfidf_threshold if tfidf_threshold is not None else config.tfidf_threshold

    # Load papers
    papers = load_papers(config.csv_path)
    if paper_filter:
        papers = [p for p in papers if paper_filter.lower() in p.title.lower()]
    if limit:
        papers = papers[:limit]
    report.papers_scanned = len(papers)
    logger.info("Loaded %d papers to scan", len(papers))

    if not papers:
        logger.warning("No papers to scan (check --paper filter or CSV path)")
        return report

    # Set up client and state
    rate_limiter = RateLimiter(config.rate_limit_per_minute)
    client = EAForumClient(
        auth_token=config.eaforum.auth_token,
        posts_index=config.eaforum.posts_index,
        rate_limiter=rate_limiter,
    )
    state = StateStore()

    try:
        for i, paper in enumerate(papers, 1):
            logger.info("[%d/%d] Searching for: %s", i, len(papers), paper.title)

            # Search using title variants
            variants = generate_search_variants(paper)
            all_posts = {}
            for variant in variants:
                try:
                    posts = await client.search_posts(variant, hits_per_page=10)
                    for post in posts:
                        all_posts[post.id] = post
                except Exception:
                    logger.warning("Search failed for variant: %s", variant, exc_info=True)
                    report.errors += 1

            candidates = list(all_posts.values())
            report.candidates_found += len(candidates)
            logger.info("  Found %d unique candidate posts", len(candidates))

            if not candidates:
                continue

            # Match
            matches = find_matches([paper], candidates, tfidf_threshold=threshold)
            logger.info("  Matches: %d (A=%d, B=%d)",
                        len(matches),
                        sum(1 for m in matches if m.match_type == "A"),
                        sum(1 for m in matches if m.match_type == "B"))

            for match in matches:
                if match.match_type == "A":
                    report.type_a_matches += 1
                else:
                    report.type_b_matches += 1

                # Only auto-comment for Type A
                if match.match_type != "A":
                    match.skip_reason = "Type B (related only, not auto-posted)"
                    report.matches.append(match)
                    _log_match(match, config.dry_run)
                    continue

                # Check prominence
                if not match.prominent:
                    match.skip_reason = "Below prominence threshold"
                    report.skipped_not_prominent += 1
                    report.matches.append(match)
                    _log_match(match, config.dry_run)
                    continue

                # Local state dedup
                if state.was_commented(match.post.id, match.paper.title):
                    match.skip_reason = "Already in local state"
                    report.skipped_state += 1
                    report.matches.append(match)
                    _log_match(match, config.dry_run)
                    continue

                # API dedup: check existing comments on the post
                try:
                    comment_htmls = await client.get_post_comments_html(match.post.id)
                    is_dup, reason = already_commented(comment_htmls, match.paper)
                    if is_dup:
                        match.skip_reason = f"API dedup: {reason}"
                        report.skipped_dedup += 1
                        report.matches.append(match)
                        _log_match(match, config.dry_run)
                        continue
                except Exception:
                    logger.warning("Failed to check comments for post %s", match.post.id, exc_info=True)
                    report.errors += 1
                    match.skip_reason = "Error checking comments"
                    report.matches.append(match)
                    continue

                # Post or dry-run
                comment_html = render_comment_html(match.paper)
                record = CommentRecord(
                    post_id=match.post.id,
                    post_url=match.post.page_url,
                    paper_title=match.paper.title,
                    eval_url=match.paper.eval_link,
                    commented_at=datetime.now(timezone.utc).isoformat(),
                    dry_run=config.dry_run,
                )

                if config.dry_run:
                    match.skip_reason = "Dry run (would post)"
                    logger.info("  [DRY RUN] Would comment on: %s", match.post.page_url)
                    logger.info("  Comment text: %s", render_comment_text(match.paper)[:120])
                else:
                    try:
                        comment_id = await client.create_comment(match.post.id, comment_html)
                        record.comment_id = comment_id
                        record.dry_run = False
                        report.comments_posted += 1
                        logger.info("  POSTED comment %s on: %s", comment_id, match.post.page_url)
                    except Exception:
                        logger.error("Failed to post comment on %s", match.post.page_url, exc_info=True)
                        report.errors += 1
                        match.skip_reason = "Error posting comment"
                        report.matches.append(match)
                        continue

                state.add(record)
                report.matches.append(match)

    finally:
        await client.close()

    return report


def _log_match(match: MatchResult, dry_run: bool) -> None:
    """Log a match decision."""
    status = match.skip_reason or "OK"
    logger.info(
        "  [%s] %s (score=%.2f, prominent=%s) → %s",
        match.match_type,
        match.post.page_url or match.post.title,
        match.score,
        match.prominent,
        status,
    )
