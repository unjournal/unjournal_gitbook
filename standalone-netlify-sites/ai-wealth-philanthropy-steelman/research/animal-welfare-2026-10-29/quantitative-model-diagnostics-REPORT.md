# Animal-welfare funding model: deeper review, 29 October 2026

This is a public model-development record, prepared with Codex at David Reinstein's request. It contains public-source research and reproducible scenarios, not donor intelligence or a grant recommendation.

## Decision

Raise personal-channel uptake from 65% to 85% and the conditional animal share from 2% to 5%. Retain all timing, valuation, equity-pool, and institutional inputs. These are revised subjective judgments, not statistically estimated parameters. Preserve the launch assumptions and its published output.

The revised target is unchanged: **new cash from the modeled pathways reaching animal-welfare recipients from 29 October 2026 through 31 December 2027**, in nominal US dollars. Gifts before the review, assets parked with intermediaries, existing-funder bridge grants, commercial investment, and in-kind assistance are excluded. This is gross cash, not counterfactual additionality or welfare impact. OpenAI individuals and unidentified AI donors remain omitted; do not describe the output as a forecast of all AI-funded animal work.

## What external work changes

- [Bollard, 5 August 2026](https://farmanimalwelfare.substack.com/p/the-ai-windfall): reports earlier AI-donor animal gifts in aggregate. This is a named grantmaker's sector account, not an itemized or audited donor ledger. It supports higher confidence in further giving, without establishing the Anthropic pool's uptake rate. Do not add earlier gifts to prospective cash or invent recipient records.
- [Metaculus public cause-area map](https://radiant.metaculus.com/projects/e80a5e79-b71f-4c4b-bf4a-821497fedcee), inspected 29 October: raw animal weights P10/P50/P90 1.87/5.93/17.3 percentage points; three predictions, two people. It normalizes nonnegative weights across nine causes in each draw. These are not normalized-share percentiles. Its individuals cover both labs through end-2031. Our 5% conditional center is informed by that comparison, not a fitted translation. Its [authors describe the forecasts' limitations](https://metaculus.substack.com/p/ai-ipo-windfall-forecasting-funding-cause-area-biosecurity-ai-safety-risk). Do not divide its multi-year dollars into yearly grants. The map omits the Public Benefit Fund and has no OpenAI Foundation animal channel; our latter pathway remains explicitly speculative and is tested off.
- [RP's 2024 EA Survey](https://forum.effectivealtruism.org/posts/CKwDgZGLipchAoxtN/ea-survey-2024-cause-prioritization): preferred animal-resource allocation is around 24%. This is neither actual donation allocation nor a representative, wealth-weighted AI-donor sample. Keep 24% as a high-share stress test, not the default.
- [Weinstock, 30 July 2026](https://frontieranimals.substack.com/p/the-san-francisco-strategy-for-animal): a capacity-building strategy and conditional liquidity scenario, not a calibrated funding prediction. Its ambition does not supply measured recipient capacity or confirmed lockup terms. No timing acceleration follows from it.
- [RP's wild-animal funding survey, 14 August 2026](https://rethinkpriorities.org/research-area/wild-animal-welfare-rfmf/): a narrow, self-reported 2027 funding-gap exercise, not an all-animal absorption estimate. We add capacity context without treating it as a universal ceiling. Cash receipt and effective deployment can diverge.

The [Anthropic fund announcement](https://www.anthropic.com/news/public-benefit-fund), [financing valuation](https://www.anthropic.com/news/series-h), [IPO announcement](https://www.anthropic.com/news/s1-sec), and [OpenAI Foundation plan](https://openai.com/index/update-on-the-openai-foundation/) remain scale or institutional-priority anchors. None estimates this target's animal allocation or payout rate. This review did not add a new valuation or liquidity event.

## Parameter inventory and sensitivity

No parameters are fitted to outcomes. The model has no internal moment-matching block to re-solve. All other inputs stay fixed during each one-at-a-time sweep. The ranges below are judgmental plausibility tests, not literature-derived confidence intervals. The 24% endpoint deliberately tests the survey-preference mismatch; the 10% fund stake is a hypothetical size change, not a new commitment.

Dollar values below are **millions**, except the valuation input, which is billions. Other input values are percentages. Full definitions, provenance flags, all cell outputs and input vectors are in [diagnostics.json](diagnostics.json).

| Input | Default | Swept values | Median range ($M) |
| --- | ---: | --- | ---: |
| Anthropic valuation ($B), financing anchor | 965 | 300, 965, 1800 | 50.7–285.5 |
| Personal equity pool, derived approximation | 15 | 7.5, 15, 20 | 81.2–203.7 |
| Personal realization, judgment | 60 | 30, 60, 90 | 80.7–238.9 |
| Personal future payout, judgment | 5 | 1, 2, 5, 12 | 35.4–359.6 |
| Personal animal uptake, judgment | 85 | 40, 65, 85, 95 | 1.7–192.0 |
| Conditional personal animal share, judgment | 5 | 1, 2, 5, 10, 24 | 35.7–673.3 |
| Proposed fund equity, announcement anchor | 5 | 0, 5, 10 | 149.7–159.3 |
| Fund approval, judgment | 90 | 50, 90, 100 | 152.4–156.0 |
| Fund realization, judgment | 60 | 30, 60, 90 | 152.8–157.5 |
| Fund payout, judgment | 3 | 0, 3, 8 | 149.7–160.6 |
| Fund animal uptake, judgment | 20 | 0, 20, 50 | 149.7–162.6 |
| Conditional fund animal share, judgment | 1 | 0, 1, 5 | 149.7–164.6 |
| Prospective OpenAI envelope ($B), judgment | 1 | 0, 1, 2 | 151.1–158.6 |
| OpenAI cash conversion, judgment | 80 | 40, 80, 100 | 152.9–156.8 |
| OpenAI animal uptake, judgment | 15 | 0, 15, 40 | 151.1–161.1 |
| Conditional OpenAI animal share, judgment | 1 | 0, 1, 5 | 151.1–166.5 |

The 15% pool approximates total public-good shares less the proposed 5% fund stake. It is not a disclosed founder/employee cap table. Matching is inside this pool; adding it separately would double count. Realization includes pledge fulfillment and realizable value; the payout fraction then concerns future recipient cash by the deadline. This aggregate treatment cannot identify individual donors' behavior.

## Rerun results

All cells use 20,000 draws and seed 20261029, with common random worlds. The script attempted 52 one-at-a-time and 44 pairwise-grid cells; all 96 produced finite nonnegative outputs. There is no equilibrium solver or branch selection. Pairwise grids cross personal allocation with payout, uptake, and valuation. Their median range is $1.1M–$698.9M; 28 of 44 cells have medians below $100M. The grid-cell count is not a probability. A median above $100M is therefore not robust across these plausible settings.

| Scenario | Median ($M) | P10–P90 ($M) |
| --- | ---: | ---: |
| Original assumptions | 33.8 | 0–662.5 |
| Only uptake increased | 67.1 | 0–778.0 |
| Only conditional share increased | 74.5 | 0–1478.7 |
| Both changes: reviewed defaults | 155.3 | 0–1749.2 |
| Payout 2%, share 2%, uptake 65% | 15.6 | 0–301.5 |
| Payout 12%, share 10%, uptake 95% | 857.5 | 56.8–7238.6 |

The revised default mean is $768.8M; the median is much lower because of the long upper tail. Model probabilities are 13.4% for exactly zero, 82.1% for at least $10M, and 57.8% for at least $100M. They are conditional on the chosen model, not measured frequencies.

Mechanism shutoffs: removing the personal pool reduces the median to zero (P90 $28.5M). Removing the Public Benefit Fund leaves $149.7M; removing the OpenAI Foundation leaves $151.1M. Removing both institutional paths leaves $145.3M. Summed individual median losses are $165.1M, exceeding the baseline by $9.8M: the interaction residual is −$9.8M. These are nonlinear sensitivity effects, not additive channel shares. The sum of cash flows within each draw is an accounting identity; its forecast distribution is model-determined.

## Distribution and code checks

Hidden distribution choices are also assumptions: valuation log-SD 0.6; OpenAI envelope log-SD 0.5; log-odds widths 0.7 for realization, 1.0 for personal payout, 1.2 for fund payout and animal shares, 0.6 for OpenAI cash conversion. Valuation/liquidity loading is 0.5; shared liquidity enters personal realization at 0.5 and payout at 0.7. Cause-event loading is 0.6, with independent loading 0.8; allocation loads at −0.5 on the common cause shock. All residual loadings preserve unit marginal variance. The 5% animal-share input locates the distribution before event selection; the actual median share conditional on uptake can be higher. It is not a fitted conditional median. These widths and correlations are not empirically calibrated.

Halving continuous widths gives a $186.2M median and $652.0M P90; multiplying them by 1.5 gives $130.5M and $4.164B. Making uptake events independent gives $142.2M and $1.633B; stronger common uptake loading (0.9) gives $161.7M and $1.836B. Allocation shocks remain shared in both latter cases. Event probabilities remain unchanged when widths change. This audit does not exhaust alternative distributions or dependence structures.

Three seeds give medians $149.6M–$158.2M and P90s $1.749B–$1.869B. Simulation noise is small relative to assumption uncertainty, but the reported digits are not economic precision. Exact-zero/100% behavior, approval gates, monotonicity in paired worlds, original-output reproduction, and zero-width/certain-event equality with the written product are checked in the test script.

There are no matched post-review cash outcomes, non-target validation moments, or fitted estimates. Out-of-sample forecast accuracy, identification and formal estimated-moment sensitivity are **not established**, rather than passed. No capacity estimate validates the upper tail. A future donor-specific split, confirmed sale terms, recipient-level cash data and cause-allocation elicitation would be more informative than another decimal place.

## Reproduce and continue

From the app folder:

```sh
node --experimental-strip-types scripts/diagnose_animal_welfare_model.mjs
node --experimental-strip-types scripts/verify_animal_welfare_model.mjs
npm run build
```

The first command regenerates the numerical log. Model: `src/utils/animalWelfareModel.ts`; source decisions and frozen reviews: `src/content/animalWelfare.ts`; public history/feed: `src/content/tracker.ts`; page: `src/AnimalWelfareApp.tsx`. AIS/EA, GH&D, and the frozen October 2 comparison calculations are unchanged by this review.
