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
        missing = []
        if not dry_run and not self.auth_token:
            missing.append("eaforum.auth_token (required for live posting)")
        return missing


@dataclass
class BlueskyConfig:
    """Bluesky credentials and settings."""

    handle: str = ""  # e.g., "unjournal.bsky.social"
    app_password: str = ""  # App password from Bluesky settings
    enabled: bool = False  # Whether to include Bluesky in runs

    def validate(self, dry_run: bool = True) -> list[str]:
        missing = []
        if self.enabled and not dry_run:
            if not self.handle:
                missing.append("bluesky.handle (required for posting)")
            if not self.app_password:
                missing.append("bluesky.app_password (required for posting)")
        return missing


@dataclass
class Config:
    csv_path: str = ""
    dry_run: bool = True
    tfidf_threshold: float = 0.25
    rate_limit_per_minute: int = 10
    eaforum: EAForumConfig = field(default_factory=EAForumConfig)
    bluesky: BlueskyConfig = field(default_factory=BlueskyConfig)

    def validate(self) -> list[str]:
        errors = []
        if not self.csv_path:
            errors.append("general.csv_path is required")
        elif not Path(self.csv_path).exists():
            errors.append(f"CSV file not found: {self.csv_path}")
        errors.extend(self.eaforum.validate(dry_run=self.dry_run))
        errors.extend(self.bluesky.validate(dry_run=self.dry_run))
        return errors


def load_config(path: Path | str) -> Config:
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
    bsky = raw.get("bluesky", {})

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
        bluesky=BlueskyConfig(
            handle=bsky.get("handle", ""),
            app_password=bsky.get("app_password", ""),
            enabled=bsky.get("enabled", False),
        ),
    )
