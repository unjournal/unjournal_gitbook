export type ModelInputs = {
  anthropicValuationB: number;
  founderOwnershipPct: number;
  founderPledgePct: number;
  founderRealizationPct: number;
  founderFollowThroughPct: number;
  founderAisEaAllocationPct: number;
  founderDeploymentByEnd2027Pct: number;
  employeeCommittedPoolB: number;
  employeeRealizationPct: number;
  employeeAisEaAllocationPct: number;
  employeeDeploymentByEnd2027Pct: number;
  publicBenefitFundEquityPct: number;
  publicBenefitFundApprovalPct: number;
  publicBenefitFundRealizationPct: number;
  publicBenefitFundAisEaAllocationPct: number;
  publicBenefitFundDeploymentByEnd2027Pct: number;
  localRumorAdjustmentPct: number;
  nearTermDeploymentCapB: number;
};

export type ModelOutput = {
  founderB: number;
  employeeB: number;
  publicBenefitFundB: number;
  rawTotalB: number;
  epistemicallyAdjustedRawTotalB: number;
  capacityAdjustedTotalB: number;
};

export type InputMeta = {
  key: keyof ModelInputs;
  label: string;
  description?: string;
  suffix: "B" | "%";
  min: number;
  max: number;
  step: number;
  group:
    | "Anthropic founders"
    | "Anthropic employees"
    | "Anthropic Public Benefit Fund"
    | "Epistemic adjustment"
    | "Capacity";
  evidenceIds?: string[];
  feedbackIds?: string[];
};

export type ForecastRow = {
  outcome: string;
  probability: string;
  midpoint: number;
  reason: string;
  evidenceIds?: string[];
};

export type Source = {
  id: string;
  title: string;
  url: string;
  type: string;
  reliability: string;
  supports: string[];
};

export type SensitivityRow = {
  key: keyof ModelInputs;
  label: string;
  low: number;
  high: number;
  lowOutput: number;
  highOutput: number;
  delta: number;
};

export const inputMeta: InputMeta[] = [
  {
    key: "anthropicValuationB",
    label: "Anthropic realizable valuation",
    description:
      "Editable proxy for realizable company equity value at or after lockup/liquidity, not just the headline IPO or last-round valuation.",
    suffix: "B",
    min: 100,
    max: 1500,
    step: 5,
    group: "Anthropic founders",
    evidenceIds: ["anthropic-valuation"],
    feedbackIds: ["md-valuation-lockup", "md-collapse-risk"]
  },
  {
    key: "founderOwnershipPct",
    label: "Founder ownership",
    description: "Rough share of company equity attributed to pledge-bearing founders; highly uncertain.",
    suffix: "%",
    min: 0,
    max: 30,
    step: 0.5,
    group: "Anthropic founders",
    evidenceIds: ["anthropic-valuation"],
    feedbackIds: ["md-inline-citations"]
  },
  {
    key: "founderPledgePct",
    label: "Founder pledge face value",
    description:
      "Public pledge share of wealth; not a claim that this share becomes enforceable, AIS/EA-directed, or near-term grants.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic founders",
    evidenceIds: ["anthropic-founder-pledge"],
    feedbackIds: ["md-founder-pledge"]
  },
  {
    key: "founderRealizationPct",
    label: "Founder realization",
    description:
      "Liquidity/legal gate: share of paper value that becomes available for philanthropy after lockups, taxes, sale timing, and valuation changes. Excludes cause choice and grant timing.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic founders",
    evidenceIds: ["sec-ipo-lockup"],
    feedbackIds: ["md-lockup-delay"]
  },
  {
    key: "founderFollowThroughPct",
    label: "Founder follow-through",
    description: "Intent gate: how much available pledged wealth remains intended for philanthropy after planning and worldview changes. Excludes how fast grants are made.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic founders",
    evidenceIds: ["anthropic-founder-pledge"]
  },
  {
    key: "founderAisEaAllocationPct",
    label: "Founder AIS/EA allocation",
    description: "Cause-allocation gate: share of followed-through philanthropy directed to AI safety or EA-relevant causes rather than broad public benefit.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic founders"
  },
  {
    key: "founderDeploymentByEnd2027Pct",
    label: "Founder deployment by end-2027",
    description:
      "Timing gate: of the realized, followed-through, AIS/EA-allocated pool, share actually paid out as grants by end-2027. This replaces the earlier end-2026 deadline, which was too early if IPO lockups have not ended.",
    suffix: "%",
    min: 0,
    max: 30,
    step: 0.5,
    group: "Anthropic founders",
    feedbackIds: ["md-end-2026"]
  },
  {
    key: "employeeCommittedPoolB",
    label: "Employee committed pool",
    description:
      "Editable simplification for employee-linked giving before liquidity, cause allocation, and grant timing. A fuller model would derive this from valuation, employee equity, and commitment rates.",
    suffix: "B",
    min: 0,
    max: 80,
    step: 0.5,
    group: "Anthropic employees",
    feedbackIds: ["md-employee-pool"]
  },
  {
    key: "employeeRealizationPct",
    label: "Employee realization",
    description: "Liquidity/legal gate: share of employee paper value or commitments that becomes philanthropically available. Excludes cause choice and grant timing.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic employees"
  },
  {
    key: "employeeAisEaAllocationPct",
    label: "Employee AIS/EA allocation",
    description: "Cause-allocation gate: share of realized employee giving directed to AIS/EA-relevant causes.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic employees"
  },
  {
    key: "employeeDeploymentByEnd2027Pct",
    label: "Employee deployment by end-2027",
    description:
      "Timing gate: of the realized, AIS/EA-allocated employee pool, share actually paid out as grants by end-2027.",
    suffix: "%",
    min: 0,
    max: 40,
    step: 0.5,
    group: "Anthropic employees",
    feedbackIds: ["md-end-2026"]
  },
  {
    key: "publicBenefitFundEquityPct",
    label: "Public Benefit Fund equity",
    description:
      "Anthropic's announced company-equity share for the new wholly owned fund. The initial 5% remains subject to stockholder approval; possible later additions are excluded.",
    suffix: "%",
    min: 0,
    max: 15,
    step: 0.5,
    group: "Anthropic Public Benefit Fund",
    evidenceIds: ["anthropic-public-benefit-fund"]
  },
  {
    key: "publicBenefitFundApprovalPct",
    label: "Approval probability",
    description:
      "Judgmental probability that stockholders approve the initial transfer. This is not a market price or company guidance.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic Public Benefit Fund",
    evidenceIds: ["anthropic-public-benefit-fund"]
  },
  {
    key: "publicBenefitFundRealizationPct",
    label: "Fund realization",
    description:
      "Share of the fund's paper equity value assumed to become legally and economically available for giving after valuation changes, liquidity, lockups, and sale constraints.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Anthropic Public Benefit Fund",
    evidenceIds: ["anthropic-public-benefit-fund", "sec-ipo-lockup"]
  },
  {
    key: "publicBenefitFundAisEaAllocationPct",
    label: "Fund AIS/EA allocation",
    description:
      "Share assigned to external AIS/EA-relevant grants. Anthropic describes a broad public-benefit mandate and has not announced a cause allocation.",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    group: "Anthropic Public Benefit Fund",
    evidenceIds: ["anthropic-public-benefit-fund"]
  },
  {
    key: "publicBenefitFundDeploymentByEnd2027Pct",
    label: "Fund deployment by end-2027",
    description:
      "Share of the approved, realized, AIS/EA-allocated pool actually paid out by the deadline. No distribution schedule has been announced.",
    suffix: "%",
    min: 0,
    max: 40,
    step: 0.5,
    group: "Anthropic Public Benefit Fund",
    evidenceIds: ["anthropic-public-benefit-fund"]
  },
  {
    key: "localRumorAdjustmentPct",
    label: "Local-confidence adjustment",
    description:
      "Ex-post adjustment to the raw expected value for over- or under-weighted local confidence, social incentives, and correlated assumptions. 100% leaves the raw estimate unchanged.",
    suffix: "%",
    min: 25,
    max: 150,
    step: 5,
    group: "Epistemic adjustment",
    evidenceIds: ["grantmaker-bottleneck"],
    feedbackIds: ["md-bay-incentives", "dr-expost-adjustment", "dr-distributions-ev-calculator"]
  },
  {
    key: "nearTermDeploymentCapB",
    label: "Near-term deployment cap",
    description:
      "Dollar cap on what grantmakers and recipient organizations can responsibly deploy near-term. This replaces the earlier capacity multiplier and absorption ceiling.",
    suffix: "B",
    min: 0.1,
    max: 25,
    step: 0.1,
    group: "Capacity",
    evidenceIds: ["grantmaker-bottleneck"],
    feedbackIds: ["md-capacity-cap"]
  }
];

export function calculateModel(i: ModelInputs): ModelOutput {
  const founder =
    i.anthropicValuationB *
    (i.founderOwnershipPct / 100) *
    (i.founderPledgePct / 100) *
    (i.founderRealizationPct / 100) *
    (i.founderFollowThroughPct / 100) *
    (i.founderAisEaAllocationPct / 100) *
    (i.founderDeploymentByEnd2027Pct / 100);
  const employee =
    i.employeeCommittedPoolB *
    (i.employeeRealizationPct / 100) *
    (i.employeeAisEaAllocationPct / 100) *
    (i.employeeDeploymentByEnd2027Pct / 100);
  const publicBenefitFund =
    i.anthropicValuationB *
    (i.publicBenefitFundEquityPct / 100) *
    (i.publicBenefitFundApprovalPct / 100) *
    (i.publicBenefitFundRealizationPct / 100) *
    (i.publicBenefitFundAisEaAllocationPct / 100) *
    (i.publicBenefitFundDeploymentByEnd2027Pct / 100);
  const rawTotal = founder + employee + publicBenefitFund;
  const epistemicallyAdjustedRawTotal = rawTotal * (i.localRumorAdjustmentPct / 100);
  const capacityAdjusted = Math.min(epistemicallyAdjustedRawTotal, i.nearTermDeploymentCapB);

  return {
    founderB: founder,
    employeeB: employee,
    publicBenefitFundB: publicBenefitFund,
    rawTotalB: rawTotal,
    epistemicallyAdjustedRawTotalB: epistemicallyAdjustedRawTotal,
    capacityAdjustedTotalB: capacityAdjusted
  };
}

export function sensitivityRows(inputs: ModelInputs): SensitivityRow[] {
  return inputMeta
    .map((meta) => {
      const current = inputs[meta.key];
      const low = Math.max(meta.min, current * 0.5);
      const high = meta.suffix === "%" ? Math.min(100, current * 2) : Math.min(meta.max, current * 2);
      const lowInputs = { ...inputs, [meta.key]: low };
      const highInputs = { ...inputs, [meta.key]: high };
      const lowOutput = calculateModel(lowInputs).capacityAdjustedTotalB;
      const highOutput = calculateModel(highInputs).capacityAdjustedTotalB;

      return {
        key: meta.key,
        label: meta.label,
        low,
        high,
        lowOutput,
        highOutput,
        delta: Math.abs(highOutput - lowOutput)
      };
    })
    .sort((a, b) => b.delta - a.delta);
}
