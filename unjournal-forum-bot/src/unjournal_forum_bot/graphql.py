"""Low-level GraphQL request helper with auth and retry."""

from __future__ import annotations

import logging
from typing import Any

import httpx

logger = logging.getLogger(__name__)


class GraphQLError(Exception):
    """Raised when the GraphQL response contains errors."""

    def __init__(self, errors: list[dict], data: Any = None):
        self.errors = errors
        self.data = data
        messages = "; ".join(e.get("message", str(e)) for e in errors)
        super().__init__(f"GraphQL errors: {messages}")


async def graphql_request(
    client: httpx.AsyncClient,
    endpoint: str,
    query: str,
    variables: dict | None = None,
    auth_token: str | None = None,
    operation_name: str | None = None,
) -> dict:
    """Send a GraphQL request and return the response data.

    Auth is via loginToken cookie (ForumMagnum's auth mechanism).
    """
    headers: dict[str, str] = {"Content-Type": "application/json"}
    cookies: dict[str, str] = {}

    if auth_token:
        cookies["loginToken"] = auth_token

    payload: dict[str, Any] = {"query": query}
    if variables:
        payload["variables"] = variables
    if operation_name:
        payload["operationName"] = operation_name

    logger.debug("GraphQL request to %s: %s", endpoint, operation_name or query[:80])

    response = await client.post(
        endpoint,
        json=payload,
        headers=headers,
        cookies=cookies,
    )
    response.raise_for_status()

    result = response.json()

    if "errors" in result and result["errors"]:
        raise GraphQLError(result["errors"], result.get("data"))

    return result.get("data", {})
