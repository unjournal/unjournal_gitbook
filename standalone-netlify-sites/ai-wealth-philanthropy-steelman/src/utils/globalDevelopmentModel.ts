export type GlobalDevelopmentInputs = {
  anthropicValuationB: number;
  founderOwnershipPct: number;
  founderPledgePct: number;
  founderRealizationPct: number;
  founderFollowThroughPct: number;
  founderGhdAllocationPct: number;
  founderDeploymentByEnd2027Pct: number;
  employeeCommittedPoolB: number;
  employeeRealizationPct: number;
  employeeGhdAllocationPct: number;
  employeeDeploymentByEnd2027Pct: number;
  publicBenefitFundEquityPct: number;
  publicBenefitFundApprovalPct: number;
  publicBenefitFundRealizationPct: number;
  publicBenefitFundGhdAllocationPct: number;
  publicBenefitFundDeploymentByEnd2027Pct: number;
  namedProgramsB: number;
  namedProgramsGhdAllocationPct: number;
  namedProgramsCashEquivalentPct: number;
  namedProgramsDeploymentByEnd2027Pct: number;
  openAiOtherPlanB: number;
  openAiGhdAllocationPct: number;
  openAiCashEquivalentPct: number;
  openAiDeploymentByEnd2027Pct: number;
  nearTermDeploymentCapB: number;
};

export type GlobalDevelopmentOutput = {
  founderB: number;
  employeeB: number;
  publicBenefitFundB: number;
  namedProgramsB: number;
  openAiOtherB: number;
  rawTotalB: number;
  capacityAdjustedTotalB: number;
};

export const defaultGlobalDevelopmentInputs: GlobalDevelopmentInputs = {
  anthropicValuationB: 965,
  founderOwnershipPct: 12,
  founderPledgePct: 80,
  founderRealizationPct: 60,
  founderFollowThroughPct: 45,
  founderGhdAllocationPct: 15,
  founderDeploymentByEnd2027Pct: 7,
  employeeCommittedPoolB: 20,
  employeeRealizationPct: 60,
  employeeGhdAllocationPct: 20,
  employeeDeploymentByEnd2027Pct: 10,
  publicBenefitFundEquityPct: 5,
  publicBenefitFundApprovalPct: 90,
  publicBenefitFundRealizationPct: 60,
  publicBenefitFundGhdAllocationPct: 10,
  publicBenefitFundDeploymentByEnd2027Pct: 5,
  namedProgramsB: 0.31,
  namedProgramsGhdAllocationPct: 70,
  namedProgramsCashEquivalentPct: 60,
  namedProgramsDeploymentByEnd2027Pct: 40,
  openAiOtherPlanB: 0.79,
  openAiGhdAllocationPct: 10,
  openAiCashEquivalentPct: 70,
  openAiDeploymentByEnd2027Pct: 80,
  nearTermDeploymentCapB: 10
};

export function calculateGlobalDevelopmentModel(i: GlobalDevelopmentInputs): GlobalDevelopmentOutput {
  const founder =
    i.anthropicValuationB *
    (i.founderOwnershipPct / 100) *
    (i.founderPledgePct / 100) *
    (i.founderRealizationPct / 100) *
    (i.founderFollowThroughPct / 100) *
    (i.founderGhdAllocationPct / 100) *
    (i.founderDeploymentByEnd2027Pct / 100);
  const employee =
    i.employeeCommittedPoolB *
    (i.employeeRealizationPct / 100) *
    (i.employeeGhdAllocationPct / 100) *
    (i.employeeDeploymentByEnd2027Pct / 100);
  const publicBenefitFund =
    i.anthropicValuationB *
    (i.publicBenefitFundEquityPct / 100) *
    (i.publicBenefitFundApprovalPct / 100) *
    (i.publicBenefitFundRealizationPct / 100) *
    (i.publicBenefitFundGhdAllocationPct / 100) *
    (i.publicBenefitFundDeploymentByEnd2027Pct / 100);
  const namedPrograms =
    i.namedProgramsB *
    (i.namedProgramsGhdAllocationPct / 100) *
    (i.namedProgramsCashEquivalentPct / 100) *
    (i.namedProgramsDeploymentByEnd2027Pct / 100);
  const openAiOther =
    i.openAiOtherPlanB *
    (i.openAiGhdAllocationPct / 100) *
    (i.openAiCashEquivalentPct / 100) *
    (i.openAiDeploymentByEnd2027Pct / 100);
  const rawTotal = founder + employee + publicBenefitFund + namedPrograms + openAiOther;

  return {
    founderB: founder,
    employeeB: employee,
    publicBenefitFundB: publicBenefitFund,
    namedProgramsB: namedPrograms,
    openAiOtherB: openAiOther,
    rawTotalB: rawTotal,
    capacityAdjustedTotalB: Math.min(rawTotal, i.nearTermDeploymentCapB)
  };
}
