"""Local state store for tracking posted comments."""

from __future__ import annotations

import json
from pathlib import Path

from .models import CommentRecord

DEFAULT_STATE_DIR = Path.home() / ".unjournal-forum-bot"
DEFAULT_STATE_FILE = DEFAULT_STATE_DIR / "state.json"


class StateStore:
    """JSON-file-backed store for comment records."""

    def __init__(self, path: Path | None = None):
        self.path = path or DEFAULT_STATE_FILE
        self._records: list[CommentRecord] | None = None

    def _ensure_dir(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def load(self) -> list[CommentRecord]:
        """Load all records from the state file."""
        if self._records is not None:
            return self._records

        if not self.path.exists():
            self._records = []
            return self._records

        with open(self.path, encoding="utf-8") as f:
            data = json.load(f)

        self._records = [CommentRecord.from_dict(d) for d in data]
        return self._records

    def save(self) -> None:
        """Write all records to disk."""
        self._ensure_dir()
        records = self.load()
        with open(self.path, "w", encoding="utf-8") as f:
            json.dump([r.to_dict() for r in records], f, indent=2)

    def add(self, record: CommentRecord) -> None:
        """Add a record and save."""
        records = self.load()
        records.append(record)
        self.save()

    def was_commented(self, post_id: str, paper_title: str) -> bool:
        """Check if we already commented on this post about this paper (non-dry-run only)."""
        paper_lower = paper_title.lower()
        for r in self.load():
            if r.post_id == post_id and r.paper_title.lower() == paper_lower and not r.dry_run:
                return True
        return False

    def get_history(self) -> list[CommentRecord]:
        """Return all records."""
        return self.load()
