"""
Get tab IDs from the tabbed workshop document and update HTML embeds.
"""

import json
import re
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file',
]

CREDENTIALS_PATH = Path.home() / '.config' / 'unjournal' / 'google_credentials.json'
TOKEN_PATH = Path.home() / '.config' / 'unjournal' / 'google_token.json'

# The new tabbed document
TABBED_DOC_ID = "1NMtWjoKU52tJQwUV99Bf8XXYdLoFLviTQq6AslzKQQU"

# Mapping of tab names to HTML pages
TAB_TO_PAGE = {
    "1. Stakeholder & PQs": "stakeholder.html",
    "2. Benjamin et al.": "paper.html",
    "3. Evaluator Discussion": "evaluator.html",
    "4. WELLBY Reliability": "wellby.html",
    "5. DALY-WELLBY": "daly.html",
    "6. Beliefs Elicitation": None,  # Links to beliefs.html, not a live page
}

WORKSHOP_DIR = Path(__file__).parent.parent.parent.parent / "wellbeing-workshop"


def get_credentials():
    """Get or refresh OAuth credentials."""
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    elif not creds or not creds.valid:
        if not CREDENTIALS_PATH.exists():
            raise FileNotFoundError(f"Credentials not found: {CREDENTIALS_PATH}")
        flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_PATH), SCOPES)
        creds = flow.run_local_server(port=0)

    TOKEN_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(TOKEN_PATH, 'w') as f:
        f.write(creds.to_json())

    return creds


def get_tab_info(docs_service, doc_id: str):
    """Get tab IDs and titles from document."""
    doc = docs_service.documents().get(
        documentId=doc_id,
        includeTabsContent=True
    ).execute()

    tabs = {}
    for tab in doc.get('tabs', []):
        props = tab['tabProperties']
        tab_id = props['tabId']
        title = props['title']
        tabs[title] = {
            'tabId': tab_id,
            'url': f"https://docs.google.com/document/d/{doc_id}/edit?tab={tab_id}",
            'embedUrl': f"https://docs.google.com/document/d/{doc_id}/edit?tab={tab_id}&embedded=true",
        }

    return tabs


def update_html_page(page_path: Path, doc_id: str, tab_id: str, tab_title: str):
    """Update an HTML page to embed the correct tab."""
    if not page_path.exists():
        print(f"  Warning: {page_path} not found")
        return False

    content = page_path.read_text()

    # Old embed URL pattern (separate docs)
    old_patterns = [
        r'https://docs\.google\.com/document/d/[^"\']+/edit\?embedded=true',
        r'https://docs\.google\.com/document/d/[^"\']+/edit"',
    ]

    new_embed_url = f"https://docs.google.com/document/d/{doc_id}/edit?tab={tab_id}&embedded=true"
    new_link_url = f"https://docs.google.com/document/d/{doc_id}/edit?tab={tab_id}"

    # Replace iframe src
    content = re.sub(
        r'src="https://docs\.google\.com/document/d/[^"]+/edit\?embedded=true"',
        f'src="{new_embed_url}"',
        content
    )

    # Replace "Open in new tab" link
    content = re.sub(
        r'href="https://docs\.google\.com/document/d/[^"]+/edit"',
        f'href="{new_link_url}"',
        content
    )

    page_path.write_text(content)
    return True


def main():
    creds = get_credentials()
    docs_service = build('docs', 'v1', credentials=creds)

    print(f"Fetching tabs from document: {TABBED_DOC_ID}")
    print("=" * 60)

    tabs = get_tab_info(docs_service, TABBED_DOC_ID)

    print("\nTabs found:")
    for title, info in tabs.items():
        print(f"  {title}")
        print(f"    ID: {info['tabId']}")
        print(f"    URL: {info['url']}")

    # Save tab info
    output_path = Path(__file__).parent.parent.parent / 'tabbed_doc_info.json'
    with open(output_path, 'w') as f:
        json.dump({
            'documentId': TABBED_DOC_ID,
            'tabs': tabs
        }, f, indent=2)
    print(f"\nSaved tab info to: {output_path}")

    # Update HTML pages
    print("\nUpdating HTML pages...")
    live_dir = WORKSHOP_DIR / "live"

    for tab_title, page_name in TAB_TO_PAGE.items():
        if page_name is None:
            continue

        tab_info = tabs.get(tab_title)
        if not tab_info:
            print(f"  Warning: Tab '{tab_title}' not found in document")
            continue

        page_path = live_dir / page_name
        print(f"  {page_name} <- {tab_title} (tab={tab_info['tabId']})")

        if update_html_page(page_path, TABBED_DOC_ID, tab_info['tabId'], tab_title):
            print(f"    ✓ Updated")
        else:
            print(f"    ✗ Failed")

    print("\n" + "=" * 60)
    print("Done! Deploy the workshop to apply changes.")


if __name__ == '__main__':
    main()
