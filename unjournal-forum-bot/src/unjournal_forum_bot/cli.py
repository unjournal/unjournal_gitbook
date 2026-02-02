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
@click.version_option(version="0.1.0")
def main() -> None:
    """Unjournal Forum Bot: find and comment on EA Forum posts about evaluated papers."""


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml",
              help="Path to config.toml")
@click.option("--dry-run/--no-dry-run", default=True,
              help="Dry run (default) or actually post comments")
@click.option("--paper", "paper_filter", default=None,
              help="Only process papers whose title contains this string")
@click.option("--limit", type=int, default=None,
              help="Max number of papers to process")
@click.option("--tfidf-threshold", type=float, default=None,
              help="Override TF-IDF similarity threshold for Type B matches")
@click.option("--verbose", is_flag=True, help="Enable debug logging")
def run(config_path: str, dry_run: bool, paper_filter: str | None,
        limit: int | None, tfidf_threshold: float | None, verbose: bool) -> None:
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

    if dry_run:
        click.echo("Running in DRY RUN mode (no comments will be posted)")
    else:
        click.echo("Running in LIVE mode — comments WILL be posted")
        click.confirm("Continue?", abort=True)

    from .runner import run_pipeline

    report = asyncio.run(run_pipeline(cfg, paper_filter, limit, tfidf_threshold))

    click.echo()
    click.echo(report.summary())

    # Print matches table
    if report.matches:
        click.echo()
        click.echo("=== Matches ===")
        for m in report.matches:
            tag = f"[{m.match_type}]"
            status = m.skip_reason or "POSTED"
            click.echo(f"  {tag} {m.post.title[:60]:<60}  score={m.score:.2f}  {status}")
            click.echo(f"       Post: {m.post.page_url}")
            click.echo(f"       Paper: {m.paper.title[:70]}")
            click.echo()


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml")
@click.argument("query")
@click.option("--verbose", is_flag=True)
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
            for p in posts:
                click.echo(f"  [{p.base_score:>3}] {p.title}")
                click.echo(f"       {p.page_url}")
                click.echo()
        except ConnectionError as exc:
            click.echo(f"Search failed: {exc}", err=True)
            raise SystemExit(1)
        finally:
            await client.close()

    asyncio.run(_search())


@main.command("list-papers")
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml")
@click.option("--all", "show_all", is_flag=True, help="Include papers without eval URLs")
def list_papers(config_path: str, show_all: bool) -> None:
    """List papers loaded from the CSV."""
    cfg = load_config(config_path)

    from .papers import load_papers

    papers = load_papers(cfg.csv_path, only_with_eval=not show_all)
    click.echo(f"Loaded {len(papers)} papers:")
    for i, p in enumerate(papers, 1):
        has_eval = "✓" if p.has_eval_url else "✗"
        click.echo(f"  {i:>3}. [{has_eval}] {p.title[:70]}")
        if p.eval_summary_url:
            click.echo(f"       Eval: {p.eval_summary_url}")


@main.command()
@click.option("--config", "config_path", type=click.Path(exists=True), default="config.toml")
@click.option("--verbose", is_flag=True)
def introspect(config_path: str, verbose: bool) -> None:
    """Introspect the EA Forum GraphQL schema for the comment mutation."""
    setup_logging(verbose)
    cfg = load_config(config_path)

    async def _introspect() -> None:
        from .forum_client.eaforum import EAForumClient

        client = EAForumClient(
            auth_token=cfg.eaforum.auth_token,
        )
        try:
            # Check auth
            user = await client.get_current_user()
            if user:
                click.echo(f"Authenticated as: {user.get('displayName')} (@{user.get('slug')})")
            else:
                click.echo("WARNING: Not authenticated (token may be invalid)", err=True)

            # Introspect mutation
            click.echo("\nCreateCommentDataInput fields:")
            schema = await client.introspect_comment_mutation()
            fields = schema.get("inputFields", [])
            for f in fields:
                type_info = f.get("type", {})
                type_name = type_info.get("name") or ""
                if not type_name and type_info.get("ofType"):
                    type_name = type_info["ofType"].get("name", "")
                kind = type_info.get("kind", "")
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
        click.echo(f"  [{mode}] {r.commented_at}  {r.paper_title[:50]}")
        click.echo(f"       Post: {r.post_url}")
        if r.comment_id:
            click.echo(f"       Comment ID: {r.comment_id}")
        click.echo()


if __name__ == "__main__":
    main()
