"""dlvr.it API integration for cross-posting to social media."""

from __future__ import annotations

import logging
from dataclasses import dataclass

import httpx

logger = logging.getLogger(__name__)

DLVRIT_API_BASE = "https://api.dlvrit.com/1"


@dataclass
class DlvritConfig:
    """Configuration for dlvr.it API."""

    api_key: str
    route_id: int | None = None  # Post to all accounts in this route
    account_id: int | None = None  # Or post to a specific account


class DlvritClient:
    """Client for dlvr.it social media posting API."""

    def __init__(self, config: DlvritConfig):
        self.config = config
        self._client = httpx.Client(timeout=30.0)

    def close(self) -> None:
        self._client.close()

    def list_routes(self) -> list[dict]:
        """List all routes and their IDs."""
        resp = self._client.post(
            f"{DLVRIT_API_BASE}/routes.json",
            data={"key": self.config.api_key},
        )
        resp.raise_for_status()
        return resp.json().get("routes", [])

    def list_accounts(self) -> list[dict]:
        """List all connected social accounts and their IDs."""
        resp = self._client.post(
            f"{DLVRIT_API_BASE}/accounts.json",
            data={"key": self.config.api_key},
        )
        resp.raise_for_status()
        return resp.json().get("accounts", [])

    def post_to_route(
        self,
        message: str,
        route_id: int | None = None,
        title: str | None = None,
    ) -> dict:
        """Post a message to all accounts in a route.

        Args:
            message: The message text (can include URLs)
            route_id: Route ID (uses config default if not provided)
            title: Optional title for platforms that support it

        Returns:
            API response dict with post details
        """
        rid = route_id or self.config.route_id
        if rid is None:
            raise ValueError("route_id must be provided or set in config")

        data = {
            "key": self.config.api_key,
            "id": rid,
            "msg": message,
        }
        if title:
            data["title"] = title

        resp = self._client.post(
            f"{DLVRIT_API_BASE}/postToRoute.json",
            data=data,
        )
        resp.raise_for_status()
        result = resp.json()
        logger.info("Posted to dlvr.it route %s: %s", rid, result)
        return result

    def post_to_account(
        self,
        message: str,
        account_id: int | None = None,
        title: str | None = None,
    ) -> dict:
        """Post a message to a specific account.

        Args:
            message: The message text
            account_id: Account ID (uses config default if not provided)
            title: Optional title

        Returns:
            API response dict
        """
        aid = account_id or self.config.account_id
        if aid is None:
            raise ValueError("account_id must be provided or set in config")

        data = {
            "key": self.config.api_key,
            "id": aid,
            "msg": message,
        }
        if title:
            data["title"] = title

        resp = self._client.post(
            f"{DLVRIT_API_BASE}/postToAccount.json",
            data=data,
        )
        resp.raise_for_status()
        result = resp.json()
        logger.info("Posted to dlvr.it account %s: %s", aid, result)
        return result


def format_evaluation_post(
    paper_title: str,
    eval_url: str,
    forum_post_url: str | None = None,
) -> str:
    """Format a social media post about an Unjournal evaluation.

    Args:
        paper_title: Title of the evaluated paper
        eval_url: URL to the evaluation summary
        forum_post_url: Optional URL to the EA Forum comment

    Returns:
        Formatted post text (within typical character limits)
    """
    # Keep it short for Twitter's 280 char limit
    # Bluesky has 300 chars, most others are longer

    # Truncate title if needed (leave room for URL + text)
    max_title_len = 150
    if len(paper_title) > max_title_len:
        paper_title = paper_title[:max_title_len - 3] + "..."

    if forum_post_url:
        return (
            f"📚 We commented on an EA Forum post about \"{paper_title}\"\n\n"
            f"Read our evaluation: {eval_url}"
        )
    else:
        return (
            f"📚 New Unjournal evaluation: \"{paper_title}\"\n\n"
            f"Read the full evaluation: {eval_url}"
        )
