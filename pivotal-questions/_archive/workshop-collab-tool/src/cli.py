"""CLI for Workshop Collaborative Space Tool.

Usage:
    python -m src.cli scaffold --config configs/wellbeing-workshop.yaml
    python -m src.cli scaffold --config configs/wellbeing-workshop.yaml --dry-run
    python -m src.cli sync-forms --config configs/wellbeing-workshop.yaml
"""

from __future__ import annotations

import logging
from pathlib import Path

import click

from .config_loader import load_config, WorkshopConfig

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@click.group()
@click.option("--verbose", "-v", is_flag=True, help="Enable verbose output")
def cli(verbose: bool):
    """Workshop Collaborative Space Tool.

    Scaffold Coda workspaces for Unjournal PQ workshops.
    """
    if verbose:
        logging.getLogger().setLevel(logging.DEBUG)


@cli.command()
@click.option(
    "--config", "-c",
    required=True,
    type=click.Path(exists=True, path_type=Path),
    help="Path to workshop YAML config"
)
@click.option(
    "--dry-run",
    is_flag=True,
    help="Show what would be created without making changes"
)
def scaffold(config: Path, dry_run: bool):
    """Scaffold a new Coda workspace for a workshop.

    Creates:
    - Landing page with workshop overview
    - Segment pages with comments tables
    - Pivotal Questions section with notes tables
    - Cross-cutting views
    """
    cfg = load_config(config)

    click.echo(f"\n{'='*60}")
    click.echo(f"Workshop: {cfg.workshop.title}")
    click.echo(f"{'='*60}")
    click.echo(f"  Segments: {len(cfg.segments)}")
    for s in cfg.segments:
        click.echo(f"    - {s.title} ({s.duration_min} min)")
    click.echo(f"  Pivotal Questions: {len(cfg.pivotal_questions)}")
    for pq in cfg.pivotal_questions:
        click.echo(f"    - {pq.code}: {pq.question[:50]}...")
    click.echo()

    if dry_run:
        click.echo("[DRY RUN] Would create Coda workspace with:")
        click.echo(f"  - 1 landing page")
        click.echo(f"  - {len(cfg.segments)} segment pages with comments tables")
        click.echo(f"  - 1 PQ section with {len(cfg.pivotal_questions)} questions")
        click.echo(f"  - 2 cross-cutting views (All Questions, All PQ Notes)")
        click.echo("\nRun without --dry-run to create workspace.")
        return

    # Import here to avoid loading Coda client unless needed
    from .coda.workspace_builder import WorkspaceBuilder
    from .coda.client import get_client

    try:
        client = get_client()
    except ValueError as e:
        click.echo(f"Error: {e}", err=True)
        click.echo("Set CODA_API_KEY environment variable or add to .env", err=True)
        raise click.Abort()

    builder = WorkspaceBuilder(client, cfg)

    click.echo("Creating Coda workspace...")
    result = builder.create_workspace()

    click.echo(f"\n{'='*60}")
    click.echo("Workspace created successfully!")
    click.echo(f"{'='*60}")
    click.echo(f"  Document ID: {result['doc_id']}")
    click.echo(f"  URL: {result['url']}")
    click.echo(f"  Pages created: {result['pages_created']}")
    click.echo()

    # Display tables that need manual creation
    tables_to_create = result.get('tables_to_create', [])
    if tables_to_create:
        click.echo(f"\n{'='*60}")
        click.echo("TABLES TO CREATE MANUALLY")
        click.echo(f"{'='*60}")
        click.echo("(Coda API doesn't support table creation - create in GUI)")
        click.echo()
        for i, table in enumerate(tables_to_create, 1):
            click.echo(f"{i}. Page: {table['page']}")
            click.echo(f"   Table: {table['table_name']}")
            click.echo(f"   Columns: {table['columns']}")
            if 'note' in table:
                click.echo(f"   Note: {table['note']}")
            click.echo()

    click.echo(f"{'='*60}")
    click.echo("OTHER MANUAL STEPS")
    click.echo(f"{'='*60}")
    click.echo("  1. Create the tables listed above in Coda GUI")
    click.echo("  2. Arrange page layouts and add headers")
    click.echo("  3. Create form views for anonymous submissions")
    click.echo("  4. Set sharing permissions")
    click.echo("  5. Add embed links (Google Docs, Zoom)")


@cli.command("sync-forms")
@click.option(
    "--config", "-c",
    required=True,
    type=click.Path(exists=True, path_type=Path),
    help="Path to workshop YAML config"
)
@click.option(
    "--form",
    type=click.Choice(["availability", "beliefs", "all"]),
    default="all",
    help="Which form to sync"
)
def sync_forms(config: Path, form: str):
    """Sync Netlify form submissions to Coda.

    Fetches submissions from Netlify Forms API and upserts
    to the appropriate Coda table.
    """
    cfg = load_config(config)

    if not cfg.netlify:
        click.echo("Error: No Netlify config in workshop config", err=True)
        raise click.Abort()

    from .integrations.netlify_forms import NetlifyFormsClient
    import os
    from dotenv import load_dotenv

    load_dotenv()
    netlify_token = os.environ.get("NETLIFY_AUTH_TOKEN")
    if not netlify_token:
        click.echo("Error: NETLIFY_AUTH_TOKEN not set", err=True)
        raise click.Abort()

    client = NetlifyFormsClient(netlify_token, cfg.netlify.site_id)

    forms_to_sync = []
    if form == "all":
        forms_to_sync = cfg.netlify.forms
    else:
        for f in cfg.netlify.forms:
            if form in f.name:
                forms_to_sync.append(f)

    if not forms_to_sync:
        click.echo(f"No forms matching '{form}' found in config", err=True)
        raise click.Abort()

    for form_config in forms_to_sync:
        click.echo(f"\nSyncing form: {form_config.name}")

        try:
            submissions = client.get_form_submissions(form_config.form_id)
            click.echo(f"  Found {len(submissions)} submissions")

            # TODO: Upsert to Coda table
            click.echo("  [Not yet implemented: Coda upsert]")

        except Exception as e:
            click.echo(f"  Error: {e}", err=True)


@cli.command("export-beliefs")
@click.option(
    "--config", "-c",
    required=True,
    type=click.Path(exists=True, path_type=Path),
    help="Path to workshop YAML config"
)
@click.option(
    "--output", "-o",
    type=click.Path(path_type=Path),
    default=Path("beliefs_summary.md"),
    help="Output file path"
)
def export_beliefs(config: Path, output: Path):
    """Export beliefs summary report.

    Generates a markdown report summarizing beliefs elicitation
    responses from Netlify forms.
    """
    cfg = load_config(config)

    click.echo(f"Exporting beliefs summary for: {cfg.workshop.title}")
    click.echo(f"Output: {output}")

    # TODO: Implement beliefs export
    click.echo("[Not yet implemented]")


@cli.command("list-forms")
@click.option(
    "--config", "-c",
    required=True,
    type=click.Path(exists=True, path_type=Path),
    help="Path to workshop YAML config"
)
def list_forms(config: Path):
    """List Netlify forms for the workshop site."""
    cfg = load_config(config)

    if not cfg.netlify:
        click.echo("Error: No Netlify config", err=True)
        raise click.Abort()

    from .integrations.netlify_forms import NetlifyFormsClient
    import os
    from dotenv import load_dotenv

    load_dotenv()
    netlify_token = os.environ.get("NETLIFY_AUTH_TOKEN")
    if not netlify_token:
        click.echo("Error: NETLIFY_AUTH_TOKEN not set", err=True)
        raise click.Abort()

    client = NetlifyFormsClient(netlify_token, cfg.netlify.site_id)

    click.echo(f"\nForms for site: {cfg.netlify.site_id}")
    click.echo("-" * 40)

    forms = client.list_forms()
    for f in forms:
        click.echo(f"  {f['name']}: {f['id']} ({f.get('submission_count', 0)} submissions)")


def main():
    """Entry point for CLI."""
    cli()


if __name__ == "__main__":
    main()
