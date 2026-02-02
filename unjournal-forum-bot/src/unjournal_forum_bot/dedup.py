"""Deduplication: check if a post already has an Unjournal comment."""

from __future__ import annotations

import re

from .matching import _STOPWORDS, normalize_title
from .models import Paper


def _extract_text(html: str) -> str:
    """Crude HTML-to-text: strip tags, collapse whitespace."""
    text = re.sub(r"<[^>]+>", " ", html)
    return re.sub(r"\s+", " ", text).strip().lower()


def already_commented(comment_htmls: list[str], paper: Paper) -> tuple[bool, str]:
    """Check if any existing comment on a post already mentions this Unjournal evaluation.

    Args:
        comment_htmls: List of HTML bodies of existing comments on the post.
        paper: The paper we want to comment about.

    Returns:
        (is_duplicate, reason) tuple.
    """
    sig_words = [
        w for w in normalize_title(paper.title).split() if w not in _STOPWORDS and len(w) > 2
    ]

    for html in comment_htmls:
        text = _extract_text(html)
        html_lower = html.lower()

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
