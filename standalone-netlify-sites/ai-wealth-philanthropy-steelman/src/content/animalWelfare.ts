export const animalWelfareReviewDate = "2026-10-29";

export type AnimalWelfareEvidence = {
  id: string;
  title: string;
  url: string;
  eventDate: string;
  accessed: string;
  finding: string;
  implication: string;
};

/** Public primary sources; none establishes a named AI-wealth grant to animal welfare. */
export const animalWelfareEvidence: AnimalWelfareEvidence[] = [
  {
    id: "aw-anthropic-s1",
    title: "Anthropic: proposed IPO registration",
    url: "https://www.anthropic.com/news/s1-sec",
    eventDate: "2026-10-26",
    accessed: animalWelfareReviewDate,
    finding: "The company confirms a public S-1 filing and planned Nasdaq listing. Its announcement leaves price and offered share count undetermined and says registration is not yet effective.",
    implication: "Liquidity is more concrete, but the announcement does not establish proceeds available for gifts, lockup expiry, or an animal-welfare allocation."
  },
  {
    id: "aw-anthropic-public-benefit-fund",
    title: "Anthropic: Public Benefit Fund and personal pledges",
    url: "https://www.anthropic.com/news/public-benefit-fund",
    eventDate: "2026-10-18",
    accessed: animalWelfareReviewDate,
    finding: "Anthropic proposes 5% of its shares for a wholly owned LLC, subject to approval. It reports founder 80% equity pledges, employee matching, and roughly 20% of shares dedicated to public good in total.",
    implication: "The model uses separate fund and individual/matching paths. Roughly 15% outside the proposed fund is a derived approximation, not a disclosed cap table. No animal allocation or payout schedule is stated."
  },
  {
    id: "aw-anthropic-series-h",
    title: "Anthropic: Series H valuation",
    url: "https://www.anthropic.com/news/series-h",
    eventDate: "2026-05-28",
    accessed: animalWelfareReviewDate,
    finding: "Anthropic reports a $965B post-money financing valuation.",
    implication: "This anchors paper equity value. It is neither a recipient grant nor a guaranteed price at which pledged shares can be sold."
  },
  {
    id: "aw-openai-foundation-plan",
    title: "OpenAI: Foundation investment plan",
    url: "https://openai.com/index/update-on-the-openai-foundation/",
    eventDate: "2026-03-24",
    accessed: animalWelfareReviewDate,
    finding: "The Foundation expects to invest at least $1B over the following year in life sciences, jobs and economic impact, AI resilience, and community programs.",
    implication: "This informs the scale of an editable prospective-flow scenario. It is not an unallocated pot, an animal-welfare pledge, or a second amount to add to the Foundation's named grants."
  },
  {
    id: "aw-coefficient-program",
    title: "Coefficient Giving: Farm Animal Welfare Fund",
    url: "https://coefficientgiving.org/funds/farm-animal-welfare/",
    eventDate: "Undated live program page",
    accessed: animalWelfareReviewDate,
    finding: "An established fund supports welfare reform, scientific research, movement growth, and alternatives to animal products. Its listed partner is Good Ventures.",
    implication: "An existing grantmaking channel can absorb and evaluate donations. Its current work does not establish that new Anthropic or OpenAI wealth has entered that channel."
  },
  {
    id: "aw-ea-funds",
    title: "EA Funds: Animal Welfare Fund",
    url: "https://funds.effectivealtruism.org/funds/animal-welfare",
    eventDate: "Undated live program page",
    accessed: animalWelfareReviewDate,
    finding: "The pooled fund supports farmed and neglected animals, including aquatic animals, invertebrates, and wild-animal interventions.",
    implication: "This supplies a plausible regranting route and helps define scope. The source does not identify how much of its funding is new AI-company wealth."
  },
  {
    id: "aw-ace-movement-grants",
    title: "ACE: latest Movement Grants criteria",
    url: "https://animalcharityevaluators.org/movement-grants/apply-for-funding/",
    eventDate: "Round opened 2026-09-24; deadline 2026-10-18",
    accessed: animalWelfareReviewDate,
    finding: "The latest round includes research with defined decision users and AI-and-animals projects with a clear welfare pathway. The listed application deadline has passed.",
    implication: "Existing infrastructure can support animal-focused research and evaluation. This is incumbent-funder context, not evidence of new AI wealth or a currently open call."
  }
];

/**
 * Freeze published points. Do not calculate historical values from mutable
 * defaults. Parent tracker.ts imports this initial point into its route history.
 */
export const animalWelfareInitialForecast = {
  date: animalWelfareReviewDate,
  medianB: 0.03377286682026971,
  low80B: 0,
  high80B: 0.6624607119893011,
  reviewStatus: "Initial exploratory estimate; allocation assumptions need review",
  inputsChanged: true,
  note: "First animal-welfare model. The public S-1 and proposed fund support a possible liquidity path, but no named animal-welfare allocation was identified. Subjective channel-uptake events allow a genuine zero outcome. The fixed end-2027 deadline is reflected in low, uncertain payout rates; IPO filing is not treated as cash. Seed 20261029; 20,000 draws."
};

export const animalWelfareForecastTarget = "New cash from modeled AI-linked pathways reaching animal-welfare recipients from 29 October 2026 through 31 December 2027";

export const animalWelfareNews = [
  {
    date: "2026-10-29",
    title: "Animal-welfare fork launched with cause allocation as an explicit hurdle",
    summary: "The first estimate models individual/matched-equity giving, Anthropic's proposed Public Benefit Fund, and a prospective OpenAI Foundation channel. No named animal-welfare allocation was identified in the primary sources reviewed. Broad public-benefit promises therefore enter only through explicit, editable assumptions.",
    strength: "Planned" as const,
    evidenceIds: ["aw-anthropic-public-benefit-fund", "aw-openai-foundation-plan"]
  }
];
