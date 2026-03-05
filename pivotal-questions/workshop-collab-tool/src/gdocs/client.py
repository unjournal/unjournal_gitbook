"""
Google Docs/Drive client for creating workshop discussion documents.

Uses OAuth2 for authentication. On first run, opens browser for authorization.
Token is cached for subsequent runs.
"""

import os
import json
from pathlib import Path
from typing import Optional, Dict, Any, List

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scopes required for creating and sharing documents
SCOPES = [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file',
]

DEFAULT_CREDENTIALS_PATH = Path.home() / '.config' / 'unjournal' / 'google_credentials.json'
DEFAULT_TOKEN_PATH = Path.home() / '.config' / 'unjournal' / 'google_token.json'


class GoogleDocsClient:
    """Client for creating and managing Google Docs."""

    def __init__(
        self,
        credentials_path: Optional[Path] = None,
        token_path: Optional[Path] = None,
    ):
        """
        Initialize the Google Docs client.

        Args:
            credentials_path: Path to OAuth credentials JSON file.
            token_path: Path to store/load cached token.
        """
        self.credentials_path = credentials_path or DEFAULT_CREDENTIALS_PATH
        self.token_path = token_path or DEFAULT_TOKEN_PATH
        self._docs_service = None
        self._drive_service = None
        self._creds = None

    def _get_credentials(self) -> Credentials:
        """Get or refresh OAuth credentials."""
        if self._creds and self._creds.valid:
            return self._creds

        # Try to load cached token
        if self.token_path.exists():
            self._creds = Credentials.from_authorized_user_file(
                str(self.token_path), SCOPES
            )

        # Refresh if expired
        if self._creds and self._creds.expired and self._creds.refresh_token:
            self._creds.refresh(Request())
        elif not self._creds or not self._creds.valid:
            # Run OAuth flow
            if not self.credentials_path.exists():
                raise FileNotFoundError(
                    f"Credentials file not found: {self.credentials_path}\n"
                    "Download OAuth credentials from Google Cloud Console."
                )

            flow = InstalledAppFlow.from_client_secrets_file(
                str(self.credentials_path), SCOPES
            )
            self._creds = flow.run_local_server(port=0)

        # Cache the token
        self.token_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.token_path, 'w') as f:
            f.write(self._creds.to_json())

        return self._creds

    @property
    def docs_service(self):
        """Get Google Docs API service."""
        if not self._docs_service:
            creds = self._get_credentials()
            self._docs_service = build('docs', 'v1', credentials=creds)
        return self._docs_service

    @property
    def drive_service(self):
        """Get Google Drive API service."""
        if not self._drive_service:
            creds = self._get_credentials()
            self._drive_service = build('drive', 'v3', credentials=creds)
        return self._drive_service

    def create_document(self, title: str, content: Optional[str] = None) -> Dict[str, Any]:
        """
        Create a new Google Doc.

        Args:
            title: Document title.
            content: Optional plain text content to insert.

        Returns:
            Dict with document info including 'documentId' and 'documentUrl'.
        """
        # Create the document
        doc = self.docs_service.documents().create(body={'title': title}).execute()
        doc_id = doc['documentId']

        # Insert content if provided
        if content:
            requests = [
                {
                    'insertText': {
                        'location': {'index': 1},
                        'text': content
                    }
                }
            ]
            self.docs_service.documents().batchUpdate(
                documentId=doc_id,
                body={'requests': requests}
            ).execute()

        return {
            'documentId': doc_id,
            'title': title,
            'documentUrl': f'https://docs.google.com/document/d/{doc_id}/edit',
            'embedUrl': f'https://docs.google.com/document/d/{doc_id}/edit?embedded=true',
        }

    def set_sharing(
        self,
        document_id: str,
        role: str = 'writer',
        type: str = 'anyone',
    ) -> Dict[str, Any]:
        """
        Set sharing permissions on a document.

        Args:
            document_id: The document ID.
            role: 'reader', 'commenter', or 'writer'.
            type: 'anyone', 'user', 'group', or 'domain'.

        Returns:
            Permission info from Drive API.
        """
        permission = {
            'type': type,
            'role': role,
        }

        result = self.drive_service.permissions().create(
            fileId=document_id,
            body=permission,
            fields='id,type,role',
        ).execute()

        return result

    def create_workshop_doc(
        self,
        title: str,
        content: str,
        sharing: str = 'anyone_edit',
    ) -> Dict[str, Any]:
        """
        Create a workshop document with sharing enabled.

        Args:
            title: Document title.
            content: Document content (plain text or markdown).
            sharing: 'anyone_edit', 'anyone_comment', 'anyone_view', or 'restricted'.

        Returns:
            Dict with document info and URLs.
        """
        # Create the document
        doc_info = self.create_document(title, content)

        # Set sharing based on mode
        if sharing != 'restricted':
            role_map = {
                'anyone_edit': 'writer',
                'anyone_comment': 'commenter',
                'anyone_view': 'reader',
            }
            role = role_map.get(sharing, 'writer')
            self.set_sharing(doc_info['documentId'], role=role, type='anyone')
            doc_info['sharing'] = sharing

        return doc_info

    def create_folder(self, name: str, parent_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Create a folder in Google Drive.

        Args:
            name: Folder name.
            parent_id: Optional parent folder ID.

        Returns:
            Dict with folder info.
        """
        file_metadata = {
            'name': name,
            'mimeType': 'application/vnd.google-apps.folder'
        }
        if parent_id:
            file_metadata['parents'] = [parent_id]

        folder = self.drive_service.files().create(
            body=file_metadata,
            fields='id, name, webViewLink'
        ).execute()

        return {
            'folderId': folder['id'],
            'name': folder['name'],
            'url': folder.get('webViewLink', f"https://drive.google.com/drive/folders/{folder['id']}"),
        }

    def move_to_folder(self, file_id: str, folder_id: str) -> None:
        """Move a file/document to a folder."""
        # Get current parents
        file = self.drive_service.files().get(
            fileId=file_id,
            fields='parents'
        ).execute()
        previous_parents = ",".join(file.get('parents', []))

        # Move to new folder
        self.drive_service.files().update(
            fileId=file_id,
            addParents=folder_id,
            removeParents=previous_parents,
            fields='id, parents'
        ).execute()
