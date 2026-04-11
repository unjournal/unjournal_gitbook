#!/usr/bin/env python3
"""
Create Google Docs for the Wellbeing Workshop discussion segments.

Run this script to create all 6 discussion docs with sharing enabled.
On first run, it will open a browser for OAuth authorization.

Usage:
    python -m src.gdocs.create_workshop_docs
"""

import json
from pathlib import Path
from .client import GoogleDocsClient

# Workshop document definitions
WORKSHOP_DOCS = [
    {
        'id': 'stakeholder',
        'title': 'Stakeholder Problem Statement - Live Notes',
        'template': '01-stakeholder-notes.md',
        'sharing': 'anyone_edit',
    },
    {
        'id': 'paper',
        'title': 'Paper Presentation: Benjamin et al. - Live Notes',
        'template': '02-paper-presentation-notes.md',
        'sharing': 'anyone_edit',
    },
    {
        'id': 'evaluator',
        'title': 'Evaluator Responses & Discussion - Live Notes',
        'template': '03-evaluator-notes.md',
        'sharing': 'anyone_edit',
    },
    {
        'id': 'wellby',
        'title': 'WELLBY Reliability Discussion - Live Notes',
        'template': '04-wellby-reliability-notes.md',
        'sharing': 'anyone_edit',
    },
    {
        'id': 'daly',
        'title': 'DALY/QALY↔WELLBY Conversion - Live Notes',
        'template': '05-daly-wellby-notes.md',
        'sharing': 'anyone_edit',
    },
    {
        'id': 'practitioner',
        'title': 'Practitioner Panel & Open Discussion - Live Notes',
        'template': '07-practitioner-panel-notes.md',
        'sharing': 'restricted',  # Confidential session
    },
]


def load_template(template_name: str) -> str:
    """Load content from a template file."""
    template_path = Path(__file__).parent.parent.parent / 'content' / 'gdocs' / template_name
    if template_path.exists():
        return template_path.read_text()
    return f"# {template_name}\n\nTemplate content not found."


def create_all_docs(output_file: str = 'workshop_docs.json'):
    """Create all workshop documents and save URLs to a JSON file."""
    client = GoogleDocsClient()

    print("=" * 60)
    print("Creating Wellbeing Workshop Discussion Documents")
    print("=" * 60)
    print()

    # Create a folder for all workshop docs
    print("Creating workshop folder...")
    folder = client.create_folder("Wellbeing Workshop - Live Notes")
    print(f"  Folder created: {folder['url']}")
    print()

    # Set folder sharing to anyone with link can edit
    client.set_sharing(folder['folderId'], role='writer', type='anyone')
    print("  Folder sharing set to: Anyone with link can edit")
    print()

    results = {
        'folder': folder,
        'documents': {}
    }

    # Create each document
    for doc_def in WORKSHOP_DOCS:
        print(f"Creating: {doc_def['title']}")

        # Load template content
        content = load_template(doc_def['template'])

        # Create the document
        doc_info = client.create_workshop_doc(
            title=doc_def['title'],
            content=content,
            sharing=doc_def['sharing'],
        )

        # Move to folder
        client.move_to_folder(doc_info['documentId'], folder['folderId'])

        # Store result
        results['documents'][doc_def['id']] = {
            'title': doc_def['title'],
            'documentId': doc_info['documentId'],
            'url': doc_info['documentUrl'],
            'embedUrl': doc_info['embedUrl'],
            'sharing': doc_def['sharing'],
        }

        sharing_note = "RESTRICTED" if doc_def['sharing'] == 'restricted' else "Anyone can edit"
        print(f"  ✓ Created ({sharing_note})")
        print(f"    URL: {doc_info['documentUrl']}")
        print()

    # Save results to JSON
    output_path = Path(__file__).parent.parent.parent / output_file
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)

    print("=" * 60)
    print(f"All documents created! URLs saved to: {output_path}")
    print("=" * 60)
    print()
    print("Embed URLs for /live/ pages:")
    print("-" * 40)
    for doc_id, doc in results['documents'].items():
        print(f"{doc_id}: {doc['embedUrl']}")

    return results


if __name__ == '__main__':
    create_all_docs()
