"""
Fix formatting in existing workshop Google Docs.

Replaces markdown-style content with properly formatted Google Docs content
(real headings, links, etc.)
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

# Document IDs from workshop_docs.json
DOCS = {
    "stakeholder": {
        "id": "1OdwyQWcjfGdonvzB3AJwoX_1SpUgb_cTMavhMEL6RGc",
        "title": "Segment 1: Stakeholder Problem Statement & Pivotal Questions",
        "time": "~11:00 AM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/stakeholder.html",
        "speakers": "Peter Hickman (Coefficient Giving), Matt Lerner (Founders Pledge)",
        "sections": [
            ("Overview", "Funders explain their WELLBY/DALY challenges, then we introduce key Pivotal Questions for belief elicitation."),
            ("Peter Hickman (Coefficient Giving)", "[Presentation notes]"),
            ("Matt Lerner (Founders Pledge)", "[Presentation notes]"),
            ("Pivotal Questions Introduction", "[Key PQs introduced for the workshop]"),
            ("Live Q&A & Discussion", ""),
        ]
    },
    "paper": {
        "id": "19ie0Q-S1MG-ZJOcPdrMdAdyH1Q5nn2T7EIPPTesfcLU",
        "title": "Segment 2: Research Presentation - Benjamin et al.",
        "time": "~11:30 AM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/paper.html",
        "speakers": "Dan Benjamin (UCLA/NBER), Miles Kimball (CU Boulder)",
        "sections": [
            ("Overview", "The research team presents their findings on scale-use heterogeneity in self-reported wellbeing."),
            ("Key Findings", ""),
            ("Calibration Methods", ""),
            ("Implications for WELLBY Measurement", ""),
            ("Questions for Authors", ""),
            ("Live Discussion", ""),
        ]
    },
    "evaluator": {
        "id": "1AVY_ZJvS2ZiCQApbP9DCsDp2FcbF4iCDN6F4-PEmC9U",
        "title": "Segment 3: Evaluator Responses & Discussion",
        "time": "~12:00 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/evaluator.html",
        "speakers": "Caspar Kaiser, David Reinstein, Valentin Klotzbücher",
        "sections": [
            ("Overview", "Independent evaluators share their assessment of the paper's methodology and findings."),
            ("Caspar Kaiser", ""),
            ("David Reinstein", ""),
            ("Valentin Klotzbücher", ""),
            ("Author Dialogue", ""),
            ("Open Discussion", ""),
        ]
    },
    "wellby": {
        "id": "18_b_2aDqnBMdsjwknOj1hiPUiBWUNVfkRv_s4sah5qo",
        "title": "Segment 4: WELLBY Reliability Discussion",
        "time": "~1:00 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/wellby.html",
        "speakers": "Open discussion (all participants)",
        "sections": [
            ("Focal Question", "Is the linear WELLBY reliable enough for cross-intervention comparison?"),
            ("Cardinality", "Does a move from 3→4 mean the same as 7→8?"),
            ("Neutral Point", "Where is the 'neutral point' on the satisfaction scale?"),
            ("Scale-Use Heterogeneity", "How much do people differ in how they use the scale?"),
            ("Discussion Notes", ""),
        ]
    },
    "daly": {
        "id": "1BYxs0mWScMCjj4vjw6e5RKkgZ7kmqwv-bBPi57PmGEU",
        "title": "Segment 5: DALY/QALY↔WELLBY Conversion",
        "time": "~1:30 PM ET | 25 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/daly.html",
        "speakers": "Discussion Lead: Julian Jamison (University of Exeter)",
        "sections": [
            ("Focal Question", "How should we translate between health measures (DALYs/QALYs) and subjective wellbeing (WELLBYs)?"),
            ("Current Approaches", "What conversion factors are currently used?"),
            ("Discussion Framework", ""),
            ("Conversion Factor Considerations", ""),
            ("Open Questions", ""),
        ]
    },
    "practitioner": {
        "id": "1KKGjRkv5ytNrPoVLhHMoWepdr9D--fCD0aTv0hfV8LU",
        "title": "Segment 7: Practitioner Panel & Open Discussion",
        "time": "~2:20 PM ET | 30 minutes",
        "workshop_page": f"{WORKSHOP_BASE_URL}/live/practitioner.html",
        "speakers": "Matt Lerner (Founders Pledge), Peter Hickman (Coefficient Giving)",
        "restricted": True,
        "sections": [
            ("Overview", "Practical implications for funders and researchers. This segment has restricted access for confidential discussions."),
            ("Current Practices", "How do organizations currently handle WELLBY-DALY comparisons?"),
            ("Matt Lerner (Founders Pledge)", ""),
            ("Peter Hickman (Coefficient Giving)", ""),
            ("Actionable Recommendations", "What should CEA practitioners do now?"),
            ("Confidential Notes", ""),
        ]
    },
}


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


def clear_and_format_doc(docs_service, doc_id: str, doc_config: Dict) -> None:
    """Clear document and add properly formatted content."""

    # Get current document to find end index
    doc = docs_service.documents().get(documentId=doc_id).execute()
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

    # Execute deletion first
    if requests:
        docs_service.documents().batchUpdate(
            documentId=doc_id,
            body={'requests': requests}
        ).execute()

    # Now build and insert new content
    requests = []
    current_index = 1

    # Build content parts
    content_parts = []

    # Title (Heading 1)
    content_parts.append({
        'text': doc_config['title'] + '\n',
        'style': 'HEADING_1'
    })

    # Time (italic)
    content_parts.append({
        'text': doc_config['time'] + '\n',
        'italic': True
    })

    # Speakers
    speaker_label = "Panelists" if doc_config.get('restricted') else "Speakers"
    content_parts.append({
        'text': f"{speaker_label}: {doc_config['speakers']}\n\n",
    })

    # Link back to workshop page
    content_parts.append({
        'text': '→ View on workshop site\n\n',
        'link': doc_config['workshop_page']
    })

    # Restricted notice if applicable
    if doc_config.get('restricted'):
        content_parts.append({
            'text': '⚠️ RESTRICTED ACCESS - This document is only accessible to named participants.\n\n',
            'bold': True
        })

    # Sections
    for section_title, section_content in doc_config['sections']:
        content_parts.append({
            'text': section_title + '\n',
            'style': 'HEADING_2'
        })
        if section_content:
            content_parts.append({
                'text': section_content + '\n\n',
            })
        else:
            content_parts.append({
                'text': '[Notes will be added during the workshop]\n\n',
                'italic': True
            })

    # Insert all text first
    full_text = ''.join(p['text'] for p in content_parts)
    requests.append({
        'insertText': {
            'location': {'index': 1},
            'text': full_text
        }
    })

    # Execute text insertion
    docs_service.documents().batchUpdate(
        documentId=doc_id,
        body={'requests': requests}
    ).execute()

    # Now apply formatting
    requests = []
    current_index = 1

    for part in content_parts:
        text = part['text']
        end_index = current_index + len(text)

        # Apply paragraph style (heading)
        style = part.get('style')
        if style and style.startswith('HEADING'):
            requests.append({
                'updateParagraphStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index,
                    },
                    'paragraphStyle': {
                        'namedStyleType': style
                    },
                    'fields': 'namedStyleType'
                }
            })

        # Apply text formatting
        if part.get('italic'):
            requests.append({
                'updateTextStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index - 1,  # Exclude trailing newline
                    },
                    'textStyle': {'italic': True},
                    'fields': 'italic'
                }
            })

        if part.get('bold'):
            requests.append({
                'updateTextStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index - 1,
                    },
                    'textStyle': {'bold': True},
                    'fields': 'bold'
                }
            })

        if part.get('link'):
            requests.append({
                'updateTextStyle': {
                    'range': {
                        'startIndex': current_index,
                        'endIndex': end_index - 1,
                    },
                    'textStyle': {
                        'link': {'url': part['link']}
                    },
                    'fields': 'link'
                }
            })

        current_index = end_index

    # Execute formatting
    if requests:
        docs_service.documents().batchUpdate(
            documentId=doc_id,
            body={'requests': requests}
        ).execute()


def main():
    """Main entry point."""
    creds = get_credentials()
    docs_service = build('docs', 'v1', credentials=creds)

    print("Fixing document formatting...")
    print("="*60)

    for name, config in DOCS.items():
        doc_id = config['id']
        print(f"\n{name}: {doc_id}")
        try:
            clear_and_format_doc(docs_service, doc_id, config)
            print(f"  ✓ Formatted successfully")
            print(f"  URL: https://docs.google.com/document/d/{doc_id}/edit")
        except Exception as e:
            print(f"  ✗ Error: {e}")

    print("\n" + "="*60)
    print("Document formatting complete!")
    print("\nNote: The Google Docs API doesn't yet support programmatic tab creation.")
    print("To consolidate into tabs, you would need to:")
    print("1. Create a new Google Doc manually")
    print("2. Add tabs for each segment")
    print("3. Copy content from each doc to the corresponding tab")
    print("\nAlternatively, you can continue using separate docs (current setup).")


if __name__ == '__main__':
    main()
