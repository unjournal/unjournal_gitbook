"""Tests for deduplication logic."""

from unjournal_forum_bot.dedup import already_commented
from unjournal_forum_bot.models import Paper


def _make_paper(title: str = "A Welfare Analysis of Policies Impacting Climate Change") -> Paper:
    return Paper(
        title=title,
        authors="", author_date="", abstract="", research_url="", doi="",
        eval_summary_url="https://doi.org/10.21428/d28e8e57.168646d1",
    )


def test_dedup_catches_pubpub_link() -> None:
    comments = [
        '<p>Great paper! See <a href="https://unjournal.pubpub.org/pub/xxx">evaluation</a></p>',
    ]
    is_dup, reason = already_commented(comments, _make_paper())
    assert is_dup is True
    assert "unjournal.pubpub.org" in reason


def test_dedup_catches_unjournal_plus_title_words() -> None:
    comments = [
        "<p>The Unjournal evaluated this welfare analysis of policies impacting climate change.</p>",
    ]
    is_dup, reason = already_commented(comments, _make_paper())
    assert is_dup is True
    assert "title words" in reason


def test_dedup_no_match() -> None:
    comments = [
        "<p>This is a great post about climate policy.</p>",
        "<p>I agree with the analysis here.</p>",
    ]
    is_dup, reason = already_commented(comments, _make_paper())
    assert is_dup is False
    assert reason == ""


def test_dedup_empty_comments() -> None:
    is_dup, reason = already_commented([], _make_paper())
    assert is_dup is False


def test_dedup_unjournal_without_enough_title_words() -> None:
    """Mentioning 'Unjournal' alone without title words should not trigger dedup."""
    comments = [
        "<p>The Unjournal does interesting work on evaluating research.</p>",
    ]
    is_dup, _ = already_commented(comments, _make_paper())
    assert is_dup is False
