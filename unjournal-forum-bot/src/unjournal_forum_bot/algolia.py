"""Search client for EA Forum / LessWrong post search.

The EA Forum proxies Algolia searches through its own /api/search endpoint
(a NativeSearchClient), so we don't need to hit Algolia DNS directly.
This avoids DNS resolution issues with Algolia's per-app-id subdomains.
"""

from __future__ import annotations

import logging

import httpx

logger = logging.getLogger(__name__)

EAFORUM_SEARCH_URL = "https://forum.effectivealtruism.org/api/search"


async def search_posts(
    client: httpx.AsyncClient,
    index_name: str,
    query: str,
    hits_per_page: int = 20,
    search_url: str = EAFORUM_SEARCH_URL,
) -> list[dict]:
    body = [
        {
            "indexName": index_name,
            "params": {
                "query": query,
                "hitsPerPage": hits_per_page,
            },
        }
    ]

    logger.debug("Search: url=%s index=%s query=%s", search_url, index_name, query[:80])

    try:
        response = await client.post(
            search_url,
            json=body,
            headers={"Content-Type": "application/json"},
            timeout=15.0,
        )
        response.raise_for_status()
        results = response.json()

        if isinstance(results, list) and results:
            hits = results[0].get("hits", [])
        else:
            hits = []

        logger.debug("Search returned %d hits", len(hits))
        return hits

    except (httpx.ConnectError, httpx.TimeoutException) as exc:
        raise ConnectionError(
            f"Could not reach search API at {search_url}: {exc}"
        ) from exc
    except httpx.HTTPStatusError as exc:
        raise ConnectionError(
            f"Search API returned {exc.response.status_code}: "
            f"{exc.response.text[:200]}"
        ) from exc
