# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Directory Overview

This `pivotal-questions/` directory contains workshop sites and tooling for The Unjournal's Pivotal Questions initiative — a process for identifying high-value-of-information research questions and commissioning expert evaluations.

## Workshop Sites

Four static sites deployed to Netlify (all under `daaronr` nonprofit account):

| Workshop | Directory | URL | Site ID |
|----------|-----------|-----|---------|
| Wellbeing | `wellbeing-workshop/` | `uj-wellbeing-workshop.netlify.app` | `37a0205b-5cee-42c2-9388-fe0c17b5e5c6` |
| Cultivated Meat | `cm-workshop/` | `uj-cm-workshop.netlify.app` | `7c6efdd4-f6db-4b13-8355-0bb5b64d0e6e` |
| Plant-Based | `pba-workshop/` | `uj-pba-workshop.netlify.app` | `b065c5c3-a6c8-4261-8dac-13d17383ceaa` |
| Landing | `workshops-landing/` | `uj-pq-workshops.netlify.app` | `9abc4eb7-bc5c-4bfd-83c2-2fbcf1b8cfe9` |

## Deployment

Deploy any workshop site from its directory:
```bash
cd wellbeing-workshop
npx netlify-cli deploy --prod --dir=. --site 37a0205b-5cee-42c2-9388-fe0c17b5e5c6
```

Check/switch Netlify account:
```bash
npx netlify-cli status
npx netlify-cli logout && npx netlify-cli login  # switch accounts
```

## Workshop Site Structure

Each workshop follows the same pattern:

```
<workshop>/
├── index.html       # Home/about page (or schedule form for wellbeing)
├── schedule.html    # Availability grid (cm/pba only; wellbeing uses index.html)
├── beliefs.html     # PQ beliefs elicitation form
├── thanks.html      # Post-schedule submission
├── beliefs-thanks.html
├── styles.css
├── app.js           # Form interactivity, availability grid
└── beliefs.js       # Beliefs form logic
```

Wellbeing workshop has additional `live/` subdirectory with session pages for the workshop day.

### Form Configuration

All forms use Netlify Forms (`data-netlify="true"`). Form names:
- `workshop-availability` / `cm-workshop-availability` / `pba-workshop-availability`
- `beliefs-elicitation` / `cm-beliefs-elicitation` / `pba-beliefs-elicitation`

View submissions at: `https://app.netlify.com/sites/<site-name>/forms`

### Design Tokens

Consistent across all workshops:
```css
--bg: #f8f6f1;
--sage: #5a7a5a;
--brown: #8b5e3c;
```
Fonts: Source Serif 4 (headings), DM Sans (body)

## Workshop Collab Tool

Python CLI for managing Coda workspaces (`workshop-collab-tool/`):

```bash
cd workshop-collab-tool
pip install -r requirements.txt
cp .env.example .env  # add CODA_API_KEY, NETLIFY_AUTH_TOKEN

# Commands
python -m src.cli scaffold --config configs/wellbeing-workshop.yaml --dry-run
python -m src.cli list-forms --config configs/wellbeing-workshop.yaml
python -m src.cli sync-forms --config configs/wellbeing-workshop.yaml
```

Requires Python 3.10+. Environment variables: `CODA_API_KEY`, `NETLIFY_AUTH_TOKEN`.

## Creating New Workshops

1. Copy an existing workshop directory (pba-workshop is most generic)
2. Create new Netlify site: `npx netlify-cli sites:create --name uj-<topic>-workshop`
3. Update form names in HTML (must be unique across account)
4. Create config YAML in `workshop-collab-tool/configs/`
5. Add draft banner if preliminary

## Key Files Outside This Directory

- **Root CLAUDE.md**: Contains participant constraints, form IDs, and workshop-specific operational details
- **Private tracking**: `/Users/yosemite/unjournal-private/workshop-tracking/wellbeing-workshop-feedback.md`
- **Netlify token**: Root `.env` contains `NETLIFY_AUTH_TOKEN`
