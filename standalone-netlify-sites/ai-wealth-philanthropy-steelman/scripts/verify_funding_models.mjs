import assert from "node:assert/strict";
import { build } from "esbuild";

const compiled = await build({
  stdin: {
    contents: `
      export { defaultModelInputs } from './src/content/modelDefaults';
      export { calculateModel } from './src/utils/model';
      export { runCorrelatedSimulation, defaultCorrelatedConfig } from './src/utils/correlatedModel';
      export { defaultGlobalDevelopmentInputs, calculateGlobalDevelopmentModel } from './src/utils/globalDevelopmentModel';
      export { runGlobalDevelopmentSimulation } from './src/utils/globalDevelopmentCorrelatedModel';
      export { trackerData } from './src/content/tracker';
    `,
    resolveDir: new URL("../", import.meta.url).pathname,
    loader: "ts"
  }, bundle: true, format: "esm", platform: "node", write: false
});
const m = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString("base64")}`);
const cfg = { ...m.defaultCorrelatedConfig, draws: 2000 };
const central = m.calculateModel(m.defaultModelInputs).capacityAdjustedTotalB;
const fixed = m.runCorrelatedSimulation(m.defaultModelInputs, { ...cfg, uncertaintyScale: 0 });
assert.ok(fixed.draws.every(d => Math.abs(d.totalB - central) < 1e-12), "Zero uncertainty must reproduce the central scenario in every draw");
const noGiving = { ...m.defaultModelInputs, founderAisEaAllocationPct: 0, employeeAisEaAllocationPct: 0, publicBenefitFundAisEaAllocationPct: 0 };
assert.equal(m.runCorrelatedSimulation(noGiving, cfg).summary.p95, 0, "Zero cause shares must prevent giving");
const fundOnly = { ...m.defaultModelInputs, founderOwnershipPct: 0, employeeCommittedPoolB: 0, publicBenefitFundApprovalPct: 0 };
assert.equal(m.runCorrelatedSimulation(fundOnly, cfg).summary.mean, 0, "An unapproved fund cannot disburse");
const zeroCap = { ...m.defaultModelInputs, nearTermDeploymentCapB: 0 };
assert.equal(m.runCorrelatedSimulation(zeroCap, cfg).summary.mean, 0, "Zero capacity must be respected");
assert.deepEqual(m.runCorrelatedSimulation(m.defaultModelInputs, cfg).summary, m.runCorrelatedSimulation(m.defaultModelInputs, cfg).summary, "A fixed seed must reproduce outputs");
const noGlobal = { ...m.defaultGlobalDevelopmentInputs, founderGhdAllocationPct: 0, employeeGhdAllocationPct: 0, publicBenefitFundGhdAllocationPct: 0, namedProgramsGhdAllocationPct: 0, openAiGhdAllocationPct: 0 };
assert.equal(m.runGlobalDevelopmentSimulation(noGlobal).mean, 0, "GH&D zero cause shares must prevent every pathway");
const main = m.runCorrelatedSimulation(m.defaultModelInputs, m.defaultCorrelatedConfig).summary;
const global = m.runGlobalDevelopmentSimulation(m.defaultGlobalDevelopmentInputs);
for (const [key, summary] of [["main", main], ["globalDevelopment", global]]) {
  const current = m.trackerData.routes[key].forecastHistory.at(-1);
  assert.equal(current.medianB, summary.p50, "Tracker must match its model");
  assert.equal(current.low80B, summary.p10);
  assert.equal(current.high80B, summary.p90);
  assert.ok(summary.p10 <= summary.p50 && summary.p50 <= summary.p90);
  assert.ok(summary.probabilityOver1B >= 0 && summary.probabilityOver1B <= 1);
}
assert.equal(m.trackerData.routes.main.forecastHistory.find(p => p.date === "2026-10-21").medianB, 0.9409303448726277, "A new model must not rewrite October 21 history");
assert.equal(m.trackerData.routes.globalDevelopment.forecastHistory.find(p => p.date === "2026-10-21").medianB, 0.668973503069852);
assert.ok(Math.abs(m.defaultGlobalDevelopmentInputs.openAiOtherPlanB - (1 - .05 - .06 - .1)) < 1e-12, "Residual-envelope subtraction");
assert.equal(m.trackerData.routes.animalWelfare.adoptedForecast, false, "Feed must not promote an AW scenario to an adopted forecast");
assert.equal(m.trackerData.routes.animalWelfare.forecastHistory.at(-1).estimateKind, "illustrative-scenario");
assert.equal(m.trackerData.routes.animalWelfare.scenarios.length, 2, "Both published AW parameter sets stay accessible");
for (const route of Object.values(m.trackerData.routes)) {
  const dates = route.forecastHistory.map(p => p.date);
  assert.equal(new Set(dates).size, dates.length, "One snapshot per route/date");
  assert.deepEqual(dates, [...dates].sort());
}
console.log(JSON.stringify({ checks: "passed", main, globalDevelopment: global }, null, 2));
