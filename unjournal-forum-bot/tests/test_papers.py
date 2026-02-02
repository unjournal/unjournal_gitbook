"""Tests for CSV loading."""

from pathlib import Path

from unjournal_forum_bot.papers import load_papers


def test_load_papers_with_eval_only(sample_csv_path: Path) -> None:
    papers = load_papers(sample_csv_path, only_with_eval=True)
    assert len(papers) == 3
    assert all(p.has_eval_url for p in papers)


def test_load_papers_all(sample_csv_path: Path) -> None:
    papers = load_papers(sample_csv_path, only_with_eval=False)
    assert len(papers) == 5


def test_paper_fields(sample_csv_path: Path) -> None:
    papers = load_papers(sample_csv_path, only_with_eval=True)
    climate = [p for p in papers if "Climate" in p.title][0]
    assert climate.title == "A Welfare Analysis of Policies Impacting Climate Change"
    assert climate.eval_summary_url == "https://doi.org/10.21428/d28e8e57.168646d1"
    assert climate.eval_link == "https://doi.org/10.21428/d28e8e57.168646d1"


def test_paper_without_eval_uses_homepage(sample_csv_path: Path) -> None:
    papers = load_papers(sample_csv_path, only_with_eval=False)
    no_eval = [p for p in papers if "GiveWell" in p.title][0]
    assert not no_eval.has_eval_url
    assert no_eval.eval_link == "https://unjournal.pubpub.org"
