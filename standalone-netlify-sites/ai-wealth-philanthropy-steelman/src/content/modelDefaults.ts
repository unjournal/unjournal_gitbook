import type { ForecastRow, ModelInputs } from "../utils/model";

export function getForecastRows(modelProbabilityOver1B: number): ForecastRow[] { return [
  {
    outcome: "Anthropic first public trading / IPO by 31 Dec 2026",
    probability: "90-97%",
    midpoint: 0.94,
    reason:
      "Subjective judgment reviewed October 29: the October 26 public S-1 and a year-end Polymarket price near 95% support a high probability. The company has not set a price or first trading date, and market prices depend on contract rules. Filing and listing still do not establish philanthropic liquidity.",
    evidenceIds: ["anthropic-s1", "anthropic-public-s1", "anthropic-ipo-current-reporting", "anthropic-ipo-oct-21", "polymarket-anthropic-ipo"]
  },
  {
    outcome: "Model: at least $1B from Anthropic-linked AIS/EA pathways by 31 Dec 2027",
    probability: `${Math.round(modelProbabilityOver1B * 100)}%`,
    midpoint: modelProbabilityOver1B,
    reason: "Derived from the same correlated simulation as the tracker. This is conditional on subjective inputs, including cause allocation, grant timing, and capacity; it is not an independently calibrated probability.",
    evidenceIds: ["anthropic-s1", "anthropic-founder-pledge", "anthropic-public-benefit-fund", "grantmaker-bottleneck"]
  },
  {
    outcome: "At least $5B cumulative newly committed or disbursed to AIS/EA by 31 Dec 2028",
    probability: "15-35%",
    midpoint: 0.25,
    reason: "More time for liquidity and institutions; still bottlenecked by allocation and deployment.",
    evidenceIds: ["openai-foundation-value", "grantmaker-bottleneck"]
  },
  {
    outcome: "At least $20B/year steady-state AIS/EA disbursement by 2028",
    probability: "5-20%",
    midpoint: 0.12,
    reason: "Requires unusually fast, AIS-directed, institutionally competent spend-down.",
    evidenceIds: ["grantmaker-bottleneck", "coefficient-underfunded"]
  },
  {
    outcome: "At least $20B/year broad AI-era philanthropy by 2028",
    probability: "25-50%",
    midpoint: 0.35,
    reason: "More plausible if broad OpenAI/Anthropic public-benefit spending counts.",
    evidenceIds: ["openai-foundation-value", "anthropic-claude-corps", "anthropic-economic-fund"]
  }
]; }

export const defaultModelInputs: ModelInputs = {
  anthropicValuationB: 965,
  founderOwnershipPct: 12,
  founderPledgePct: 80,
  founderRealizationPct: 60,
  founderFollowThroughPct: 45,
  founderAisEaAllocationPct: 20,
  founderDeploymentByEnd2027Pct: 7,
  employeeCommittedPoolB: 20,
  employeeRealizationPct: 60,
  employeeAisEaAllocationPct: 50,
  employeeDeploymentByEnd2027Pct: 10,
  publicBenefitFundEquityPct: 5,
  publicBenefitFundApprovalPct: 90,
  publicBenefitFundRealizationPct: 60,
  publicBenefitFundAisEaAllocationPct: 10,
  publicBenefitFundDeploymentByEnd2027Pct: 5,
  localRumorAdjustmentPct: 100,
  nearTermDeploymentCapB: 5
};
