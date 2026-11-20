// Historical November 10 inputs are frozen for the November 13 review artifacts.
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
export const anthropicIpoClosing = {
  reviewed: "2026-11-20",
  priced: "2026-11-18",
  firstTrading: "2026-11-19",
  closed: "2026-11-20",
  url: "https://www.anthropic.com/news/ipo-close",
  pricingUrl: "https://www.anthropic.com/news/anthropic-prices-initial-public-offering",
  finalProspectusUrl: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074944/anthropicpbc-424b4.htm",
  price: 83,
  totalShares: 1_127_000_000,
  companyShares: 1_103_351_354,
  sellingStockholderShares: 23_648_646,
  optionShares: 147_000_000,
  privatePlacementShares: 313_253_007
};
export const ipoGrossB = anthropicIpoClosing.totalShares * anthropicIpoClosing.price / 1e9;
export const companyIpoGrossB = anthropicIpoClosing.companyShares * anthropicIpoClosing.price / 1e9;
export const sellingStockholderGrossB = anthropicIpoClosing.sellingStockholderShares * anthropicIpoClosing.price / 1e9;
export const privatePlacementGrossB = anthropicIpoClosing.privatePlacementShares * anthropicIpoClosing.price / 1e9;
export const offeringSummary = `Anthropic began Nasdaq trading on November 19 and confirmed closing on November 20 at $${anthropicIpoClosing.price} per share, including the full underwriter option. The IPO generated ${billions(ipoGrossB * 1e9)} gross: ${billions(companyIpoGrossB * 1e9)} for the company and ${billions(sellingStockholderGrossB * 1e9)} for selling stockholders, before fees and taxes. A separate ${billions(privatePlacementGrossB * 1e9)} private placement also closed. These proceeds are company financing and shareholder liquidity; no charitable payout is established by them.`;
export const lockupSummary = "The final prospectus retains up-to-180-day restrictions for many holders and up-to-365-day restrictions for founders and some large holders, with staged exceptions. Non-founder employees may sell up to 10% at first trading; founders may release up to 29% of remaining locked shares at Q1 results or day 180. Founder sales in the offering are separately permitted. Legal sale eligibility is not a donation schedule.";
export const fundIssuanceSummary = "The filing discloses an initial contribution of Class N shares to the company-owned Public Benefit Fund, representing 5% of June 30 fully diluted shares assuming full conversion of the Amazon Notes. The board currently determines allocations; later increments are discretionary. This resolves the initial issuance hurdle, not external cause allocation or cash payout timing. The historical 5% denominator is not a current post-IPO ownership percentage.";
