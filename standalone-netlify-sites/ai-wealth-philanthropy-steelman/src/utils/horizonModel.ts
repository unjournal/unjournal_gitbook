import { defaultModelInputs } from "../content/modelDefaults";
import { defaultCorrelatedConfig, sampleCorrelatedInputs } from "./correlatedModel";
import { calculateModel, type ModelInputs } from "./model";

export type Scope = "ais" | "all" | "people";
export type HorizonSettings = {
  scope: Scope;
  annualPayoutPct: number;
  annualCapGrowthPct: number;
  capLaterYears: boolean;
};
export const horizonDefaults: HorizonSettings = {
  scope: "ais",
  annualPayoutPct: 10,
  annualCapGrowthPct: 0,
  capLaterYears: true
};

export const anchorYear = 2027;
export const finalYear = 2035;
export const comparisonDate = "2031-07-01";
export const listingAnniversary = "2031-11-19";

// Rounded displayed node means, inspected 21 November 2026. A plug-in
// calculation deliberately cannot reproduce the joint simulation mean.
export const radiant = {
  mean: 105, p1: 20.7, p99: 264,
  founderLifetimeB: 123, founderWindowFraction: 0.321,
  employeePoolB: 48.1, openAiPeoplePoolB: 18.7,
  periodMonths: 42.4, individualRate: 0.0946, foundationAnnualB: 19.8, foundationRatePct: 5
};
const radiantWindowYears = radiant.periodMonths / 12;
const radiantPayout = Math.min(radiant.individualRate * radiantWindowYears, 1);
export const radiantPeoplePoolB = radiant.founderLifetimeB * radiant.founderWindowFraction + radiant.employeePoolB;
export const radiantPlugin = {
  anthropicPeopleB: radiantPeoplePoolB * radiantPayout,
  openAiPeopleB: radiant.openAiPeoplePoolB * radiantPayout,
  foundationB: radiant.foundationAnnualB * radiantWindowYears
};

export function startHorizon(inputs: ModelInputs, scope: Scope) {
  const scoped = scope === "ais" ? inputs : {
    ...inputs,
    founderAisEaAllocationPct: 100,
    employeeAisEaAllocationPct: 100,
    publicBenefitFundAisEaAllocationPct: 100,
    publicBenefitFundEquityPct: scope === "people" ? 0 : inputs.publicBenefitFundEquityPct
  };
  const anchor = calculateModel(scoped);
  const pool = calculateModel({
    ...scoped,
    founderDeploymentByEnd2027Pct: 100,
    employeeDeploymentByEnd2027Pct: 100,
    publicBenefitFundDeploymentByEnd2027Pct: 100
  });
  return {
    initialGrantsB: scope === "ais" ? anchor.capacityAdjustedTotalB : anchor.epistemicallyAdjustedRawTotalB,
    poolB: pool.epistemicallyAdjustedRawTotalB,
    annualCapB: scope === "ais" ? scoped.nearTermDeploymentCapB : Infinity
  };
}

export function extendDraw(inputs: ModelInputs, settings: HorizonSettings) {
  const start = startHorizon(inputs, settings.scope);
  let cumulativeB = start.initialGrantsB;
  let remainingB = Math.max(0, start.poolB - cumulativeB);
  const rows = [{ year: anchorYear, annualB: cumulativeB, cumulativeB, remainingB }];
  for (let year = anchorYear + 1; year <= finalYear; year++) {
    const cap = settings.capLaterYears
      ? start.annualCapB * (1 + settings.annualCapGrowthPct / 100) ** (year - anchorYear)
      : Infinity;
    const annualB = Math.min(remainingB * (settings.annualPayoutPct / 100), cap);
    cumulativeB += annualB;
    remainingB -= annualB;
    rows.push({ year, annualB, cumulativeB, remainingB });
  }
  return rows;
}

type DrawPath = ReturnType<typeof extendDraw>;
const milestone = (path: DrawPath, date: string) => {
  const year = Number(date.slice(0, 4));
  const fraction = (Date.parse(date) - Date.UTC(year, 0, 1)) /
    (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1));
  const i = year - anchorYear;
  return path[i - 1].cumulativeB + fraction * path[i].annualB;
};

export function summarize(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const at = (p: number) => {
    const index = (sorted.length - 1) * p;
    const i = Math.floor(index);
    return sorted[i] + (sorted[Math.ceil(index)] - sorted[i]) * (index - i);
  };
  return { median: at(.5), p10: at(.1), p90: at(.9), mean: sorted.reduce((a, x) => a + x, 0) / values.length };
}

export function projectHorizon(settings: HorizonSettings) {
  const paths = sampleCorrelatedInputs(defaultModelInputs, defaultCorrelatedConfig)
    .map(({ inputs }) => extendDraw(inputs, settings));
  const point = extendDraw(defaultModelInputs, settings);
  return {
    rows: point.map(({ year, annualB, cumulativeB }, i) => ({
      year, point: { annualB, cumulativeB },
      annual: summarize(paths.map(path => path[i].annualB)),
      cumulative: summarize(paths.map(path => path[i].cumulativeB))
    })),
    dates: [comparisonDate, listingAnniversary].map(date => ({
      date, point: milestone(point, date), ...summarize(paths.map(path => milestone(path, date)))
    }))
  };
}
