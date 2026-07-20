# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **LOCAL DIRECTORY NOTE**: This directory (`unjournal-gitbook-knowledge-comms`) is the **canonical working copy** of the `unjournal/unjournal_gitbook` GitHub repo. There is a stale duplicate at `~/githubs/_STALE_unjournal_gitbook/` — do NOT use that one. It can be safely deleted once you confirm no scripts depend on it.

## Repository Overview

This is The Unjournal's public knowledge base and communications repository. The Unjournal provides open, rigorous evaluation of quantitative research informing global priorities, especially in economics, policy, and social science.

The repository contains:
- **GitBook content**: Markdown files organized by topic (policies, benefits, FAQ, grants, etc.)
- **Landing pages** (`landing-pages/`): Static HTML pages hosted on `info.unjournal.org`
- **Interactive docs** (`docs/`): Mermaid diagram gallery, Reveal.js presentations, and interactive process diagrams

Internal operations, deployment scripts, and automation tools are in the private [ops-internal](https://github.com/unjournal/ops-internal) repo.

## GitBook GitHub Sync — Publishing Workflow

GitBook is connected to this repo (`unjournal/unjournal_gitbook`, `main` branch) via Git Sync, which runs **bidirectionally and automatically** after initial setup. Verified 2026-07-20: a `git push` to `main` goes live on the public GitBook (`globalimpact.gitbook.io/...`) within a few minutes, with **no manual merge step**. (An earlier note here claimed pushes arrived as pending changes needing a manual merge in the GitBook editor — that is outdated.)

**After pushing:** just wait a minute or two, then verify the live page updated. The space's GitHub Sync panel ("Synced" button in the editor header) shows sync history; it can lag behind the actual live content, so check the public URL itself when in doubt.

**Before pushing:** always `git pull --rebase origin main` first (add `--autostash` if the tree is dirty) — GitBook writes commits back to GitHub when anyone edits in the GitBook UI, so the remote moves without local action.

**Danger — do not touch the "Next sync" direction toggle** in the space's Edit Git Sync configuration dialog (gear icon in the GitHub Sync panel). That setting ("Which side should be used as the source of truth for the next sync?") forces a full one-shot resync in which one side **replaces** the other. Saving with "GitHub → GitBook" would overwrite any GitBook-side edits not yet synced back; the current "GitBook → GitHub" would overwrite unsynced GitHub commits. It is not needed for normal publishing — sync is already automatic both ways.

Note: the GitBook space has a backlog of old draft change requests ("David's ... changes", some 1yr+ old) in the Change requests tab — unpublished drafts unrelated to Git Sync. Worth reviewing/deleting someday; don't bulk-merge them without inspecting each.

## GitBook Content Structure

- `SUMMARY.md` - Table of contents defining navigation structure
- `README.md` - Landing page content
- Content organized in directories: `benefits-and-features/`, `policies-projects-evaluation-workflow/`, `faq-interaction/`, `readme-1/` (about/team info), etc.

### GitBook-Specific Markdown

GitBook uses custom syntax including:
- `{% hint style="info" %}...{% endhint %}` - Callout boxes
- `{% embed url="..." %}` - Embedded links
- `{% code overflow="wrap" %}` - Code block formatting
- YAML frontmatter for page layout configuration

## Landing Pages (info.unjournal.org)

### Pages
- `landing-pages/index.html` — General Unjournal overview
- `landing-pages/about.html` — "In a Nutshell" overview of The Unjournal
- `landing-pages/benefits.html` — Benefits & features of journal-independent evaluation
- `landing-pages/for-authors.html` — FAQ and information for researchers/authors
- `landing-pages/for-evaluators.html` — Information and recruitment for evaluators
- `landing-pages/team.html` — Management team, advisory board, and field specialists
- `landing-pages/news.html` — News feed page
- `landing-pages/pivotal-questions.html` — High-value-of-information research initiative
- `landing-pages/forecasting-tournament.html` — Animal welfare forecasting tournament (with Metaculus)
- `landing-pages/forecasting-tournament-thanks.html` — Post-signup confirmation
- `landing-pages/follow.html` — Social media, news, and engagement hub
- `landing-pages/donate.html` — Donation/support page
- `landing-pages/evaluator-prizes-2024-25.html` — Evaluator prize winners announcement
- `landing-pages/lottery.html` — Transparent random draw for honorable mention prizes

### Team Page Notes
- **Source of truth**: Team structure is managed in Coda (`coda_org_unjournal` repo)
- **Photos**: Sourced from Squarespace CDN (`images.squarespace-cdn.com`) via unjournal.org/team
- **Manual sync**: When team changes, update both Coda (via `update_team.py`) and `team.html`
- Team members without photos use initials placeholders (gradient background)

### Design conventions
- All pages use academic serif fonts: Libre Baskerville for headings, Georgia for body text (donate.html uses Almarai for body)
- Unjournal logo (`unjournal-logo.jpg`) in every page header, linking to unjournal.org
- Color scheme: `--primary: #1a3a5c`, `--accent: #2e86c1`, consistent across all pages

## Interactive Docs (docs/)

Served via GitHub Pages at `https://unjournal.github.io/unjournal_gitbook/`.

- `docs/gallery.html` — Mermaid diagram gallery with theme/font/shape/size controls and export buttons
- `docs/reveal-*.html` — Reveal.js step-through presentations (evaluation process, theory of change)
- `docs/interactive.html` — Interactive process diagram
- `docs/diagrams/` — SVG/image assets for diagrams

## Style Guide

The Unjournal maintains a style guide for documentation consistency: https://docs.google.com/document/d/10aooH_YCVX__pXFqnY1l8Kn2_DPX9wdHdR9AfImSuDs/edit

## Journal Metadata

- **ISSN**: 3071-2173 (assigned March 2026)
- **DOI Prefix**: 10.21428/d28e8e57 (via PubPub/Crossref)
- **PubPub Community**: https://unjournal.pubpub.org

## Key URLs

- **Public GitBook**: `https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/`
- **PubPub evaluations**: `https://unjournal.pubpub.org/`
- **Shiny dashboard**: `https://unjournal.shinyapps.io/uj-dashboard/`
- **Main website**: `https://unjournal.org`
- **Ad Grant landing pages**: `https://info.unjournal.org`
- **Wellbeing Workshop**: `https://uj-wellbeing-workshop.netlify.app`
- **PBA Workshop**: `https://uj-pba-workshop.netlify.app`
- **CM Workshop**: `https://uj-cm-workshop.netlify.app`
- **All Workshops Landing**: `https://uj-pq-workshops.netlify.app`

## Pivotal Questions Workshops (`pivotal-questions/`)

Workshop scheduling and beliefs elicitation forms for the Pivotal Questions initiative.

### Wellbeing Workshop (`pivotal-questions/wellbeing-workshop/`)
- **URL**: `https://uj-wellbeing-workshop.netlify.app`
- **Netlify Site ID**: `37a0205b-5cee-42c2-9388-fe0c17b5e5c6`
- **Netlify Account**: `daaronr` (nonprofit)
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site 37a0205b-5cee-42c2-9388-fe0c17b5e5c6`
- **Forms dashboard**: https://app.netlify.com/sites/uj-wellbeing-workshop/forms
- **Netlify API**: Use `NETLIFY_AUTH_TOKEN` in repo `.env` to fetch form submissions
- **Form ID (workshop-availability)**: `699c9edf50f843000883f05e`
- **Confirmed date**: Monday, March 16, 2026, 11am-4pm ET (3pm-8pm UK)

#### Pages
- `index.html` — Scheduling form (availability grid, segment interest)
- `about.html` — Workshop overview and goals
- `beliefs.html` — Pivotal Questions beliefs elicitation form
- `thanks.html` / `beliefs-thanks.html` — Post-submission confirmations

#### Forms (Netlify Forms)
- `workshop-availability` — Scheduling submissions
- `beliefs-elicitation` — Beliefs/forecasts submissions

#### Design
- Academic aesthetic: Source Serif 4 + DM Sans fonts
- Color palette: `--bg: #f8f6f1`, `--sage: #5a7a5a`, `--brown: #8b5e3c`
- Shared styles in `styles.css`, interactivity in `app.js` and `beliefs.js`

#### Private Workshop Context
Participant details, scheduling constraints, discussion themes, and form submission counts have been moved to the private tracking file to avoid exposing names and opinions in a public repo. See:
- **`~/unjournal-private/workshop-tracking/workshop-claude-context.md`** — full participant details, next steps, discussion themes
- **`~/unjournal-private/workshop-tracking/wellbeing-workshop-feedback.md`** — survey responses and feedback tracking

### Cultivated Meat Workshop (`pivotal-questions/cm-workshop/`)
- **URL**: `https://uj-cm-workshop.netlify.app`
- **Netlify Site ID**: `7c6efdd4-f6db-4b13-8355-0bb5b64d0e6e`
- **Netlify Account**: `daaronr` (nonprofit)
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site 7c6efdd4-f6db-4b13-8355-0bb5b64d0e6e`
- **Forms dashboard**: https://app.netlify.com/sites/uj-cm-workshop/forms
- **Status**: Active — invitations being sent
- **Target date**: Late April / early May 2026

#### Pages
- `index.html` — Workshop overview / About page (home page)
- `schedule.html` — Scheduling form (April 2026 dates, 4 segments)
- `beliefs.html` — CM_01, CM_02, CM_10/11 + technical subquestions (CM_12-20)
- `thanks.html` / `beliefs-thanks.html` — Post-submission confirmations

#### Forms (Netlify Forms)
- `cm-workshop-availability` — Scheduling submissions
- `cm-beliefs-elicitation` — Beliefs/forecasts submissions

#### Content Sources
- PQ formulations from Coda hub_internal (`~/githubs/coda_org_unjournal/coda_content/hub_internal/`) — see `cell_cultured_meat_cost_price_pq_canvas-*.md` and `specific_cultured_meat_cost_price_pqs_metaculus_questions.csv`
- TEA rankings and paper list from same location
- Metaculus questions: CM_01, CM_03, CM_10, CM_11

### Plant-Based Substitution Workshop (`pivotal-questions/pba-workshop/`)
- **URL**: `https://uj-pba-workshop.netlify.app`
- **Netlify Site ID**: `b065c5c3-a6c8-4261-8dac-13d17383ceaa`
- **Netlify Account**: `daaronr` (nonprofit)
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site b065c5c3-a6c8-4261-8dac-13d17383ceaa`
- **Forms dashboard**: https://app.netlify.com/sites/uj-pba-workshop/forms
- **Status**: PRELIMINARY DRAFT (prominent caveats throughout)
- **Target date**: May 2026

#### Pages
- `index.html` — Workshop overview / About page (home page)
- `schedule.html` — Scheduling form (May 2026 dates, 6 segments)
- `beliefs.html` — PBA_01 (focal: chicken consumption), PBA_02-03, PBA_06-08 (subquestions)
- `thanks.html` / `beliefs-thanks.html` — Post-submission confirmations

#### Forms (Netlify Forms)
- `pba-workshop-availability` — Scheduling submissions
- `pba-beliefs-elicitation` — Beliefs/forecasts submissions

#### Content Sources
- PQ formulations from Coda tables and EA Forum
- Question codes: PBA_01-08 (operationalized pivotal questions)
- Metaculus questions: GFI vs THL comparison
- Forecasting Tournament integration

### Workshops Landing Page (`pivotal-questions/workshops-landing/`)
- **URL**: `https://uj-pq-workshops.netlify.app`
- **Netlify Site ID**: `9abc4eb7-bc5c-4bfd-83c2-2fbcf1b8cfe9`
- **Netlify Account**: `daaronr` (nonprofit)
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site 9abc4eb7-bc5c-4bfd-83c2-2fbcf1b8cfe9`
- Single page listing all workshop cards with status badges and links

### Future Workshops
When creating additional PQ workshops:
1. Create new directory under `pivotal-questions/`
2. Create new Netlify site with topic-specific name
3. Use same design patterns and form structure
4. Add draft banners if preliminary

## Domain & Hosting Infrastructure

### Domain Registration
- **Registrar**: Squarespace Domains (migrated from Google Domains in 2023)
- **DNS Management**: Google Workspace Admin — https://admin.google.com/ac/domains/ (login with contact@unjournal.org)
- **Domain registered**: October 2022

### info.unjournal.org Hosting
- **Server**: Linode VPS (see `~/unjournal-private/workshop-tracking/workshop-claude-context.md` for IP)
- **Web server**: Nginx
- **Document root**: `/var/www/info.unjournal.org/`
- **Deploy**: SCP files to server, Nginx serves them automatically

## Content Maintenance Notes

### Statistics (update periodically)
- As of January 2026: 100+ evaluations of 53 papers
- Source of truth: Shiny dashboard and internal Coda

### Archived content
Historical content (pilot phase 2022-2023, old job postings, etc.) is preserved in `<details>` collapsible sections rather than deleted, to maintain persistent links.

### Internal vs public links
- Never link to internal Coda pages in public GitBook content (except parenthetically for team reference)
- Use relative paths for internal GitBook links, not full URLs

### Prize programs
- 2023 pilot prize: Completed, winners announced
- 2024-25: Evaluator prizes ($6,500), recognition-based author awards (Flowing Water Scholar, Polaris Research)
- 2026+: Monetary author prizes planned, funding dependent

## Workshop Migration & Harmonization (Feb 2026)

### What Was Done

**Netlify Account Migration:**
- Migrated all 3 workshop sites from `contact@unjournal.org` account to `daaronr` nonprofit account
- Created new sites with shorter URLs (`uj-*` prefix instead of `unjournal-*`)
- Set up 301 redirects on old URLs to preserve any shared links

**URL Mapping:**
| Old URL (contact account) | New URL (nonprofit account) |
|---------------------------|----------------------------|
| `unjournal-workshop.netlify.app` | `uj-wellbeing-workshop.netlify.app` |
| `unjournal-pba-workshop.netlify.app` | `uj-pba-workshop.netlify.app` |
| `unjournal-cultured-meat-workshop.netlify.app` | `uj-cm-workshop.netlify.app` |

**Harmonization Across All Workshops:**
- Recording section: Changed to softer language mentioning transcripts ("We hope to record... adjusting based on participant preferences")
- Added header meta line to PBA with target date and duration
- Added draft notice inside CM index form
- Added Forecasting Tournament links to Wellbeing workshop
- Added Coda PQ database links to CM workshop
- Added Our World in Data link to CM beliefs (chicken slaughter data)
- Fixed PBA beliefs "rank" instruction → "select credible approaches" (was using checkboxes, not ranking)
- Standardized form field name to `segment_priority_order` (snake_case) across all workshops
- Added error handling to form submissions (shows "Submitting..." state)
- Enabled column selection for availability grid (click time headers to select entire column)

### Current Status

**Live Sites (nonprofit account - daaronr):**
- ✅ `uj-wellbeing-workshop.netlify.app` - deployed and working
- ✅ `uj-pba-workshop.netlify.app` - deployed and working
- ✅ `uj-cm-workshop.netlify.app` - deployed and working

**Redirects (contact account):**
- ✅ Old URLs return 301 redirects to new URLs
- ✅ Path preservation works (e.g., `/thanks.html` redirects to new `/thanks.html`)

**Forms:**
- All 6 forms configured with `data-netlify="true"`
- Forms dashboard: Log into Netlify (daaronr account) → Teams → daaronr → each project → Forms

**Thank You Pages:**
- All `/thanks.html` and `/beliefs-thanks.html` pages return HTTP 200
- Personalized greeting using sessionStorage

### Pending / Next Steps

1. **Verify form submissions in Netlify dashboard** - Check Forms tab on each project to confirm submissions are being captured.

2. **Consider custom domain** - Could set up `wellbeing.unjournal.org` etc. pointing to the Netlify sites for cleaner URLs.

### Netlify CLI Notes

- CLI authenticates via browser - make sure correct account is logged in before deploying
- To check current login: `npx netlify-cli status`
- To switch accounts: `npx netlify-cli logout && npx netlify-cli login`
- SSH push may fail; use HTTPS as fallback: `git remote set-url origin https://github.com/unjournal/unjournal_gitbook.git`

## Scheduled Jobs

### Temporary author-reluctance Hypothes.is responder

- **Status**: Temporary; installed June 18, 2026 and self-removes after `2026-06-18T19:56:24Z` (`20:56:24` London time).
- **Schedule**: `7,27,47 * * * *` via system cron, wrapped by `~/githubs/claude_code_misc_work/cron_wrapper.py`.
- **Purpose**: For `https://unjournal-reluctance-note.netlify.app/` and `https://unjournal-reluctance-note.netlify.app/#technical`, check every 20 minutes for new trusted Hypothes.is comments from `daaronr` or `unjournal`; ask headless Codex to make only clear improvements to `model_author_reluctance/src/UnjournalReluctancePaper.jsx`; build/deploy the Netlify site if edited; post `Claude: ` replies in-thread.
- **Script**: `model_author_reluctance/scripts/timed_author_reluctance_hypothesis_responder.py`
- **State**: `model_author_reluctance/.hypothesis/author_reluctance_timed_responder_state.json`
- **Logs**: `~/Library/Logs/cron/author_reluctance_timed_hypothesis_responder.log`; status file at `~/.cron_status/author_reluctance_timed_hypothesis_responder.json`.
- **Manual stop**: run `python3 model_author_reluctance/scripts/timed_author_reluctance_hypothesis_responder.py --remove-cron`.

## AI Conversation Archive

Historical Unjournal team ChatGPT conversations (2023–May 2026) are archived and organized at:
`~/Dropbox/obsidian_in_dropbox/chatgpt_team_organized/`

Full index and pipeline docs: `~/Dropbox/obsidian_in_dropbox/KNOWLEDGE_INDEX.md`

**Most relevant topic files for this repo:**

| File | Relevance |
|------|-----------|
| `unjournal_ops/team_conversations_unjournal_ops_CLEAN.md` | Operational decisions, PubPub workflows, submission processes — directly relevant to this repo's content |
| `writing_editing/team_conversations_writing_editing_CLEAN.md` | Past drafting work, content decisions, editorial style discussions |
| `web_tech/team_conversations_web_tech_CLEAN.md` | Landing page work, Netlify, website automation |
| `social_media/team_conversations_social_media_CLEAN.md` | Outreach strategy, post drafts, communications approach |
| `funding_grants/team_conversations_funding_grants_CLEAN.md` | Grant content, funder-facing language, proposal discussions |
| `meetings_comms/team_conversations_meetings_comms_CLEAN.md` | Team communications context |

Search: `grep -r "search term" ~/Dropbox/obsidian_in_dropbox/chatgpt_team_organized/`
