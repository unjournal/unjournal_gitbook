"""Data models for the forum bot."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Paper:
    """A paper evaluated by The Unjournal."""

    title: str
    authors: str
    author_date: str
    abstract: str
    research_url: str
    doi: str
    eval_summary_url: str  # doi_eval_summary from CSV; empty string if missing

    @property
    def eval_link(self) -> str:
        """URL to use in comments: eval DOI if available, else homepage."""
        return self.eval_summary_url or "https://unjournal.pubpub.org"

    @property
    def has_eval_url(self) -> bool:
        return bool(self.eval_summary_url.strip())


@dataclass
class ForumPost:
    """A post on EA Forum or LessWrong."""

    id: str
    title: str
    slug: str
    page_url: str
    posted_at: datetime | None = None
    base_score: int = 0
    comment_count: int = 0
    plaintext_body: str = ""


@dataclass
class MatchResult:
    """A match between a paper and a forum post."""

    paper: Paper
    post: ForumPost
    match_type: str  # "A" (direct) or "B" (related)
    score: float = 0.0
    prominent: bool = False
    skip_reason: str = ""  # if set, explains why we won't comment


@dataclass
class CommentRecord:
    """Record of a comment we posted (or would post in dry-run)."""

    post_id: str
    post_url: str
    paper_title: str
    eval_url: str
    commented_at: str  # ISO format
    dry_run: bool = True
    comment_id: str = ""  # empty if dry-run

    def to_dict(self) -> dict:
        return {
            "post_id": self.post_id,
            "post_url": self.post_url,
            "paper_title": self.paper_title,
            "eval_url": self.eval_url,
            "commented_at": self.commented_at,
            "dry_run": self.dry_run,
            "comment_id": self.comment_id,
        }

    @classmethod
    def from_dict(cls, d: dict) -> CommentRecord:
        return cls(**d)
