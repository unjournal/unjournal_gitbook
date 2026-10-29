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

/** Public primary sources. Aggregate donor reports are not an itemized cash ledger. */
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
    id: "aw-bollard-ai-windfall",
    title: "Lewis Bollard: The AI Windfall",
    url: "https://farmanimalwelfare.substack.com/p/the-ai-windfall",
    eventDate: "2026-08-05",
    accessed: animalWelfareReviewDate,
    finding: "Coefficient Giving's farm-animal lead reports tens of millions already donated by newly wealthy AI donors during 2026. The account does not itemize donors, recipients, payment dates, or the Anthropic share.",
    implication: "Supports expecting some further animal giving, without identifying a 65% or 85% probability for this narrower pool. Earlier gifts are excluded from prospective cash and no amount is added to the named ledger."
  },
  {
    id: "aw-metaculus-cause-model",
    title: "Metaculus: IPO windfall cause-area model",
    url: "https://radiant.metaculus.com/projects/e80a5e79-b71f-4c4b-bf4a-821497fedcee",
    eventDate: "Live map; inspected 2026-10-29",
    accessed: animalWelfareReviewDate,
    finding: "The individual-giving animal weight has P10/P50/P90 of 1.87/5.93/17.3 percentage points from three predictions by two people. The map floors negative weights and normalizes all nine causes in each draw. Its window ends in 2031, and its individuals include both labs.",
    implication: "Supports exploring several-percent allocations, without identifying our 2% or 5% scenario as better calibrated. These are raw weights, not normalized-share percentiles or end-2027 forecasts. The map assigns no OpenAI Foundation animal channel; ours is explicitly speculative."
  },
  {
    id: "aw-rp-cause-survey",
    title: "Rethink Priorities: EA Survey 2024 cause prioritization",
    url: "https://forum.effectivealtruism.org/posts/CKwDgZGLipchAoxtN/ea-survey-2024-cause-prioritization",
    eventDate: "2025-12-04; 2024 survey",
    accessed: animalWelfareReviewDate,
    finding: "Respondents' preferred resource allocation averaged about 24% to near-term animal-focused causes.",
    implication: "Preferences of a selected EA sample are not dollar-weighted donations by AI shareholders. This supports a high-allocation sensitivity case, not a 24% forecast for this donor pool."
  },
  {
    id: "aw-rp-wild-capacity",
    title: "Rethink Priorities: wild-animal room for more funding",
    url: "https://rethinkpriorities.org/research-area/wild-animal-welfare-rfmf/",
    eventDate: "2026-08-14",
    accessed: animalWelfareReviewDate,
    finding: "The covered organizations report $3.16M–$8.23M of additional 2027 room for funding. Organizations supplied their own estimates; RP does not endorse each estimate.",
    implication: "Capacity differs sharply across animal subfields. This is neither an all-animal ceiling nor a prediction of AI-funded cash; it does not justify imposing a hard cap on the whole model."
  },
  {
    id: "aw-weinstock-strategy",
    title: "Itsi Weinstock: The San Francisco Strategy for Animal Welfare",
    url: "https://frontieranimals.substack.com/p/the-san-francisco-strategy-for-animal",
    eventDate: "2026-07-30",
    accessed: animalWelfareReviewDate,
    finding: "A strategy essay advocates scaling the movement's capacity to at least $1B by mid-2027. Its spring-2027 giving scenario assumes 2026 IPOs and a six-month lockup.",
    implication: "An ambition and conditional timeline, not measured capacity or verified sale terms. Recipient readiness belongs in payout uncertainty; the model keeps its 5% personal payout center rather than assuming a spring windfall."
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

export const animalWelfareReviewedForecast = {
  date: animalWelfareReviewDate,
  medianB: 0.1552849253925997,
  low80B: 0,
  high80B: 1.749199488483615,
  reviewStatus: "Literature-informed re-estimation; donor allocation and timing remain judgmental",
  inputsChanged: true,
  note: "Same-day deeper review: Bollard's August report of existing AI-donor animal gifts raises personal-channel uptake from 65% to 85%; sparse Metaculus end-2031 cause weights inform a conditional animal share of 5%, up from 2%. Neither source measures this Anthropic pool or deadline. Earlier gifts are not added to prospective cash. Personal payout stays 5%: no new sale, lockup, or recipient-payment evidence justifies accelerating it. Institutional inputs and the fixed end-2027 horizon are unchanged. Seed 20261029; 20,000 draws.",
  supersededSameDayReview: {
    medianB: animalWelfareInitialForecast.medianB,
    low80B: animalWelfareInitialForecast.low80B,
    high80B: animalWelfareInitialForecast.high80B,
    note: animalWelfareInitialForecast.note
  }
};

/** Interpretation review: retain numerical history, without endorsing either scenario. */
export const animalWelfareCurrentSnapshot = {
  date: animalWelfareReviewDate,
  medianB: animalWelfareReviewedForecast.medianB,
  low80B: animalWelfareReviewedForecast.low80B,
  high80B: animalWelfareReviewedForecast.high80B,
  estimateKind: "illustrative-scenario" as const,
  adoptedForecast: false,
  reviewStatus: "Interpretation reviewed; reference scenario only, no adopted central forecast",
  inputsChanged: false,
  note: "The $155M median is retained as the higher-allocation reference scenario for reproducibility, not a best estimate. Existing donor reports support expecting animal giving, but do not calibrate the 85% pooled hurdle or 5% allocation. The original $34M scenario is also judgmental. Neither is a lower/upper bound on the true forecast. P10–P90 describes draws within each chosen model and does not establish 80% coverage of real funding outcomes. No new cash evidence or numerical input change in this interpretation review.",
  previousSameDayReviews: [
    { label: "Launch assumptions", ...animalWelfareInitialForecast },
    { label: "Literature-informed upward revision", ...animalWelfareReviewedForecast }
  ]
};

export const animalWelfarePublishedScenarios = [
  { id: "lower-allocation", label: "Lower-allocation scenario", personalAwUptakePct: 65, personalAwAllocationPct: 2, ...animalWelfareInitialForecast },
  { id: "higher-allocation", label: "Higher-allocation reference", personalAwUptakePct: 85, personalAwAllocationPct: 5, ...animalWelfareReviewedForecast }
];

export const animalWelfareForecastTarget = "New cash from modeled AI-linked pathways reaching animal-welfare recipients from 29 October 2026 through 31 December 2027";

export const animalWelfareNews = [
  {
    date: "2026-10-29",
    title: "Animal funding: compare scenarios; no central forecast adopted",
    summary: "The lower- and higher-allocation scenarios yield medians of $34M and $155M. Both rely on subjective giving gates, allocation shares, and payout timing. Existing AI-donor gifts support expecting some further animal giving, but available sources do not calibrate either parameter set. The page now gives both scenarios equal prominence and explains the pooled-gate sensitivity. No new grant or cash receipt is reported.",
    strength: "Reported" as const,
    evidenceIds: ["aw-bollard-ai-windfall", "aw-metaculus-cause-model"]
  },
  {
    date: "2026-10-29",
    title: "Earlier review: higher-allocation scenario added",
    summary: "The deeper review added donor-giving reports and external allocation research, yielding a $155M scenario median with a $0–$1.75B within-model P10–P90 interval. The subsequent interpretation review above does not endorse this as a better-supported central forecast. Earlier gifts remain excluded.",
    strength: "Reported" as const,
    evidenceIds: ["aw-bollard-ai-windfall", "aw-metaculus-cause-model"]
  },
  {
    date: "2026-10-29",
    title: "Initial launch: cause allocation enters as an explicit hurdle",
    summary: "The launch estimate separated individual/matched-equity giving, Anthropic's proposed Public Benefit Fund, and a prospective OpenAI Foundation channel. Its original settings and published forecast remain available. The deeper same-day review above adds previously omitted donor-giving evidence and external allocation research.",
    strength: "Planned" as const,
    evidenceIds: ["aw-anthropic-public-benefit-fund", "aw-openai-foundation-plan"]
  }
];
