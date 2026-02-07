"""Load and filter papers from the CSV file."""

from __future__ import annotations

import csv
import re
from pathlib import Path

from .models import Paper


def _normalize_whitespace(text: str | None) -> str:
    """Collapse all whitespace (including newlines) into single spaces."""
    if not text:
        return ""
    return re.sub(r"\s+", " ", text).strip()


def load_papers(csv_path: Path | str, only_with_eval: bool = True) -> list[Paper]:
    """Load papers from the Unjournal paper abstracts CSV.

    Args:
        csv_path: Path to paper_abstracts_and_metadata.csv.
        only_with_eval: If True, skip papers without a doi_eval_summary URL.

    Returns:
        List of Paper objects.
    """
    csv_path = Path(csv_path)
    papers: list[Paper] = []

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = _normalize_whitespace(row.get("label_paper_title", ""))
            eval_url = _normalize_whitespace(row.get("doi_eval_summary", ""))

            if not title:
                continue
            if only_with_eval and not eval_url:
                continue

            paper = Paper(
                title=title,
                authors=_normalize_whitespace(row.get("authors", "")),
                author_date=_normalize_whitespace(row.get("author_date", "")),
                abstract=_normalize_whitespace(row.get("Abstract", "")),
                research_url=_normalize_whitespace(row.get("research_url", "")),
                doi=_normalize_whitespace(row.get("doi", "")),
                eval_summary_url=eval_url,
            )
            papers.append(paper)

    return papers
