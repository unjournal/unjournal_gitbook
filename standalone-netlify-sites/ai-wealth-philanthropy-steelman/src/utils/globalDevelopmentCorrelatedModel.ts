import {
  calculateGlobalDevelopmentModel,
  type GlobalDevelopmentInputs
} from "./globalDevelopmentModel";

export type GlobalDevelopmentPercentileSummary = {
  p10: number;
  p50: number;
  p90: number;
  mean: number;
  probabilityOver1B: number;
};

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(random: () => number): number {
  const u1 = Math.max(1e-12, random());
  const u2 = random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function logit(p: number): number {
  const bounded = clamp(p, 0.001, 0.999);
  return Math.log(bounded / (1 - bounded));
}

function perturbPct(basePct: number, logitShift: number): number {
  if (basePct <= 0) return 0;
  if (basePct >= 100) return 100;
  return clamp(logistic(logit(basePct / 100) + logitShift) * 100, 0, 100);
}

function perturbPositive(base: number, logShift: number, max: number): number {
  return clamp(base * Math.exp(logShift), 0, max);
}

function percentile(sorted: number[], p: number): number {
  const position = (sorted.length - 1) * p;
  const low = Math.floor(position);
  const high = Math.ceil(position);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

/**
 * A deterministic, correlated uncertainty layer for the GH&D BOTEC.
 *
 * The latent factors keep valuation/liquidity, donor allocation, program
 * execution, and deployment capacity from moving independently. It is a
 * transparent model interval, not an empirical confidence interval.
 */
export function runGlobalDevelopmentSimulation(
  base: GlobalDevelopmentInputs,
  draws = 4000,
  seed = 91357
): GlobalDevelopmentPercentileSummary {
  const random = mulberry32(seed);
  const totals: number[] = [];

  for (let draw = 0; draw < draws; draw += 1) {
    const market = normal(random);
    const liquidity = normal(random);
    const donorAllocation = normal(random);
    const programExecution = normal(random);
    const grantCapacity = normal(random);
    const idiosyncratic = () => normal(random);

    const collapseProbability = logistic(-2.1 - 0.95 * market);
    const collapse = random() < collapseProbability;
    const valuationShift = collapse ? -3.2 + 0.15 * idiosyncratic() : 0.6 * market + 0.25 * idiosyncratic();

    const inputs: GlobalDevelopmentInputs = {
      anthropicValuationB: perturbPositive(base.anthropicValuationB, valuationShift, 2500),
      founderOwnershipPct: perturbPct(base.founderOwnershipPct, 0.15 * idiosyncratic()),
      founderPledgePct: perturbPct(base.founderPledgePct, 0.1 * idiosyncratic()),
      founderRealizationPct: perturbPct(base.founderRealizationPct, 0.8 * liquidity + 0.2 * market),
      founderFollowThroughPct: perturbPct(base.founderFollowThroughPct, 0.75 * donorAllocation + 0.15 * liquidity),
      founderGhdAllocationPct: perturbPct(base.founderGhdAllocationPct, 0.9 * donorAllocation - 0.15 * market),
      founderDeploymentByEnd2027Pct: perturbPct(
        base.founderDeploymentByEnd2027Pct,
        0.6 * liquidity + 0.45 * grantCapacity + 0.2 * idiosyncratic()
      ),
      employeeCommittedPoolB: (collapse ? Math.exp(valuationShift) : 1) * perturbPositive(
        base.employeeCommittedPoolB,
        0.55 * market + 0.25 * donorAllocation + 0.25 * idiosyncratic(),
        180
      ),
      employeeRealizationPct: perturbPct(base.employeeRealizationPct, 0.65 * liquidity + 0.25 * market),
      employeeGhdAllocationPct: perturbPct(base.employeeGhdAllocationPct, 0.75 * donorAllocation + 0.2 * idiosyncratic()),
      employeeDeploymentByEnd2027Pct: perturbPct(
        base.employeeDeploymentByEnd2027Pct,
        0.5 * liquidity + 0.4 * grantCapacity + 0.2 * idiosyncratic()
      ),
      publicBenefitFundEquityPct: base.publicBenefitFundEquityPct,
      publicBenefitFundApprovalPct: random() < base.publicBenefitFundApprovalPct / 100 ? 100 : 0,
      publicBenefitFundRealizationPct: perturbPct(
        base.publicBenefitFundRealizationPct,
        0.8 * liquidity + 0.2 * market
      ),
      publicBenefitFundGhdAllocationPct: perturbPct(
        base.publicBenefitFundGhdAllocationPct,
        0.9 * donorAllocation - 0.15 * market
      ),
      publicBenefitFundDeploymentByEnd2027Pct: perturbPct(
        base.publicBenefitFundDeploymentByEnd2027Pct,
        0.6 * liquidity + 0.45 * grantCapacity + 0.2 * idiosyncratic()
      ),
      namedProgramsB: base.namedProgramsB,
      namedProgramsGhdAllocationPct: perturbPct(base.namedProgramsGhdAllocationPct, 0.35 * donorAllocation),
      namedProgramsCashEquivalentPct: perturbPct(
        base.namedProgramsCashEquivalentPct,
        0.45 * programExecution + 0.2 * idiosyncratic()
      ),
      namedProgramsDeploymentByEnd2027Pct: perturbPct(
        base.namedProgramsDeploymentByEnd2027Pct,
        0.55 * programExecution + 0.35 * grantCapacity + 0.2 * idiosyncratic()
      ),
      openAiOtherPlanB: base.openAiOtherPlanB,
      openAiGhdAllocationPct: perturbPct(base.openAiGhdAllocationPct, 0.85 * donorAllocation + 0.2 * idiosyncratic()),
      openAiCashEquivalentPct: perturbPct(base.openAiCashEquivalentPct, 0.45 * programExecution + 0.2 * idiosyncratic()),
      openAiDeploymentByEnd2027Pct: perturbPct(
        base.openAiDeploymentByEnd2027Pct,
        0.45 * programExecution + 0.35 * grantCapacity + 0.2 * idiosyncratic()
      ),
      nearTermDeploymentCapB: perturbPositive(
        base.nearTermDeploymentCapB,
        0.65 * grantCapacity + 0.2 * liquidity + 0.2 * idiosyncratic(),
        60
      )
    };

    totals.push(calculateGlobalDevelopmentModel(inputs).capacityAdjustedTotalB);
  }

  totals.sort((a, b) => a - b);
  const mean = totals.reduce((sum, value) => sum + value, 0) / totals.length;
  return {
    p10: percentile(totals, 0.1),
    p50: percentile(totals, 0.5),
    p90: percentile(totals, 0.9),
    mean,
    probabilityOver1B: totals.filter((total) => total >= 1).length / totals.length
  };
}
