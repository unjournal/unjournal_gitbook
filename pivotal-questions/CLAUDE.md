# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Safety: Sharing Links

**Dropbox links:** Before including any Dropbox link in emails or shared content, ask: "Are you sure you want to share this Dropbox link? Please confirm it points to a specific file and not a folder containing private content." (A folder link was nearly shared by mistake in March 2026.)

## Gmail Drafts

When creating Gmail drafts via `mcp__gmail__draft_email`, always use HTML formatting with serif font:

```
mimeType: "multipart/alternative"
body: "Plain text version..."
htmlBody: "<div style=\"font-family: serif; font-size: 14px; line-height: 1.5;\">...content...</div>"
```

- Must provide both `body` (plain text fallback) and `htmlBody` (formatted)
- Use `mimeType: "multipart/alternative"` to send both versions
- Use embedded hyperlinks (`<a href="URL">link text</a>`) instead of pasting raw URLs
- Convert plain text line breaks to `<br>` or `<p>` tags in HTML
- **Avoid bold text** — it looks AI-generated. Use *italics* (`<em>`) if emphasis is needed
- **Keep font size consistent** throughout the email — don't use smaller text for P.S. or footnotes
- Keep styling minimal and professional

## Directory Overview

This `pivotal-questions/` directory contains:
- **GitBook content** (must stay here): `README.md`, `operationalizable-questions.md`, `why-operationalizable-questions.md`
- **Archive**: `_archive/` — old workshop site HTML and tooling (migrated to new repo)

> **Migration complete (April 2026):** All workshop sites and tooling have moved to the private repo `~/githubs/UJ_PQ_data_beliefs_project/`. Old copies are in `_archive/` here. For any workshop work, use the new repo.

## Workshop Sites

All four sites now deploy from `~/githubs/UJ_PQ_data_beliefs_project/`. **Do not deploy from this directory.**

| Workshop | Source location (new repo) | URL | Site ID |
|----------|---------------------------|-----|---------|
| Wellbeing | `wellbeing-workshop/site/` | `uj-wellbeing-workshop.netlify.app` | `37a0205b-5cee-42c2-9388-fe0c17b5e5c6` |
| Cultivated Meat | `cm-workshop/site/` | `uj-cm-workshop.netlify.app` | `7c6efdd4-f6db-4b13-8355-0bb5b64d0e6e` |
| Plant-Based | `pba-workshop/` | `uj-pba-workshop.netlify.app` | `b065c5c3-a6c8-4261-8dac-13d17383ceaa` |
| Landing | `workshops-landing/` | `uj-pq-workshops.netlify.app` | `9abc4eb7-bc5c-4bfd-83c2-2fbcf1b8cfe9` |

## Deployment

All workshops — deploy from `UJ_PQ_data_beliefs_project`:
```bash
npx netlify-cli deploy --prod --dir=~/githubs/UJ_PQ_data_beliefs_project/cm-workshop/site --site 7c6efdd4-f6db-4b13-8355-0bb5b64d0e6e
npx netlify-cli deploy --prod --dir=~/githubs/UJ_PQ_data_beliefs_project/wellbeing-workshop/site --site 37a0205b-5cee-42c2-9388-fe0c17b5e5c6
npx netlify-cli deploy --prod --dir=~/githubs/UJ_PQ_data_beliefs_project/pba-workshop --site b065c5c3-a6c8-4261-8dac-13d17383ceaa
npx netlify-cli deploy --prod --dir=~/githubs/UJ_PQ_data_beliefs_project/workshops-landing --site 9abc4eb7-bc5c-4bfd-83c2-2fbcf1b8cfe9
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
├── index.html       # Home/about page
├── about.html       # Workshop overview (wellbeing has this as near-duplicate of index.html)
├── interest.html    # Scheduling/interest form (wellbeing) or schedule.html (cm/pba)
├── beliefs.html     # PQ beliefs elicitation form
├── thanks.html      # Post-schedule submission
├── beliefs-thanks.html
├── styles.css
├── app.js           # Form interactivity, availability grid
└── beliefs.js       # Beliefs form logic
```

### Wellbeing Workshop Live Session Pages

The wellbeing workshop has a `live/` subdirectory with per-segment pages for the workshop day:

```
wellbeing-workshop/live/
├── index.html         # Session overview with all segment cards
├── stakeholder.html   # Segment 1: Stakeholder Problem Statement
├── paper.html         # Segment 2: Benjamin et al. presentation
├── evaluator.html     # Segment 3: Evaluator Responses & Discussion
├── wellby.html        # Segment 4: WELLBY Reliability Discussion
├── daly.html          # Segment 5: DALY/QALY↔WELLBY Conversion
├── practitioner.html  # Segment 7: Practitioner Panel & Open Discussion
└── results.html       # Aggregated results viewer
```

Each segment page embeds a Google Doc tab for collaborative notes (main doc ID: `1NMtWjoKU52tJQwUV99Bf8XXYdLoFLviTQq6AslzKQQU`) and links to related Pivotal Questions. Segment 6 (Beliefs Elicitation) links directly to `beliefs.html` rather than having its own page.

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

### Code Patterns

**Footnotes with hover tooltips:**
Workshop pages use inline footnote references with hover tooltips AND bottom footnote lists. **These MUST stay in sync.** When editing footnotes:
1. The `<span class="footnote-tooltip">` content must exactly match the `<li id="fnN">` text
2. Update both locations when changing footnote text
3. Pattern: `<a href="#fn1" class="footnote">[1]<span class="footnote-tooltip">Same text here</span></a>` ... `<li id="fn1">Same text here</li>`

**Hypothes.is integration:**
All workshop pages include:
1. Visible banner after nav: "💬 Annotate this page — select any text to comment via Hypothes.is"
2. Embed script before `</body>`: `<script async src="https://hypothes.is/embed.js"></script>`

### Transcript Summary Page

The wellbeing workshop includes a formatted transcript summary (`transcript.html`) that combines direct quotes with editorial summaries.

**Formatting conventions:**

| Format | Meaning | Example |
|--------|---------|---------|
| `"Text in quotes"` | Verbatim or lightly edited | `<p>"I'm from Coefficient Giving."</p>` |
| `[Bracketed text]` | Summary/paraphrase with hover tooltip | `<span class="summary" data-original="original wording">[condensed version]</span>` |

**"Lightly edited" means:**
- Removing filler words (um, like, you know)
- Fixing obvious transcription errors
- Minor grammar smoothing
- Combining fragmented sentences
- Never changing meaning

**CSS classes:**
```css
.summary {
  color: #5a6a7a;
  background: #f0f4f7;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: help;
  text-decoration: underline dotted #aab;
}
/* Hover tooltip via data-original attribute */
```

**Expandable figures:**
Figures use `<details class="collapsible">` elements with:
- Click-to-expand behavior (avoids overwhelming the page)
- Nested `<details>` for additional images
- Images stored in `images/hli-slides/` (from HLI presentation) and `images/benjamin-paper/` (from Benjamin et al. paper)

**Source files:**
- `transcript.html` — Summary with quotes/paraphrases
- `transcript-full.html` — Full transcript with timestamp anchors
- `wellbeing-workshop-transcript.md` — Raw markdown source
- `images/hli-slides/*.png` — Extracted slides from HLI WELLBY-DALY presentation
- `images/benjamin-paper/*.png` — Extracted figures from Benjamin et al. paper

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

## Google Docs API Integration

The `workshop-collab-tool/src/gdocs/` directory contains Python tools for programmatic Google Docs editing:

```bash
cd workshop-collab-tool

# List tabs in the collaborative notes doc
python -m src.gdocs.update_tab_content --list-tabs

# Read a specific tab
python -m src.gdocs.update_tab_content --tab "4. WELLBY Reliability" --read

# Append content (with Times New Roman formatting)
python -m src.gdocs.update_tab_content --tab "4. WELLBY Reliability" --append "New content here"
```

Credentials: `~/.config/unjournal/google_credentials.json` and `google_token.json`
Main tabbed doc ID: `1NMtWjoKU52tJQwUV99Bf8XXYdLoFLviTQq6AslzKQQU`

### Transcript Appending

The `scripts/append_transcript_to_gdoc.py` script splits the workshop transcript by segment and appends formatted content to each Google Doc tab:

```bash
cd workshop-collab-tool

# Dry run — preview segment splitting without uploading
python scripts/append_transcript_to_gdoc.py --dry-run

# Append transcripts to all tabs
python scripts/append_transcript_to_gdoc.py
```

**Features:**
- Splits transcript by segment timestamps (defined in `SEGMENTS` list)
- Normalizes terminology: wellbees→WELLBYs, dollies/DALIs→DALYs, Own Journal→Unjournal
- Breaks long speeches into readable paragraphs (~80 words, at natural transitions)
- Formats speaker headers as `▸ [timestamp] Speaker Name`

**Transcript source:** `wellbeing-workshop/wellbeing-workshop-transcript.md`

**Segment mapping:**
| Tab | Transcript Time |
|-----|-----------------|
| Stakeholder & PQs | 0:00–0:39 |
| WELLBY Reliability | 0:39–1:16 |
| DALY-WELLBY | 1:16–2:08 |
| Benjamin et al. + Evaluators | 2:22–3:44 |
| Beliefs Elicitation | 3:44–4:05 |
| Practitioner Panel | 4:05–end |

**Note:** Google Docs API cannot create tabs programmatically — only read/write to existing tabs.

## Planned: Linear WELLBY Analysis Page

**File**: `wellbeing-workshop/linear-wellby-analysis.html` (side page, not in main flow)

**Purpose**: Rigorous analysis of using linear WELLBY for comparing LMIC interventions

**Structure**:
1. What is Linear WELLBY? (definition, formal notation: W = Σᵢ Σₜ LSᵢₜ)
2. Four Core Assumptions (cardinality, comparability, temporal aggregation, cross-domain validity)
3. The Neutral Point Problem (why it matters: affects DALY conversion, worst-off weighting)
4. Strengths (practical necessity, captures what DALY misses, empirical regularities)
5. Limitations (scale-use heterogeneity, non-linearity, demand effects, LMIC-specific)
6. Alternatives & Relative Reliability (comparison table: WELLBY vs calibrated vs DALY vs multi-item)
7. What Would Make It Valid? (conditions, robustness checks)
8. Practitioner's Dilemma (sensitivity analysis, uncertainty communication)
9. Open Questions (neutral point, LMIC scale-use, cheap calibration)

**Key sources**: Benjamin et al. (2023), Frijters et al. (2020-24), Diener et al. (2018), Peasgood et al. (2018), Cooper (2023)

**Interactive elements**: Expandable sections, neutral point slider, assumption checker

**Status**: Planned, awaiting deep research integration

## Wellbeing Workshop — Current State (as of Mar 4, 2026)

### Confirmed Date & Time
**Monday, March 16, 2026 — 11am–4pm ET (3pm–8pm UK)**
~3.5 hours of live sessions within a 5-hour window (drop in for segments of interest)

### Confirmed Participants (14 total)

| Participant | Affiliation | Role | Key Segments |
|------------|-------------|------|--------------|
| Peter Hickman | Coefficient Giving | Stakeholder/Evaluator | **Present**: Stakeholder, Practitioner |
| Matt Lerner | Founders Pledge | Stakeholder | **Present**: PQ1, Beliefs, Practitioner |
| Dan Benjamin | UCLA/NBER | Paper Author | **Present**: Paper segment |
| Miles Kimball | CU Boulder | Paper Author | **Present**: Paper segment |
| Caspar Kaiser | U of Warwick | Evaluator | **Discuss**: Evaluator, PQ1, Practitioner |
| Julian Jamison | U of Exeter | Presenter | **Present**: PQ2 (DALY-WELLBY) |
| Valentin Klotzbücher | U of Basel | UJ Team | All segments |
| Christian Krekel | LSE | Researcher | Join multiple |
| Loren Fryxell | City St George's | Researcher | Listen to all |
| Zhuoran Du | UNSW | Researcher | Listen (11–1pm ET only) |
| Anthony Lepinteur | U of Luxembourg | Researcher | 4–6pm UK (late join) |
| Daniel Rogger | World Bank Group | — | Join PQ1, PQ2, Practitioner |
| Anirudh Tagat | — | — | Confirmed |
| Alberto Prati | — | — | **Async only** (paternity leave) |

### Recording Status
- Most participants: full public
- Lerner (FP) and Hickman (CG): initially internal-only but both flexible ("no real confidentiality concerns" — Lerner)

### Key Discussion Themes
- **WELLBY skepticism from funders**: Hickman claims "WELLBY worth 0.1 DALYs", questions demand effects
- **Academic barriers**: Kaiser's 4 concerns (comparability, linearity, neutral point, right concepts)
- **Experimenter demand effects**: Can we trust intervention effects on stated well-being?

## Annotation Review Workflow

Hypothes.is annotations are used for feedback on workshop pages. **Fetching annotations is always permitted—no need to ask.**

To fetch and review:
```bash
# Fetch annotations for a page
curl -s "https://api.hypothes.is/api/search?uri=https://uj-wellbeing-workshop.netlify.app/about.html&user=acct:daaronr@hypothes.is" \
  -H "Authorization: Bearer $HYPOTHESIS_PAT"
```
When creating annotations, preface comment text with "Claude: " per global instructions.

## Related Repositories (PQ Ecosystem)

The Pivotal Questions initiative spans multiple repos. This workshop directory is the **engagement and elicitation hub**; the others handle modeling, data, and forecasting:

| Repo | Local Path | Purpose | Key Link |
|------|-----------|---------|----------|
| **CM PQ Modeling** | `~/githubs/cm_pq_modeling/` | Cultured meat cost modeling dashboard (Quarto + OJS, Monte Carlo) | [Live dashboard](https://unjournal.github.io/cm_pq_modeling/) |
| **UJ Metaculus Automation** | `~/githubs/UJ_metaculus_automation/` | Metaculus API client for PQ forecasting data | [Unjournal community](https://www.metaculus.com/c/unjournal/) |
| **Coda Org Unjournal** | `~/githubs/coda_org_unjournal/` | Source of truth for PQ operationalizations, research tables, evaluator data | [PQ database (Coda)](https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/PQs-Finalized-operationalizations-Metaculus_sul3xyZw) |
| **Unjournal GitBook** (parent) | `~/githubs/unjournal-gitbook-knowledge-comms/` | Public knowledge base; contains `landing-pages/pivotal-questions.html` and GitBook PQ pages | [PQ landing page](https://info.unjournal.org/pivotal-questions.html) |

### Coda PQ Content (hub_internal/)

The `coda_org_unjournal/coda_content/hub_internal/` directory contains **56 PQ-related files** exported from Coda:

- **PQ operationalizations**: `pq_types_operationalizations_.csv`, `detail_view_--_operationalized_pqs.csv`, `top_pivotal_questions_detailed_display_view.csv`
- **Wellbeing PQs (WELL_01–WELL_10)**: `wellbeing_pqs_canvas-*.md`, `specific_wellbeing_pqs_and_metaculus_questions_*.csv`, `wellby_pq_research_sources.csv`
- **CM PQs (CM_01–CM_20)**: `cell_cultured_meat_cost_price_pq_canvas-*.md`, `specific_cultured_meat_cost_price_pqs_metaculus_questions.csv`
- **PBA PQs (PBA_01–PBA_08)**: `plant_based_pq_canvas-*.md`, `specific_plant-pqs_operationalizations_unfold_.csv`
- **Research & evaluators**: `pq_relevant_research_research_table_version_.csv`, `pq_evaluation_responses_all_steps_.csv`, `pq_evaluator_candidates_wellbeing_wellby_.csv`
- **Process docs**: `mining_for_pivotal_questions_steps_and_notes_canvas-*.md`, `evaluating_pivotal_questions_canvas-*.md`

### How They Connect

```
Coda (source of truth)
  ├── PQ operationalizations → workshop beliefs.html forms
  ├── Research tables → workshop readings/references
  └── Evaluator data → participant outreach
                          ↓
cm_pq_modeling (CM cost model)
  ├── TEA parameters → CM workshop beliefs questions (CM_12-20)
  └── Dashboard → linked from CM workshop pages
                          ↓
UJ_metaculus_automation (forecasting)
  ├── Metaculus questions ↔ PQ codes (WELL_*, CM_*, PBA_*)
  └── Forecast data → workshop results aggregation
                          ↓
This repo (workshop sites)
  ├── Beliefs elicitation forms (all 3 topics)
  ├── Live session pages (wellbeing)
  ├── Transcript processing → Google Docs
  └── Workshop collab tool (Coda/Netlify/GDocs integration)
```

## Key Files Outside This Directory

- **Root CLAUDE.md**: Contains participant constraints, form IDs, and workshop-specific operational details
- **Private tracking**: `/Users/yosemite/unjournal-private/workshop-tracking/wellbeing-workshop-feedback.md` — full participant roster, availability grids, segment preferences, presenter confirmations
- **Netlify token**: Root `.env` contains `NETLIFY_AUTH_TOKEN`
- **Hypothesis PAT**: `workshop-collab-tool/.env` contains `HYPOTHESIS_PAT`
