"""CLI entry point for the Unjournal Forum Bot."""

from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

import click

from .config import load_config
from .logging_setup import setup_logging


@click.group()
@click.version_option("0.1.0")
def main() -> None:
    """Unjournal Forum Bot: find and comment on EA Forum posts about evaluated papers."""


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--dry-run/--no-dry-run", default=True, help="Dry run (default) or actually post comments")
@click.option("--paper", "paper_filter", default=None, help="Only process papers whose title contains this string")
@click.option("--limit", type=int, default=None, help="Max number of papers to process")
@click.option("--tfidf-threshold", type=float, default=None, help="Override TF-IDF similarity threshold for Type B matches")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def run(config_path: str, dry_run: bool, paper_filter: str | None, limit: int | None, tfidf_threshold: float | None, verbose: bool) -> None:
    """Run the scan-match-comment pipeline."""
    setup_logging(verbose)

    cfg = load_config(config_path)
    cfg.dry_run = dry_run

    errors = cfg.validate()
    if errors:
        click.echo("Configuration errors:", err=True)
        for e in errors:
            click.echo(f"  - {e}", err=True)
        sys.exit(1)

    if cfg.dry_run:
        click.echo("Running in DRY RUN mode (no comments will be posted)")
    else:
        click.echo("Running in LIVE mode \u2014 comments WILL be posted")
        click.confirm("Continue?", abort=True)

    from .runner import run_pipeline

    report = asyncio.run(run_pipeline(cfg, paper_filter=paper_filter, limit=limit, tfidf_threshold=tfidf_threshold))

    click.echo(report.summary())

    click.echo("=== Matches ===")
    for m in report.matches:
        tag = f"[{m.match_type}]"
        status = m.skip_reason or "POSTED"
        click.echo(f"  {tag} {status}")
        age = ""
        if m.post.posted_at:
            age_days = (
                __import__("datetime").datetime.now(__import__("datetime").timezone.utc)
                - m.post.posted_at
            ).days
            if age_days < 60:
                age = f"<60"
            else:
                age = str(age_days)
        click.echo(f"  score={m.score:.2f} {age}")
        click.echo(f"       Post: {m.post.title[:70]}")
        click.echo(f"       Paper: {m.paper.title[:70]}")


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.argument("query")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def search(config_path: str, query: str, verbose: bool) -> None:
    """Search EA Forum via Algolia (for debugging)."""
    setup_logging(verbose)
    cfg = load_config(config_path)

    async def _search() -> None:
        from .forum_client.eaforum import EAForumClient

        client = EAForumClient(
            auth_token=cfg.eaforum.auth_token,
            posts_index=cfg.eaforum.posts_index,
        )
        try:
            posts = await client.search_posts(query, hits_per_page=10)
            if not posts:
                click.echo("No results found.")
                return
            for p in posts:
                click.echo(f"  [{p.base_score:>3}] {p.title}")
                click.echo(f"       {p.page_url}")
        except (ConnectionError, SystemExit) as exc:
            click.echo(f"Search failed: {exc}", err=True)
        finally:
            await client.close()

    asyncio.run(_search())


@main.command("list-papers")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--all", "show_all", is_flag=True, help="Include papers without eval URLs")
def list_papers(config_path: str, show_all: bool) -> None:
    """List papers loaded from the CSV."""
    cfg = load_config(config_path)

    from .papers import load_papers

    papers = load_papers(cfg.csv_path, only_with_eval=not show_all)
    click.echo(f"Loaded {len(papers)} papers:")
    for i, p in enumerate(papers, 1):
        has_eval = "\u2713" if p.has_eval_url else "\u2717"
        click.echo(f"  {i:>3}. [{has_eval}] {p.title[:70]}")
        if p.eval_summary_url:
            click.echo(f"       Eval: {p.eval_summary_url}")


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def introspect(config_path: str, verbose: bool) -> None:
    """Introspect the EA Forum GraphQL schema for the comment mutation."""
    setup_logging(verbose)
    cfg = load_config(config_path)

    async def _introspect() -> None:
        from .forum_client.eaforum import EAForumClient

        client = EAForumClient(auth_token=cfg.eaforum.auth_token)
        try:
            user = await client.get_current_user()
            if user:
                click.echo(f"Authenticated as: {user.get('displayName')} (@{user.get('slug')})")
            else:
                click.echo("WARNING: Not authenticated (token may be invalid)", err=True)

            click.echo("\nCreateCommentDataInput fields:")
            schema = await client.introspect_comment_mutation()
            fields = schema.get("inputFields", [])
            for f in fields:
                type_info = f.get("type", {})
                type_name = type_info.get("name", "")
                kind = type_info.get("kind", "")
                if not type_name and type_info.get("ofType"):
                    type_name = type_info["ofType"].get("name", "")
                    kind = type_info["ofType"].get("kind", "")
                click.echo(f"  {f['name']}: {type_name} ({kind})")
        finally:
            await client.close()

    asyncio.run(_introspect())


@main.command()
def history() -> None:
    """Show comment history from local state."""
    from .state import StateStore

    state = StateStore()
    records = state.get_history()
    if not records:
        click.echo("No comment history found.")
        return

    click.echo(f"Total records: {len(records)}")
    for r in records:
        mode = "DRY" if r.dry_run else "LIVE"
        click.echo(f"  [{mode}] {r.commented_at}")
        click.echo(f"  {r.paper_title[:50]}")
        click.echo(f"       Post: {r.post_url}")
        if r.comment_id:
            click.echo(f"       Comment ID: {r.comment_id}")


# === Bluesky Commands ===


@main.group()
def bluesky() -> None:
    """Bluesky integration commands."""


@bluesky.command("run")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--dry-run/--no-dry-run", default=True, help="Dry run (default) or actually post replies")
@click.option("--paper", "paper_filter", default=None, help="Only process papers whose title contains this string")
@click.option("--limit", type=int, default=None, help="Max number of papers to process")
@click.option("--min-engagement", type=int, default=5, help="Min likes+reposts+replies for a post")
@click.option("--since-days", type=int, default=90, help="Search posts from last N days")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def bluesky_run(
    config_path: str,
    dry_run: bool,
    paper_filter: str | None,
    limit: int | None,
    min_engagement: int,
    since_days: int,
    verbose: bool,
) -> None:
    """Search Bluesky for posts about evaluated papers and reply."""
    setup_logging(verbose)

    cfg = load_config(config_path)
    cfg.dry_run = dry_run

    if not cfg.bluesky.handle or not cfg.bluesky.app_password:
        click.echo("Error: bluesky.handle and bluesky.app_password required in config.toml", err=True)
        sys.exit(1)

    if cfg.dry_run:
        click.echo("Running in DRY RUN mode (no replies will be posted)")
    else:
        click.echo("Running in LIVE mode \u2014 replies WILL be posted to Bluesky")
        click.confirm("Continue?", abort=True)

    from .bluesky_runner import run_bluesky_pipeline

    report = run_bluesky_pipeline(
        cfg,
        paper_filter=paper_filter,
        limit=limit,
        min_engagement=min_engagement,
        since_days=since_days,
    )

    click.echo(report.summary())

    if report.matches:
        click.echo("\n=== Matches ===")
        for m in report.matches:
            status = m.skip_reason or "OK"
            click.echo(f"  [{m.score:.2f}] {status}")
            click.echo(f"       Post: @{m.post.author_handle}: {m.post.text[:60]}...")
            click.echo(f"       URL: {m.post.url}")
            click.echo(f"       Paper: {m.paper.title[:60]}")


@bluesky.command("search")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.argument("query")
@click.option("--limit", type=int, default=25, help="Max results")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def bluesky_search(config_path: str, query: str, limit: int, verbose: bool) -> None:
    """Search Bluesky posts (for debugging)."""
    setup_logging(verbose)
    cfg = load_config(config_path)

    if not cfg.bluesky.handle or not cfg.bluesky.app_password:
        click.echo("Error: bluesky.handle and bluesky.app_password required", err=True)
        sys.exit(1)

    from .social.bluesky import BlueskyClient, BlueskyConfig

    bsky_config = BlueskyConfig(
        handle=cfg.bluesky.handle,
        app_password=cfg.bluesky.app_password,
    )
    client = BlueskyClient(bsky_config)

    try:
        posts = client.search_posts(query, limit=limit)
        if not posts:
            click.echo("No results found.")
            return

        click.echo(f"Found {len(posts)} posts:")
        for p in posts:
            engagement = p.like_count + p.repost_count + p.reply_count
            click.echo(f"  [{engagement:>3}] @{p.author_handle}")
            click.echo(f"       {p.text[:80]}...")
            click.echo(f"       {p.url}")
    except Exception as e:
        click.echo(f"Search failed: {e}", err=True)
        sys.exit(1)


@bluesky.command("test-auth")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
def bluesky_test_auth(config_path: str) -> None:
    """Test Bluesky authentication."""
    cfg = load_config(config_path)

    if not cfg.bluesky.handle or not cfg.bluesky.app_password:
        click.echo("Error: bluesky.handle and bluesky.app_password required", err=True)
        sys.exit(1)

    from .social.bluesky import BlueskyClient, BlueskyConfig

    bsky_config = BlueskyConfig(
        handle=cfg.bluesky.handle,
        app_password=cfg.bluesky.app_password,
    )

    try:
        client = BlueskyClient(bsky_config)
        client.login()
        click.echo(f"Authenticated as: {client.my_did}")
        click.echo(f"Handle: {cfg.bluesky.handle}")
    except Exception as e:
        click.echo(f"Authentication failed: {e}", err=True)
        sys.exit(1)


@bluesky.command("post")
@click.argument("message")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
def bluesky_post(message: str, config_path: str) -> None:
    """Post a single message to Bluesky (max 300 chars)."""
    cfg = load_config(config_path)

    if not cfg.bluesky.handle or not cfg.bluesky.app_password:
        click.echo("Error: bluesky.handle and bluesky.app_password required", err=True)
        sys.exit(1)

    from .social.bluesky import BlueskyClient, BlueskyConfig

    bsky_config = BlueskyConfig(
        handle=cfg.bluesky.handle,
        app_password=cfg.bluesky.app_password,
    )

    try:
        client = BlueskyClient(bsky_config)
        uri, cid = client.post(message)
        # Convert URI to URL
        post_id = uri.split("/")[-1]
        url = f"https://bsky.app/profile/{cfg.bluesky.handle}/post/{post_id}"
        click.echo(f"Posted! {url}")
    except Exception as e:
        click.echo(f"Error: {e}", err=True)
        sys.exit(1)


@bluesky.command("thread")
@click.argument("posts_file", type=click.Path(exists=True))
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--dry-run/--no-dry-run", default=True, help="Preview thread without posting")
def bluesky_thread(posts_file: str, config_path: str, dry_run: bool) -> None:
    """Post a thread from a file (one post per paragraph, separated by blank lines)."""
    cfg = load_config(config_path)

    if not cfg.bluesky.handle or not cfg.bluesky.app_password:
        click.echo("Error: bluesky.handle and bluesky.app_password required", err=True)
        sys.exit(1)

    # Parse posts from file (paragraphs separated by blank lines)
    with open(posts_file) as f:
        content = f.read()

    posts = [p.strip() for p in content.split("\n\n") if p.strip()]

    if not posts:
        click.echo("No posts found in file")
        return

    click.echo(f"Thread with {len(posts)} posts:")
    for i, post in enumerate(posts, 1):
        char_count = len(post)
        status = "OK" if char_count <= 300 else f"TOO LONG ({char_count}/300)"
        click.echo(f"\n[{i}] ({char_count} chars) {status}")
        click.echo(f"  {post[:100]}{'...' if len(post) > 100 else ''}")

    # Check for too-long posts
    too_long = [i for i, p in enumerate(posts, 1) if len(p) > 300]
    if too_long:
        click.echo(f"\nError: Posts {too_long} exceed 300 char limit", err=True)
        sys.exit(1)

    if dry_run:
        click.echo("\n[DRY RUN] Would post thread")
        return

    from .social.bluesky import BlueskyClient, BlueskyConfig

    bsky_config = BlueskyConfig(
        handle=cfg.bluesky.handle,
        app_password=cfg.bluesky.app_password,
    )

    try:
        client = BlueskyClient(bsky_config)
        uris = client.post_thread(posts)
        post_id = uris[0].split("/")[-1]
        url = f"https://bsky.app/profile/{cfg.bluesky.handle}/post/{post_id}"
        click.echo(f"\nPosted thread! {url}")
    except Exception as e:
        click.echo(f"Error: {e}", err=True)
        sys.exit(1)


# === dlvr.it Commands ===


@main.group()
def dlvrit() -> None:
    """dlvr.it integration for broadcasting to social media."""


@dlvrit.command("list")
@click.option("--api-key", envvar="DLVRIT_API_KEY", required=True, help="dlvr.it API key (or set DLVRIT_API_KEY env var)")
def dlvrit_list(api_key: str) -> None:
    """List your dlvr.it routes and accounts."""
    from .social.dlvrit import DlvritClient, DlvritConfig

    config = DlvritConfig(api_key=api_key)
    client = DlvritClient(config)

    try:
        click.echo("=== Routes ===")
        routes = client.list_routes()
        if not routes:
            click.echo("  (no routes found)")
        for r in routes:
            click.echo(f"  ID: {r.get('id'):>6}  Name: {r.get('name', 'unnamed')}")

        click.echo("\n=== Accounts ===")
        accounts = client.list_accounts()
        if not accounts:
            click.echo("  (no accounts found)")
        for a in accounts:
            click.echo(
                f"  ID: {a.get('id'):>6}  "
                f"Service: {a.get('service', '?'):>10}  "
                f"URL: {a.get('url', '')}"
            )
    finally:
        client.close()


@dlvrit.command("post")
@click.option("--api-key", envvar="DLVRIT_API_KEY", required=True, help="dlvr.it API key")
@click.option("--route-id", type=int, required=True, help="Route ID to post to")
@click.option("--paper", "paper_title", required=True, help="Paper title")
@click.option("--eval-url", required=True, help="Evaluation URL")
@click.option("--forum-url", default=None, help="Optional EA Forum comment URL")
@click.option("--dry-run/--no-dry-run", default=True, help="Show message without posting")
def dlvrit_post(
    api_key: str,
    route_id: int,
    paper_title: str,
    eval_url: str,
    forum_url: str | None,
    dry_run: bool,
) -> None:
    """Post an evaluation announcement to a dlvr.it route."""
    from .social.dlvrit import DlvritClient, DlvritConfig, format_evaluation_post

    message = format_evaluation_post(paper_title, eval_url, forum_url)
    click.echo(f"Message ({len(message)} chars):\n{message}\n")

    if dry_run:
        click.echo("[DRY RUN] Would post to route {route_id}")
        return

    config = DlvritConfig(api_key=api_key, route_id=route_id)
    client = DlvritClient(config)

    try:
        result = client.post_to_route(message, route_id=route_id)
        click.echo(f"Posted! Response: {result}")
    finally:
        client.close()


@dlvrit.command("send")
@click.argument("message")
@click.option("--api-key", envvar="DLVRIT_API_KEY", required=True, help="dlvr.it API key")
@click.option("--route-id", type=int, default=2626032, help="Route ID (default: 2626032)")
@click.option("--account-id", type=int, default=None, help="Post to single account instead of route")
def dlvrit_send(message: str, api_key: str, route_id: int, account_id: int | None) -> None:
    """Send a message to your social accounts.

    Examples:
      forum-bot dlvrit send "Check out our new evaluation!"
      forum-bot dlvrit send "Bluesky only" --account-id 2648141
    """
    from .social.dlvrit import DlvritClient, DlvritConfig

    config = DlvritConfig(api_key=api_key, route_id=route_id, account_id=account_id)
    client = DlvritClient(config)

    try:
        if account_id:
            click.echo(f"Posting to account {account_id}: {message[:50]}...")
            result = client.post_to_account(message, account_id=account_id)
        else:
            click.echo(f"Posting to route {route_id}: {message[:50]}...")
            result = client.post_to_route(message, route_id=route_id)
        click.echo(f"Posted! {result}")
    except Exception as e:
        click.echo(f"Error: {e}", err=True)
    finally:
        client.close()


@dlvrit.command("bluesky")
@click.argument("message")
@click.option("--api-key", envvar="DLVRIT_API_KEY", required=True, help="dlvr.it API key")
def dlvrit_bluesky(message: str, api_key: str) -> None:
    """Post to Bluesky only.

    Example: forum-bot dlvrit bluesky "Hello Bluesky!"
    """
    from .social.dlvrit import DlvritClient, DlvritConfig

    BLUESKY_ACCOUNT_ID = 2648141
    click.echo(f"Posting to Bluesky: {message[:50]}...")

    config = DlvritConfig(api_key=api_key, account_id=BLUESKY_ACCOUNT_ID)
    client = DlvritClient(config)

    try:
        result = client.post_to_account(message, account_id=BLUESKY_ACCOUNT_ID)
        click.echo(f"Posted! {result}")
    except Exception as e:
        click.echo(f"Error: {e}", err=True)
    finally:
        client.close()


@dlvrit.command("broadcast")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml", help="Path to config.toml")
@click.option("--api-key", envvar="DLVRIT_API_KEY", required=True, help="dlvr.it API key")
@click.option("--route-id", type=int, required=True, help="Route ID to post to")
@click.option("--paper", "paper_filter", default=None, help="Filter papers by title")
@click.option("--limit", type=int, default=None, help="Max papers to announce")
@click.option("--dry-run/--no-dry-run", default=True, help="Show messages without posting")
def dlvrit_broadcast(
    config_path: str,
    api_key: str,
    route_id: int,
    paper_filter: str | None,
    limit: int | None,
    dry_run: bool,
) -> None:
    """Broadcast evaluation announcements for papers from CSV."""
    from .papers import load_papers
    from .social.dlvrit import DlvritClient, DlvritConfig, format_evaluation_post

    cfg = load_config(config_path)
    papers = load_papers(cfg.csv_path, only_with_eval=True)

    if paper_filter:
        papers = [p for p in papers if paper_filter.lower() in p.title.lower()]
    if limit:
        papers = papers[:limit]

    click.echo(f"Found {len(papers)} papers with eval URLs")

    if not papers:
        return

    config = DlvritConfig(api_key=api_key, route_id=route_id)
    client = DlvritClient(config)

    try:
        for i, paper in enumerate(papers, 1):
            message = format_evaluation_post(paper.title, paper.eval_link)
            click.echo(f"\n[{i}/{len(papers)}] {paper.title[:60]}...")
            click.echo(f"  Message: {message[:80]}...")

            if dry_run:
                click.echo("  [DRY RUN] Would post")
            else:
                try:
                    result = client.post_to_route(message, route_id=route_id)
                    click.echo(f"  Posted: {result}")
                except Exception as e:
                    click.echo(f"  Error: {e}", err=True)
    finally:
        client.close()


if __name__ == "__main__":
    main()
