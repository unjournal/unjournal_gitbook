"""Shared test fixtures."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

import pytest

from unjournal_forum_bot.models import ForumPost, Paper

FIXTURES_DIR = Path(__file__).parent / "fixtures"


@pytest.fixture
def sample_csv_path() -> Path:
    return FIXTURES_DIR / "sample_papers.csv"


@pytest.fixture
def sample_paper() -> Paper:
    return Paper(
        title="A Welfare Analysis of Policies Impacting Climate Change",
        authors="Author One, Author Two",
        author_date="One et al., 2024",
        abstract="Analyzes welfare impacts of climate policies using MVPF framework.",
        research_url="https://example.com/paper2",
        doi="doi.org/10.3386/w32728",
        eval_summary_url="https://doi.org/10.21428/d28e8e57.168646d1",
    )


@pytest.fixture
def sample_post() -> ForumPost:
    return ForumPost(
        id="abc123",
        title="New analysis of climate change policy welfare impacts",
        slug="new-analysis-climate-change",
        page_url="https://forum.effectivealtruism.org/posts/abc123/new-analysis-climate-change",
        posted_at=datetime(2024, 6, 15, tzinfo=timezone.utc),
        base_score=25,
        comment_count=8,
        plaintext_body=(
            "This post discusses A Welfare Analysis of Policies Impacting Climate Change "
            "by One et al. The paper uses the MVPF framework to analyze various climate "
            "interventions. The key finding is that renewable energy subsidies have high "
            "welfare returns compared to carbon taxes in some contexts."
        ),
    )


@pytest.fixture
def unrelated_post() -> ForumPost:
    return ForumPost(
        id="xyz789",
        title="Effective altruism community building in 2024",
        slug="ea-community-building-2024",
        page_url="https://forum.effectivealtruism.org/posts/xyz789/ea-community-building",
        posted_at=datetime(2024, 3, 1, tzinfo=timezone.utc),
        base_score=15,
        comment_count=3,
        plaintext_body=(
            "This post is about community building efforts in the EA movement "
            "during 2024. We organized meetups and workshops across several cities."
        ),
    )
