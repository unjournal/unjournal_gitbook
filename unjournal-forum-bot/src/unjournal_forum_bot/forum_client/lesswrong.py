"""LessWrong client stub. Not yet implemented (pending bot account)."""

from __future__ import annotations

from ..models import ForumPost


class LessWrongClient:
    """Stub for future LessWrong integration.

    Architecture is the same as EAForumClient (Algolia + GraphQL).
    Endpoint: https://www.lesswrong.com/graphql
    """

    @property
    def site_name(self) -> str:
        return "LessWrong"

    async def search_posts(self, query: str, hits_per_page: int = 20) -> list[ForumPost]:
        raise NotImplementedError("LessWrong client not yet implemented")

    async def get_post_comments_html(self, post_id: str) -> list[str]:
        raise NotImplementedError("LessWrong client not yet implemented")

    async def create_comment(self, post_id: str, html_body: str) -> str:
        raise NotImplementedError("LessWrong client not yet implemented")

    async def get_current_user(self) -> dict | None:
        raise NotImplementedError("LessWrong client not yet implemented")
