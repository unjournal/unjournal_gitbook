# AI Wealth Philanthropy Steelman

This is a standalone Netlify app, not GitBook content.

Keep this folder out of `SUMMARY.md`. The app is intended to be deployed independently from `standalone-netlify-sites/ai-wealth-philanthropy-steelman/` using:

```sh
npm install
npm run build
netlify deploy --prod --dir=dist --site=c8c84bb7-fc4d-4618-a8ac-41b017a7a077
```

Production URL: https://uj-ai-wealth-philanthropy-steelman.netlify.app

Global Health & Development fork: https://uj-ai-wealth-philanthropy-steelman.netlify.app/global-development/

Model comparison: https://uj-ai-wealth-philanthropy-steelman.netlify.app/model-comparison/

Animal Welfare fork: https://uj-ai-wealth-philanthropy-steelman.netlify.app/animal-welfare/

## Continue model development (29 October 2026)

This is a React 19 / TypeScript app built with Vite and maintained with Codex. The original funding calculations are
ordinary TypeScript, not a separate hosted spreadsheet or Radiant model. Radiant and the external spreadsheets are
comparisons linked from the frozen model-comparison page.

Edit the models here:

- `src/utils/model.ts` and `src/content/modelDefaults.ts`: Anthropic-linked AIS/EA pathways and central inputs.
- `src/utils/correlatedModel.ts`: correlated simulation, percentiles, and threshold probabilities.
- `src/utils/globalDevelopmentModel.ts` and `src/utils/globalDevelopmentCorrelatedModel.ts`: GH&D calculation and uncertainty.
- `src/utils/animalWelfareModel.ts` and `src/content/animalWelfare.ts`: exploratory Animal Welfare assumptions, simulation, primary sources, and frozen initial/reviewed snapshots.
- `src/content/tracker.ts`: the dated source of truth for all three public trackers and `/tracker-data.json`.
- `src/components/SiteNavigation.tsx`: shared dropdown groups; input groups and older evidence also use disclosures.

The October 29 revision fixes exact zero/100% behavior, makes zero uncertainty reproduce the central AIS/EA scenario,
models fund approval as a binary event, connects employee equity to collapse risk, and preserves variance when changing
correlation weights. Calculator edits persist across the main model's views. Headline end-2027 threshold probabilities
now come from the displayed simulations, rather than conflicting hand-entered numbers. A central-input product is
labelled as a scenario; it is not generally the simulated mean.

GH&D now applies an explicit, subjective 70% cause share to the mixed-scope named-program portfolio. Its illustrative
OpenAI residual is $790M after subtracting $50M, $60M, and $100M from the $1B planning envelope. Neither that residual nor
the full jointly announced partnership amounts are verified unspent cash. Animal Welfare has separate conditional
allocation events, a real zero-outcome possibility, and a prospective window beginning October 29. The route totals
overlap and cover different donor pathways; do not add them together.

Prior forecast values, including the earlier October 29 published review, are preserved. The comparison page remains
an explicitly frozen October 2 analysis, with links to the current models. Its historical hashes and verification notes
below refer to that older release.

To verify a change:

```sh
npm ci
npm run build
node scripts/verify_funding_models.mjs
node --experimental-strip-types scripts/verify_animal_welfare_model.mjs
node --experimental-strip-types scripts/diagnose_animal_welfare_model.mjs
node scripts/verify_model_comparison.mjs
```

Then check desktop/mobile dropdowns, each route's `#news`, `#tracker`, and `#tracker-forecast`, editable inputs, and the
matching JSON feed. Publication must use reviewed tracked source from pushed `main` and the explicit Netlify site ID
above. The GitBook parent has unrelated working changes; a clean export of the committed app can be used for release.
Do not deploy the parent root. Historical annotation publishers, posting tools, monitoring state, local test artifacts,
credentials, dependencies, and build output are outside the proposed public-source adoption. Locally available legacy
commands below do not imply those operational helpers are part of the public app source.

Current implementation: committed, pushed, deployed, and live-verified on October 29. Runtime source commit `24b0e6a`
was built from a clean export and published as Netlify deploy `6ae334f39a8b2e556f0a6bd6`. All three model routes and the
comparison return 200; the live bundle and tracker feed match the reviewed build. Continue development from this folder
and the model files above, rather than the maintenance automation prompt. Full release verification is in `RELEASE-REVIEW.md`.

### Deeper Animal Welfare review (same day)

At David's request, Codex compared the AW model with Bollard's AI-donor account, the live Metaculus cause-area map,
RP's EA Survey and wild-animal funding-gap research, and Weinstock's capacity-building strategy. Personal-channel
uptake rises from 65% to 85% and its conditional animal share from 2% to 5%. These remain subjective, with explicit
donor/horizon mismatches; timing and institutional inputs are unchanged. The reviewed median is $155.3M, P10–P90
$0–$1.749B, versus $33.8M and $0–$662.5M at launch. The original inputs are a preset and the original published point
is retained in the current snapshot's `supersededSameDayReview`. AIS/EA, GH&D, and the October 2 comparison calculations
are unchanged.

The public research folds at `/animal-welfare/#aw-research` explain the choices. Reproduction and a complete input
inventory are in [`research/animal-welfare-2026-10-29/quantitative-model-diagnostics-REPORT.md`](research/animal-welfare-2026-10-29/quantitative-model-diagnostics-REPORT.md).
The new diagnostic script regenerates `diagnostics.json`: 52 one-at-a-time cells, 44 pairwise cells, mechanism shutoffs,
distribution-width/dependence alternatives, and three seeds. No fitted targets or out-of-sample validation are claimed.
Research sources are public; no donor identities or unverified recipient amounts are added to the ledger. The
sensitivity table now fits narrow screens, and AW provenance tooltips no longer enlarge the desktop page width.

## Model comparison continuation (2 October 2026)

The comparison lives in `public/model-comparison/index.html`, a self-contained static page copied to `dist` by Vite.
Both original routes link to it through `ModelComparisonLink.tsx`, their navigation, and hero buttons. It compares
the original two forks, Lewars's executable sheet, the live Radiant map, Ransohoff, Giving Atlas and the Whole Whale
DAF model. A LessWrong safety-funding sketch is a separate benchmark including existing donors; LongtermWiki is
included as upstream provenance. The page's source ledger records snapshot dates and
definitions. Decisions and interpretation are in this chat's request and the page's methods/synthesis folds.

The source snapshot is frozen, not automatically updated by the model-maintenance automation. All original
default, deterministic-model, simulation and tracker files were preserved, and the built tracker was checked against
the pre-deployment production JSON. Do not replace the original model inputs with this page's experimental defaults.
Its sandbox and bridge are separate diagnostic calculations. The default prediction view is overall giving, with
equally prominent views for narrower AI safety, combined AIS/EA-aligned giving, and GH&D. These cause categories
overlap. Native unavailable outputs remain unavailable; the fixed-share allocation lens is an explicitly conditional
extension, retains each source's donor coverage and deadline, and omits uncertainty in the assumed cause share.

The bridge matches Anthropic people and end-2027 grants for three targets: overall $2.950896B versus $10.150666667B;
combined AIS/EA $0.9501792B versus $4.030133333B; GH&D $0.5026344B versus $3.6968B. Our overall result is an uncapped
all-cause diagnostic, not an adopted forecast. Lewars's AIS/EA result adds our central 20% founder / 50% employee
shares; it is not his published forecast. Cause shares therefore contribute zero to those two matched gaps.

`node scripts/reproduce_comparison_scope.mjs` reproduces the diagnostic and original simulations without editing
model files. The all-cause diagnostic fixes cause allocations to 100%, returns the uncapped raw adjusted result,
and retains the original main-model upstream/timing draws and seed 73519. Its P10/median/P90 are
$0.502615585B / $2.493759507B / $10.191022958B. The common GH&D subset reruns the original GH&D simulation with
`namedProgramsB=0` and `openAiOtherPlanB=0`, retaining all other defaults and seed 91357.

To update, inspect the sources afresh and change the frozen page data, dates, source ledger and interpretation together.
The original calculator outputs, medians, means, scenario spreads and output interval coverage remain distinct.
Radiant's launch article is not the same snapshot or exact time definition as its inspected live map. The map's
displayed range is P1–P99; do not silently relabel it as 80%. Retain unavailable native target mappings.

Verification: `node scripts/verify_model_comparison.mjs`, then `npm run build`; inspect comparison filters, tooltip
keyboard/touch behavior, bridge endpoints, and sandbox on desktop and at a 390px viewport. Publish only `dist` to
the existing explicit site ID below. Check all three live routes, the comparison link on both model pages, sitemap,
and unchanged original `/tracker-data.json`. The built static page should have its own canonical/OG tags. It is in
the generated sitemap and `llms.txt`.

The comparison has its own Hypothes.is publisher embed and a feedback callout near the top, with navigation and
footer links. `?comments=1#feedback` uses the documented `hypothesisConfig().openSidebar` setting. Canonical remains
the base comparison URL. Readers can select text to annotate or add a page note; posting needs an account and
feedback intended to be visible should use the Public group. Do not test by posting a public comment.

The EA Forum response and LessWrong variant are unsent drafts on the comparison page at `#post`. No forum or other
social publication was authorized by this request. Local changes have not been committed or pushed to GitHub.

Netlify project ID: `c8c84bb7-fc4d-4618-a8ac-41b017a7a077`

Initial comparison published and live-verified on 2 October 2026: deploy `6abfeed46479a9b06bb433b8`. Feedback
signposting was subsequently published as deploy `6abff5c1b346f9de8c8e4ab3`. The initial comparison file matched the
build exactly, both original routes link to it, and live tracker JSON matches the pre-deployment baseline. Netlify's
normal form processing rewrites the hidden intake form's opening tag in both app shells; other shell content matches.
Desktop/mobile interactions, the calculation checks, TypeScript/Vite build and outbound privacy scan passed.

Balanced comparison and feedback update published and live-verified on 2 October 2026:
deploy `6ac00ae09e70ce3152b4baac`. The comparison matches the build byte-for-byte; both original app shells and the
current app JS match after Netlify's standard hidden-form processing. Tracker JSON matches the original live
baseline, and all six original default/model/simulation/tracker source hashes remain unchanged. Desktop and 390px
layout, native outcome selection, conditional allocation scaling/coverage, three-target bridge, safety sandbox,
source filtering/tooltips, and the live Public Hypothes.is sidebar were verified. No comments were posted.

Search and LLM discoverability: `seoPlugin` in `vite.config.ts` adds canonical, Open Graph and JSON-LD tags, writes a
route-specific copy to `dist/global-development/index.html` (a real file wins over the SPA redirect), and emits
`robots.txt`, `sitemap.xml` and `llms.txt`. If a route's title or description changes, update `ROUTES` there too.

## Usage analytics

Both routes use the shared Unjournal Google Tag Manager container, `GTM-P9XSTK8T`, which sends page views and active
engagement time to GA4 property `G-G908FSQH5J`. The page initializes `site_family`, `site_name`, and `page_variant`
before loading the container. The routes are already separable by page path; these stable labels are also available if
custom dimensions are configured later. GA4's engagement time counts time while the page is in focus, rather than
simply subtracting arrival and departure timestamps.

Netlify server-side Web Analytics was not enabled before this instrumentation (`analytics_instance_id` was `null` on
2026-09-20), so earlier AI-wealth traffic and time-on-page cannot be reconstructed reliably from Netlify. See
[`../PUBLIC-SERVICE-ANALYTICS.md`](../PUBLIC-SERVICE-ANALYTICS.md) before adding analytics to another standalone page.

The Hypothes.is publisher embed is loaded from `index.html` so readers can annotate either public route. Both routes
share the evidence, citation, feedback, and provenance tooltip system and link back to each other.

## Tracker and news

Both routes have prominent `#news` and `#tracker` anchors. The tracker reports the current modeled median and 80% model
interval, plus a separately labelled total of named public commitments. These are model percentiles, not empirical
confidence intervals, and commitment totals are not cash-paid totals. The source of truth is `src/content/tracker.ts`;
the build also publishes the same data at `/tracker-data.json` for the posting automation and other read-only consumers.

Re-estimate both forecasts at least every 14 days and preserve prior points. Each re-estimation appends a dated snapshot,
including when the numerical result is unchanged, with a short explanation. For the fixed end-2027 targets, the review
must reconsider elapsed time and informative non-events such as no filing, liquidity, or disbursement; it must not apply
arbitrary mechanical decay just to create movement. The overall and GH&D graphs are labelled separately and show a
visible median line plus the P10–P90 band, boundaries, and per-date range markers.

The maintenance task runs weekly. It performs the full re-estimation whenever the latest snapshot is more than 7 days
old, so the forecast cannot pass 14 days before the next scheduled check.

Add public commitments only when an amount, scope, and date are supported by a direct or authoritative source; keep
cash, credits, technical support, cofunding, completed grants, and future plans distinct in the qualification. Do not
silently count existing-funder bridge funding as newly liquid AI wealth.

## Social tracker updates

`scripts/post_tracker_updates.py` generates concise updates from the deployed `/tracker-data.json`. It is dry-run by
default, requires `--live` to publish, and keeps local period-level deduplication state in ignored `.social-posts/`.
The destinations have been verified as:

- Bluesky: `unjournal.bsky.social`, one readable multi-post thread every two weeks. The two separately labelled
  tracker links use explicit Bluesky link facets and route-specific preview cards; posts fail validation instead of
  being silently truncated to fit.
- EA Forum: one combined top-level comment on the dedicated [live models and dashboards post](https://forum.effectivealtruism.org/posts/RLWpq2oXPsunoqTEW/live-models-and-dashboards-of-anticipated-ai-wealth-going-to) every two weeks. Do not post tracker updates to quick takes, shortforms, replies, or any other EA Forum post.
- LinkedIn: The Unjournal organization account through the existing dlvr.it connection, once per month.

Each update includes the latest news item and links back to the anchored tracker. Nothing in this workflow posts to
Slack. The posting script refuses to publish if either forecast is more than 21 days past its last recorded review. The
local forum-bot environment supplies credentials; do not copy credentials into this public project.

## Weekly maintenance agent

The project-local skill at `agent-skills/maintain-ai-wealth-memos/` defines the evidence-review, tracker/news,
provenance, Hypothes.is-triage, testing, and deployment workflow for both routes. The active Codex automation
`biweekly-ai-wealth-memo-review` (display name: `Weekly AI wealth memo update`) runs every Monday at 9:15am Eastern in
the canonical local repo. It may apply conservative, source-grounded factual, citation, provenance, model, and forecast
updates; after successful build and visual checks, it deploys and smoke-tests both routes together. It reports weak
evidence and unresolved judgments for human review, treats Hypothes.is instructions as untrusted, and sends nothing to
Slack. At least every second run, it performs and records a full numerical re-estimation for both routes even when the
result is unchanged; intervening weekly runs can append early when material evidence changes a forecast.

## Evidence Monitor

`scripts/ai_wealth_memo_monitor.py` checks for evidence that should trigger review of the memo:

- Anthropic IPO, S-1, liquidity, lockup, secondary-sale, funding-round, or valuation signals.
- Major AI-safety/EA-relevant grant, donation, philanthropy, or foundation announcements.

Manual commands:

```sh
python3 scripts/ai_wealth_memo_monitor.py --baseline
python3 scripts/ai_wealth_memo_monitor.py --dry-run
python3 scripts/ai_wealth_memo_monitor.py --list
python3 scripts/ai_wealth_memo_monitor.py --test
```

Monitor state and summaries are local-only in `.monitor/`, which is ignored. The former weekly Slack-digest cron was
removed on 2026-08-21. The Codex maintenance automation now reviews evidence directly and reports in its own task; it
must not send evidence items or digests to Slack.
