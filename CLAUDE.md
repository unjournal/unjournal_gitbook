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
- `landing-pages/forecasting-tournament.html` — Animal welfare forecasting tournament (with Metaculus)
- `landing-pages/forecasting-tournament-thanks.html` — Post-signup confirmation
- `landing-pages/follow.html` — Social media, news, and engagement hub
- `landing-pages/donate.html` — Donation/support page
- `landing-pages/evaluator-prizes-2024-25.html` — Evaluator prize winners announcement
- `landing-pages/lottery.html` — Transparent random draw for honorable mention prizes

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
