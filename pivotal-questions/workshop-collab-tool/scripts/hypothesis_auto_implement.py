#!/usr/bin/env python3
"""
Monitor Hypothes.is for #implement annotations and apply changes.

Checks for annotations by 'daaronr' containing '#implement' tag,
parses the requested change, applies it to local files, and optionally deploys.

Supports two modes:
1. Direct replacement: "Change to 'new text' #implement"
2. LLM-powered interpretation: "This is confusing, clarify #implement" (with --use-llm)

Usage:
    python hypothesis_auto_implement.py --urls URL1 URL2 --local-root /path/to/files
    python hypothesis_auto_implement.py --use-llm  # Use Claude to interpret suggestions
    python hypothesis_auto_implement.py --dry-run  # Preview without applying
"""

import os
import re
import json
import argparse
import requests
from pathlib import Path
from datetime import datetime
from urllib.parse import urlparse
from typing import Optional

HYPOTHESIS_API = "https://api.hypothes.is/api"
HYPOTHESIS_USER = "daaronr"
STATE_FILE = Path(__file__).parent / ".hypothesis_implement_state.json"


def get_anthropic_client():
    """Get Anthropic client, importing only when needed."""
    try:
        import anthropic
        return anthropic.Anthropic()
    except ImportError:
        print("Error: anthropic package not installed. Run: pip install anthropic")
        return None


def get_surrounding_context(file_path: Path, quoted_text: str, context_chars: int = 500) -> str:
    """Get surrounding context from the file for LLM understanding."""
    if not file_path.exists():
        return ""

    content = file_path.read_text()
    pos = content.find(quoted_text)
    if pos == -1:
        return ""

    start = max(0, pos - context_chars)
    end = min(len(content), pos + len(quoted_text) + context_chars)

    context = content[start:end]

    # Mark the quoted text in the context
    before = content[start:pos]
    after = content[pos + len(quoted_text):end]

    return f"{before}[[[ {quoted_text} ]]]{after}"


def llm_generate_replacement(
    quoted_text: str,
    instruction: str,
    context: str,
    file_path: str,
) -> Optional[str]:
    """Use Claude to interpret the suggestion and generate replacement text."""
    client = get_anthropic_client()
    if not client:
        return None

    prompt = f"""You are helping to implement editorial changes to a workshop website.

A user has highlighted some text and provided an instruction. Your job is to generate the replacement text.

FILE: {file_path}

CONTEXT (the highlighted text is marked with [[[ ]]]):
{context}

HIGHLIGHTED TEXT TO REPLACE:
{quoted_text}

USER'S INSTRUCTION:
{instruction}

Generate ONLY the replacement text. Do not include explanations, markdown formatting, or the [[[ ]]] markers.
If the instruction asks to delete the text, respond with exactly: [DELETE]
If you cannot determine what change to make, respond with exactly: [UNCLEAR]

Replacement text:"""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )

        replacement = response.content[0].text.strip()

        if replacement == "[UNCLEAR]":
            return None
        if replacement == "[DELETE]":
            return ""

        return replacement

    except Exception as e:
        print(f"  LLM Error: {e}")
        return None


def get_annotations(token: str, urls: list) -> list:
    """Fetch annotations from Hypothes.is API."""
    headers = {"Authorization": f"Bearer {token}"}
    all_annotations = []
    seen_ids = set()

    for url in urls:
        # Check multiple URL variants (with/without trailing slash, index.html)
        base_url = url.rstrip('/')
        url_variants = [
            url,
            base_url,
            base_url + '/',
            base_url + '/index.html',
        ]

        for url_variant in set(url_variants):
            params = {
                "user": f"acct:{HYPOTHESIS_USER}@hypothes.is",
                "uri": url_variant,
                "limit": 100,
            }
            try:
                resp = requests.get(f"{HYPOTHESIS_API}/search", headers=headers, params=params)
                if resp.ok:
                    for annotation in resp.json().get("rows", []):
                        if annotation["id"] not in seen_ids:
                            all_annotations.append(annotation)
                            seen_ids.add(annotation["id"])
            except Exception as e:
                print(f"  Warning: Failed to fetch {url_variant}: {e}")

    # Filter for #implement tag (case-insensitive)
    implement_annotations = []
    for a in all_annotations:
        text = a.get("text", "").lower()
        tags = [t.lower() for t in a.get("tags", [])]
        if "#implement" in text or "implement" in tags:
            implement_annotations.append(a)

    return implement_annotations


def parse_annotation(annotation: dict, use_llm: bool = False, local_root: Path = None) -> dict:
    """Parse annotation to extract the requested change.

    Args:
        annotation: The Hypothes.is annotation dict
        use_llm: If True, use Claude to interpret suggestions that don't have explicit replacements
        local_root: Local file root for getting context (required if use_llm=True)
    """
    text = annotation.get("text", "")
    target = annotation.get("target", [{}])[0]
    selectors = target.get("selector", [])

    # Get the quoted text (what's being annotated/highlighted)
    quoted_text = None
    for selector in selectors:
        if selector.get("type") == "TextQuoteSelector":
            quoted_text = selector.get("exact")
            break

    change_request = {
        "annotation_id": annotation["id"],
        "uri": annotation["uri"],
        "quoted_text": quoted_text,
        "instruction": text,
        "created": annotation["created"],
        "replacement": None,
        "llm_generated": False,
    }

    # Try to extract replacement text using various patterns
    patterns = [
        # "Change X to Y #implement" or "change to: Y #implement"
        r"(?:change|replace|update)\s+(?:to|with)[:\s]+[\"']?(.+?)[\"']?\s*(?:#implement|$)",
        # "→ replacement #implement"
        r"→\s*[\"']?(.+?)[\"']?\s*(?:#implement|$)",
        # "#implement replacement text"
        r"#implement\s+[\"']?(.+?)[\"']?\s*$",
        # "new text: X #implement"
        r"(?:new\s+text|replacement)[:\s]+[\"']?(.+?)[\"']?\s*(?:#implement|$)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if match:
            replacement = match.group(1).strip()
            # Clean up the replacement
            replacement = replacement.rstrip('#').strip()
            if replacement:
                change_request["replacement"] = replacement
                break

    # If no explicit replacement found and LLM mode is enabled, use Claude
    if change_request["replacement"] is None and use_llm and quoted_text and local_root:
        print(f"  No explicit replacement found, using LLM to interpret...")
        file_path = url_to_local_path(annotation["uri"], local_root)
        context = get_surrounding_context(file_path, quoted_text)

        if context:
            replacement = llm_generate_replacement(
                quoted_text=quoted_text,
                instruction=text,
                context=context,
                file_path=str(file_path.relative_to(local_root)),
            )
            if replacement is not None:
                change_request["replacement"] = replacement
                change_request["llm_generated"] = True
                print(f"  LLM generated replacement: '{replacement[:60]}{'...' if len(replacement) > 60 else ''}'")

    return change_request


def url_to_local_path(url: str, local_root: Path) -> Path:
    """Convert URL to local file path."""
    parsed = urlparse(url)
    path = parsed.path.lstrip("/")

    # Handle various path cases
    if not path or path.endswith("/"):
        path = (path or "") + "index.html"
    elif "." not in path.split("/")[-1]:
        # No extension, assume it's a directory
        path = path + "/index.html"

    return local_root / path


def apply_change(change: dict, local_root: Path, dry_run: bool = False) -> bool:
    """Apply the change to the local file."""
    quoted = change.get("quoted_text")
    replacement = change.get("replacement")

    if not quoted:
        print(f"  Skip: No quoted text (annotation may be a page note)")
        return False

    if not replacement:
        print(f"  Skip: Could not parse replacement from instruction")
        print(f"        Instruction: {change['instruction'][:100]}...")
        return False

    file_path = url_to_local_path(change["uri"], local_root)
    if not file_path.exists():
        print(f"  Error: File not found: {file_path}")
        return False

    content = file_path.read_text()

    if quoted not in content:
        # Try with normalized whitespace
        normalized_quoted = " ".join(quoted.split())
        normalized_content = " ".join(content.split())
        if normalized_quoted not in normalized_content:
            print(f"  Error: Quoted text not found in file")
            print(f"         Looking for: '{quoted[:60]}...'")
            return False
        else:
            print(f"  Warning: Whitespace differs, attempting fuzzy match...")

    if dry_run:
        print(f"  Would replace:")
        print(f"    OLD: '{quoted[:80]}{'...' if len(quoted) > 80 else ''}'")
        print(f"    NEW: '{replacement[:80]}{'...' if len(replacement) > 80 else ''}'")
        return True

    # Apply the change
    new_content = content.replace(quoted, replacement, 1)
    if new_content == content:
        print(f"  Warning: No change made (text may already be updated)")
        return False

    file_path.write_text(new_content)
    print(f"  Applied to: {file_path.relative_to(local_root)}")
    return True


def load_state() -> dict:
    """Load processed annotation IDs."""
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except json.JSONDecodeError:
            return {"processed": [], "last_run": None}
    return {"processed": [], "last_run": None}


def save_state(state: dict):
    """Save processed annotation IDs."""
    state["last_run"] = datetime.now().isoformat()
    STATE_FILE.write_text(json.dumps(state, indent=2))


def main():
    parser = argparse.ArgumentParser(description="Apply Hypothes.is #implement annotations")
    parser.add_argument("--urls", nargs="+", required=True, help="URLs to monitor")
    parser.add_argument("--local-root", required=True, help="Local file root directory")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without applying")
    parser.add_argument("--deploy", action="store_true", help="Deploy to Netlify after changes")
    parser.add_argument("--site-id", help="Netlify site ID for deployment")
    parser.add_argument("--reset-state", action="store_true", help="Clear processed state and reprocess all")
    parser.add_argument("--use-llm", action="store_true",
                       help="Use Claude to interpret suggestions without explicit replacements")
    args = parser.parse_args()

    # Get token from environment
    token = os.environ.get("HYPOTHESIS_PAT") or os.environ.get("hypothesis_PAT")
    if not token:
        # Try loading from .env file
        env_file = Path(__file__).parent.parent / ".env"
        if env_file.exists():
            for line in env_file.read_text().splitlines():
                if line.startswith("HYPOTHESIS_PAT=") or line.startswith("hypothesis_PAT="):
                    token = line.split("=", 1)[1].strip().strip('"\'')
                    break

    if not token:
        print("Error: HYPOTHESIS_PAT not found in environment or .env file")
        return 1

    local_root = Path(args.local_root).resolve()
    if not local_root.exists():
        print(f"Error: Local root not found: {local_root}")
        return 1

    # Load or reset state
    if args.reset_state:
        state = {"processed": [], "last_run": None}
        print("State reset - will reprocess all annotations")
    else:
        state = load_state()

    print(f"=" * 60)
    print(f"Hypothes.is #implement Monitor")
    print(f"=" * 60)
    print(f"Time: {datetime.now().isoformat()}")
    print(f"URLs: {len(args.urls)} monitored")
    for url in args.urls:
        print(f"  - {url}")
    print(f"Local root: {local_root}")
    print(f"Dry run: {args.dry_run}")
    print(f"LLM mode: {args.use_llm}")
    print(f"Previously processed: {len(state['processed'])} annotations")
    print()

    # Fetch annotations
    print("Fetching annotations...")
    annotations = get_annotations(token, args.urls)
    print(f"Found {len(annotations)} annotations with #implement")

    # Filter out already processed
    new_annotations = [a for a in annotations if a["id"] not in state["processed"]]
    print(f"New annotations to process: {len(new_annotations)}")
    print()

    if not new_annotations:
        print("No new annotations to process.")
        save_state(state)
        return 0

    # Process each annotation
    changes_made = 0
    for annotation in new_annotations:
        print(f"Annotation: {annotation['id'][:12]}...")
        print(f"  URI: {annotation['uri']}")
        print(f"  Created: {annotation['created']}")
        print(f"  Instruction: {annotation.get('text', '')[:80]}...")

        change = parse_annotation(annotation, use_llm=args.use_llm, local_root=local_root)

        if change.get("llm_generated"):
            print(f"  [LLM-generated replacement]")

        if apply_change(change, local_root, dry_run=args.dry_run):
            if not args.dry_run:
                state["processed"].append(annotation["id"])
                changes_made += 1
        print()

    # Save state
    save_state(state)

    # Deploy if changes were made
    if changes_made > 0 and args.deploy and args.site_id and not args.dry_run:
        print(f"Deploying {changes_made} changes to Netlify...")
        deploy_cmd = f"cd {local_root} && npx netlify-cli deploy --prod --dir=. --site {args.site_id}"
        os.system(deploy_cmd)

    print("=" * 60)
    print(f"Summary: {changes_made} changes applied")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    exit(main())
