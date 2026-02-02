"""Configuration loading from TOML file."""

from __future__ import annotations

import tomllib
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class EAForumConfig:
    auth_token: str = ""
    posts_index: str = "test_posts"

    def validate(self, dry_run: bool = True) -> list[str]:
        """Return list of missing required fields.

        Auth token is only required when actually posting (not dry-run).
        """
        missing = []
        if not dry_run and not self.auth_token:
            missing.append("eaforum.auth_token (required for live posting)")
        return missing


@dataclass
class Config:
    csv_path: str = ""
    dry_run: bool = True
    tfidf_threshold: float = 0.25
    rate_limit_per_minute: int = 10
    eaforum: EAForumConfig = field(default_factory=EAForumConfig)

    def validate(self) -> list[str]:
        """Return list of all validation errors."""
        errors = []
        if not self.csv_path:
            errors.append("general.csv_path is required")
        elif not Path(self.csv_path).exists():
            errors.append(f"CSV file not found: {self.csv_path}")
        errors.extend(self.eaforum.validate(dry_run=self.dry_run))
        return errors


def load_config(path: Path | str) -> Config:
    """Load config from a TOML file."""
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(
            f"Config file not found: {path}\n"
            f"Copy config.example.toml to config.toml and fill in your credentials."
        )

    with open(path, "rb") as f:
        raw = tomllib.load(f)

    general = raw.get("general", {})
    ea = raw.get("eaforum", {})

    # Resolve csv_path relative to config file location
    csv_path = general.get("csv_path", "")
    if csv_path and not Path(csv_path).is_absolute():
        csv_path = str((path.parent / csv_path).resolve())

    return Config(
        csv_path=csv_path,
        dry_run=general.get("dry_run", True),
        tfidf_threshold=general.get("tfidf_threshold", 0.25),
        rate_limit_per_minute=general.get("rate_limit_per_minute", 10),
        eaforum=EAForumConfig(
            auth_token=ea.get("auth_token", ""),
            posts_index=ea.get("posts_index", ea.get("algolia_posts_index", "test_posts")),
        ),
    )
