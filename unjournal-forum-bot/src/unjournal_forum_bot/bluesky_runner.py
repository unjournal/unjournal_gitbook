"""Bluesky pipeline: search posts and reply with evaluation links."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone

from .config import Config
from .models import Paper
from .papers import load_papers
from .social.bluesky import (
    BlueskyClient,
    BlueskyConfig,
    BlueskyPost,
    already_replied,
    format_bluesky_reply,
)

logger = logging.getLogger(__name__)


@dataclass
class BlueskyMatch:
    """A match between a paper and a Bluesky post."""

    paper: Paper
    post: BlueskyPost
    search_query: str  # What query found this post
    score: float = 0.0  # Relevance score (simple keyword match)
    skip_reason: str = ""


@dataclass
class BlueskyRunReport:
    """Summary of a Bluesky pipeline run."""

    papers_scanned: int = 0
    posts_found: int = 0
    matches_found: int = 0
    replies_posted: int = 0
    skipped_dedup: int = 0
    skipped_low_engagement: int = 0
    errors: int = 0
    matches: list[BlueskyMatch] = field(default_factory=list)

    def summary(self) -> str:
        lines = [
            "=== Bluesky Run Summary ===",
            f"Papers scanned:        {self.papers_scanned}",
            f"Posts found:           {self.posts_found}",
            f"Candidate matches:     {self.matches_found}",
            f"Replies posted:        {self.replies_posted}",
            f"Skipped (dedup):       {self.skipped_dedup}",
            f"Skipped (low engage):  {self.skipped_low_engagement}",
            f"Errors:                {self.errors}",
        ]
        return "\n".join(lines)


def generate_bluesky_queries(paper: Paper) -> list[str]:
    """Generate search queries for a paper.

    Bluesky search is simpler than Algolia - use key phrases.
    """
    queries = []

    # Primary: paper title (truncated for search)
    title = paper.title
    if len(title) > 100:
        # Use first part of title for search
        title = title[:100]
    queries.append(title)

    # If title is long, try first significant words
    words = paper.title.split()
    if len(words) > 5:
        # First 5-6 words often capture the topic
        queries.append(" ".join(words[:6]))

    # Extract key terms from title (remove common words)
    stopwords = {"the", "a", "an", "of", "and", "in", "on", "for", "to", "with", "is", "are", "by"}
    key_terms = [w for w in words if w.lower() not in stopwords and len(w) > 3]
    if len(key_terms) >= 3:
        queries.append(" ".join(key_terms[:5]))

    return list(dict.fromkeys(queries))  # Remove duplicates


def score_match(paper: Paper, post: BlueskyPost) -> float:
    """Score how well a post matches a paper (0-1 scale).

    Simple keyword-based scoring for now.
    """
    title_words = set(paper.title.lower().split())
    post_words = set(post.text.lower().split())

    # Remove very common words
    stopwords = {"the", "a", "an", "of", "and", "in", "on", "for", "to", "with", "is", "are", "by", "this", "that"}
    title_words -= stopwords
    post_words -= stopwords

    if not title_words:
        return 0.0

    # Jaccard-like overlap
    overlap = len(title_words & post_words)
    score = overlap / len(title_words)

    # Boost for exact phrase matches
    title_lower = paper.title.lower()
    text_lower = post.text.lower()
    if title_lower in text_lower:
        score = max(score, 0.9)
    elif any(phrase in text_lower for phrase in title_lower.split(":") if len(phrase) > 20):
        score = max(score, 0.7)

    return min(score, 1.0)


def run_bluesky_pipeline(
    config: Config,
    paper_filter: str | None = None,
    limit: int | None = None,
    min_engagement: int = 5,
    since_days: int = 90,
) -> BlueskyRunReport:
    """Search Bluesky for posts mentioning evaluated papers.

    Args:
        config: Loaded configuration.
        paper_filter: If set, only process papers whose title contains this string.
        limit: Max number of papers to process.
        min_engagement: Minimum likes+reposts+replies to consider a post.
        since_days: Only search posts from the last N days.

    Returns:
        Report with matches found and actions taken.
    """
    report = BlueskyRunReport()

    # Load papers with eval URLs
    papers = load_papers(config.csv_path, only_with_eval=True)
    if paper_filter:
        papers = [p for p in papers if paper_filter.lower() in p.title.lower()]
    if limit:
        papers = papers[:limit]
    report.papers_scanned = len(papers)
    logger.info("Loaded %d papers to search on Bluesky", len(papers))

    if not papers:
        logger.warning("No papers to search")
        return report

    # Set up Bluesky client
    bsky_config = BlueskyConfig(
        handle=config.bluesky.handle,
        app_password=config.bluesky.app_password,
    )
    client = BlueskyClient(bsky_config)

    since_dt = datetime.now(timezone.utc) - timedelta(days=since_days)

    try:
        for i, paper in enumerate(papers, 1):
            logger.info("[%d/%d] Searching Bluesky for: %s", i, len(papers), paper.title[:60])

            queries = generate_bluesky_queries(paper)
            all_posts: dict[str, BlueskyPost] = {}

            for query in queries:
                try:
                    posts = client.search_posts(query, limit=25, since=since_dt)
                    for post in posts:
                        all_posts[post.uri] = post
                        logger.debug("  Found: %s - %s", post.author_handle, post.text[:50])
                except Exception:
                    logger.warning("Search failed for query: %s", query[:50], exc_info=True)
                    report.errors += 1

            report.posts_found += len(all_posts)

            if not all_posts:
                logger.info("  No posts found")
                continue

            # Score and filter
            for post in all_posts.values():
                score = score_match(paper, post)
                if score < 0.3:
                    continue  # Too weak a match

                match = BlueskyMatch(
                    paper=paper,
                    post=post,
                    search_query=queries[0],
                    score=score,
                )

                # Check engagement threshold
                engagement = post.like_count + post.repost_count + post.reply_count
                if engagement < min_engagement:
                    match.skip_reason = f"Low engagement ({engagement} < {min_engagement})"
                    report.skipped_low_engagement += 1
                    report.matches.append(match)
                    continue

                # Check for existing reply
                try:
                    replies = client.get_post_replies(post.uri)
                    is_dup, reason = already_replied(replies, paper.eval_link)
                    if is_dup:
                        match.skip_reason = f"Already replied: {reason}"
                        report.skipped_dedup += 1
                        report.matches.append(match)
                        continue
                except Exception:
                    logger.warning("Failed to check replies for %s", post.url, exc_info=True)
                    report.errors += 1

                # This is a candidate for reply
                report.matches_found += 1
                report.matches.append(match)

                reply_text = format_bluesky_reply(paper.title, paper.eval_link)

                if config.dry_run:
                    match.skip_reason = "Dry run (would reply)"
                    logger.info("  [DRY RUN] Would reply to: %s", post.url)
                    logger.info("  Post text: %s", post.text[:100])
                    logger.info("  Reply: %s", reply_text[:100])
                else:
                    try:
                        reply_uri = client.reply_to_post(
                            parent_uri=post.uri,
                            parent_cid=post.cid,
                            text=reply_text,
                        )
                        match.skip_reason = f"Posted: {reply_uri}"
                        report.replies_posted += 1
                        logger.info("  POSTED reply: %s", reply_uri)
                    except Exception:
                        logger.error("Failed to reply to %s", post.url, exc_info=True)
                        match.skip_reason = "Error posting reply"
                        report.errors += 1

    except Exception:
        logger.exception("Pipeline error")
        report.errors += 1

    return report
