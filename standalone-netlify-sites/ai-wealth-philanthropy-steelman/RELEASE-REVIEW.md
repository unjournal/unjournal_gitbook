# Funding-model release review — 29 October 2026

## Maintenance evidence review — 31 October 2026

This narrow update adds [GiveWell's conditional malaria scale-up plan](https://blog.givewell.org/2026/10/26/further-scaling-our-malaria-grantmaking/),
reiterated in its October 30 newsletter, to main/GH&D news. The at-least-$2.5B goal covers 2027–32; the more-than-$1B
non-malaria expectation covers 2027. Both remain separate from AI-new-wealth commitments and cash paid. The proposed
Global Fund mechanism needs board approval. Also corrected the closed application windows for OpenAI's
teen-development and Anthropic's wellbeing-evaluation programs, and marked old pre-filing reporting as historical.

Official Anthropic filing, fund, financing, and science-program announcements; OpenAI/Foundation news and grant
terms; Coefficient news; GiveWell's October updates; and Gates sources were checked. No new evidence warranted
changing either end-2027 forecast. Their latest numerical reviews remain October 29: AIS/EA median $0.757B,
P10–P90 $0.045B–$3.813B; GH&D median $0.558B, P10–P90 $0.109B–$3.434B. Two elapsed days and no newly verified
liquidity, lockup, payout schedule, or scoped AI-linked cash receipt do not support changing the inputs. No new
snapshot was appended. All history and commitment totals are preserved; AW retains two illustrative scenarios
and no adopted central forecast. The feed's October 31 generation date is not a forecast-review date.

Complete public Hypothes.is fetches returned 90 main, four GH&D, and zero AW records, with no new activity since
September 17. Two referenced parent records remain publicly inaccessible. No replies or social posts were made.
October's monthly private side report was already completed; this review found no material new Unjournal funding
opportunity or outlook change. No private report or Slack/email notification was due or sent.

Local production build, all three numerical verification scripts, unchanged-history/feed assertions, and outbound
anonymity scans pass. Desktop and 354px mobile checks confirm prominent news, grouped model navigation, reciprocal
links, direct anchors, distinct chart titles, and interval rendering. Mobile has no document overflow. The existing
desktop hidden-tooltip overflow at 1229px remains outside this narrow update. Final clean-export and live-release
verification will be recorded below after publication.

## Original adoption review

Prepared locally with Codex. David approved this public-source adoption and release on October 29, 2026. It covers the existing standalone app,
including the new Animal Welfare route. It does not include other files in the parent repository.

Included source:

- `src/`, `public/`, and `agent-skills/maintain-ai-wealth-memos/`.
- `.gitignore`, `README.md`, this review, `index.html`, `netlify.toml`, `package.json`, `package-lock.json`, `tsconfig.json`, and `vite.config.ts`.
- `scripts/verify_funding_models.mjs`, `scripts/verify_animal_welfare_model.mjs`, and `scripts/verify_model_comparison.mjs`.

Excluded: dependencies, build output, credentials, Netlify local state, monitoring and social-post state, historical
posting/annotation/cron scripts, and local test-result files. Existing excluded files remain on the machine.

Changes ready for review:

- Grouped dropdown navigation across the models, grouped calculator controls, and collapsed older evidence/review notes.
- A linked `/animal-welfare/` model with explicit allocation events, real zero outcomes, primary sources, editable
  scenarios, shareable settings, sensitivity checks, and median/P10–P90 output.
- Shared editable AIS/EA assumptions across calculator views; consistent model-derived threshold probabilities.
- Corrected uncertainty boundaries, binary approval, employee collapse exposure, and marginal variance handling.
- GH&D mixed-scope allocation and residual-envelope correction. Historical values and the earlier same-day published
  review remain available in tracker history.
- October 26 public S-1 evidence, current market context, and the October 14 jointly funded Cities Deliver initiative.
- The October 2 comparison calculations remain frozen and are clearly dated; links lead to the current models.

Numerical defaults (billions of nominal USD; conditional model outputs):

| Route | Median | P10 | P90 |
| --- | ---: | ---: | ---: |
| AIS/EA | 0.757 | 0.045 | 3.813 |
| GH&D | 0.558 | 0.109 | 3.434 |
| Animal Welfare | 0.034 | 0 | 0.662 |

Build and numerical checks passed. Desktop/mobile review checks dropdown boundaries, keyboard dismissal, direct
anchors, live scenario changes, interval rendering, reciprocal links, and the generated tracker feed. Public-output
credential/private-path and evaluator-anonymity scans passed. Hypothes.is returned all 90 main and four GH&D records,
with no new activity since the preceding review; two referenced parent records were inaccessible through the public API.

Published and live-verified on October 29, 2026:

- Runtime source: pushed `main` commit `24b0e6a689b4946c2c33a63c16628072bda51c14` in `unjournal/unjournal_gitbook`.
- Target re-verified through Netlify: `uj-ai-wealth-philanthropy-steelman`, site ID `c8c84bb7-fc4d-4618-a8ac-41b017a7a077`.
- Production deploy: `6ae334f39a8b2e556f0a6bd6`.
- Release built from a clean export of that pushed commit, using `npm ci` and the committed lockfile. The generated
  output matched the previously reviewed local build byte for byte. All three numerical checks and the anonymity scan passed again.
- `/`, `/global-development/`, `/animal-welfare/`, and `/model-comparison/` returned HTTP 200. The production app bundle
  and `/tracker-data.json` matched the clean release exactly; the feed has all three October 29 forecasts.
- Live desktop/mobile checks confirmed model links, dropdowns, direct tracker/news/forecast anchors, the Animal Welfare
  result and interval, route metadata, and zero mobile document overflow. No application-console errors were observed.

For future releases, use an export of the app from the pushed `main` commit if the parent checkout contains unrelated
work. Keep runtime changes, source history, release records, and live verification distinct.

## Subsequent Animal Welfare research revision — 29 October

David requested a deeper review of other writing and modeling, with changes where appropriate. This bounded revision
adds five public research/model sources, explains scope and horizon mismatches in grouped disclosures, and raises
two subjective personal-giving assumptions (uptake 65% → 85%; conditional animal share 2% → 5%). No new cash or
commitment is entered from aggregate reports of earlier gifts. Payout timing and institutional inputs remain unchanged.
The AW median changes from $33.8M to $155.3M; P10–P90 from $0–$662.5M to $0–$1.749B. Launch inputs and outputs are
preserved. AIS/EA and GH&D numerical outputs and the frozen comparison calculations are unchanged.

Additional public files: `scripts/diagnose_animal_welfare_model.mjs` and the two files in
`research/animal-welfare-2026-10-29/`. No legacy posting/monitoring scripts or unrelated root changes are included.
The diagnostic log covers all 16 inputs, 96 finite sensitivity-grid cells, mechanism shutoffs, continuous widths,
uptake dependence, and seed variation. Its report explicitly says that forecast accuracy has not been validated.

Pre-publication checks: TypeScript/Vite production build and all three numerical test scripts pass. Original AW
settings reproduce the launch forecast. Desktop (1229 CSS pixels) and narrow mobile (354 CSS pixels) checks confirm
presets, the visible interval, research dropdown/folds, sensitivity results without sideways scrolling, and zero AW
document overflow. All 90 main and four GH&D Hypothes.is records were fetched; AW has none. No new annotation
activity was found. Two old referenced parent records remain publicly inaccessible. No annotations or social messages
were posted. Source, research output, and built output pass the evaluator-anonymity scan.

Published and live-verified:

- Runtime source: pushed `main` commit `47b119ce13f0ee494ba410ce8c799255f5abb925`.
- Netlify's API confirms published deploy `6ae38c26add4999c9123d0cd` on the same explicitly verified site ID.
- The release used a clean export of that commit, `npm ci` with the committed lockfile, a fresh build, all three test
  scripts, and an outbound anonymity scan. No untracked operational scripts, local state, or unrelated edits entered it.
- `/`, `/global-development/`, `/animal-welfare/`, and `/model-comparison/` return 200. The public research source is
  accessible on GitHub. All three live models have `#news`, `#tracker`, and `#tracker-forecast` anchors and the expected
  route-specific median. Live 390px checks show no document overflow; the AW table fits its container.
- Live JavaScript and CSS match the reviewed clean build. The matching tracker feed SHA-256 is
  `6c52fd6b7f6553c0623a0df474b0625ad947bc1ac93d861099383653c6c63710`.
- The new research menu/disclosure works on the live site, interval labels are accessible, and no application-console
  errors were observed. No Slack, email, annotation, newsletter, or social post was sent by this revision.

## Balanced interpretation revision — 29 October

David requested a balanced public presentation after an audit of the upward revision. The site now gives the
$33.8M and $155.3M parameter sets equal prominence, adopts neither as a central forecast, and explains within-model
uncertainty separately from uncertainty about model structure. Inputs and previous outputs are unchanged. Both
previous same-day reviews remain visible in the review log and present in JSON. The route and current snapshot have
`estimateKind: illustrative-scenario` and `adoptedForecast: false`; the reference values remain for compatibility.

The model adds only a conditional summary statistic (total median among draws with positive personal giving), without
changing draws or inferring a donor-cohort model. Gate-only sensitivity, source/population/horizon limits, and the
difference between reproducibility and calibration are explicit. The new audit script and `interpretation-audit.json`
reproduce the four combinations; the historical numerical log remains intact. Public metadata and source tooltips
use the same scenario-only interpretation. No main/GH&D numerical or frozen-comparison changes are included.

Local checks pass: production build, all three numerical test scripts, conditional-summary and scenario/feed/history
assertions, and source/research/build anonymity scans. Desktop and narrow mobile checks confirm both scenario cards,
scenario links and presets, readable nine-row sensitivity table, interval rendering, and zero AW document overflow.
The complete annotation fetch found zero AW, 90 main and four GH&D records, with no new activity. Two old referenced
parent records remain unavailable. Existing posting code reads only main and GH&D; no posting scripts were modified.

Published and live-verified:

- Runtime source: pushed `main` commit `38e56e59481b00aeac3c13c0d91683cb60121e08`.
- Netlify's API confirms published deploy `6ae3acb08ce23c9fc5626432` on the same verified existing site.
- A clean export reproduced the reviewed build and interpretation log exactly. Production JS, CSS, and tracker JSON
  match that build byte for byte. Feed SHA-256: `7044e9df5f25710c6ed1ebd0dae060425e3a884cc9f3ec7d5e05330946585c53`.
- All four routes return 200. The feed contains both historical parameter sets, two prior same-day reviews,
  `adoptedForecast: false`, `estimateKind: illustrative-scenario`, and `inputsChanged: false` for the interpretation review.
- Live checks verified lower-scenario editing ($33.8M), the reference preset ($155.3M), the conditional statistic,
  preserved notes, grouped navigation, and direct news/tracker/forecast anchors. All three live models fit 390px with
  no document overflow. No application-console errors were observed. AW also fits the desktop viewport.
- Main and GH&D full route records are unchanged. Their existing hidden provenance tooltips can still enlarge the
  document width at the local 1229px desktop viewport; that layout issue is outside this AW-focused revision.
- No Slack, email, annotation, newsletter, or social post was sent. Unrelated working changes remain untouched.
