"""Netlify Forms API integration.

Fetches form submissions from Netlify for syncing to Coda.
"""

from __future__ import annotations

import logging
from typing import List, Dict, Any, Optional

import httpx

logger = logging.getLogger(__name__)

NETLIFY_API_BASE = "https://api.netlify.com/api/v1"


class NetlifyFormsClient:
    """Client for Netlify Forms API."""

    def __init__(self, auth_token: str, site_id: str):
        """Initialize Netlify Forms client.

        Args:
            auth_token: Netlify personal access token
            site_id: Netlify site ID
        """
        self.auth_token = auth_token
        self.site_id = site_id
        self._client = httpx.Client(
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=30.0
        )

    def close(self):
        """Close the HTTP client."""
        self._client.close()

    def list_forms(self) -> List[Dict[str, Any]]:
        """List all forms for the site.

        Returns:
            List of form metadata dicts
        """
        resp = self._client.get(
            f"{NETLIFY_API_BASE}/sites/{self.site_id}/forms"
        )
        resp.raise_for_status()
        return resp.json()

    def get_form_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        """Get form metadata by name.

        Args:
            name: Form name to find

        Returns:
            Form metadata or None if not found
        """
        forms = self.list_forms()
        for form in forms:
            if form.get("name") == name:
                return form
        return None

    def get_form_submissions(
        self,
        form_id: str,
        page: int = 1,
        per_page: int = 100
    ) -> List[Dict[str, Any]]:
        """Fetch submissions for a form.

        Args:
            form_id: Netlify form ID
            page: Page number (1-indexed)
            per_page: Results per page (max 100)

        Returns:
            List of submission dicts
        """
        submissions = []
        current_page = page

        while True:
            resp = self._client.get(
                f"{NETLIFY_API_BASE}/forms/{form_id}/submissions",
                params={"page": current_page, "per_page": per_page}
            )
            resp.raise_for_status()
            batch = resp.json()

            if not batch:
                break

            submissions.extend(batch)
            logger.info(f"Fetched page {current_page}: {len(batch)} submissions")

            if len(batch) < per_page:
                break

            current_page += 1

        return submissions

    def get_all_submissions_for_form_name(
        self,
        form_name: str
    ) -> List[Dict[str, Any]]:
        """Fetch all submissions for a form by name.

        Args:
            form_name: Form name (e.g., "workshop-availability")

        Returns:
            List of submission dicts
        """
        form = self.get_form_by_name(form_name)
        if not form:
            logger.warning(f"Form not found: {form_name}")
            return []

        return self.get_form_submissions(form["id"])


def parse_availability_submission(submission: Dict[str, Any]) -> Dict[str, Any]:
    """Transform Netlify availability form data to Coda row format.

    Args:
        submission: Raw Netlify submission

    Returns:
        Dict ready for Coda insertion
    """
    data = submission.get("data", {})
    return {
        "Name": data.get("name"),
        "Email": data.get("email"),
        "Affiliation": data.get("affiliation"),
        "Role": data.get("role"),
        "Grid Availability": data.get("gridAvailability", ""),
        "Free Availability": data.get("freeAvailability", ""),
        "Segment Priorities": data.get("segmentPriorityOrder", ""),
        "Recording Preference": data.get("recordingPref"),
        "Async Interest": data.get("asyncDiscussion") == "yes",
        "Submitted At": submission.get("created_at"),
    }


def parse_beliefs_submission(submission: Dict[str, Any]) -> Dict[str, Any]:
    """Transform Netlify beliefs form data to Coda row format.

    Args:
        submission: Raw Netlify submission

    Returns:
        Dict ready for Coda insertion
    """
    data = submission.get("data", {})
    return {
        "Respondent Name": data.get("name"),
        "Email": data.get("email"),
        "Affiliation": data.get("affiliation"),
        "PQ1a: WELLBY Best Probability": _safe_float(data.get("pq1a_probability")),
        "PQ1a: Reasoning": data.get("pq1a_reasoning"),
        "PQ1b: Best Measure": data.get("pq1b_measure"),
        "PQ2a: DALY Conversion Factor": _safe_float(data.get("pq2a_factor")),
        "PQ2a: Lower Bound": _safe_float(data.get("pq2a_lower")),
        "PQ2a: Upper Bound": _safe_float(data.get("pq2a_upper")),
        "PQ2b: Conversion Method": data.get("pq2b_method"),
        "PQ3a: Research Uptake %": _safe_float(data.get("pq3a_uptake")),
        "PQ3b: Expert Consensus %": _safe_float(data.get("pq3b_consensus")),
        "PQ3c: Calibration Impact %": _safe_float(data.get("pq3c_impact")),
        "Other Thoughts": data.get("otherThoughts"),
        "Metaculus Username": data.get("metaculus"),
        "Submitted At": submission.get("created_at"),
    }


def _safe_float(value: Any) -> Optional[float]:
    """Safely convert a value to float."""
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None
