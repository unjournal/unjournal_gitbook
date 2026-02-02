"""Tests for comment template rendering."""

from unjournal_forum_bot.comment_template import render_comment_html, render_comment_text
from unjournal_forum_bot.models import Paper


def _make_paper(eval_url: str = "https://doi.org/10.21428/d28e8e57.168646d1") -> Paper:
    return Paper(
        title="A Welfare Analysis of Policies Impacting Climate Change",
        authors="Author One",
        author_date="One, 2024",
        abstract="Test abstract",
        research_url="https://example.com",
        doi="10.1234/test",
        eval_summary_url=eval_url,
    )


def test_render_text_contains_title() -> None:
    text = render_comment_text(_make_paper())
    assert "A Welfare Analysis of Policies Impacting Climate Change" in text


def test_render_text_contains_eval_url() -> None:
    text = render_comment_text(_make_paper())
    assert "https://doi.org/10.21428/d28e8e57.168646d1" in text


def test_render_text_contains_contact() -> None:
    text = render_comment_text(_make_paper())
    assert "contact@unjournal.org" in text


def test_render_text_contains_semi_automated() -> None:
    text = render_comment_text(_make_paper())
    assert "(Semi-automated comment)" in text


def test_render_text_fallback_url() -> None:
    text = render_comment_text(_make_paper(eval_url=""))
    assert "https://unjournal.pubpub.org" in text


def test_render_html_has_links() -> None:
    html = render_comment_html(_make_paper())
    assert "<a href=" in html
    assert "<p>" in html
    assert "mailto:contact@unjournal.org" in html


def test_render_html_links_eval_url() -> None:
    html = render_comment_html(_make_paper())
    assert 'href="https://doi.org/10.21428/d28e8e57.168646d1"' in html
