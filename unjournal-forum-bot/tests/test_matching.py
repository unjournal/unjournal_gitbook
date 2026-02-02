"""Tests for title matching, TF-IDF similarity, and prominence scoring."""

from datetime import datetime, timezone

from unjournal_forum_bot.matching import (
    compute_tfidf_similarity,
    find_matches,
    generate_search_variants,
    is_type_a_match,
    normalize_title,
    score_prominence,
    title_words,
)
from unjournal_forum_bot.models import ForumPost, Paper


def test_normalize_title() -> None:
    assert normalize_title("  Hello,  World! ") == "hello world"
    assert normalize_title("[NIH] Some Paper Title") == "some paper title"
    assert normalize_title("Title: A Subtitle") == "title a subtitle"


def test_title_words() -> None:
    words = title_words("A Review of GiveWell's Discount Rate")
    assert "review" in words
    assert "givewells" in words
    assert "discount" in words
    assert "rate" in words
    assert "a" not in words
    assert "of" not in words


def test_generate_search_variants() -> None:
    paper = Paper(
        title="A Welfare Analysis of Policies Impacting Climate Change",
        authors="", author_date="", abstract="", research_url="", doi="",
        eval_summary_url="",
    )
    variants = generate_search_variants(paper)
    assert len(variants) >= 1
    assert any("Welfare Analysis" in v for v in variants)


def test_is_type_a_exact_title(sample_paper: Paper, sample_post: ForumPost) -> None:
    """Post body contains the exact paper title."""
    assert is_type_a_match(sample_paper, sample_post) is True


def test_is_type_a_no_match(sample_paper: Paper, unrelated_post: ForumPost) -> None:
    """Unrelated post should not match."""
    assert is_type_a_match(sample_paper, unrelated_post) is False


def test_is_type_a_title_in_post_title() -> None:
    paper = Paper(
        title="The Cost of Carbon",
        authors="", author_date="", abstract="", research_url="", doi="",
        eval_summary_url="",
    )
    post = ForumPost(
        id="1", title="The Cost of Carbon: New Estimates",
        slug="", page_url="", plaintext_body="Some body text.",
    )
    assert is_type_a_match(paper, post) is True


def test_tfidf_similarity_high(sample_paper: Paper, sample_post: ForumPost) -> None:
    sim = compute_tfidf_similarity(sample_paper, sample_post)
    assert sim > 0.1  # Should have some similarity given overlapping climate/welfare terms


def test_tfidf_similarity_low(sample_paper: Paper, unrelated_post: ForumPost) -> None:
    sim = compute_tfidf_similarity(sample_paper, unrelated_post)
    assert 0.0 <= sim <= 1.0


def test_score_prominence_high() -> None:
    post = ForumPost(
        id="1", title="", slug="", page_url="",
        base_score=25, comment_count=10,
        posted_at=datetime(2025, 6, 1, tzinfo=timezone.utc),
    )
    score = score_prominence(post)
    assert score >= 0.5


def test_score_prominence_low() -> None:
    post = ForumPost(
        id="1", title="", slug="", page_url="",
        base_score=1, comment_count=0,
        posted_at=datetime(2020, 1, 1, tzinfo=timezone.utc),
    )
    score = score_prominence(post)
    assert score < 0.3


def test_find_matches_classifies_correctly(sample_paper: Paper, sample_post: ForumPost, unrelated_post: ForumPost) -> None:
    matches = find_matches([sample_paper], [sample_post, unrelated_post])
    # The sample_post contains the paper title, so should be Type A
    type_a = [m for m in matches if m.match_type == "A"]
    assert len(type_a) >= 1
    assert type_a[0].post.id == sample_post.id
