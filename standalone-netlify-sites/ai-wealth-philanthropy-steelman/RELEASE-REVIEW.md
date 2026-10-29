# Funding-model release review — 29 October 2026

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
