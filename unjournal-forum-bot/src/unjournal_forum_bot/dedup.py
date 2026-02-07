"""Deduplication: check if a post already has an Unjournal comment."""

from __future__ import annotations

import re

from .matching import _STOPWORDS, normalize_title
from .models import Paper

# User slugs affiliated with The Unjournal. Posts authored by these users
# or comments from them count as "already has Unjournal presence".
UNJOURNAL_SLUGS = frozenset({
    "the-unjournal-bot",
    "david_reinstein",
})


def _extract_text(html: str) -> str:
    """Crude HTML-to-text: strip tags, collapse whitespace."""
    text = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", text).strip().lower()


def is_unjournal_post(author_slug: str) -> bool:
    """Return True if the post's author is an Unjournal-affiliated user."""
    return author_slug.lower() in UNJOURNAL_SLUGS


def already_commented(
    comments: list[tuple[str, str]] | list[str],
    paper: Paper,
) -> tuple[bool, str]:
    """Check if any existing comment on a post already mentions this Unjournal evaluation.

    Args:
        comments: List of (html, author_slug) tuples, or legacy list of html strings.
        paper: The paper we want to comment about.

    Returns:
        (is_duplicate, reason) tuple.
    """
    sig_words = [
        w for w in normalize_title(paper.title).split() if w not in _STOPWORDS and len(w) > 2
    ]

    for item in comments:
        # Support both (html, slug) tuples and plain html strings
        if isinstance(item, tuple):
            html, author_slug = item
        else:
            html, author_slug = item, ""

        text = _extract_text(html)
        html_lower = html.lower()

        # Rule 0: comment is by an Unjournal-affiliated user
        if author_slug and author_slug.lower() in UNJOURNAL_SLUGS:
            return True, f"existing comment by Unjournal-affiliated user @{author_slug}"

        # Rule 1: any comment containing a link to unjournal.pubpub.org
        if "unjournal.pubpub.org" in text or "unjournal.pubpub.org" in html_lower:
            return True, "existing comment links to unjournal.pubpub.org"

        # Rule 2: comment mentions "unjournal" AND contains ≥4 significant title words
        if "unjournal" in text:
            matching_words = [w for w in sig_words if w in text]
            if len(matching_words) >= min(4, len(sig_words)):
                return True, (
                    f"existing comment mentions Unjournal + {len(matching_words)} title words"
                )

    return False, ""
