"""Table column schemas for Coda tables.

Defines the column structures for workshop tables.
"""

from __future__ import annotations

from typing import List, Dict, Any


def get_comments_table_columns(segment_ids: List[str]) -> List[Dict[str, Any]]:
    """Get column definitions for a comments/discussion table.

    Args:
        segment_ids: List of segment IDs for the Segment select column

    Returns:
        List of Coda column definitions
    """
    return [
        {
            "name": "Comment",
            "type": "text",
        },
        {
            "name": "Author",
            "type": "text",
        },
        {
            "name": "Segment",
            "type": "select",
            # Note: Coda API doesn't support select options directly
            # Options need to be set via GUI or first row insertion
        },
        {
            "name": "Type",
            "type": "select",
            # Options: Question, Comment, Evidence, Suggestion
        },
        {
            "name": "Upvotes",
            "type": "number",
        },
        {
            "name": "Timestamp",
            "type": "dateTime",
        },
        {
            "name": "Response",
            "type": "text",
        },
        {
            "name": "Addressed",
            "type": "checkbox",
        },
    ]


def get_pq_notes_table_columns(pq_codes: List[str]) -> List[Dict[str, Any]]:
    """Get column definitions for a PQ notes table.

    Args:
        pq_codes: List of PQ codes (e.g., ["WELL_01", "WELL_02"])

    Returns:
        List of Coda column definitions
    """
    return [
        {
            "name": "PQ Code",
            "type": "select",
            # Options will be pq_codes
        },
        {
            "name": "Note",
            "type": "text",
        },
        {
            "name": "Author",
            "type": "text",
        },
        {
            "name": "Type",
            "type": "select",
            # Options: Evidence, Objection, Support, Clarification, Question
        },
        {
            "name": "Confidence",
            "type": "scale",
            # Note: Scale type may need to be "number" with validation
        },
        {
            "name": "Source URL",
            "type": "text",
        },
        {
            "name": "Timestamp",
            "type": "dateTime",
        },
    ]


def get_availability_table_columns() -> List[Dict[str, Any]]:
    """Get column definitions for participant availability table.

    This table is populated from Netlify form submissions.

    Returns:
        List of Coda column definitions
    """
    return [
        {
            "name": "Name",
            "type": "text",
        },
        {
            "name": "Email",
            "type": "text",
        },
        {
            "name": "Affiliation",
            "type": "text",
        },
        {
            "name": "Role",
            "type": "select",
            # Options: Author, Evaluator, Stakeholder/Funder, Academic Researcher, etc.
        },
        {
            "name": "Grid Availability",
            "type": "text",
            # JSON string of selected time slots
        },
        {
            "name": "Free Availability",
            "type": "text",
        },
        {
            "name": "Segment Priorities",
            "type": "text",
        },
        {
            "name": "Recording Preference",
            "type": "select",
            # Options: full_public, public_except, internal_only, no_recording
        },
        {
            "name": "Async Interest",
            "type": "checkbox",
        },
        {
            "name": "Submitted At",
            "type": "dateTime",
        },
    ]


def get_participants_table_columns() -> List[Dict[str, Any]]:
    """Get column definitions for PUBLIC participants table.

    This table contains only non-sensitive info for sharing.

    Returns:
        List of Coda column definitions
    """
    return [
        {
            "name": "Name",
            "type": "text",
        },
        {
            "name": "Affiliation",
            "type": "text",
        },
        {
            "name": "Role",
            "type": "select",
            # Options: Author, Evaluator, Stakeholder/Funder, etc.
        },
        {
            "name": "Segments Interested",
            "type": "text",
        },
        {
            "name": "Confirmed",
            "type": "checkbox",
        },
    ]


def get_beliefs_table_columns() -> List[Dict[str, Any]]:
    """Get column definitions for beliefs elicitation table.

    Returns:
        List of Coda column definitions
    """
    return [
        {
            "name": "Respondent Name",
            "type": "text",
        },
        {
            "name": "Email",
            "type": "text",
        },
        {
            "name": "Affiliation",
            "type": "text",
        },
        {
            "name": "PQ1a: WELLBY Best Probability",
            "type": "number",
            # 0-100%
        },
        {
            "name": "PQ1a: Reasoning",
            "type": "text",
        },
        {
            "name": "PQ1b: Best Measure",
            "type": "text",
        },
        {
            "name": "PQ2a: DALY Conversion Factor",
            "type": "number",
        },
        {
            "name": "PQ2a: Lower Bound",
            "type": "number",
        },
        {
            "name": "PQ2a: Upper Bound",
            "type": "number",
        },
        {
            "name": "PQ2b: Conversion Method",
            "type": "text",
        },
        {
            "name": "PQ3a: Research Uptake %",
            "type": "number",
        },
        {
            "name": "PQ3b: Expert Consensus %",
            "type": "number",
        },
        {
            "name": "PQ3c: Calibration Impact %",
            "type": "number",
        },
        {
            "name": "Other Thoughts",
            "type": "text",
        },
        {
            "name": "Metaculus Username",
            "type": "text",
        },
        {
            "name": "Submitted At",
            "type": "dateTime",
        },
    ]
