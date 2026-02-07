"""Bluesky client for searching posts and replying with evaluation links."""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from atproto import Client

if TYPE_CHECKING:
    from atproto_client.models.app.bsky.feed.defs import PostView

logger = logging.getLogger(__name__)


@dataclass
class BlueskyPost:
    """A post on Bluesky."""

    uri: str  # at://did:plc:xxx/app.bsky.feed.post/xxx
    cid: str
    author_handle: str
    author_did: str
    text: str
    created_at: datetime | None
    like_count: int
    reply_count: int
    repost_count: int
    url: str  # https://bsky.app/profile/handle/post/xxx

    @classmethod
    def from_post_view(cls, post: "PostView") -> "BlueskyPost":
        """Create from atproto PostView."""
        record = post.record
        created_at = None
        if hasattr(record, "created_at") and record.created_at:
            try:
                created_at = datetime.fromisoformat(
                    record.created_at.replace("Z", "+00:00")
                )
            except (ValueError, TypeError):
                pass

        # Extract post ID from URI for URL construction
        # URI format: at://did:plc:xxx/app.bsky.feed.post/POST_ID
        post_id = post.uri.split("/")[-1] if post.uri else ""
        url = f"https://bsky.app/profile/{post.author.handle}/post/{post_id}"

        return cls(
            uri=post.uri,
            cid=post.cid,
            author_handle=post.author.handle,
            author_did=post.author.did,
            text=record.text if hasattr(record, "text") else "",
            created_at=created_at,
            like_count=post.like_count or 0,
            reply_count=post.reply_count or 0,
            repost_count=post.repost_count or 0,
            url=url,
        )


@dataclass
class BlueskyConfig:
    """Configuration for Bluesky API."""

    handle: str  # e.g., "unjournal.bsky.social"
    app_password: str  # App password from Bluesky settings


class BlueskyClient:
    """Client for searching Bluesky and replying to posts."""

    def __init__(self, config: BlueskyConfig):
        self.config = config
        self._client = Client()
        self._logged_in = False

    def login(self) -> None:
        """Authenticate with Bluesky."""
        if self._logged_in:
            return
        self._client.login(self.config.handle, self.config.app_password)
        self._logged_in = True
        logger.info("Logged in to Bluesky as %s", self.config.handle)

    @property
    def my_did(self) -> str:
        """Get the DID of the logged-in user."""
        self.login()
        return self._client.me.did

    def search_posts(
        self,
        query: str,
        limit: int = 25,
        since: datetime | None = None,
        until: datetime | None = None,
    ) -> list[BlueskyPost]:
        """Search for posts matching a query.

        Args:
            query: Search query string
            limit: Maximum number of posts to return
            since: Only return posts after this time
            until: Only return posts before this time

        Returns:
            List of matching posts
        """
        self.login()

        params = {"q": query, "limit": min(limit, 100)}
        if since:
            params["since"] = since.isoformat()
        if until:
            params["until"] = until.isoformat()

        response = self._client.app.bsky.feed.search_posts(params)
        posts = []
        for post_view in response.posts:
            try:
                posts.append(BlueskyPost.from_post_view(post_view))
            except Exception:
                logger.warning("Failed to parse post", exc_info=True)
                continue

        return posts

    def get_post_replies(self, uri: str) -> list[BlueskyPost]:
        """Get replies to a post (to check for existing comments)."""
        self.login()

        # Get the thread
        response = self._client.app.bsky.feed.get_post_thread({"uri": uri, "depth": 1})

        replies = []
        thread = response.thread
        if hasattr(thread, "replies") and thread.replies:
            for reply in thread.replies:
                if hasattr(reply, "post"):
                    try:
                        replies.append(BlueskyPost.from_post_view(reply.post))
                    except Exception:
                        continue

        return replies

    def has_own_reply(self, uri: str) -> bool:
        """Check if we've already replied to a post."""
        replies = self.get_post_replies(uri)
        return any(r.author_did == self.my_did for r in replies)

    def post(self, text: str) -> tuple[str, str]:
        """Create a new post.

        Args:
            text: Post text (max 300 chars)

        Returns:
            (uri, cid) tuple of the new post
        """
        self.login()

        if len(text) > 300:
            raise ValueError(f"Post text too long ({len(text)} > 300 chars)")

        response = self._client.send_post(text=text)
        logger.info("Posted: %s", response.uri)
        return response.uri, response.cid

    def post_thread(self, posts: list[str]) -> list[str]:
        """Create a thread of multiple posts.

        Args:
            posts: List of post texts (each max 300 chars)

        Returns:
            List of URIs for all posts in thread
        """
        if not posts:
            return []

        self.login()
        uris = []

        # First post
        root_uri, root_cid = self.post(posts[0])
        uris.append(root_uri)

        # Subsequent posts as replies
        parent_uri, parent_cid = root_uri, root_cid
        for text in posts[1:]:
            if len(text) > 300:
                raise ValueError(f"Post text too long ({len(text)} > 300 chars)")

            response = self._client.send_post(
                text=text,
                reply_to={
                    "parent": {"uri": parent_uri, "cid": parent_cid},
                    "root": {"uri": root_uri, "cid": root_cid},
                },
            )
            uris.append(response.uri)
            parent_uri, parent_cid = response.uri, response.cid

        logger.info("Posted thread with %d posts", len(uris))
        return uris

    def reply_to_post(
        self,
        parent_uri: str,
        parent_cid: str,
        text: str,
        root_uri: str | None = None,
        root_cid: str | None = None,
    ) -> str:
        """Reply to a post.

        Args:
            parent_uri: URI of the post to reply to
            parent_cid: CID of the post to reply to
            text: Reply text (max 300 chars)
            root_uri: URI of thread root (defaults to parent)
            root_cid: CID of thread root (defaults to parent)

        Returns:
            URI of the new reply
        """
        self.login()

        if len(text) > 300:
            raise ValueError(f"Reply text too long ({len(text)} > 300 chars)")

        # For top-level replies, root = parent
        root_uri = root_uri or parent_uri
        root_cid = root_cid or parent_cid

        response = self._client.send_post(
            text=text,
            reply_to={
                "parent": {"uri": parent_uri, "cid": parent_cid},
                "root": {"uri": root_uri, "cid": root_cid},
            },
        )

        logger.info("Posted reply: %s", response.uri)
        return response.uri


def format_bluesky_reply(paper_title: str, eval_url: str) -> str:
    """Format a reply for Bluesky (max 300 chars).

    Args:
        paper_title: Title of the evaluated paper
        eval_url: URL to the evaluation

    Returns:
        Formatted reply text
    """
    # Template: ~60 chars + title + URL
    # URLs count as 23 chars on Bluesky regardless of actual length
    # So we have ~300 - 60 - 23 = ~217 chars for title

    max_title_len = 180
    if len(paper_title) > max_title_len:
        paper_title = paper_title[: max_title_len - 3] + "..."

    return (
        f'The Unjournal evaluated "{paper_title}" — '
        f"see our assessment: {eval_url}"
    )


# Dedup helpers (similar to EA Forum)

UNJOURNAL_HANDLES = frozenset({"unjournal.bsky.social", "unjournal.org"})


def already_replied(replies: list[BlueskyPost], eval_url: str) -> tuple[bool, str]:
    """Check if we've already replied about this evaluation.

    Args:
        replies: List of replies to check
        eval_url: The evaluation URL we'd be linking to

    Returns:
        (is_duplicate, reason) tuple
    """
    for reply in replies:
        # Rule 0: Reply by Unjournal account
        if reply.author_handle.lower() in UNJOURNAL_HANDLES:
            return True, f"existing reply by @{reply.author_handle}"

        # Rule 1: Reply contains unjournal.pubpub.org or the eval URL
        text_lower = reply.text.lower()
        if "unjournal.pubpub.org" in text_lower:
            return True, "existing reply links to unjournal.pubpub.org"
        if eval_url and eval_url.lower() in text_lower:
            return True, "existing reply contains eval URL"

        # Rule 2: Reply mentions "unjournal"
        if "unjournal" in text_lower:
            return True, "existing reply mentions Unjournal"

    return False, ""
