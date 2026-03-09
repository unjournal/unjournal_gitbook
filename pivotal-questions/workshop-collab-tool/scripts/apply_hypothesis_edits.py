#!/usr/bin/env python3
"""
Hypothes.is Annotation Monitor & Auto-Apply
Checks for annotations from daaronr on workshop pages and applies edits.

Usage:
    python apply_hypothesis_edits.py [--dry-run] [--hours N]

Options:
    --dry-run   Show proposed edits without applying
    --hours N   Only process annotations from last N hours (default: 24)
"""

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlparse
import requests

# Configuration
WORKSHOP_DIR = Path("/Users/yosemite/githubs/unjournal-gitbook-knowledge-comms/pivotal-questions/wellbeing-workshop")
NETLIFY_SITE_ID = "37a0205b-5cee-42c2-9388-fe0c17b5e5c6"
USER_FILTER = "daaronr"

URLS = [
    "https://uj-wellbeing-workshop.netlify.app/about.html",
    "https://uj-wellbeing-workshop.netlify.app/beliefs.html",
    "https://uj-wellbeing-workshop.netlify.app/index.html",
    "https://uj-wellbeing-workshop.netlify.app/live/",
    "https://uj-wellbeing-workshop.netlify.app/live/index.html",
    "https://uj-wellbeing-workshop.netlify.app/live/stakeholder.html",
    "https://uj-wellbeing-workshop.netlify.app/live/paper.html",
    "https://uj-wellbeing-workshop.netlify.app/live/evaluator.html",
    "https://uj-wellbeing-workshop.netlify.app/live/wellby.html",
    "https://uj-wellbeing-workshop.netlify.app/live/daly.html",
    "https://uj-wellbeing-workshop.netlify.app/live/practitioner.html",
]

# Map URLs to local file paths
def url_to_filepath(url: str) -> Path:
    parsed = urlparse(url)
    path = parsed.path
    if path.endswith("/"):
        path += "index.html"
    return WORKSHOP_DIR / path.lstrip("/")


def fetch_annotations(url: str, hours: int = 24) -> list:
    """Fetch annotations from Hypothes.is API for a given URL."""
    api_url = f"https://api.hypothes.is/api/search?user=acct:{USER_FILTER}@hypothes.is&uri={url}"
    try:
        response = requests.get(api_url, timeout=30)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return []

    # Filter by time
    cutoff = datetime.now(timezone.utc) - timedelta(hours=hours)
    annotations = []
    for row in data.get("rows", []):
        created = datetime.fromisoformat(row["created"].replace("Z", "+00:00"))
        if created >= cutoff:
            annotations.append(row)

    return annotations


def extract_quoted_text(annotation: dict) -> str | None:
    """Extract the quoted/highlighted text from annotation."""
    for target in annotation.get("target", []):
        for selector in target.get("selector", []):
            if selector.get("type") == "TextQuoteSelector":
                return selector.get("exact", "").strip()
    return None


def is_todo_comment(text: str) -> bool:
    """Check if comment is a TODO/note rather than an edit request."""
    todo_patterns = [
        r"^todo\b",
        r"^note\b",
        r"should link.*later",
        r"once.*finalized",
        r"when.*ready",
        r"we should",
        r"consider",
    ]
    text_lower = text.lower()
    return any(re.search(p, text_lower) for p in todo_patterns)


def apply_edit(filepath: Path, quoted: str, comment: str, dry_run: bool = False) -> bool:
    """
    Attempt to apply an edit based on the annotation.
    Returns True if edit was applied/would be applied.
    """
    if not filepath.exists():
        print(f"    File not found: {filepath}")
        return False

    content = filepath.read_text()

    # Normalize whitespace for matching
    quoted_normalized = " ".join(quoted.split())

    # Try to find the quoted text in the file
    # Handle case where quoted text spans multiple lines
    pattern = re.escape(quoted_normalized)
    pattern = pattern.replace(r"\ ", r"\s+")  # Allow flexible whitespace

    match = re.search(pattern, content, re.IGNORECASE | re.DOTALL)

    if not match:
        # Try with original quoted text
        if quoted in content:
            match_start = content.index(quoted)
            match_end = match_start + len(quoted)
        else:
            print(f"    Could not find quoted text in file")
            print(f"    Quoted: {quoted[:80]}...")
            return False
    else:
        match_start = match.start()
        match_end = match.end()

    original = content[match_start:match_end]

    # Parse the comment to determine the edit
    # Common patterns:
    # - "should be X" or "'X'" -> replace with X
    # - "add X" -> append X
    # - "X (not Y)" -> replace Y with X

    new_text = None

    # Pattern: quoted text in comment (the replacement)
    quoted_in_comment = re.findall(r"['\"]([^'\"]+)['\"]", comment)
    if quoted_in_comment:
        new_text = quoted_in_comment[0]

    # Pattern: "should be X" or "change to X"
    should_be = re.search(r"should be\s+(.+)", comment, re.IGNORECASE)
    if should_be:
        new_text = should_be.group(1).strip().strip("'\"")

    if new_text is None:
        print(f"    Could not parse edit from comment: {comment}")
        return False

    print(f"    Proposed: '{original[:50]}...' -> '{new_text[:50]}...'")

    if dry_run:
        return True

    # Apply the edit
    new_content = content[:match_start] + new_text + content[match_end:]
    filepath.write_text(new_content)
    print(f"    Applied edit to {filepath.name}")
    return True


def deploy_if_changed() -> bool:
    """Deploy to Netlify if there are changes."""
    os.chdir(WORKSHOP_DIR)

    # Check for changes
    result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
    if not result.stdout.strip():
        print("No changes to deploy")
        return False

    print("Deploying to Netlify...")
    result = subprocess.run(
        ["npx", "netlify-cli", "deploy", "--prod", "--dir=.", "--site", NETLIFY_SITE_ID],
        capture_output=True,
        text=True,
        timeout=120,
    )

    if result.returncode == 0:
        print("Deploy successful")
        return True
    else:
        print(f"Deploy failed: {result.stderr}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Apply Hypothes.is annotations to workshop pages")
    parser.add_argument("--dry-run", action="store_true", help="Show proposed edits without applying")
    parser.add_argument("--hours", type=int, default=24, help="Only process annotations from last N hours")
    args = parser.parse_args()

    print(f"=== Hypothes.is Monitor: {datetime.now().strftime('%Y-%m-%d %H:%M')} ===")
    print(f"Mode: {'DRY RUN' if args.dry_run else 'APPLY'}")
    print(f"Time window: last {args.hours} hours")
    print(f"User filter: {USER_FILTER}")
    print()

    total_annotations = 0
    edits_applied = 0
    todos = []

    for url in URLS:
        print(f"Checking: {url}")
        annotations = fetch_annotations(url, args.hours)

        if not annotations:
            continue

        print(f"  Found {len(annotations)} recent annotations")
        total_annotations += len(annotations)

        filepath = url_to_filepath(url)

        for ann in annotations:
            quoted = extract_quoted_text(ann)
            comment = ann.get("text", "").strip()

            if not quoted or not comment:
                continue

            print(f"  - Quoted: {quoted[:60]}...")
            print(f"    Comment: {comment[:60]}...")

            if is_todo_comment(comment):
                print(f"    Skipped (TODO/note)")
                todos.append({"url": url, "quoted": quoted, "comment": comment})
                continue

            if apply_edit(filepath, quoted, comment, args.dry_run):
                edits_applied += 1

    print()
    print(f"=== Summary ===")
    print(f"Total annotations: {total_annotations}")
    print(f"Edits {'proposed' if args.dry_run else 'applied'}: {edits_applied}")
    print(f"TODOs skipped: {len(todos)}")

    if todos:
        print("\nTODO items for later:")
        for t in todos:
            print(f"  - {t['comment'][:80]}")

    if not args.dry_run and edits_applied > 0:
        deploy_if_changed()


if __name__ == "__main__":
    main()
