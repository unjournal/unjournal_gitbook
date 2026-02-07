"""Abstract forum client protocol."""

from __future__ import annotations

from typing import Protocol

from ..models import ForumPost


class ForumClient(Protocol):
    """Protocol that EA Forum and LessWrong clients must implement."""

    @property
    def site_name(self) -> str:
        """Human-readable site name (e.g. 'EA Forum')."""
        ...

    async def search_posts(self, query: str, hits_per_page: int = 20) -> list[ForumPost]:
        """Search for posts matching the query string."""
        ...

    async def get_post_comments_html(self, post_id: str) -> list[str]:
        """Return HTML bodies of all comments on a post."""
        ...

    async def create_comment(self, post_id: str, html_body: str) -> str:
        """Post a comment on a post. Returns the new comment ID."""
        ...

    async def get_current_user(self) -> dict | None:
        """Return info about the authenticated user, or None if not authed."""
        ...
