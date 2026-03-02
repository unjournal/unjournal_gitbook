"""Coda API client wrapper.

Wraps the existing CodaClient from coda_org_unjournal with additional
methods for document and page creation.
"""

from __future__ import annotations

import os
import sys
import logging
from typing import Optional, Dict, Any, List

# Add coda_org_unjournal to path for importing existing client
CODA_ORG_PATH = os.path.expanduser("~/githubs/coda_org_unjournal/code")
if CODA_ORG_PATH not in sys.path:
    sys.path.insert(0, CODA_ORG_PATH)

try:
    from coda_client import CodaClient, RateLimiter
except ImportError:
    # Fallback: define minimal client if import fails
    CodaClient = None
    RateLimiter = None

from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Coda API base URL
CODA_API_BASE = "https://coda.io/apis/v1"


class CodaClientWrapper:
    """Extended Coda client with document/page creation capabilities.

    Wraps the existing CodaClient from coda_org_unjournal and adds
    methods for creating documents and pages.
    """

    def __init__(self, api_key: Optional[str] = None):
        """Initialize Coda client.

        Args:
            api_key: Coda API key. If not provided, reads from CODA_API_KEY env var.
        """
        load_dotenv()
        self.api_key = api_key or os.environ.get("CODA_API_KEY")
        if not self.api_key:
            raise ValueError("CODA_API_KEY not found in environment")

        # Initialize underlying client if available
        if CodaClient:
            self._client = CodaClient(self.api_key)
            self._session = self._client._session
            self._rate_limiter = self._client.rate_limiter
        else:
            # Minimal fallback
            import requests
            self._session = requests.Session()
            self._session.headers.update({
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            })
            self._rate_limiter = None
            self._client = None

    def _wait_if_needed(self, is_write: bool = False):
        """Wait if rate limited."""
        if self._rate_limiter:
            self._rate_limiter.wait_if_needed(is_write)

    def create_document(
        self,
        title: str,
        folder_id: Optional[str] = None,
        source_doc: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a new Coda document.

        Args:
            title: Document title
            folder_id: Optional folder ID to place doc in
            source_doc: Optional source doc ID to copy from

        Returns:
            API response with document ID and URL
        """
        self._wait_if_needed(is_write=True)

        payload: Dict[str, Any] = {"title": title}
        if folder_id:
            payload["folderId"] = folder_id
        if source_doc:
            payload["sourceDoc"] = source_doc

        response = self._session.post(
            f"{CODA_API_BASE}/docs",
            json=payload
        )
        response.raise_for_status()
        result = response.json()
        logger.info(f"Created document: {result.get('name')} ({result.get('id')})")
        return result

    def get_document(self, doc_id: str) -> Dict[str, Any]:
        """Get document metadata."""
        response = self._session.get(f"{CODA_API_BASE}/docs/{doc_id}")
        response.raise_for_status()
        return response.json()

    def list_pages(self, doc_id: str) -> List[Dict[str, Any]]:
        """List all pages in a document."""
        response = self._session.get(f"{CODA_API_BASE}/docs/{doc_id}/pages")
        response.raise_for_status()
        return response.json().get("items", [])

    def create_page(
        self,
        doc_id: str,
        name: str,
        parent_page_id: Optional[str] = None,
        subtitle: Optional[str] = None,
        icon_name: Optional[str] = None,
        content_html: Optional[str] = None,
        max_retries: int = 3
    ) -> Dict[str, Any]:
        """Create a new page in a document.

        Args:
            doc_id: Document ID
            name: Page name
            parent_page_id: Optional parent page ID for nesting
            subtitle: Optional page subtitle
            icon_name: Optional icon (e.g., "document", "star")
            content_html: Optional initial HTML content
            max_retries: Number of retries for 409 conflicts

        Returns:
            API response with page ID
        """
        import time

        payload: Dict[str, Any] = {"name": name}
        if parent_page_id:
            payload["parentPageId"] = parent_page_id
        if subtitle:
            payload["subtitle"] = subtitle
        if icon_name:
            payload["iconName"] = icon_name
        if content_html:
            # Note: Coda API has limited content creation support
            payload["contentHtml"] = content_html

        for attempt in range(max_retries):
            self._wait_if_needed(is_write=True)

            response = self._session.post(
                f"{CODA_API_BASE}/docs/{doc_id}/pages",
                json=payload
            )

            if response.status_code == 409:
                # Conflict - document still processing, wait and retry
                wait_time = 2 ** attempt  # Exponential backoff: 1, 2, 4 seconds
                logger.warning(f"409 Conflict creating page '{name}', retrying in {wait_time}s...")
                time.sleep(wait_time)
                continue

            response.raise_for_status()
            result = response.json()
            logger.info(f"Created page: {name} ({result.get('id')})")
            return result

        # Final attempt - let it raise if it fails
        self._wait_if_needed(is_write=True)
        response = self._session.post(
            f"{CODA_API_BASE}/docs/{doc_id}/pages",
            json=payload
        )
        response.raise_for_status()
        result = response.json()
        logger.info(f"Created page: {name} ({result.get('id')})")
        return result

    def update_page(
        self,
        doc_id: str,
        page_id: str,
        name: Optional[str] = None,
        subtitle: Optional[str] = None,
        icon_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """Update an existing page."""
        self._wait_if_needed(is_write=True)

        payload: Dict[str, Any] = {}
        if name:
            payload["name"] = name
        if subtitle:
            payload["subtitle"] = subtitle
        if icon_name:
            payload["iconName"] = icon_name

        response = self._session.put(
            f"{CODA_API_BASE}/docs/{doc_id}/pages/{page_id}",
            json=payload
        )
        response.raise_for_status()
        return response.json()

    def create_table(
        self,
        doc_id: str,
        name: str,
        columns: List[Dict[str, Any]],
        parent_page_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a new table in a document.

        Args:
            doc_id: Document ID
            name: Table name
            columns: List of column definitions [{"name": "...", "type": "..."}]
            parent_page_id: Optional page to place table on

        Returns:
            API response with table ID
        """
        self._wait_if_needed(is_write=True)

        payload: Dict[str, Any] = {
            "name": name,
            "columns": columns
        }
        if parent_page_id:
            payload["parentPageId"] = parent_page_id

        response = self._session.post(
            f"{CODA_API_BASE}/docs/{doc_id}/tables",
            json=payload
        )
        response.raise_for_status()
        result = response.json()
        logger.info(f"Created table: {name} ({result.get('id')})")
        return result

    def list_tables(self, doc_id: str) -> List[Dict[str, Any]]:
        """List all tables in a document."""
        response = self._session.get(f"{CODA_API_BASE}/docs/{doc_id}/tables")
        response.raise_for_status()
        return response.json().get("items", [])

    def insert_rows(
        self,
        doc_id: str,
        table_id: str,
        rows: List[Dict[str, Any]],
        key_columns: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Insert rows into a table.

        Args:
            doc_id: Document ID
            table_id: Table ID
            rows: List of row data [{"cells": [{"column": "...", "value": "..."}]}]
            key_columns: Optional columns for upsert behavior

        Returns:
            API response
        """
        self._wait_if_needed(is_write=True)

        payload: Dict[str, Any] = {"rows": rows}
        if key_columns:
            payload["keyColumns"] = key_columns

        response = self._session.post(
            f"{CODA_API_BASE}/docs/{doc_id}/tables/{table_id}/rows",
            json=payload
        )
        response.raise_for_status()
        return response.json()

    def get_table_columns(self, doc_id: str, table_id: str) -> List[Dict[str, Any]]:
        """Get columns for a table."""
        response = self._session.get(
            f"{CODA_API_BASE}/docs/{doc_id}/tables/{table_id}/columns"
        )
        response.raise_for_status()
        return response.json().get("items", [])


def get_client(api_key: Optional[str] = None) -> CodaClientWrapper:
    """Get a configured Coda client instance.

    Args:
        api_key: Optional API key (reads from env if not provided)

    Returns:
        Configured CodaClientWrapper instance
    """
    return CodaClientWrapper(api_key)
