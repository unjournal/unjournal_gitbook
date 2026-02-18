# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is The Unjournal's public knowledge base and communications repository. The Unjournal provides open, rigorous evaluation of quantitative research informing global priorities, especially in economics, policy, and social science.

The repository contains:
- **GitBook content**: Markdown files organized by topic (policies, benefits, FAQ, grants, etc.)
- **Landing pages** (`landing-pages/`): Static HTML pages hosted on `info.unjournal.org`
- **Interactive docs** (`docs/`): Mermaid diagram gallery, Reveal.js presentations, and interactive process diagrams

Internal operations, deployment scripts, and automation tools are in the private [ops-internal](https://github.com/unjournal/ops-internal) repo.

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

## Key URLs

- **Public GitBook**: `https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/`
- **PubPub evaluations**: `https://unjournal.pubpub.org/`
- **Shiny dashboard**: `https://unjournal.shinyapps.io/uj-dashboard/`
- **Main website**: `https://unjournal.org`
- **Ad Grant landing pages**: `https://info.unjournal.org`
- **Wellbeing Workshop**: `https://unjournal-wellbeing-workshop.netlify.app` (also mirrored at `unjournal-workshop.netlify.app`)

## Pivotal Questions Workshops (`pivotal-questions/`)

Workshop scheduling and beliefs elicitation forms for the Pivotal Questions initiative.

### Wellbeing Workshop (`pivotal-questions/workshop-form/`)
- **Canonical URL**: `https://unjournal-wellbeing-workshop.netlify.app`
- **Legacy URL**: `https://unjournal-workshop.netlify.app` (mirrors canonical, kept for existing links)
- **Netlify Site ID**: `35c1d8a5-58ee-4e27-8157-acad9d373e45` (wellbeing-specific)
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site 35c1d8a5-58ee-4e27-8157-acad9d373e45`

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

### Cultivated Meat Workshop (`pivotal-questions/cm-workshop/`)
- **URL**: `https://unjournal-cultured-meat-workshop.netlify.app`
- **Netlify Site ID**: `2e59cdbb-5f83-4ff9-b8a9-9f4683a95ac7`
- **Deploy**: `npx netlify-cli deploy --prod --dir=. --site 2e59cdbb-5f83-4ff9-b8a9-9f4683a95ac7`
- **Status**: PRELIMINARY DRAFT (prominent caveats throughout)
- **Target date**: April 2026

#### Pages
- `index.html` — Scheduling form (April 2026 dates, 4 segments)
- `about.html` — Workshop overview (TEAs, cost trajectories, AW implications)
- `beliefs.html` — CM_01, CM_02, CM_10/11 + technical subquestions (CM_12-20)
- `thanks.html` / `beliefs-thanks.html` — Post-submission confirmations

#### Forms (Netlify Forms)
- `cm-workshop-availability` — Scheduling submissions
- `cm-beliefs-elicitation` — Beliefs/forecasts submissions

#### Content Sources
- PQ formulations from `/Users/yosemite/githubs/cm_pq_interface/cm_pq_downloads/`
- TEA rankings and paper list from same location
- Metaculus questions: CM_01, CM_03, CM_10, CM_11

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
- **Server**: Linode VPS at `45.79.160.157`
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
