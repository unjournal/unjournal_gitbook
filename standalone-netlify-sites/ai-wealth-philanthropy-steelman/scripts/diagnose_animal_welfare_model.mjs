// Node 22+: node --experimental-strip-types scripts/diagnose_animal_welfare_model.mjs
// Generates numeric audit data only. No network calls, fitted parameters, or omitted failed cells.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import {
  animalWelfareInputGroups, calculateAnimalWelfareModel,
  defaultAnimalWelfareInputs as defaults, initialAnimalWelfareInputs,
  runAnimalWelfareSimulation as run
} from "../src/utils/animalWelfareModel.ts";

const summarize = (inputs, options = {}, seed = 20261029) => {
  const { samples, ...summary } = run(inputs, 20000, seed, options);
  assert(samples.every(value => Number.isFinite(value) && value >= 0));
  return summary;
};
// Plausibility ranges are judgments, not published confidence intervals or a new prior.
const ranges = {
  anthropicValuationB: [300, 965, 1800], personalPledgedEquityPct: [7.5, 15, 20],
  personalRealizationPct: [30, 60, 90], personalPaidByEnd2027Pct: [1, 2, 5, 12],
  personalAwUptakePct: [40, 65, 85, 95], personalAwAllocationPct: [1, 2, 5, 10, 24],
  publicFundEquityPct: [0, 5, 10], publicFundApprovalPct: [50, 90, 100],
  publicFundRealizationPct: [30, 60, 90], publicFundPaidByEnd2027Pct: [0, 3, 8],
  publicFundAwUptakePct: [0, 20, 50], publicFundAwAllocationPct: [0, 1, 5],
  openAiProgramEnvelopeB: [0, 1, 2], openAiCashPaidPct: [40, 80, 100],
  openAiAwUptakePct: [0, 15, 40], openAiAwAllocationPct: [0, 1, 5]
};
const inventory = animalWelfareInputGroups.flatMap(group => group.specs).map(spec => ({
  key: spec.key, label: spec.label, value: defaults[spec.key], unit: spec.unit,
  provenance: spec.anchor, definitionAndLimit: spec.description, sweepValues: ranges[spec.key]
}));
assert.equal(inventory.length, Object.keys(defaults).length);
const oneAtATime = inventory.flatMap(spec => ranges[spec.key].map(value => ({
  key: spec.key, value, summary: summarize({ ...defaults, [spec.key]: value })
})));
const joint = [];
for (const first of ["personalPaidByEnd2027Pct", "personalAwUptakePct", "anthropicValuationB"]) {
  for (const firstValue of ranges[first]) for (const share of [1, 2, 5, 10]) {
    joint.push({ first, firstValue, personalAwAllocationPct: share,
      summary: summarize({ ...defaults, [first]: firstValue, personalAwAllocationPct: share }) });
  }
}
const scenarios = [
  ["Original published assumptions", initialAnimalWelfareInputs],
  ["Uptake change only", { ...initialAnimalWelfareInputs, personalAwUptakePct: 85 }],
  ["Allocation change only", { ...initialAnimalWelfareInputs, personalAwAllocationPct: 5 }],
  ["Reviewed defaults", defaults],
  ["Joint slower, weaker allocation", { ...defaults, personalPaidByEnd2027Pct: 2, personalAwAllocationPct: 2, personalAwUptakePct: 65 }],
  ["Joint faster, broader allocation", { ...defaults, personalPaidByEnd2027Pct: 12, personalAwAllocationPct: 10, personalAwUptakePct: 95 }]
].map(([label, inputs]) => ({ label, inputs, summary: summarize(inputs) }));
const baseline = summarize(defaults);
const shutoffs = [
  ["Personal pool off", { ...defaults, personalAwUptakePct: 0 }],
  ["Public Benefit Fund off", { ...defaults, publicFundAwUptakePct: 0 }],
  ["OpenAI Foundation off", { ...defaults, openAiAwUptakePct: 0 }],
  ["All institutional animal giving off", { ...defaults, publicFundAwUptakePct: 0, openAiAwUptakePct: 0 }],
  ["All pathways off", { ...defaults, personalAwUptakePct: 0, publicFundAwUptakePct: 0, openAiAwUptakePct: 0 }]
].map(([label, inputs]) => ({ label, summary: summarize(inputs) }));
const individualLossSumB = shutoffs.slice(0, 3).reduce((sum, row) => sum + baseline.medianB - row.summary.medianB, 0);
const distributionChecks = [
  { label: "Half continuous widths; event probabilities unchanged", options: { uncertaintyScale: 0.5 } },
  { label: "Default continuous widths", options: {} },
  { label: "1.5 times continuous widths; event probabilities unchanged", options: { uncertaintyScale: 1.5 } },
  { label: "Independent uptake events; allocation shocks still shared", options: { commonCauseLoading: 0 } },
  { label: "Stronger common uptake loading", options: { commonCauseLoading: 0.9 } }
].map(row => ({ ...row, summary: summarize(defaults, row.options) }));
const seedChecks = [20261029, 20261030, 20261031].map(seed => ({ seed, summary: summarize(defaults, {}, seed) }));
// A continuous monotonicity check in paired worlds, not just rounded summaries.
const smaller = run({ ...defaults, personalAwAllocationPct: 2 });
const larger = run(defaults);
assert(smaller.samples.every((value, index) => value <= larger.samples[index]));
const output = {
  reviewDate: "2026-10-29", target: "Recipient cash from modeled pathways, 2026-10-29 through 2027-12-31; nominal USD billions",
  method: "20,000 common-seed draws per cell; all other inputs held fixed; no fitted block to re-solve",
  baseline, original: summarize(initialAnimalWelfareInputs), plugInWeighted: calculateAnimalWelfareModel(defaults),
  inventory, oneAtATime, joint, scenarios, shutoffs,
  medianAttribution: { individualLossSumB, interactionResidualB: baseline.medianB - individualLossSumB },
  distributionChecks, seedChecks,
  cellCounts: { oneAtATimeAttempted: oneAtATime.length, oneAtATimeFinite: oneAtATime.length, jointAttempted: joint.length, jointFinite: joint.length },
  below100MMedianCells: joint.filter(row => row.summary.medianB < 0.1).map(({ summary, ...settings }) => settings),
  validation: "No matched post-review donor-cash outcomes or fitted targets. Out-of-sample accuracy and formal moment sensitivity are not established."
};
const outputDirectory = new URL("../research/animal-welfare-2026-10-29/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });
await writeFile(new URL("diagnostics.json", outputDirectory), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ baseline, scenarios, shutoffs, medianAttribution: output.medianAttribution, distributionChecks, seedChecks,
  cellCounts: output.cellCounts, jointMedianRangeB: [Math.min(...joint.map(row => row.summary.medianB)), Math.max(...joint.map(row => row.summary.medianB))],
  below100MMedianCells: output.below100MMedianCells.length }, null, 2));
