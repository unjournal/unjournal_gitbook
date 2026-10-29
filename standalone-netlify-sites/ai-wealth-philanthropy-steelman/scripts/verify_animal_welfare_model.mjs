// Run with Node 22+: node --experimental-strip-types scripts/verify_animal_welfare_model.mjs
import assert from "node:assert/strict";
import { animalWelfareInitialForecast } from "../src/content/animalWelfare.ts";
import { calculateAnimalWelfareModel, defaultAnimalWelfareInputs, runAnimalWelfareSimulation } from "../src/utils/animalWelfareModel.ts";

const defaults = { ...defaultAnimalWelfareInputs };
const summary = runAnimalWelfareSimulation(defaults);
assert.equal(summary.medianB, animalWelfareInitialForecast.medianB, "Freeze a reviewed tracker point when defaults change");
assert.equal(summary.low80B, animalWelfareInitialForecast.low80B);
assert.equal(summary.high80B, animalWelfareInitialForecast.high80B);
assert(summary.low80B <= summary.medianB && summary.medianB <= summary.high80B);
assert(summary.probabilityZero > 0.1 && summary.probabilityZero < 0.5, "Defaults must allow meaningful zero-funding scenarios");
assert.deepEqual(runAnimalWelfareSimulation(defaults, 100).samples, runAnimalWelfareSimulation(defaults, 100).samples, "Seeded worlds reproduce");

const zeroAllocation = { ...defaults, personalAwAllocationPct: 0, publicFundAwAllocationPct: 0, openAiAwAllocationPct: 0 };
const zeroUptake = { ...defaults, personalAwUptakePct: 0, publicFundAwUptakePct: 0, openAiAwUptakePct: 0 };
const noCapital = { ...defaults, anthropicValuationB: 0, openAiProgramEnvelopeB: 0 };
for (const inputs of [zeroAllocation, zeroUptake, noCapital]) {
  const result = runAnimalWelfareSimulation(inputs, 1000);
  assert.equal(result.high80B, 0);
  assert.equal(result.probabilityZero, 1);
  assert.equal(calculateAnimalWelfareModel(inputs).totalB, 0);
}

const certainPersonal = { ...defaults, personalAwUptakePct: 100, publicFundAwUptakePct: 0, openAiAwUptakePct: 0 };
assert.equal(runAnimalWelfareSimulation(certainPersonal, 1000).probabilityZero, 0, "100% uptake must be exact");
const publicOnlyUnapproved = { ...defaults, personalAwUptakePct: 0, openAiAwUptakePct: 0, publicFundAwUptakePct: 100, publicFundApprovalPct: 0 };
assert.equal(runAnimalWelfareSimulation(publicOnlyUnapproved, 1000).probabilityZero, 1, "Approval is a genuine gate");

const halved = { ...defaults, personalAwAllocationPct: defaults.personalAwAllocationPct / 2, publicFundAwAllocationPct: defaults.publicFundAwAllocationPct / 2, openAiAwAllocationPct: defaults.openAiAwAllocationPct / 2 };
const smaller = runAnimalWelfareSimulation(halved);
assert(smaller.samples.every((value, index) => value <= summary.samples[index]), "Common random worlds preserve allocation monotonicity");
assert(smaller.medianB < summary.medianB);
assert.equal(smaller.probabilityZero, summary.probabilityZero, "Lower conditional shares do not change uptake events");

for (const value of Object.values(calculateAnimalWelfareModel({ ...defaults, anthropicValuationB: Number.NaN, openAiProgramEnvelopeB: -10 }))) {
  assert(Number.isFinite(value) && value >= 0);
}
console.log(`Animal-welfare model checks passed: median $${(summary.medianB * 1000).toFixed(1)}M; P10–P90 $${(summary.low80B * 1000).toFixed(1)}M–$${(summary.high80B * 1000).toFixed(1)}M; zero ${(summary.probabilityZero * 100).toFixed(1)}%.`);
