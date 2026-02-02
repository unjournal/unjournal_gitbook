"""EA Forum client: search + GraphQL queries and mutations."""

from __future__ import annotations

import logging
from datetime import datetime, timezone

import httpx

from .. import algolia as search_client
from ..graphql import graphql_request
from ..models import ForumPost
from ..rate_limiter import RateLimiter

logger = logging.getLogger(__name__)

# EA Forum redirects python-httpx/requests user agents to the bots endpoint.
# Use it directly to avoid a redirect hop.
GRAPHQL_ENDPOINT = "https://forum.effectivealtruism.org/graphql"
GRAPHQL_ENDPOINT_BOTS = "https://forum-bots.effectivealtruism.org/graphql"

# EA Forum search proxy (wraps Algolia server-side)
SEARCH_API_URL = "https://forum.effectivealtruism.org/api/search"

# ── GraphQL queries ──────────────────────────────────────────────────────────

QUERY_POST = """
query GetPost($id: String!) {
  post(input: { selector: { _id: $id } }) {
    result {
      _id
      title
      slug
      pageUrl
      postedAt
      baseScore
      voteCount
      commentCount
      contents {
        plaintextDescription
      }
    }
  }
}
"""

QUERY_POST_COMMENTS = """
query GetPostComments($postId: String!) {
  comments(input: {
    terms: {
      postId: $postId
      view: "postCommentsTop"
      limit: 500
    }
  }) {
    results {
      _id
      contents {
        html
      }
      user {
        slug
      }
    }
  }
}
"""

MUTATION_CREATE_COMMENT = """
mutation CreateComment($data: CreateCommentDataInput!) {
  createComment(data: $data) {
    data {
      _id
      pageUrl
    }
  }
}
"""

QUERY_CURRENT_USER = """
query GetCurrentUser {
  currentUser {
    _id
    displayName
    slug
  }
}
"""

# ── Introspection query (for setup/debugging) ────────────────────────────────

INTROSPECT_CREATE_COMMENT_INPUT = """
{
  __type(name: "CreateCommentDataInput") {
    inputFields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}
"""


# ── Client class ─────────────────────────────────────────────────────────────


class EAForumClient:
    """Client for the EA Forum (search API + GraphQL)."""

    def __init__(
        self,
        auth_token: str,
        posts_index: str = "test_posts",
        search_url: str = SEARCH_API_URL,
        rate_limiter: RateLimiter | None = None,
        http_client: httpx.AsyncClient | None = None,
    ):
        self.auth_token = auth_token
        self.posts_index = posts_index
        self.search_url = search_url
        self.rate_limiter = rate_limiter or RateLimiter()
        # Use the bots endpoint directly to avoid redirect for httpx user agent
        self._graphql_endpoint = GRAPHQL_ENDPOINT_BOTS
        self._client = http_client or httpx.AsyncClient(
            timeout=30.0, follow_redirects=True
        )
        self._owns_client = http_client is None

    @property
    def site_name(self) -> str:
        return "EA Forum"

    async def close(self) -> None:
        if self._owns_client:
            await self._client.aclose()

    # ── Search ───────────────────────────────────────────────────────────

    async def search_posts(self, query: str, hits_per_page: int = 20) -> list[ForumPost]:
        """Search EA Forum via the search API, then fetch full post data via GraphQL."""
        await self.rate_limiter.acquire()

        hits = await search_client.search_posts(
            self._client,
            self.posts_index,
            query,
            hits_per_page=hits_per_page,
            search_url=self.search_url,
        )

        posts: list[ForumPost] = []
        for hit in hits:
            object_id = hit.get("objectID", "")
            if not object_id:
                continue

            # Fetch full post details via GraphQL
            try:
                await self.rate_limiter.acquire()
                post = await self._fetch_post(object_id)
                if post:
                    posts.append(post)
            except Exception:
                logger.warning("Failed to fetch post %s, skipping", object_id, exc_info=True)

        return posts

    async def _fetch_post(self, post_id: str) -> ForumPost | None:
        """Fetch a single post by ID via GraphQL."""
        data = await graphql_request(
            self._client,
            self._graphql_endpoint,
            QUERY_POST,
            variables={"id": post_id},
            auth_token=self.auth_token,
        )

        result = data.get("post", {}).get("result")
        if not result:
            return None

        posted_at = None
        if result.get("postedAt"):
            try:
                posted_at = datetime.fromisoformat(
                    result["postedAt"].replace("Z", "+00:00")
                )
            except (ValueError, TypeError):
                pass

        plaintext = ""
        if result.get("contents") and result["contents"].get("plaintextDescription"):
            plaintext = result["contents"]["plaintextDescription"]

        return ForumPost(
            id=result["_id"],
            title=result.get("title", ""),
            slug=result.get("slug", ""),
            page_url=result.get("pageUrl", ""),
            posted_at=posted_at,
            base_score=result.get("baseScore", 0),
            comment_count=result.get("commentCount", 0),
            plaintext_body=plaintext,
        )

    # ── Comments ─────────────────────────────────────────────────────────

    async def get_post_comments_html(self, post_id: str) -> list[str]:
        """Get HTML bodies of all comments on a post."""
        await self.rate_limiter.acquire()

        data = await graphql_request(
            self._client,
            self._graphql_endpoint,
            QUERY_POST_COMMENTS,
            variables={"postId": post_id},
            auth_token=self.auth_token,
        )

        results = data.get("comments", {}).get("results", [])
        htmls: list[str] = []
        for comment in results:
            contents = comment.get("contents")
            if contents and contents.get("html"):
                htmls.append(contents["html"])
        return htmls

    async def create_comment(self, post_id: str, html_body: str) -> str:
        """Post a comment on a post. Returns the new comment's ID."""
        await self.rate_limiter.acquire()

        variables = {
            "data": {
                "postId": post_id,
                "contents": {
                    "originalContents": {
                        "type": "html",
                        "data": html_body,
                    }
                },
            }
        }

        data = await graphql_request(
            self._client,
            self._graphql_endpoint,
            MUTATION_CREATE_COMMENT,
            variables=variables,
            auth_token=self.auth_token,
            operation_name="CreateComment",
        )

        comment_data = data.get("createComment", {}).get("data", {})
        comment_id = comment_data.get("_id", "")
        page_url = comment_data.get("pageUrl", "")
        logger.info("Created comment %s at %s", comment_id, page_url)
        return comment_id

    # ── Auth check ───────────────────────────────────────────────────────

    async def get_current_user(self) -> dict | None:
        """Check if auth token is valid by querying the current user."""
        try:
            data = await graphql_request(
                self._client,
                self._graphql_endpoint,
                QUERY_CURRENT_USER,
                auth_token=self.auth_token,
            )
            return data.get("currentUser")
        except Exception:
            logger.warning("Auth check failed", exc_info=True)
            return None

    # ── Schema introspection (for setup) ─────────────────────────────────

    async def introspect_comment_mutation(self) -> dict:
        """Introspect the CreateCommentDataInput type to verify mutation shape."""
        data = await graphql_request(
            self._client,
            self._graphql_endpoint,
            INTROSPECT_CREATE_COMMENT_INPUT,
            auth_token=self.auth_token,
        )
        return data.get("__type", {})
