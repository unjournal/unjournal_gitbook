"""Workspace builder for creating Coda workshop structure.

Creates the full workspace with:
- Landing page
- Segment pages with comments tables
- Pivotal Questions section
- Cross-cutting views
"""

from __future__ import annotations

import logging
import time
from typing import Dict, Any, List, Optional

from ..config_loader import WorkshopConfig, Segment, PivotalQuestion
from .client import CodaClientWrapper
from .table_schemas import (
    get_comments_table_columns,
    get_pq_notes_table_columns,
    get_availability_table_columns,
    get_participants_table_columns,
)

logger = logging.getLogger(__name__)


class WorkspaceBuilder:
    """Builder for creating workshop Coda workspace."""

    def __init__(self, client: CodaClientWrapper, config: WorkshopConfig):
        """Initialize workspace builder.

        Args:
            client: Coda API client
            config: Workshop configuration
        """
        self.client = client
        self.config = config
        self.doc_id: Optional[str] = None
        self.page_ids: Dict[str, str] = {}
        self.table_ids: Dict[str, str] = {}
        self.tables_to_create: List[Dict[str, str]] = []  # Manual table instructions

    def create_workspace(self) -> Dict[str, Any]:
        """Create the full workshop workspace.

        Returns:
            Dict with doc_id, url, pages_created, tables_created
        """
        logger.info(f"Creating workspace for: {self.config.workshop.title}")

        # 1. Create document
        doc = self.client.create_document(
            title=self.config.workshop.title,
            folder_id=self.config.coda.folder_id
        )
        self.doc_id = doc["id"]
        doc_url = doc.get("browserLink", f"https://coda.io/d/{self.doc_id}")

        # Wait for doc to be ready (API timing)
        logger.info("Waiting for document to initialize...")
        time.sleep(2)

        # 2. Create landing page
        self._create_landing_page()

        # 3. Create segment pages with tables
        for segment in self.config.segments:
            self._create_segment_page(segment)

        # 4. Create PQ section
        self._create_pq_section()

        # 5. Create master comments table
        self._create_master_tables()

        return {
            "doc_id": self.doc_id,
            "url": doc_url,
            "pages_created": len(self.page_ids),
            "tables_to_create": self.tables_to_create,
        }

    def _create_landing_page(self):
        """Create the workshop landing/overview page."""
        # Create landing page directly (new docs may not have default pages)
        try:
            page = self.client.create_page(
                self.doc_id,
                name="Workshop Overview",
                subtitle=self.config.workshop.short_name or self.config.workshop.title,
                icon_name="home"
            )
            self.page_ids["landing"] = page["id"]
            logger.info(f"Created landing page: {page['id']}")
        except Exception as e:
            logger.warning(f"Could not create landing page: {e}")
            # Try to use existing page
            try:
                pages = self.client.list_pages(self.doc_id)
                if pages:
                    self.page_ids["landing"] = pages[0]["id"]
                    logger.info(f"Using existing page as landing: {pages[0]['id']}")
            except Exception:
                pass  # Continue without landing page ID

    def _create_segment_page(self, segment: Segment):
        """Create a page for a workshop segment.

        Args:
            segment: Segment configuration

        Note: Tables must be created manually in Coda GUI (API limitation)
        """
        # Create segment page
        page = self.client.create_page(
            self.doc_id,
            name=segment.title,
            subtitle=f"{segment.duration_min} min",
            icon_name="chat"
        )
        self.page_ids[f"segment_{segment.id}"] = page["id"]
        logger.info(f"Created segment page: {segment.title}")

        # Note: Coda API doesn't support programmatic table creation
        # Tables must be added manually in the GUI
        self.tables_to_create.append({
            "page": segment.title,
            "table_name": f"{segment.title} - Discussion",
            "columns": "Comment | Author | Type | Upvotes | Response | Addressed"
        })

    def _create_pq_section(self):
        """Create Pivotal Questions section with notes tables.

        Note: Coda API has issues with parent_page_id, so we create flat pages
        with prefixes. Hierarchy can be arranged manually in the GUI.
        """
        # Create PQ overview page
        pq_page = self.client.create_page(
            self.doc_id,
            name="Pivotal Questions",
            subtitle="Key questions driving workshop discussion",
            icon_name="star"
        )
        self.page_ids["pq_section"] = pq_page["id"]
        logger.info("Created PQ section page")

        # Collect PQs by category
        categories = {}
        for pq in self.config.pivotal_questions:
            if pq.category not in categories:
                categories[pq.category] = []
            categories[pq.category].append(pq)

        for category, pqs in categories.items():
            # Create category page (flat, not nested due to API limitations)
            cat_page = self.client.create_page(
                self.doc_id,
                name=f"PQ: {category}",
                subtitle=f"{len(pqs)} questions",
                icon_name="book"
            )
            self.page_ids[f"pq_cat_{category}"] = cat_page["id"]
            logger.info(f"Created PQ category page: {category} with {len(pqs)} questions")

            # Note: Tables must be created manually
            pq_codes = ", ".join([pq.code for pq in pqs])
            self.tables_to_create.append({
                "page": f"PQ: {category}",
                "table_name": f"{category} - Notes",
                "columns": f"PQ Code ({pq_codes}) | Note | Author | Type | Confidence | Source URL"
            })

    def _create_master_tables(self):
        """Document master tables to create manually."""
        # Note: Coda API doesn't support programmatic table creation
        # These must be created manually in the GUI

        self.tables_to_create.append({
            "page": "(Top level)",
            "table_name": "Participants",
            "columns": "Name | Affiliation | Role | Segments Interested | Confirmed",
            "note": "PUBLIC - shareable"
        })

        self.tables_to_create.append({
            "page": "(Top level - hide or restrict)",
            "table_name": "[PRIVATE] Availability Data",
            "columns": "Name | Email | Affiliation | Role | Grid Availability | Recording Pref | Async Interest",
            "note": "PRIVATE - organizers only, synced from Netlify"
        })

        logger.info("Documented master tables for manual creation")
