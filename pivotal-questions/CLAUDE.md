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
**Monday, March 16, 2026 — 11am–5pm ET (4pm–10pm UK)**
~3.5 hours of live sessions within a 6-hour window (drop in for segments of interest)

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

Hypothes.is annotations are used for feedback on workshop pages. To fetch and review:
```bash
# Fetch annotations for a page
curl -s "https://api.hypothes.is/api/search?uri=https://uj-wellbeing-workshop.netlify.app/about.html&user=acct:daaronr@hypothes.is" \
  -H "Authorization: Bearer $HYPOTHESIS_PAT"
```
When creating annotations, preface comment text with "Claude: " per global instructions.

## Key Files Outside This Directory

- **Root CLAUDE.md**: Contains participant constraints, form IDs, and workshop-specific operational details
- **Private tracking**: `/Users/yosemite/unjournal-private/workshop-tracking/wellbeing-workshop-feedback.md` — full participant roster, availability grids, segment preferences, presenter confirmations
- **Netlify token**: Root `.env` contains `NETLIFY_AUTH_TOKEN`
- **Hypothesis PAT**: `workshop-collab-tool/.env` contains `HYPOTHESIS_PAT`
