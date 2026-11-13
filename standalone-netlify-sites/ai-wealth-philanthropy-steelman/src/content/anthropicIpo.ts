// Primary-source inputs, not completed-offering or recipient-payment observations.
export const anthropicIpo = {
  reviewed: "2026-11-13",
  filed: "2026-11-10",
  prospectusUrl: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026072484/anthropicpbc-sx1ax2.htm",
  roadshowUrl: "https://www.anthropic.com/news/roadshow-launch",
  priceLow: 70,
  priceHigh: 78,
  offeredShares: 825_000_000,
  companyShares: 801_351_354,
  sellingStockholderShares: 23_648_646,
  founderCount: 7,
  offeredPerFounder: 3_378_378,
  fundShares: 846_840_960,
  fundJuneFullyDilutedPct: 5,
  tenderApproxShares: 179_900_000,
  tenderPrice: 25.9136,
  donationMatchingExpenseB: 2.1
};

const billions = (value: number) => `$${(value / 1e9).toFixed(2)}B`;
export const proposedFounderSaleRange = `${billions(anthropicIpo.sellingStockholderShares * anthropicIpo.priceLow)}–${billions(anthropicIpo.sellingStockholderShares * anthropicIpo.priceHigh)}`;
export const historicalTenderApprox = billions(anthropicIpo.tenderApproxShares * anthropicIpo.tenderPrice);
export const offeringSummary = `The November 10 roadshow proposes ${anthropicIpo.offeredShares.toLocaleString("en-US")} shares at $${anthropicIpo.priceLow}–$${anthropicIpo.priceHigh}. The founders' proposed sales imply ${proposedFounderSaleRange} gross proceeds if completed. These are proposed personal sale proceeds, not charitable gifts; final pricing and first trading remain unconfirmed.`;
export const lockupSummary = "The preliminary prospectus describes up-to-180-day restrictions for many holders and up-to-365-day restrictions for founders and some large holders, with staged exceptions. Non-founder employees may sell up to 10% at first trading; founders may release up to 29% of remaining locked shares at Q1 results or day 180. Founder sales in the offering are separately permitted. Legal sale eligibility is not a donation schedule.";
export const fundIssuanceSummary = "The filing discloses an initial contribution of Class N shares to the company-owned Public Benefit Fund, representing 5% of June 30 fully diluted shares assuming full conversion of the Amazon Notes. The board currently determines allocations; later increments are discretionary. This resolves the initial issuance hurdle, not external cause allocation or cash payout timing. The historical 5% denominator is not a current post-IPO ownership percentage.";
