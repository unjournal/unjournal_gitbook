"""
Update content in specific tabs of the workshop collaborative notes document.

Usage:
    python -m src.gdocs.update_tab_content --tab "1. Stakeholder & PQs" --append "New content here"
    python -m src.gdocs.update_tab_content --list-tabs
"""

import argparse
import json
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

# Main tabbed document
TABBED_DOC_ID = "1NMtWjoKU52tJQwUV99Bf8XXYdLoFLviTQq6AslzKQQU"


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


def get_doc_with_tabs(docs_service, doc_id: str):
    """Get document with all tab content."""
    return docs_service.documents().get(
        documentId=doc_id,
        includeTabsContent=True
    ).execute()


def get_tab_end_index(doc, tab_id: str) -> int:
    """Get the end index (last position) of a specific tab."""
    for tab in doc.get('tabs', []):
        if tab['tabProperties']['tabId'] == tab_id:
            # Get the body content of this tab
            body = tab.get('documentTab', {}).get('body', {})
            content = body.get('content', [])
            if content:
                # Last element's endIndex
                return content[-1].get('endIndex', 1)
    return 1


def create_sub_tab(docs_service, doc_id: str, parent_tab_id: str, title: str) -> str:
    """Create a new sub-tab (child tab) under an existing tab.

    Returns the new tab's ID.
    """
    import uuid
    # Generate a unique tab ID
    new_tab_id = f"t.{uuid.uuid4().hex[:12]}"

    requests = [
        {
            'insertTab': {
                'tab': {
                    'tabProperties': {
                        'tabId': new_tab_id,
                        'title': title,
                        'parentTabId': parent_tab_id,
                    }
                },
                'insertionIndex': 0,  # First child position
            }
        }
    ]

    result = docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={'requests': requests}
    ).execute()

    return new_tab_id


def append_to_tab(docs_service, doc_id: str, tab_id: str, text: str, font_family: str = "Times New Roman"):
    """Append text to the end of a specific tab with formatting."""
    # Get current document to find end index
    doc = get_doc_with_tabs(docs_service, doc_id)
    end_index = get_tab_end_index(doc, tab_id)

    # Insert at end (minus 1 to be before the trailing newline)
    insert_index = max(1, end_index - 1)

    # Text to insert (with leading newlines for separation)
    full_text = f"\n\n{text}"
    text_length = len(full_text)

    requests = [
        # First insert the text
        {
            'insertText': {
                'location': {
                    'index': insert_index,
                    'tabId': tab_id,
                },
                'text': full_text
            }
        },
        # Then apply Times New Roman formatting to the inserted text
        {
            'updateTextStyle': {
                'range': {
                    'startIndex': insert_index,
                    'endIndex': insert_index + text_length,
                    'tabId': tab_id,
                },
                'textStyle': {
                    'weightedFontFamily': {
                        'fontFamily': font_family,
                        'weight': 400
                    }
                },
                'fields': 'weightedFontFamily'
            }
        }
    ]

    result = docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={'requests': requests}
    ).execute()

    return result


def read_tab_content(docs_service, doc_id: str, tab_id: str) -> str:
    """Read text content from a specific tab."""
    doc = get_doc_with_tabs(docs_service, doc_id)

    for tab in doc.get('tabs', []):
        if tab['tabProperties']['tabId'] == tab_id:
            body = tab.get('documentTab', {}).get('body', {})
            content = body.get('content', [])

            text_parts = []
            for element in content:
                if 'paragraph' in element:
                    for elem in element['paragraph'].get('elements', []):
                        if 'textRun' in elem:
                            text_parts.append(elem['textRun'].get('content', ''))

            return ''.join(text_parts)

    return ""


def list_tabs(docs_service, doc_id: str):
    """List all tabs in the document."""
    doc = get_doc_with_tabs(docs_service, doc_id)

    print(f"Document: {doc.get('title', 'Untitled')}")
    print(f"ID: {doc_id}")
    print("=" * 60)

    for tab in doc.get('tabs', []):
        props = tab['tabProperties']
        tab_id = props['tabId']
        title = props['title']

        # Get content preview
        content = read_tab_content(docs_service, doc_id, tab_id)
        preview = content[:100].replace('\n', ' ').strip()
        if len(content) > 100:
            preview += "..."

        print(f"\n{title}")
        print(f"  Tab ID: {tab_id}")
        print(f"  Preview: {preview or '(empty)'}")


def main():
    parser = argparse.ArgumentParser(description='Update workshop document tabs')
    parser.add_argument('--list-tabs', action='store_true', help='List all tabs')
    parser.add_argument('--tab', type=str, help='Tab name or ID to update')
    parser.add_argument('--append', type=str, help='Text to append to the tab')
    parser.add_argument('--read', action='store_true', help='Read tab content instead of writing')
    parser.add_argument('--doc-id', type=str, default=TABBED_DOC_ID, help='Document ID')

    args = parser.parse_args()

    creds = get_credentials()
    docs_service = build('docs', 'v1', credentials=creds)

    if args.list_tabs:
        list_tabs(docs_service, args.doc_id)
        return

    if not args.tab:
        parser.error("--tab is required unless using --list-tabs")

    # Load tab info to resolve names to IDs
    tab_info_path = Path(__file__).parent.parent.parent / 'tabbed_doc_info.json'
    tab_id = args.tab

    if tab_info_path.exists():
        with open(tab_info_path) as f:
            tab_info = json.load(f)

        # Check if it's a tab name
        if args.tab in tab_info.get('tabs', {}):
            tab_id = tab_info['tabs'][args.tab]['tabId']
            print(f"Resolved '{args.tab}' to tab ID: {tab_id}")

    if args.read:
        content = read_tab_content(docs_service, args.doc_id, tab_id)
        print(f"Content of tab '{args.tab}':")
        print("=" * 60)
        print(content)
        return

    if not args.append:
        parser.error("--append is required when not using --read")

    print(f"Appending to tab '{args.tab}' (ID: {tab_id})...")
    result = append_to_tab(docs_service, args.doc_id, tab_id, args.append)
    print(f"Done! Replies: {len(result.get('replies', []))}")


if __name__ == '__main__':
    main()
