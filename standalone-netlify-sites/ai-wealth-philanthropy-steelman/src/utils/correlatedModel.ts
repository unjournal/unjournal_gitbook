import { calculateModel, type ModelInputs } from "./model";

export type LatentKey =
  | "market"
  | "liquidity"
  | "donorIntent"
  | "grantCapacity"
  | "localOptimism"
  | "deploymentPressure";

export type CorrelatedConfig = {
  draws: number;
  seed: number;
  uncertaintyScale: number;
  marketCoupling: number;
  liquidityCoupling: number;
  donorCoupling: number;
  capacityCoupling: number;
  optimismCoupling: number;
  urgencyTradeoff: number;
};

export type SimulationDraw = {
  totalB: number;
  founderB: number;
  employeeB: number;
  publicBenefitFundB: number;
  latent: Record<LatentKey, number>;
};

export type PercentileSummary = {
  p5: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  mean: number;
  probabilityOver1B: number;
  probabilityOver5B: number;
};

export type LatentSummary = {
  key: LatentKey;
  label: string;
  description: string;
  effect: string;
  correlationWithTotal: number;
};

export type CorrelatedSimulation = {
  draws: SimulationDraw[];
  summary: PercentileSummary;
  latentSummaries: LatentSummary[];
};

export const defaultCorrelatedConfig: CorrelatedConfig = {
  draws: 4000,
  seed: 73519,
  uncertaintyScale: 1,
  marketCoupling: 0.85,
  liquidityCoupling: 0.75,
  donorCoupling: 0.7,
  capacityCoupling: 0.7,
  optimismCoupling: 0.55,
  urgencyTradeoff: 0.45
};

const latentInfo: Record<LatentKey, Omit<LatentSummary, "correlationWithTotal">> = {
  market: {
    key: "market",
    label: "AI market level",
    description: "Shared valuation and secondary-market conditions.",
    effect: "Moves Anthropic valuation, employee wealth, Public Benefit Fund value, and collapse risk together."
  },
  liquidity: {
    key: "liquidity",
    label: "Liquidity plumbing",
    description: "IPO timing, lockups, secondary sales, taxes, and legal availability.",
    effect: "Moves founder, employee, and Public Benefit Fund realization and end-2027 deployment in the same direction."
  },
  donorIntent: {
    key: "donorIntent",
    label: "Donor intent and cause fit",
    description: "Whether pledge-bearing wealth remains philanthropic and AIS/EA-directed.",
    effect: "Moves follow-through and AIS/EA allocation together."
  },
  grantCapacity: {
    key: "grantCapacity",
    label: "Grantmaking capacity",
    description: "Availability of trusted grantmakers, vehicles, and recipient absorption.",
    effect: "Moves the near-term deployment cap and deployment rates together."
  },
  localOptimism: {
    key: "localOptimism",
    label: "Local optimism / rumor bias",
    description: "Shared local confidence, social incentives, and selection into optimistic conversations.",
    effect: "Adjusts the raw estimate after the gate model; positive values raise local-confidence adjustment."
  },
  deploymentPressure: {
    key: "deploymentPressure",
    label: "Deployment pressure",
    description: "Urgency to move money quickly versus careful filtering and organizational fit.",
    effect: "Can raise deployment rates while reducing responsible deployment capacity."
  }
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

function normalPair(random: () => number): [number, number] {
  const u1 = Math.max(1e-12, random());
  const u2 = random();
  const radius = Math.sqrt(-2 * Math.log(u1));
  const theta = 2 * Math.PI * u2;
  return [radius * Math.cos(theta), radius * Math.sin(theta)];
}

function normal(random: () => number): number {
  return normalPair(random)[0];
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

function perturbPositive(base: number, logShift: number, min = 0): number {
  return Math.max(min, base * Math.exp(logShift));
}

function corr(xs: number[], ys: number[]): number {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return 0;
  const meanX = xs.reduce((sum, x) => sum + x, 0) / n;
  const meanY = ys.reduce((sum, y) => sum + y, 0) / n;
  let cov = 0;
  let varX = 0;
  let varY = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  if (varX <= 0 || varY <= 0) return 0;
  return cov / Math.sqrt(varX * varY);
}

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const position = (sorted.length - 1) * p;
  const low = Math.floor(position);
  const high = Math.ceil(position);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

function stochasticInputs(base: ModelInputs, cfg: CorrelatedConfig, random: () => number): SimulationDraw {
  const scale = cfg.uncertaintyScale;
  const latent: Record<LatentKey, number> = {
    market: normal(random),
    liquidity: normal(random),
    donorIntent: normal(random),
    grantCapacity: normal(random),
    localOptimism: normal(random),
    deploymentPressure: normal(random)
  };
  const idiosyncratic = () => normal(random);

  // Coupling changes shared dependence without shrinking marginal variance.
  const mix = (shared: number, coupling: number) => coupling * shared + Math.sqrt(1 - coupling ** 2) * idiosyncratic();
  const market = mix(latent.market, cfg.marketCoupling);
  const liquidity = mix(latent.liquidity, cfg.liquidityCoupling);
  const donor = mix(latent.donorIntent, cfg.donorCoupling);
  const capacity = mix(latent.grantCapacity, cfg.capacityCoupling);
  const optimism = mix(latent.localOptimism, cfg.optimismCoupling);
  const pressure = latent.deploymentPressure;

  const collapseProbability = logistic(-2.1 - 0.95 * market * scale);
  const collapseDraw = scale > 0 && random() < collapseProbability;
  const valuationShift = collapseDraw ? -3.2 + 0.15 * idiosyncratic() : 0.6 * scale * market + 0.25 * scale * idiosyncratic();
  const valuation = clamp(perturbPositive(base.anthropicValuationB, valuationShift, 0), 0, 2500);

  const inputs: ModelInputs = {
    anthropicValuationB: valuation,
    founderOwnershipPct: perturbPct(base.founderOwnershipPct, 0.15 * scale * idiosyncratic()),
    founderPledgePct: perturbPct(base.founderPledgePct, 0.1 * scale * idiosyncratic()),
    founderRealizationPct: perturbPct(base.founderRealizationPct, scale * (0.8 * liquidity + 0.2 * market)),
    founderFollowThroughPct: perturbPct(base.founderFollowThroughPct, scale * (0.75 * donor + 0.15 * liquidity)),
    founderAisEaAllocationPct: perturbPct(base.founderAisEaAllocationPct, scale * (0.8 * donor - 0.25 * market)),
    founderDeploymentByEnd2027Pct: perturbPct(
      base.founderDeploymentByEnd2027Pct,
      scale * (0.65 * liquidity + 0.45 * capacity + 0.45 * pressure)
    ),
    employeeCommittedPoolB: (collapseDraw ? Math.exp(valuationShift) : 1) * clamp(
      perturbPositive(base.employeeCommittedPoolB, scale * (0.55 * market + 0.25 * donor + 0.25 * idiosyncratic())),
      0,
      180
    ),
    employeeRealizationPct: perturbPct(base.employeeRealizationPct, scale * (0.65 * liquidity + 0.25 * market)),
    employeeAisEaAllocationPct: perturbPct(base.employeeAisEaAllocationPct, scale * (0.65 * donor + 0.2 * optimism)),
    employeeDeploymentByEnd2027Pct: perturbPct(
      base.employeeDeploymentByEnd2027Pct,
      scale * (0.5 * liquidity + 0.35 * capacity + 0.5 * pressure)
    ),
    publicBenefitFundEquityPct: base.publicBenefitFundEquityPct,
    // Approval is a binary event across simulated worlds. At zero uncertainty
    // retain its probability-weighted central scenario for a deterministic check.
    publicBenefitFundApprovalPct: scale === 0 ? base.publicBenefitFundApprovalPct :
      (random() < base.publicBenefitFundApprovalPct / 100 ? 100 : 0),
    publicBenefitFundRealizationPct: perturbPct(
      base.publicBenefitFundRealizationPct,
      scale * (0.8 * liquidity + 0.2 * market)
    ),
    publicBenefitFundAisEaAllocationPct: perturbPct(
      base.publicBenefitFundAisEaAllocationPct,
      scale * (0.8 * donor - 0.25 * market)
    ),
    publicBenefitFundDeploymentByEnd2027Pct: perturbPct(
      base.publicBenefitFundDeploymentByEnd2027Pct,
      scale * (0.6 * liquidity + 0.45 * capacity + 0.35 * pressure)
    ),
    localRumorAdjustmentPct: clamp(base.localRumorAdjustmentPct + scale * (18 * optimism + 5 * idiosyncratic()), 20, 180),
    nearTermDeploymentCapB: clamp(
      perturbPositive(
        base.nearTermDeploymentCapB,
        scale * (0.65 * capacity + 0.2 * liquidity - cfg.urgencyTradeoff * pressure + 0.25 * idiosyncratic()),
        0
      ),
      0,
      60
    )
  };

  const output = calculateModel(inputs);
  return {
    totalB: output.capacityAdjustedTotalB,
    founderB: output.founderB,
    employeeB: output.employeeB,
    publicBenefitFundB: output.publicBenefitFundB,
    latent
  };
}

export function runCorrelatedSimulation(base: ModelInputs, cfg: CorrelatedConfig): CorrelatedSimulation {
  const random = mulberry32(cfg.seed);
  const draws = Array.from({ length: cfg.draws }, () => stochasticInputs(base, cfg, random));
  const totals = draws.map((draw) => draw.totalB).sort((a, b) => a - b);
  const mean = totals.reduce((sum, value) => sum + value, 0) / Math.max(1, totals.length);
  const summary: PercentileSummary = {
    p5: percentile(totals, 0.05),
    p10: percentile(totals, 0.1),
    p25: percentile(totals, 0.25),
    p50: percentile(totals, 0.5),
    p75: percentile(totals, 0.75),
    p90: percentile(totals, 0.9),
    p95: percentile(totals, 0.95),
    mean,
    probabilityOver1B: draws.filter((draw) => draw.totalB >= 1).length / draws.length,
    probabilityOver5B: draws.filter((draw) => draw.totalB >= 5).length / draws.length
  };

  const rawTotals = draws.map((draw) => draw.totalB);
  const latentSummaries = (Object.keys(latentInfo) as LatentKey[]).map((key) => ({
    ...latentInfo[key],
    correlationWithTotal: corr(
      draws.map((draw) => draw.latent[key]),
      rawTotals
    )
  }));

  return { draws, summary, latentSummaries };
}
