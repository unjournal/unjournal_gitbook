import assert from "node:assert/strict";
import fs from "node:fs";
import { build } from "esbuild";

// Reproducible review, not an empirical calibration or a confidence-coverage test.
const compiled = await build({ stdin: { contents: `
  export { defaultModelInputs } from './src/content/modelDefaults';
  export { runCorrelatedSimulation, defaultCorrelatedConfig } from './src/utils/correlatedModel';
  export { defaultGlobalDevelopmentInputs } from './src/utils/globalDevelopmentModel';
  export { runGlobalDevelopmentSimulation } from './src/utils/globalDevelopmentCorrelatedModel';
  export { trackerData } from './src/content/tracker';
  export { anthropicIpo } from './src/content/anthropicIpo';
`, resolveDir: new URL("../", import.meta.url).pathname, loader: "ts" }, bundle: true, platform: "node", format: "esm", write: false });
const m = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString("base64")}`);
const run = (route, input) => route === "main"
  ? m.runCorrelatedSimulation(input, m.defaultCorrelatedConfig).summary
  : m.runGlobalDevelopmentSimulation(input);
const defaults = { main: m.defaultModelInputs, globalDevelopment: m.defaultGlobalDevelopmentInputs };
const inputAnchor = key => ({
  anthropicValuationB: "Historical Series H anchor, not current common-equity or post-offering valuation; scenario proxy",
  founderPledgePct: "Issuer-disclosed pledge; realization, follow-through, and dates are not guaranteed",
  publicBenefitFundEquityPct: "Issuer-disclosed June 30 fully diluted historical basis; not post-offering ownership",
  publicBenefitFundApprovalPct: "Initial contribution disclosed in SEC filing; resolved at 100, not an external-grant guarantee",
  namedProgramsB: "Named announcement total, mixed cash/in-kind and scopes; not paid cash",
  openAiOtherPlanB: "Illustrative residual subtraction; not reconciled unspent budget"
}[key] ?? "Subjective scenario assumption; no matched-population empirical calibration established");
const inventory = [], oneAtATime = [], jointGrid = [], mechanisms = [], comparisons = {};
for (const [route, input] of Object.entries(defaults)) {
  comparisons[route] = { prior: run(route, { ...input, publicBenefitFundApprovalPct: 90 }), current: run(route, input) };
  for (const [key, value] of Object.entries(input)) {
    inventory.push({ route, key, value, anchor: inputAnchor(key), internallyFitted: false });
    if (key === "publicBenefitFundApprovalPct") continue; // Resolved fact, not an uncertain parameter.
    const upperLimit = key.endsWith("Pct") ? 100 : Infinity;
    for (const factor of [0.75, 1.25]) {
      const perturbed = Math.min(upperLimit, value * factor);
      const summary = run(route, { ...input, [key]: perturbed });
      assert(Number.isFinite(summary.p50));
      oneAtATime.push({ route, key, factor, input: perturbed, ...summary });
    }
  }
  for (const valuationB of [965, 1100, 1400]) for (const founderPayoutPct of [3, 5, 7, 10]) {
    jointGrid.push({ route, valuationB, founderPayoutPct, ...run(route, { ...input, anthropicValuationB: valuationB, founderDeploymentByEnd2027Pct: founderPayoutPct }) });
  }
  for (const [channel, key] of Object.entries({ founder: "founderOwnershipPct", employee: "employeeCommittedPoolB", fund: "publicBenefitFundEquityPct", ...(route === "globalDevelopment" ? { named: "namedProgramsB", otherOpenAi: "openAiOtherPlanB" } : {}) })) {
    const off = run(route, { ...input, [key]: 0 });
    mechanisms.push({ route, channel, meanWithoutB: off.mean, meanReductionB: comparisons[route].current.mean - off.mean });
  }
  const latest = m.trackerData.routes[route].forecastHistory.at(-1);
  assert.equal(latest.date, "2026-11-13");
  assert.equal(latest.medianB, comparisons[route].current.p50);
  assert.equal(latest.inputsChanged, true);
  const historical = m.trackerData.routes[route].forecastHistory.find(p => p.date === "2026-10-29");
  assert.equal(historical.medianB, comparisons[route].prior.p50);
}
const facts = m.anthropicIpo;
assert.equal(facts.offeredShares, facts.companyShares + facts.sellingStockholderShares);
assert.equal(facts.sellingStockholderShares, facts.founderCount * facts.offeredPerFounder);
const factCalculations = {
  proposedFounderGrossB: [facts.priceLow, facts.priceHigh].map(p => facts.sellingStockholderShares * p / 1e9),
  approximateAprilTenderB: facts.tenderApproxShares * facts.tenderPrice / 1e9,
  daysSincePreviousForecast: (Date.parse("2026-11-13") - Date.parse("2026-10-29")) / 86400000,
  remainingDaysToTarget: (Date.parse("2027-12-31") - Date.parse("2026-11-13")) / 86400000
};
const output = { reviewed: "2026-11-13", units: "billions of nominal USD; grants by end-2027", config: m.defaultCorrelatedConfig, comparisons, factCalculations, inventory, oneAtATime, jointGrid, mechanisms,
  coverage: { inputRows: inventory.length, oatSolved: oneAtATime.length, oatAttempted: oneAtATime.length, jointSolved: jointGrid.length, jointAttempted: jointGrid.length },
  interpretation: "Illustrative stress grids, not empirical credible parameter ranges. All non-varied inputs held fixed; latent-factor joint sampling unchanged. No internal fitting targets or held-out recipient-cash dataset exist. Results cannot validate coverage or forecast accuracy." };
const fmt = x => x.toFixed(3);
const lines = ["# November 13 quantitative-model diagnostics", "", output.interpretation, "",
  "The only adopted numerical input change resolves the initial fund-issuance gate. The filing does not calibrate a new donor cause share or payout rate. Historical tender liquidity and proposed founder IPO sales counter a blanket no-liquidity assumption. Differentiated lockups preserve timing uncertainty.", "",
  "| Route | Prior median | Current median | Current P10 | Current P90 |", "|---|---:|---:|---:|---:|"];
for (const [route, result] of Object.entries(comparisons)) lines.push(`| ${route} | ${fmt(result.prior.p50)} | ${fmt(result.current.p50)} | ${fmt(result.current.p10)} | ${fmt(result.current.p90)} |`);
lines.push("", `Elapsed days since prior snapshot: ${factCalculations.daysSincePreviousForecast}; days to the fixed target: ${factCalculations.remainingDaysToTarget}. No mechanical time decay was applied.`, "",
  `Coverage: ${output.coverage.inputRows} input rows; ${output.coverage.oatSolved}/${output.coverage.oatAttempted} one-at-a-time cells and ${output.coverage.jointSolved}/${output.coverage.jointAttempted} joint-grid cells solved. No failed cells were omitted.`, "",
  "## Free parameters and anchors", "", "| Route | Input | Value | Provenance |", "|---|---|---:|---|");
for (const item of inventory) lines.push(`| ${item.route} | ${item.key} | ${item.value} | ${item.anchor} |`);
lines.push("", "## Joint valuation and founder-payout scenarios", "", "Other inputs held fixed. These ranges are stress scenarios, not inferred bounds or a replacement forecast. No breaking-set or robust-calibration claim is made.", "", "| Route | Valuation B | Founder payout % | Median B | P10 B | P90 B |", "|---|---:|---:|---:|---:|---:|");
for (const row of jointGrid) lines.push(`| ${row.route} | ${row.valuationB} | ${row.founderPayoutPct} | ${fmt(row.p50)} | ${fmt(row.p10)} | ${fmt(row.p90)} |`);
lines.push("", "## Mechanism shutoffs", "", "Mean reductions under each shutoff are not additive attribution shares: caps and correlated/nonlinear gates can create interaction residuals.", "", "| Route | Channel removed | Mean without B | Mean reduction B |", "|---|---|---:|---:|");
for (const row of mechanisms) lines.push(`| ${row.route} | ${row.channel} | ${fmt(row.meanWithoutB)} | ${fmt(row.meanReductionB)} |`);
for (const [route, result] of Object.entries(comparisons)) lines.push(`\n${route} interaction residual B (full mean minus sum of shutoff reductions): ${fmt(result.current.mean - mechanisms.filter(r => r.route === route).reduce((s, r) => s + r.meanReductionB, 0))}.`);
lines.push("", "## Coverage and limits", "", "`scripts/verify_funding_models.mjs` checks boundaries, exact zero/100% behavior, fixed-seed reproducibility, tracker equality, and frozen history. This script verifies source-input arithmetic and re-runs the adopted correction plus stress cases. It does not prove the assumed distributions are realistic.", "",
  "Calibration-fit/identification, posterior informativeness, regression bootstrap, equilibrium uniqueness, and alternative equilibrium solvers: NOT_APPLICABLE. This model is a forward product-and-cap scenario simulation, not an estimated structural equilibrium or time-series fit. Empirical out-of-sample validation: BLOCKED by the lack of a comparable, cause-specific recipient-cash dataset. The proposed IPO range and accounting expense are not substitute outcome data.", "",
  "Reproduce: `node scripts/review_november_forecasts.mjs`. Machine output: `diagnostics.json`. Discrepancy decisions and the independent check: `DISCREPANCY_LOG.md`.", "");
const out = new URL("../research/forecast-review-2026-11-13/", import.meta.url);
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(new URL("diagnostics.json", out), JSON.stringify(output, null, 2) + "\n");
fs.writeFileSync(new URL("quantitative-model-diagnostics-REPORT.md", out), lines.join("\n"));
console.log(JSON.stringify({ comparisons, factCalculations, coverage: output.coverage }, null, 2));
