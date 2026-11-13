# November 13 quantitative-model diagnostics

Illustrative stress grids, not empirical credible parameter ranges. All non-varied inputs held fixed; latent-factor joint sampling unchanged. No internal fitting targets or held-out recipient-cash dataset exist. Results cannot validate coverage or forecast accuracy.

The only adopted numerical input change resolves the initial fund-issuance gate. The filing does not calibrate a new donor cause share or payout rate. Historical tender liquidity and proposed founder IPO sales counter a blanket no-liquidity assumption. Differentiated lockups preserve timing uncertainty.

| Route | Prior median | Current median | Current P10 | Current P90 |
|---|---:|---:|---:|---:|
| main | 0.757 | 0.771 | 0.046 | 3.814 |
| globalDevelopment | 0.558 | 0.567 | 0.110 | 3.520 |

Elapsed days since prior snapshot: 15; days to the fixed target: 413. No mechanical time decay was applied.

Coverage: 43 input rows; 82/82 one-at-a-time cells and 24/24 joint-grid cells solved. No failed cells were omitted.

## Free parameters and anchors

| Route | Input | Value | Provenance |
|---|---|---:|---|
| main | anthropicValuationB | 965 | Historical Series H anchor, not current common-equity or post-offering valuation; scenario proxy |
| main | founderOwnershipPct | 12 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | founderPledgePct | 80 | Issuer-disclosed pledge; realization, follow-through, and dates are not guaranteed |
| main | founderRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | founderFollowThroughPct | 45 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | founderAisEaAllocationPct | 20 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | founderDeploymentByEnd2027Pct | 7 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | employeeCommittedPoolB | 20 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | employeeRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | employeeAisEaAllocationPct | 50 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | employeeDeploymentByEnd2027Pct | 10 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | publicBenefitFundEquityPct | 5 | Issuer-disclosed June 30 fully diluted historical basis; not post-offering ownership |
| main | publicBenefitFundApprovalPct | 100 | Initial contribution disclosed in SEC filing; resolved at 100, not an external-grant guarantee |
| main | publicBenefitFundRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | publicBenefitFundAisEaAllocationPct | 10 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | publicBenefitFundDeploymentByEnd2027Pct | 5 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | localRumorAdjustmentPct | 100 | Subjective scenario assumption; no matched-population empirical calibration established |
| main | nearTermDeploymentCapB | 5 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | anthropicValuationB | 965 | Historical Series H anchor, not current common-equity or post-offering valuation; scenario proxy |
| globalDevelopment | founderOwnershipPct | 12 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | founderPledgePct | 80 | Issuer-disclosed pledge; realization, follow-through, and dates are not guaranteed |
| globalDevelopment | founderRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | founderFollowThroughPct | 45 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | founderGhdAllocationPct | 15 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | founderDeploymentByEnd2027Pct | 7 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | employeeCommittedPoolB | 20 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | employeeRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | employeeGhdAllocationPct | 20 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | employeeDeploymentByEnd2027Pct | 10 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | publicBenefitFundEquityPct | 5 | Issuer-disclosed June 30 fully diluted historical basis; not post-offering ownership |
| globalDevelopment | publicBenefitFundApprovalPct | 100 | Initial contribution disclosed in SEC filing; resolved at 100, not an external-grant guarantee |
| globalDevelopment | publicBenefitFundRealizationPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | publicBenefitFundGhdAllocationPct | 10 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | publicBenefitFundDeploymentByEnd2027Pct | 5 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | namedProgramsB | 0.31 | Named announcement total, mixed cash/in-kind and scopes; not paid cash |
| globalDevelopment | namedProgramsGhdAllocationPct | 70 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | namedProgramsCashEquivalentPct | 60 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | namedProgramsDeploymentByEnd2027Pct | 40 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | openAiOtherPlanB | 0.79 | Illustrative residual subtraction; not reconciled unspent budget |
| globalDevelopment | openAiGhdAllocationPct | 10 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | openAiCashEquivalentPct | 70 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | openAiDeploymentByEnd2027Pct | 80 | Subjective scenario assumption; no matched-population empirical calibration established |
| globalDevelopment | nearTermDeploymentCapB | 10 | Subjective scenario assumption; no matched-population empirical calibration established |

## Joint valuation and founder-payout scenarios

Other inputs held fixed. These ranges are stress scenarios, not inferred bounds or a replacement forecast. No breaking-set or robust-calibration claim is made.

| Route | Valuation B | Founder payout % | Median B | P10 B | P90 B |
|---|---:|---:|---:|---:|---:|
| main | 965 | 3 | 0.646 | 0.038 | 3.220 |
| main | 965 | 5 | 0.708 | 0.041 | 3.533 |
| main | 965 | 7 | 0.771 | 0.046 | 3.814 |
| main | 965 | 10 | 0.852 | 0.052 | 4.228 |
| main | 1100 | 3 | 0.667 | 0.040 | 3.333 |
| main | 1100 | 5 | 0.739 | 0.044 | 3.675 |
| main | 1100 | 7 | 0.810 | 0.049 | 4.000 |
| main | 1100 | 10 | 0.902 | 0.056 | 4.474 |
| main | 1400 | 3 | 0.722 | 0.043 | 3.541 |
| main | 1400 | 5 | 0.809 | 0.050 | 3.939 |
| main | 1400 | 7 | 0.891 | 0.055 | 4.331 |
| main | 1400 | 10 | 1.007 | 0.063 | 4.797 |
| globalDevelopment | 965 | 3 | 0.466 | 0.103 | 2.660 |
| globalDevelopment | 965 | 5 | 0.517 | 0.106 | 3.111 |
| globalDevelopment | 965 | 7 | 0.567 | 0.110 | 3.520 |
| globalDevelopment | 965 | 10 | 0.640 | 0.116 | 4.096 |
| globalDevelopment | 1100 | 3 | 0.490 | 0.106 | 2.850 |
| globalDevelopment | 1100 | 5 | 0.548 | 0.110 | 3.351 |
| globalDevelopment | 1100 | 7 | 0.606 | 0.113 | 3.793 |
| globalDevelopment | 1100 | 10 | 0.686 | 0.120 | 4.444 |
| globalDevelopment | 1400 | 3 | 0.542 | 0.111 | 3.147 |
| globalDevelopment | 1400 | 5 | 0.613 | 0.115 | 3.716 |
| globalDevelopment | 1400 | 7 | 0.677 | 0.120 | 4.283 |
| globalDevelopment | 1400 | 10 | 0.777 | 0.127 | 5.025 |

## Mechanism shutoffs

Mean reductions under each shutoff are not additive attribution shares: caps and correlated/nonlinear gates can create interaction residuals.

| Route | Channel removed | Mean without B | Mean reduction B |
|---|---|---:|---:|
| main | founder | 1.077 | 0.451 |
| main | employee | 0.868 | 0.659 |
| main | fund | 1.374 | 0.154 |
| globalDevelopment | founder | 0.844 | 0.577 |
| globalDevelopment | employee | 0.994 | 0.427 |
| globalDevelopment | fund | 1.166 | 0.255 |
| globalDevelopment | named | 1.366 | 0.055 |
| globalDevelopment | otherOpenAi | 1.367 | 0.054 |

main interaction residual B (full mean minus sum of shutoff reductions): 0.264.

globalDevelopment interaction residual B (full mean minus sum of shutoff reductions): 0.054.

## Coverage and limits

`scripts/verify_funding_models.mjs` checks boundaries, exact zero/100% behavior, fixed-seed reproducibility, tracker equality, and frozen history. This script verifies source-input arithmetic and re-runs the adopted correction plus stress cases. It does not prove the assumed distributions are realistic.

Calibration-fit/identification, posterior informativeness, regression bootstrap, equilibrium uniqueness, and alternative equilibrium solvers: NOT_APPLICABLE. This model is a forward product-and-cap scenario simulation, not an estimated structural equilibrium or time-series fit. Empirical out-of-sample validation: BLOCKED by the lack of a comparable, cause-specific recipient-cash dataset. The proposed IPO range and accounting expense are not substitute outcome data.

Reproduce: `node scripts/review_november_forecasts.mjs`. Machine output: `diagnostics.json`. Discrepancy decisions and the independent check: `DISCREPANCY_LOG.md`.
