"""
Create a single Google Doc with tabs for the Wellbeing Workshop.

Each segment (1-6) gets its own tab with properly formatted content.
Practitioner segment (7) remains in a separate restricted document.
"""

import json
from pathlib import Path
from typing import Dict, Any, List

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

WORKSHOP_BASE_URL = "https://uj-wellbeing-workshop.netlify.app"

# Segment definitions with content
SEGMENTS = [
    {
        "tab_name": "1. Stakeholder & PQs",
        "title": "Segment 1: Stakeholder Problem Statement & Pivotal Questions",
        "time": "~11:00 AM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/stakeholder.html",
        "speakers": "Peter Hickman (Coefficient Giving), Matt Lerner (Founders Pledge)",
        "sections": [
            ("Peter Hickman (Coefficient Giving)", "Presentation notes..."),
            ("Matt Lerner (Founders Pledge)", "Presentation notes..."),
            ("Pivotal Questions Introduction", "Key PQs introduced for the workshop..."),
            ("Live Q&A & Discussion", ""),
        ]
    },
    {
        "tab_name": "2. Benjamin et al.",
        "title": "Segment 2: Research Presentation - Benjamin et al.",
        "time": "~11:30 AM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/paper.html",
        "speakers": "Dan Benjamin (UCLA/NBER), Miles Kimball (CU Boulder)",
        "sections": [
            ("Key Findings", "Scale-use heterogeneity in self-reported wellbeing\nCalibration questions and vignette methods\nImplications for WELLBY measurement"),
            ("Author Presentation Notes", ""),
            ("Questions for Authors", ""),
            ("Live Discussion", ""),
        ]
    },
    {
        "tab_name": "3. Evaluator Discussion",
        "title": "Segment 3: Evaluator Responses & Discussion",
        "time": "~12:00 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/evaluator.html",
        "speakers": "Caspar Kaiser, David Reinstein, Valentin Klotzbücher",
        "sections": [
            ("Evaluation Overview", "Key critiques and suggestions from the Unjournal evaluation"),
            ("Caspar Kaiser", ""),
            ("David Reinstein", ""),
            ("Valentin Klotzbücher", ""),
            ("Author Dialogue", ""),
        ]
    },
    {
        "tab_name": "4. WELLBY Reliability",
        "title": "Segment 4: WELLBY Reliability Discussion",
        "time": "~1:00 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/wellby.html",
        "speakers": "Open discussion (all participants)",
        "sections": [
            ("Focal Question", "Is the linear WELLBY reliable enough for cross-intervention comparison?"),
            ("Cardinality Discussion", "Does a move from 3→4 mean the same as 7→8?"),
            ("Neutral Point", "Where is the 'neutral point' on the satisfaction scale?"),
            ("Scale-Use Heterogeneity", "How much do people differ in how they use the scale?"),
            ("Open Discussion", ""),
        ]
    },
    {
        "tab_name": "5. DALY-WELLBY",
        "title": "Segment 5: DALY/QALY↔WELLBY Conversion",
        "time": "~1:30 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/daly.html",
        "speakers": "Discussion Lead: Julian Jamison (University of Exeter)",
        "sections": [
            ("Focal Question", "How should we translate between health measures (DALYs/QALYs) and subjective wellbeing (WELLBYs)?"),
            ("Current Approaches", "What conversion factors are currently used?"),
            ("Julian Jamison's Framework", ""),
            ("Conversion Factor Discussion", ""),
            ("Open Questions", ""),
        ]
    },
    {
        "tab_name": "6. Beliefs Elicitation",
        "title": "Segment 6: Beliefs Elicitation",
        "time": "~2:00 PM ET | 15 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/beliefs.html",
        "speakers": "David Reinstein + self-guided form",
        "sections": [
            ("Introduction", "David Reinstein introduces the beliefs elicitation process"),
            ("Key Questions", "WELL_01: Is the linear WELLBY reliable?\nDALY_01: What is the best WELLBY/DALY conversion factor?"),
            ("Form Completion Notes", "Observations from participants filling out the form"),
            ("Aggregated Observations", ""),
        ]
    },
]


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


def create_tabbed_document(docs_service, drive_service):
    """Create the main workshop document with tabs."""

    # Create the document
    doc = docs_service.documents().create(
        body={'title': 'Wellbeing Workshop - Live Discussion Notes'}
    ).execute()
    doc_id = doc['documentId']
    print(f"Created document: {doc_id}")

    # The document starts with one default tab. We need to:
    # 1. Get the default tab ID
    # 2. Rename it to our first segment
    # 3. Add additional tabs for segments 2-6

    # Get current document structure with tabs
    doc = docs_service.documents().get(
        documentId=doc_id,
        includeTabsContent=True
    ).execute()

    # Get the default tab
    tabs = doc.get('tabs', [])
    if not tabs:
        raise Exception("Document has no tabs")

    default_tab_id = tabs[0]['tabProperties']['tabId']
    print(f"Default tab ID: {default_tab_id}")

    # Build requests to:
    # 1. Rename default tab
    # 2. Add new tabs for segments 2-6
    requests = []

    # Rename default tab to first segment
    requests.append({
        'updateTabProperties': {
            'tabId': default_tab_id,
            'tabProperties': {
                'title': SEGMENTS[0]['tab_name']
            },
            'fields': 'title'
        }
    })

    # Add tabs for segments 2-6
    for i, segment in enumerate(SEGMENTS[1:], start=1):
        requests.append({
            'addTab': {
                'tabProperties': {
                    'title': segment['tab_name'],
                    'index': i  # Position after previous tabs
                }
            }
        })

    # Execute tab creation
    result = docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={'requests': requests}
    ).execute()

    print(f"Tab operations completed")

    # Get updated document with new tab IDs
    doc = docs_service.documents().get(
        documentId=doc_id,
        includeTabsContent=True
    ).execute()

    tabs = doc.get('tabs', [])
    tab_ids = {}
    for tab in tabs:
        props = tab['tabProperties']
        tab_ids[props['title']] = props['tabId']
        print(f"  Tab: {props['title']} -> {props['tabId']}")

    # Now add content to each tab
    for segment in SEGMENTS:
        tab_id = tab_ids.get(segment['tab_name'])
        if not tab_id:
            print(f"Warning: Could not find tab for {segment['tab_name']}")
            continue

        # Build formatted content requests for this tab
        content_requests = build_content_requests(segment, tab_id)

        if content_requests:
            docs_service.documents().batchUpdate(
                documentId=doc_id,
                body={'requests': content_requests}
            ).execute()
            print(f"  Added content to {segment['tab_name']}")

    # Set sharing to anyone can edit
    drive_service.permissions().create(
        fileId=doc_id,
        body={'type': 'anyone', 'role': 'writer'},
        fields='id'
    ).execute()
    print("Set sharing to anyone can edit")

    return {
        'documentId': doc_id,
        'url': f'https://docs.google.com/document/d/{doc_id}/edit',
        'tabs': tab_ids
    }


def build_content_requests(segment: Dict, tab_id: str) -> List[Dict]:
    """Build Google Docs API requests for formatted content."""
    requests = []

    # We insert content in reverse order (bottom to top) because
    # each insert at index 1 pushes previous content down

    # Build the full content structure
    content_parts = []

    # Title (Heading 1)
    content_parts.append({
        'text': segment['title'] + '\n',
        'style': 'HEADING_1'
    })

    # Time and speakers (normal text with formatting)
    content_parts.append({
        'text': segment['time'] + '\n',
        'style': 'NORMAL_TEXT',
        'italic': True
    })

    content_parts.append({
        'text': 'Speakers: ' + segment['speakers'] + '\n\n',
        'style': 'NORMAL_TEXT'
    })

    # Link back to workshop page
    content_parts.append({
        'text': '→ View on workshop site',
        'style': 'NORMAL_TEXT',
        'link': segment['workshop_page']
    })
    content_parts.append({
        'text': '\n\n',
        'style': 'NORMAL_TEXT'
    })

    # Sections (Heading 2 + content)
    for section_title, section_content in segment['sections']:
        content_parts.append({
            'text': section_title + '\n',
            'style': 'HEADING_2'
        })
        if section_content:
            content_parts.append({
                'text': section_content + '\n\n',
                'style': 'NORMAL_TEXT'
            })
        else:
            content_parts.append({
                'text': '[Notes will be added during the workshop]\n\n',
                'style': 'NORMAL_TEXT',
                'italic': True
            })

    # Now build the actual requests
    # Start at index 1 (after the implicit newline at start of doc)
    current_index = 1

    for part in content_parts:
        text = part['text']

        # Insert text
        requests.append({
            'insertText': {
                'location': {'index': current_index, 'tabId': tab_id},
                'text': text
            }
        })

        end_index = current_index + len(text)

        # Apply paragraph style (heading)
        style = part.get('style', 'NORMAL_TEXT')
        if style.startswith('HEADING'):
            requests.append({
                'updateParagraphStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index,
                        'tabId': tab_id
                    },
                    'paragraphStyle': {
                        'namedStyleType': style
                    },
                    'fields': 'namedStyleType'
                }
            })

        # Apply text formatting
        text_style = {}
        if part.get('italic'):
            text_style['italic'] = True
        if part.get('link'):
            text_style['link'] = {'url': part['link']}

        if text_style:
            requests.append({
                'updateTextStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index - 1,  # Exclude trailing newline
                        'tabId': tab_id
                    },
                    'textStyle': text_style,
                    'fields': ','.join(text_style.keys())
                }
            })

        current_index = end_index

    return requests


def update_practitioner_doc(docs_service, doc_id: str):
    """Update the existing practitioner doc with proper formatting."""

    # Get current content
    doc = docs_service.documents().get(documentId=doc_id).execute()

    # Clear existing content and add formatted version
    # First, get the document end index
    body_content = doc.get('body', {}).get('content', [])
    if body_content:
        end_index = body_content[-1].get('endIndex', 1)
    else:
        end_index = 1

    requests = []

    # Delete existing content (if any beyond the initial newline)
    if end_index > 2:
        requests.append({
            'deleteContentRange': {
                'range': {
                    'startIndex': 1,
                    'endIndex': end_index - 1
                }
            }
        })

    # Build practitioner content
    segment = {
        "title": "Segment 7: Practitioner Panel & Open Discussion",
        "time": "~2:20 PM ET | 30 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/practitioner.html",
        "speakers": "Matt Lerner (Founders Pledge), Peter Hickman (Coefficient Giving)",
        "sections": [
            ("Session Overview", "Practical implications for funders and researchers. This segment has restricted access for confidential discussions."),
            ("Current Practices", "How do organizations currently handle WELLBY-DALY comparisons?"),
            ("Matt Lerner (Founders Pledge)", ""),
            ("Peter Hickman (Coefficient Giving)", ""),
            ("Actionable Recommendations", "What should CEA practitioners do now?"),
            ("Confidential Notes", ""),
        ]
    }

    # Build content (similar to tabbed doc but without tab_id)
    content_parts = []

    content_parts.append({'text': segment['title'] + '\n', 'style': 'HEADING_1'})
    content_parts.append({'text': segment['time'] + '\n', 'style': 'NORMAL_TEXT', 'italic': True})
    content_parts.append({'text': 'Panelists: ' + segment['speakers'] + '\n\n', 'style': 'NORMAL_TEXT'})
    content_parts.append({'text': '→ View on workshop site', 'style': 'NORMAL_TEXT', 'link': segment['workshop_page']})
    content_parts.append({'text': '\n\n', 'style': 'NORMAL_TEXT'})

    for section_title, section_content in segment['sections']:
        content_parts.append({'text': section_title + '\n', 'style': 'HEADING_2'})
        if section_content:
            content_parts.append({'text': section_content + '\n\n', 'style': 'NORMAL_TEXT'})
        else:
            content_parts.append({'text': '[Notes will be added during the workshop]\n\n', 'style': 'NORMAL_TEXT', 'italic': True})

    current_index = 1
    for part in content_parts:
        text = part['text']
        requests.append({
            'insertText': {
                'location': {'index': current_index},
                'text': text
            }
        })

        end_index = current_index + len(text)
        style = part.get('style', 'NORMAL_TEXT')

        if style.startswith('HEADING'):
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': current_index, 'endIndex': end_index},
                    'paragraphStyle': {'namedStyleType': style},
                    'fields': 'namedStyleType'
                }
            })

        text_style = {}
        if part.get('italic'):
            text_style['italic'] = True
        if part.get('link'):
            text_style['link'] = {'url': part['link']}

        if text_style:
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': current_index, 'endIndex': end_index - 1},
                    'textStyle': text_style,
                    'fields': ','.join(text_style.keys())
                }
            })

        current_index = end_index

    if requests:
        docs_service.documents().batchUpdate(
            documentId=doc_id,
            body={'requests': requests}
        ).execute()

    print(f"Updated practitioner doc: {doc_id}")


def main():
    """Main entry point."""
    creds = get_credentials()
    docs_service = build('docs', 'v1', credentials=creds)
    drive_service = build('drive', 'v3', credentials=creds)

    print("Creating tabbed workshop document...")
    result = create_tabbed_document(docs_service, drive_service)

    print("\n" + "="*60)
    print("TABBED DOCUMENT CREATED")
    print("="*60)
    print(f"Document ID: {result['documentId']}")
    print(f"URL: {result['url']}")
    print("\nTab IDs:")
    for tab_name, tab_id in result['tabs'].items():
        print(f"  {tab_name}: {tab_id}")

    # Also update the practitioner doc
    practitioner_doc_id = "1KKGjRkv5ytNrPoVLhHMoWepdr9D--fCD0aTv0hfV8LU"
    print(f"\nUpdating practitioner doc ({practitioner_doc_id})...")
    update_practitioner_doc(docs_service, practitioner_doc_id)

    # Save results to JSON
    output_path = Path(__file__).parent.parent.parent / 'tabbed_workshop_doc.json'
    with open(output_path, 'w') as f:
        json.dump({
            'main_doc': result,
            'practitioner_doc': {
                'documentId': practitioner_doc_id,
                'url': f'https://docs.google.com/document/d/{practitioner_doc_id}/edit'
            }
        }, f, indent=2)
    print(f"\nSaved to {output_path}")

    return result


if __name__ == '__main__':
    main()
