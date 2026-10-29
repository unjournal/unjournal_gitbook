/**
 * Exploratory animal-welfare cash-flow model, reviewed 2026-10-29.
 * Units are nominal USD billions. Source-backed anchors and judgmental
 * assumptions are distinguished in content/animalWelfare.ts and the UI.
 */
export type AnimalWelfareInputs = {
  anthropicValuationB: number;
  personalPledgedEquityPct: number;
  personalRealizationPct: number;
  personalPaidByEnd2027Pct: number;
  personalAwUptakePct: number;
  personalAwAllocationPct: number;
  publicFundEquityPct: number;
  publicFundApprovalPct: number;
  publicFundRealizationPct: number;
  publicFundPaidByEnd2027Pct: number;
  publicFundAwUptakePct: number;
  publicFundAwAllocationPct: number;
  openAiProgramEnvelopeB: number;
  openAiCashPaidPct: number;
  openAiAwUptakePct: number;
  openAiAwAllocationPct: number;
};

export const defaultAnimalWelfareInputs: AnimalWelfareInputs = {
  anthropicValuationB: 965,
  personalPledgedEquityPct: 15,
  personalRealizationPct: 60,
  personalPaidByEnd2027Pct: 5,
  personalAwUptakePct: 65,
  personalAwAllocationPct: 2,
  publicFundEquityPct: 5,
  publicFundApprovalPct: 90,
  publicFundRealizationPct: 60,
  publicFundPaidByEnd2027Pct: 3,
  publicFundAwUptakePct: 20,
  publicFundAwAllocationPct: 1,
  openAiProgramEnvelopeB: 1,
  openAiCashPaidPct: 80,
  openAiAwUptakePct: 15,
  openAiAwAllocationPct: 1
};

export type AnimalWelfareOutput = {
  personalB: number;
  publicFundB: number;
  openAiFoundationB: number;
  totalB: number;
};

const pct = (value: number) => Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0)) / 100;
const positive = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);

/** Plug-in weighted calculation. It is neither the simulation median nor its mean. */
export function calculateAnimalWelfareModel(inputs: AnimalWelfareInputs): AnimalWelfareOutput {
  const value = positive(inputs.anthropicValuationB);
  const personalB = value * pct(inputs.personalPledgedEquityPct) * pct(inputs.personalRealizationPct)
    * pct(inputs.personalPaidByEnd2027Pct) * pct(inputs.personalAwUptakePct) * pct(inputs.personalAwAllocationPct);
  const publicFundB = value * pct(inputs.publicFundEquityPct) * pct(inputs.publicFundApprovalPct)
    * pct(inputs.publicFundRealizationPct) * pct(inputs.publicFundPaidByEnd2027Pct)
    * pct(inputs.publicFundAwUptakePct) * pct(inputs.publicFundAwAllocationPct);
  const openAiFoundationB = positive(inputs.openAiProgramEnvelopeB) * pct(inputs.openAiCashPaidPct)
    * pct(inputs.openAiAwUptakePct) * pct(inputs.openAiAwAllocationPct);
  return { personalB, publicFundB, openAiFoundationB, totalB: personalB + publicFundB + openAiFoundationB };
}

export type AnimalWelfareSimulation = {
  medianB: number;
  low80B: number;
  high80B: number;
  meanB: number;
  probabilityZero: number;
  probabilityAtLeast10M: number;
  probabilityAtLeast100M: number;
  draws: number;
  seed: number;
  samples: number[];
};

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(random: () => number) {
  return Math.sqrt(-2 * Math.log(Math.max(random(), Number.EPSILON))) * Math.cos(2 * Math.PI * random());
}

function normalCdf(value: number) {
  const x = Math.abs(value);
  const t = 1 / (1 + 0.2316419 * x);
  const tail = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)
    * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return value < 0 ? tail : 1 - tail;
}

/** Log-odds uncertainty preserves exact user-set 0% and 100% boundaries. */
function uncertainShare(value: number, shock: number, spread: number) {
  const center = pct(value);
  if (center === 0 || center === 1) return center;
  return 1 / (1 + Math.exp(-(Math.log(center / (1 - center)) + spread * shock)));
}

function occurs(chancePct: number, common: number, independent: number) {
  const chance = pct(chancePct);
  if (chance === 0 || chance === 1) return chance === 1;
  // Positive correlation across routes; each marginal latent is standard normal.
  return normalCdf(0.6 * common + 0.8 * independent) < chance;
}

function quantile(sorted: number[], probability: number) {
  const point = (sorted.length - 1) * probability;
  const lower = Math.floor(point);
  const upper = Math.ceil(point);
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (point - lower);
}

/**
 * Seeded structural scenarios, not a statistically fitted forecast.
 * Equity values share a valuation shock; payout rates share a liquidity shock.
 * Animal-welfare uptake shares a separate cause-choice shock. Uptake is a
 * Bernoulli event so low/no allocation is not disguised as a positive floor.
 */
export function runAnimalWelfareSimulation(
  inputs: AnimalWelfareInputs = defaultAnimalWelfareInputs,
  draws = 20000,
  seed = 20261029
): AnimalWelfareSimulation {
  const sampleCount = Math.max(1, Math.min(100000, Math.floor(Number.isFinite(draws) ? draws : 20000)));
  const random = mulberry32(seed);
  const samples: number[] = [];
  for (let index = 0; index < sampleCount; index += 1) {
    const valuationShock = normal(random);
    const liquidityShock = 0.5 * valuationShock + Math.sqrt(0.75) * normal(random);
    const causeShock = normal(random);
    const value = positive(inputs.anthropicValuationB) * Math.exp(0.6 * valuationShock);
    const personalUptake = occurs(inputs.personalAwUptakePct, causeShock, normal(random));
    const fundUptake = occurs(inputs.publicFundAwUptakePct, causeShock, normal(random));
    const openAiUptake = occurs(inputs.openAiAwUptakePct, causeShock, normal(random));
    // Draw all shocks before applying gates: scenario comparisons can reuse
    // the same random worlds rather than changing the RNG stream when a gate closes.
    const personalRealizationShock = 0.5 * liquidityShock + Math.sqrt(0.75) * normal(random);
    const personalTimingShock = 0.7 * liquidityShock + Math.sqrt(0.51) * normal(random);
    const personalAllocationShock = -0.5 * causeShock + Math.sqrt(0.75) * normal(random);
    const fundApproved = random() < pct(inputs.publicFundApprovalPct);
    const fundTimingShock = 0.7 * liquidityShock + Math.sqrt(0.51) * normal(random);
    const fundAllocationShock = -0.5 * causeShock + Math.sqrt(0.75) * normal(random);
    const openAiEnvelopeShock = normal(random);
    const openAiAllocationShock = -0.5 * causeShock + Math.sqrt(0.75) * normal(random);
    // Matching shares and founders/employees are one pool: they are not summed again.
    const personalB = personalUptake ? value * pct(inputs.personalPledgedEquityPct)
      * uncertainShare(inputs.personalRealizationPct, personalRealizationShock, 0.7)
      * uncertainShare(inputs.personalPaidByEnd2027Pct, personalTimingShock, 1)
      * uncertainShare(inputs.personalAwAllocationPct, personalAllocationShock, 1.2) : 0;
    const publicFundB = fundUptake && fundApproved ? value * pct(inputs.publicFundEquityPct)
      * uncertainShare(inputs.publicFundRealizationPct, liquidityShock, 0.7)
      * uncertainShare(inputs.publicFundPaidByEnd2027Pct, fundTimingShock, 1.2)
      * uncertainShare(inputs.publicFundAwAllocationPct, fundAllocationShock, 1.2) : 0;
    const openAiFoundationB = openAiUptake ? positive(inputs.openAiProgramEnvelopeB) * Math.exp(0.5 * openAiEnvelopeShock)
      * uncertainShare(inputs.openAiCashPaidPct, liquidityShock, 0.6)
      * uncertainShare(inputs.openAiAwAllocationPct, openAiAllocationShock, 1.2) : 0;
    samples.push(personalB + publicFundB + openAiFoundationB);
  }
  const sorted = [...samples].sort((left, right) => left - right);
  return {
    medianB: quantile(sorted, 0.5),
    low80B: quantile(sorted, 0.1),
    high80B: quantile(sorted, 0.9),
    meanB: samples.reduce((sum, value) => sum + value, 0) / sampleCount,
    probabilityZero: samples.filter((value) => value === 0).length / sampleCount,
    probabilityAtLeast10M: samples.filter((value) => value >= 0.01).length / sampleCount,
    probabilityAtLeast100M: samples.filter((value) => value >= 0.1).length / sampleCount,
    draws: sampleCount,
    seed,
    samples
  };
}

export type AnimalWelfareInputSpec = {
  key: keyof AnimalWelfareInputs;
  label: string;
  description: string;
  max: number;
  step: number;
  unit: "%" | "$B";
  anchor: "Source anchor" | "Derived approximation" | "Subjective assumption";
};

export const animalWelfareInputGroups: { title: string; specs: AnimalWelfareInputSpec[] }[] = [
  { title: "Anthropic individuals and employee matching", specs: [
    { key: "anthropicValuationB", label: "Anthropic paper valuation", description: "May 28 Series H post-money valuation; the eventual realizable share value can differ substantially. The simulation puts wide uncertainty around this anchor.", max: 3000, step: 5, unit: "$B", anchor: "Source anchor" },
    { key: "personalPledgedEquityPct", label: "Pledged pool outside the new fund", description: "Approximate residual: roughly 20% public-good shares minus the proposed 5% fund stake. Includes founder pledges, employee gifts, and company matching; ownership breakdown and dilution remain uncertain.", max: 30, step: 0.5, unit: "%", anchor: "Derived approximation" },
    { key: "personalRealizationPct", label: "Pledge and equity realization", description: "Fraction of this paper pool ultimately realized, allowing for pledge fulfillment, valuation/ownership differences, and sale constraints. It is not a reported paid amount.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "personalPaidByEnd2027Pct", label: "Realized pool paid by end-2027", description: "Fraction converted into recipient cash by the fixed deadline. IPO timing, lockups, retained endowments, donor decisions, and grantee readiness matter.", max: 100, step: 0.5, unit: "%", anchor: "Subjective assumption" },
    { key: "personalAwUptakePct", label: "Chance this channel funds animal welfare", description: "Chance of any modeled animal-welfare allocation by the deadline. No named allocation was identified in the primary sources reviewed.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "personalAwAllocationPct", label: "Animal-welfare share if adopted", description: "Conditional share of this channel's cash given to animal welfare when the channel funds it. Broad EA or public-benefit language does not establish this share.", max: 100, step: 0.5, unit: "%", anchor: "Subjective assumption" }
  ] },
  { title: "Anthropic Public Benefit Fund", specs: [
    { key: "publicFundEquityPct", label: "Proposed initial fund stake", description: "The October 18 announcement proposes 5%, subject to stockholder approval. Discretionary later milestone awards are excluded.", max: 20, step: 0.5, unit: "%", anchor: "Source anchor" },
    { key: "publicFundApprovalPct", label: "Chance stake is approved", description: "Subjective probability that the initial stake becomes operative. The announcement describes approval as outstanding.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "publicFundRealizationPct", label: "Equity realization", description: "Fraction of paper share value ultimately available to the fund after ownership, price, and sale constraints.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "publicFundPaidByEnd2027Pct", label: "Realized fund paid by end-2027", description: "Fraction reaching recipients in cash by the deadline; the announcement supplies no payout schedule.", max: 100, step: 0.5, unit: "%", anchor: "Subjective assumption" },
    { key: "publicFundAwUptakePct", label: "Chance fund supports animal welfare", description: "A separate cause-choice hurdle. The broad mandate and worker-distribution example do not imply animal-welfare support.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "publicFundAwAllocationPct", label: "Animal-welfare share if adopted", description: "Conditional animal-welfare share of fund cash. The fund is an LLC, and public-benefit spending need not be charitable grants.", max: 100, step: 0.5, unit: "%", anchor: "Subjective assumption" }
  ] },
  { title: "OpenAI Foundation", specs: [
    { key: "openAiProgramEnvelopeB", label: "Prospective program envelope", description: "Scenario anchor informed by the March 2026 plan to invest at least $1B over a year. This does not reserve $1B for future unallocated grants, extend the plan to 2027, or assign any money to animals.", max: 10, step: 0.1, unit: "$B", anchor: "Subjective assumption" },
    { key: "openAiCashPaidPct", label: "Envelope reaching recipients in cash", description: "Discount for implementation, timing, in-kind support, and foundation operating spending. The prospective envelope is a scenario, not a second count of its announced grants.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "openAiAwUptakePct", label: "Chance Foundation funds animal welfare", description: "Low subjective uptake probability because announced focus areas emphasize people, health, jobs, AI resilience, and communities. Absence of an animal program is informative, but not proof one cannot emerge.", max: 100, step: 1, unit: "%", anchor: "Subjective assumption" },
    { key: "openAiAwAllocationPct", label: "Animal-welfare share if adopted", description: "Conditional share of prospective cash assigned to animal welfare. No such allocation is established by the Foundation's general investment plan.", max: 100, step: 0.5, unit: "%", anchor: "Subjective assumption" }
  ] }
];

export const animalWelfareScenarios = [
  { name: "Exploratory defaults", description: "Some individual giving; institutional animal allocation remains unlikely.", inputs: defaultAnimalWelfareInputs },
  { name: "Slow and narrow", description: "Less cash before the deadline and weaker animal-welfare allocation.", inputs: { ...defaultAnimalWelfareInputs, personalRealizationPct: 40, personalPaidByEnd2027Pct: 2, personalAwUptakePct: 40, personalAwAllocationPct: 1, publicFundPaidByEnd2027Pct: 1, publicFundAwUptakePct: 10, openAiAwUptakePct: 5 } },
  { name: "Faster and broader", description: "Earlier personal giving and a clearer animal-welfare constituency. A stress test, not an upside forecast.", inputs: { ...defaultAnimalWelfareInputs, personalPaidByEnd2027Pct: 12, personalAwUptakePct: 85, personalAwAllocationPct: 5, publicFundPaidByEnd2027Pct: 8, publicFundAwUptakePct: 40, publicFundAwAllocationPct: 3, openAiAwUptakePct: 30, openAiAwAllocationPct: 2 } }
] as const;

export function formatAnimalWelfareMoney(valueB: number) {
  if (valueB === 0) return "$0";
  if (valueB < 0.001) return `$${Math.round(valueB * 1000000).toLocaleString()}K`;
  if (valueB < 1) return `$${(valueB * 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}M`;
  return `$${valueB.toLocaleString(undefined, { maximumFractionDigits: 2 })}B`;
}
