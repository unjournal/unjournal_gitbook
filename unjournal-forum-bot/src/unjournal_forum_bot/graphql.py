"""Low-level GraphQL request helper with auth and retry."""

from __future__ import annotations

import logging
from typing import Any

import httpx

logger = logging.getLogger(__name__)


class GraphQLError(Exception):
    pass


async def graphql_request(
    client: httpx.AsyncClient,
    endpoint: str,
    query: str,
    variables: dict | None = None,
    auth_token: str | None = None,
    operation_name: str | None = None,
) -> dict:
    headers = {"Content-Type": "application/json"}
    if auth_token:
        headers["Cookie"] = f"loginToken={auth_token}"

    payload: dict[str, Any] = {"query": query}
    if variables is not None:
        payload["variables"] = variables
    if operation_name is not None:
        payload["operationName"] = operation_name

    logger.debug("GraphQL request to %s", endpoint)

    response = await client.post(endpoint, json=payload, headers=headers)
    response.raise_for_status()

    result = response.json()

    if "errors" in result and result["errors"]:
        messages = [e.get("message", str(e)) for e in result["errors"]]
        raise GraphQLError(f"GraphQL errors: {'; '.join(messages)}")

    return result.get("data", {})
