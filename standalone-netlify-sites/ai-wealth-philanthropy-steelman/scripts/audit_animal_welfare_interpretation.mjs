// Node 22+: node --experimental-strip-types scripts/audit_animal_welfare_interpretation.mjs
// Reproduces the interpretation audit without modifying the historical diagnostics log.
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { initialAnimalWelfareInputs as original, defaultAnimalWelfareInputs as reference, runAnimalWelfareSimulation as run } from "../src/utils/animalWelfareModel.ts";
const cases = [
  ["Lower-allocation scenario", original],
  ["Only pooled gate changed", { ...original, personalAwUptakePct: 85 }],
  ["Only animal-share setting changed", { ...original, personalAwAllocationPct: 5 }],
  ["Higher-allocation reference", reference]
].map(([label, inputs]) => {
  const { samples, ...summary } = run(inputs);
  assert(samples.every(value => Number.isFinite(value) && value >= 0));
  return { label, inputs, summary };
});
const report = {
  date: "2026-10-29", adoptedForecast: false,
  purpose: "Interpretation review only; no new empirical inputs, mixture weights, midpoint, or donor-specific structure inferred",
  cases,
  gateOnlyMedianRatio: cases[1].summary.medianB / cases[0].summary.medianB,
  gateOnlyMeanRatio: cases[1].summary.meanB / cases[0].summary.meanB,
  combinedMedianRatio: cases[3].summary.medianB / cases[0].summary.medianB,
  verdict: "Both parameter sets remain illustrative. The pooled Bernoulli gate can strongly move the median without comparable movement in the mean. Sensitivity checks do not validate assumptions or interval coverage."
};
await writeFile(new URL("../research/animal-welfare-2026-10-29/interpretation-audit.json", import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
