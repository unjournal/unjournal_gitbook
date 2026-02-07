"""Title matching (Type A), TF-IDF similarity (Type B), and prominence scoring."""

from __future__ import annotations

import re
import string
from datetime import datetime, timezone

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .models import ForumPost, MatchResult, Paper


# Strip leading bracketed prefixes like "[Report]" or "[Paper]"
_BRACKET_PREFIX = re.compile(r"^\[.*?\]\s*")

_STOPWORDS = frozenset(
    "a an the and or but in on of to for with by at from is are was were "
    "be been being have has had do does did will would shall should may "
    "might can could".split()
)


def normalize_title(title: str) -> str:
    """Lowercase, strip punctuation, collapse whitespace."""
    t = title.lower()
    t = _BRACKET_PREFIX.sub("", t)
    t = t.translate(str.maketrans("", "", string.punctuation))
    t = re.sub(r"\s+", " ", t).strip()
    return t


def title_words(title: str) -> list[str]:
    """Return significant words from a title (no stopwords)."""
    return [w for w in normalize_title(title).split() if w not in _STOPWORDS]


def title_without_subtitle(title: str) -> str:
    """Return the part before the first colon, if any."""
    if ":" in title:
        return title.split(":")[0].strip()
    return title


def generate_search_variants(paper: Paper) -> list[str]:
    """Generate search query variants for a paper title."""
    variants = []
    title = paper.title.strip()
    variants.append(f'"{title}"')

    short = title_without_subtitle(title)
    if short != title:
        variants.append(f'"{short}"')

    # Also try first N words unquoted
    words = title.split()
    if len(words) > 6:
        variants.append(" ".join(words[:6]))
    elif len(words) > 4:
        variants.append(" ".join(words[:4]))

    return variants


def _contains_consecutive_words(
    needle_words: list[str], haystack: str, min_words: int = 6
) -> bool:
    """Check if a run of consecutive significant words appears in the haystack."""
    if len(needle_words) < min_words:
        min_words = max(3, len(needle_words) - 1)

    haystack_norm = normalize_title(haystack)
    for start in range(len(needle_words) - min_words + 1):
        chunk = " ".join(needle_words[start : start + min_words])
        if chunk in haystack_norm:
            return True
    return False


def is_type_a_match(paper: Paper, post: ForumPost) -> bool:
    """Check if a paper is a direct (Type A) match for a post.

    Type A: the paper title (or significant portion) appears in the post title
    or body, suggesting the post is *about* or *discusses* this exact paper.
    """
    paper_norm = normalize_title(paper.title)
    post_title_norm = normalize_title(post.title)
    post_body_norm = normalize_title(post.plaintext_body) if post.plaintext_body else ""

    # Full normalized title appears in post title or body
    if paper_norm in post_title_norm or paper_norm in post_body_norm:
        return True

    # Short title (before colon) appears in post title
    short = normalize_title(title_without_subtitle(paper.title))
    if short != paper_norm and len(short.split()) >= 4 and short in post_title_norm:
        return True

    # Consecutive significant words appear in post body
    words = title_words(paper.title)
    if len(words) >= 4 and _contains_consecutive_words(words, post.plaintext_body or ""):
        return True

    return False


def compute_tfidf_similarity(paper: Paper, post: ForumPost) -> float:
    """Compute TF-IDF cosine similarity between a paper and a post."""
    paper_text = f"{paper.title} {paper.abstract[:500]}"
    post_text = f"{post.title} {(post.plaintext_body or '')[:2000]}"

    if not paper_text.strip() or not post_text.strip():
        return 0.0

    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    try:
        tfidf_matrix = vectorizer.fit_transform([paper_text, post_text])
    except ValueError:
        return 0.0

    sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    return float(sim)


def score_prominence(post: ForumPost) -> float:
    """Score how prominent/suitable a post is for auto-commenting.

    Returns a float 0.0-1.0. Higher = more suitable for auto-comment.
    """
    score = 0.0

    # Karma score
    if post.base_score >= 20:
        score += 0.4
    elif post.base_score >= 10:
        score += 0.25
    elif post.base_score >= 3:
        score += 0.1

    # Recency
    if post.posted_at:
        age_days = (datetime.now(timezone.utc) - post.posted_at).days
        if age_days <= 365:
            score += 0.35
        elif age_days <= 730:
            score += 0.2
        elif age_days <= 1095:
            score += 0.1

    # Comment activity
    if post.comment_count >= 5:
        score += 0.15
    elif post.comment_count >= 1:
        score += 0.1

    return min(score, 1.0)


def find_matches(
    papers: list[Paper],
    posts: list[ForumPost],
    tfidf_threshold: float = 0.25,
    prominence_threshold: float = 0.35,
) -> list[MatchResult]:
    """Match papers against posts, returning classified results.

    Each post is matched against each paper. Type A matches take priority
    over Type B for the same post-paper pair.
    """
    results: list[MatchResult] = []

    for paper in papers:
        for post in posts:
            # Type A: direct title match
            if is_type_a_match(paper, post):
                prom = score_prominence(post)
                results.append(
                    MatchResult(
                        paper=paper,
                        post=post,
                        match_type="A",
                        score=prom,
                        prominent=prom >= prominence_threshold,
                    )
                )
                continue

            # Type B: TF-IDF similarity
            sim = compute_tfidf_similarity(paper, post)
            if sim >= tfidf_threshold:
                prom = score_prominence(post)
                results.append(
                    MatchResult(
                        paper=paper,
                        post=post,
                        match_type="B",
                        score=sim,
                        prominent=prom >= prominence_threshold,
                    )
                )

    # Sort: Type A first, then by score descending
    results.sort(key=lambda r: (r.match_type != "A", -r.score))
    return results
