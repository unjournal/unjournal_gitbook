#!/usr/bin/env python3
"""Monitor Hypothes.is annotations for the legal-scholarship info page.

This intentionally does not auto-apply annotation text. Hypothes.is is public,
so the safe default is to fetch, log, and mark comments for human review.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = ROOT / "pivotal-questions" / "_archive" / "workshop-collab-tool" / ".env"
STATE_DIR = ROOT / ".hypothesis"
STATE_FILE = STATE_DIR / "legal_scholarship_seen.json"
LOG_FILE = STATE_DIR / "legal_scholarship_monitor.log"
API_URL = "https://api.hypothes.is/api/search"
PAGE_URL = "https://info.unjournal.org/legal-scholarship.html"
URL_VARIANTS = [
    PAGE_URL,
    "https://info.unjournal.org/legal-scholarship",
]


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_token() -> str | None:
    token = os.environ.get("HYPOTHESIS_PAT") or os.environ.get("hypothesis_PAT")
    if token:
        return token
    if not ENV_FILE.exists():
        return None
    for line in ENV_FILE.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        if key.strip() in {"HYPOTHESIS_PAT", "hypothesis_PAT"}:
            return value.strip().strip('"').strip("'")
    return None


def log(message: str) -> None:
    STATE_DIR.mkdir(exist_ok=True)
    line = f"[{now()}] {message}"
    print(line)
    with LOG_FILE.open("a", encoding="utf-8") as handle:
        handle.write(line + "\n")


def fetch_annotations(token: str | None) -> list[dict]:
    seen_ids: set[str] = set()
    annotations: list[dict] = []
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    for uri in URL_VARIANTS:
        params = urllib.parse.urlencode({
            "uri": uri,
            "limit": 200,
            "order": "desc",
        })
        request = urllib.request.Request(f"{API_URL}?{params}", headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
        for row in payload.get("rows", []):
            row_id = row.get("id")
            if row_id and row_id not in seen_ids:
                seen_ids.add(row_id)
                annotations.append(row)
    return annotations


def quoted_text(annotation: dict) -> str:
    for target in annotation.get("target", []):
        for selector in target.get("selector", []):
            if selector.get("type") == "TextQuoteSelector":
                return " ".join(selector.get("exact", "").split())
    return ""


def short_text(text: str, limit: int = 220) -> str:
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "..."


def load_state() -> dict:
    if not STATE_FILE.exists():
        return {"seen_ids": [], "last_check": None, "total_annotations": 0}
    return json.loads(STATE_FILE.read_text())


def save_state(state: dict) -> None:
    STATE_DIR.mkdir(exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n")


def annotation_line(annotation: dict) -> str:
    user = annotation.get("user", "").replace("acct:", "").replace("@hypothes.is", "")
    comment = short_text(annotation.get("text", ""))
    quote = short_text(quoted_text(annotation), 120)
    link = f"https://hypothes.is/a/{annotation.get('id')}"
    if quote:
        return f"@{user} on \"{quote}\": {comment} ({link})"
    return f"@{user}: {comment} ({link})"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--list", action="store_true", help="Print all current annotations.")
    parser.add_argument("--reset-seen", action="store_true", help="Forget the seen state before checking.")
    args = parser.parse_args()

    if args.reset_seen and STATE_FILE.exists():
        STATE_FILE.unlink()

    token = read_token()
    annotations = fetch_annotations(token)
    state = load_state()
    seen = set(state.get("seen_ids", []))

    if args.list:
        log(f"Current annotations on {PAGE_URL}: {len(annotations)}")
        for annotation in annotations:
            log("  " + annotation_line(annotation))

    new_annotations = [annotation for annotation in annotations if annotation.get("id") not in seen]
    if not seen:
        log(f"Initialized seen state for {len(annotations)} existing annotations on {PAGE_URL}.")
    elif new_annotations:
        log(f"New Hypothes.is annotations on {PAGE_URL}: {len(new_annotations)}")
        for annotation in new_annotations:
            log("  " + annotation_line(annotation))
    else:
        log(f"No new annotations on {PAGE_URL}; {len(annotations)} total.")

    state["seen_ids"] = sorted({a.get("id") for a in annotations if a.get("id")})
    state["last_check"] = now()
    state["total_annotations"] = len(annotations)
    save_state(state)
    return 0


if __name__ == "__main__":
    sys.exit(main())
