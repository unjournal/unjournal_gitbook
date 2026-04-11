"""Configuration loader with Pydantic validation.

Loads workshop configuration from YAML files and validates against schema.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import List, Optional

import yaml
from pydantic import BaseModel, Field


class Speaker(BaseModel):
    """Speaker/presenter information."""
    name: str
    affiliation: Optional[str] = None
    recording_pref: str = "full_public"  # full_public, internal_only, no_recording
    availability_constraint: Optional[str] = None


class Segment(BaseModel):
    """Workshop segment definition."""
    id: str
    title: str
    duration_min: int
    description: str
    speakers: List[Speaker] = Field(default_factory=list)
    discussion_prompts: List[str] = Field(default_factory=list)
    related_pqs: List[str] = Field(default_factory=list)


class PivotalQuestion(BaseModel):
    """Pivotal question definition."""
    code: str  # e.g., "WELL_01", "DALY_03"
    category: str  # e.g., "WELLBY Reliability", "DALY-WELLBY Conversion"
    question: str
    type: str  # "open_ended", "probability", "numeric_with_ci", "categorical"
    options: Optional[List[str]] = None  # For categorical type
    reference_range: Optional[List[float]] = None  # For numeric type
    default: Optional[float] = None


class CodaTableSchema(BaseModel):
    """Schema for a Coda table."""
    name: str
    columns: List[dict]


class CodaConfig(BaseModel):
    """Coda workspace configuration."""
    folder_id: Optional[str] = None
    doc_id: Optional[str] = None  # If reusing existing doc


class NetlifyFormConfig(BaseModel):
    """Netlify form configuration."""
    name: str
    form_id: Optional[str] = None  # Fetch dynamically if not provided


class NetlifyConfig(BaseModel):
    """Netlify integration configuration."""
    site_id: str
    forms: List[NetlifyFormConfig] = Field(default_factory=list)


class GoogleDocsConfig(BaseModel):
    """Google Docs integration configuration (optional)."""
    enabled: bool = False
    template_doc_id: Optional[str] = None
    output_folder_id: Optional[str] = None


class WorkshopUrls(BaseModel):
    """URLs associated with the workshop."""
    scheduling_form: Optional[str] = None
    beliefs_form: Optional[str] = None
    coda_pq_page: Optional[str] = None
    evaluation: Optional[str] = None


class WorkshopMeta(BaseModel):
    """Workshop metadata."""
    id: str
    title: str
    short_name: Optional[str] = None
    description: str
    target_date: str
    duration_hours: float
    timezone: str = "US/Eastern"
    urls: WorkshopUrls = Field(default_factory=WorkshopUrls)


class WorkshopConfig(BaseModel):
    """Complete workshop configuration."""
    workshop: WorkshopMeta
    segments: List[Segment]
    pivotal_questions: List[PivotalQuestion]
    coda: CodaConfig = Field(default_factory=CodaConfig)
    netlify: Optional[NetlifyConfig] = None
    google_docs: GoogleDocsConfig = Field(default_factory=GoogleDocsConfig)

    @property
    def segment_ids(self) -> List[str]:
        """Get list of segment IDs."""
        return [s.id for s in self.segments]

    @property
    def pq_codes(self) -> List[str]:
        """Get list of PQ codes."""
        return [pq.code for pq in self.pivotal_questions]

    def get_segment(self, segment_id: str) -> Optional[Segment]:
        """Get segment by ID."""
        for s in self.segments:
            if s.id == segment_id:
                return s
        return None

    def get_pq(self, code: str) -> Optional[PivotalQuestion]:
        """Get pivotal question by code."""
        for pq in self.pivotal_questions:
            if pq.code == code:
                return pq
        return None


def load_config(config_path: str | Path) -> WorkshopConfig:
    """Load and validate workshop configuration from YAML.

    Args:
        config_path: Path to YAML config file

    Returns:
        Validated WorkshopConfig instance

    Raises:
        FileNotFoundError: If config file doesn't exist
        pydantic.ValidationError: If config is invalid
    """
    config_path = Path(config_path)
    if not config_path.exists():
        raise FileNotFoundError(f"Config file not found: {config_path}")

    with open(config_path) as f:
        raw = yaml.safe_load(f)

    # Interpolate environment variables in string values
    raw = _interpolate_env_vars(raw)

    return WorkshopConfig(**raw)


def _interpolate_env_vars(obj):
    """Recursively interpolate ${VAR} patterns with environment variables."""
    if isinstance(obj, str):
        # Replace ${VAR} with os.environ.get('VAR', '')
        import re
        pattern = r'\$\{([^}]+)\}'
        def replacer(match):
            var_name = match.group(1)
            return os.environ.get(var_name, '')
        return re.sub(pattern, replacer, obj)
    elif isinstance(obj, dict):
        return {k: _interpolate_env_vars(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_interpolate_env_vars(item) for item in obj]
    return obj
