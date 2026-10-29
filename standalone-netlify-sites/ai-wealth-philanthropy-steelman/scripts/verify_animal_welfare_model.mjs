// Run with Node 22+: node --experimental-strip-types scripts/verify_animal_welfare_model.mjs
import assert from "node:assert/strict";
import { animalWelfareInitialForecast, animalWelfareReviewedForecast } from "../src/content/animalWelfare.ts";
import { calculateAnimalWelfareModel, defaultAnimalWelfareInputs, initialAnimalWelfareInputs, runAnimalWelfareSimulation } from "../src/utils/animalWelfareModel.ts";

const defaults = { ...defaultAnimalWelfareInputs };
const summary = runAnimalWelfareSimulation(defaults);
assert.equal(summary.medianB, animalWelfareReviewedForecast.medianB, "Freeze a reviewed tracker point when defaults change");
assert.equal(summary.low80B, animalWelfareReviewedForecast.low80B);
assert.equal(summary.high80B, animalWelfareReviewedForecast.high80B);
const original = runAnimalWelfareSimulation(initialAnimalWelfareInputs);
assert.equal(original.medianB, animalWelfareInitialForecast.medianB, "Original published assumptions must remain reproducible");
assert.equal(original.high80B, animalWelfareReviewedForecast.supersededSameDayReview.high80B);
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

const certain = { ...defaults, personalAwUptakePct: 100, publicFundAwUptakePct: 100, openAiAwUptakePct: 100, publicFundApprovalPct: 100 };
const fixed = runAnimalWelfareSimulation(certain, 100, 20261029, { uncertaintyScale: 0 });
const fixedCentral = calculateAnimalWelfareModel(certain).totalB;
assert(fixed.samples.every(value => Math.abs(value - fixedCentral) < 1e-12), "Zero-width, certain-event scenarios solve the stated product exactly");
const narrower = runAnimalWelfareSimulation(defaults, 2000, 20261029, { uncertaintyScale: 0.5 });
const wider = runAnimalWelfareSimulation(defaults, 2000, 20261029, { uncertaintyScale: 1.5 });
assert(wider.high80B > narrower.high80B, "Distribution-width diagnostics must change the tail");

for (const value of Object.values(calculateAnimalWelfareModel({ ...defaults, anthropicValuationB: Number.NaN, openAiProgramEnvelopeB: -10 }))) {
  assert(Number.isFinite(value) && value >= 0);
}
console.log(`Animal-welfare model checks passed: median $${(summary.medianB * 1000).toFixed(1)}M; P10–P90 $${(summary.low80B * 1000).toFixed(1)}M–$${(summary.high80B * 1000).toFixed(1)}M; zero ${(summary.probabilityZero * 100).toFixed(1)}%.`);
