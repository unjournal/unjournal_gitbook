# Workshop Collaborative Space Tool

CLI tool for scaffolding Coda workspaces for Unjournal Pivotal Questions workshops.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env
# Edit .env with your CODA_API_KEY and NETLIFY_AUTH_TOKEN

# Preview what would be created (dry run)
python -m src.cli scaffold --config configs/wellbeing-workshop.yaml --dry-run

# Create the workspace
python -m src.cli scaffold --config configs/wellbeing-workshop.yaml

# List Netlify form submissions
python -m src.cli list-forms --config configs/wellbeing-workshop.yaml

# Sync form data to Coda
python -m src.cli sync-forms --config configs/wellbeing-workshop.yaml
```

## Commands

| Command | Description |
|---------|-------------|
| `scaffold` | Create Coda workspace with pages and tables |
| `sync-forms` | Pull Netlify form submissions to Coda |
| `list-forms` | List Netlify forms and submission counts |
| `export-beliefs` | Generate beliefs summary report (TBD) |

## Configuration

Workshop configs are YAML files in `configs/`. See `configs/wellbeing-workshop.yaml` for the full schema.

Key sections:
- `workshop`: Metadata (title, date, description)
- `segments`: Workshop agenda segments
- `pivotal_questions`: PQ codes and formulations
- `coda`: Coda workspace settings
- `netlify`: Form site and IDs

## What Gets Created

The `scaffold` command creates:

1. **Landing page** - Workshop overview with description and schedule
2. **Segment pages** (7) - One per agenda segment, each with:
   - Discussion table (Comment, Author, Type, Upvotes, Response)
3. **Pivotal Questions section** - Grouped by category:
   - WELLBY Reliability (7 questions)
   - DALY-WELLBY Conversion (4 questions)
   - Notes table per category
4. **Availability table** - For syncing Netlify form data

## Manual Steps After Scaffold

The Coda API has limitations requiring some manual configuration:

1. **Page layouts** - Arrange embedded tables, add headers
2. **Form views** - Create form views for anonymous submissions
3. **Permissions** - Share doc with participants
4. **Embed links** - Add Google Doc links, Zoom meeting link
5. **Visual polish** - Cover image, icons, column widths

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CODA_API_KEY` | Yes | Coda API token from Settings > API |
| `NETLIFY_AUTH_TOKEN` | For sync | Netlify personal access token |

## Directory Structure

```
workshop-collab-tool/
├── configs/
│   └── wellbeing-workshop.yaml
├── src/
│   ├── cli.py              # Click CLI
│   ├── config_loader.py    # Pydantic config
│   ├── coda/
│   │   ├── client.py       # Coda API wrapper
│   │   ├── workspace_builder.py
│   │   └── table_schemas.py
│   └── integrations/
│       └── netlify_forms.py
├── requirements.txt
└── .env.example
```

## Creating New Workshop Configs

1. Copy `configs/wellbeing-workshop.yaml`
2. Update workshop metadata, segments, and PQs
3. Run `scaffold --dry-run` to preview
4. Run `scaffold` to create

## Dependencies

- Python 3.10+
- click, pydantic, pyyaml, httpx, pandas
- Existing `coda_org_unjournal` client (auto-imported)
