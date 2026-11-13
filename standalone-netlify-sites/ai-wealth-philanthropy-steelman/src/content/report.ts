import { offeringSummary, lockupSummary, fundIssuanceSummary } from "./anthropicIpo";

export const report = {
  title: "Will AI Wealth Actually Flood AIS/EA Philanthropy Soon?",
  subtitle:
    "A preliminary model and dashboard for testing how much AI-lab-adjacent wealth may become usable funding for AI safety and EA cause areas, and how quickly.",
  lastUpdated: "13 November 2026",
  coreSteelman:
    "A liquidity event is plausible, maybe likely; a fast, very large, flexible flow of money into AIS/EA operating organizations by the post-lockup near term is much less likely.",
  claimBeingCritiqued: [
    offeringSummary,
    "The stronger planning claim is that AI-lab-adjacent paper wealth will soon become flexible, cause-directed AIS/EA operating money at a scale that should change organizational decisions today.",
    "This report tests the skeptical case. Paper philanthropic capacity, meaning notional equity value before taxes, lockups, sale timing, donor choices, and grantmaking capacity, is separated from realized grants by several gates."
  ],
  counterarguments: [
    "The model could be too pessimistic if the Public Benefit Fund makes large external grants quickly; if founders or employees use liquidity for urgent giving; if existing funders rapidly expand capacity; or if realizable equity value exceeds the scenario anchor. Earlier tender liquidity, disclosed matching share issuances, and proposed founder IPO sales strengthen the availability case. They do not identify the share reaching AIS/EA recipients by the deadline.",
    fundIssuanceSummary,
    "The clearest update is indirect but important: Coefficient Giving and Good Ventures increased their 2026 GiveWell allocation from $175 million to $1 billion, and GiveWell now reports more than $600 million directed in 2026. They are spending earlier partly because they expect more future funding and want grantees to build capacity, while warning that volatile-asset-linked funding may not arrive. This is evidence that the anticipated wave is already affecting decisions, not evidence that new AI wealth has become liquid.",
    "The most important optimistic update would be concrete institutional plumbing: named grantmakers, explicit cause allocations, deployable vehicles, public or private commitments, and early grants reaching organizations outside the lab-compatible core."
  ],
  planningScenarios: [
    {
      title: "Scenario A: skeptical/base planning",
      body:
        "Plan from money on the books and credible near-term fundraising, not from hoped-for AI-wealth liquidity. The practical warning is for projects implicitly using a near-term AI-wealth windfall to justify hiring, commitments, or low reserve levels today.",
      evidenceIds: ["anthropic-s1", "anthropic-valuation"],
      feedbackIds: ["md-planning", "uj-planning-adjust", "uj-planning-scenarios"]
    },
    {
      title: "Scenario B: optimistic wealth, bottlenecked conversion",
      body:
        "If the wealth scenario is true but conversion is bottlenecked, the marginal work is grantmaker and recipient capacity. Coefficient Giving and GiveWell are now acting on this logic at scale in global health, though the future funding they anticipate remains uncertain.",
      evidenceIds: ["grantmaker-bottleneck", "coefficient-givewell-1b", "givewell-scaling-1b"],
      feedbackIds: ["uj-planning-scenarios"]
    }
  ],
  planningImplications: [
    "Across both scenarios, advocacy, policy, and governance groups should not assume that lab-adjacent philanthropy will fund work that is reputationally or commercially awkward for frontier labs. Independent funding from politically and institutionally diverse donors remains valuable even in a high-liquidity world."
  ]
};

export const steelmanGates = [
  {
    title: "Gate 1: IPO or valuation is not spendable philanthropic cash",
    claim: "Prediction markets may be right about an IPO while funding expectations are wrong about grant timing and realizable valuation.",
    evidenceIds: ["anthropic-roadshow-nov10", "anthropic-prospectus-nov10", "anthropic-valuation"],
    feedbackIds: ["md-lockup-delay", "dr-lockup-time-profile"],
    details: [
      offeringSummary,
      lockupSummary,
      "Markets usually resolve on public trading, not on grants disbursed to AIS/EA organizations."
    ]
  },
  {
    title: "Gate 2: equity commitments are not binding near-term grants",
    claim: "Founder pledges and company-owned fund equity leave external allocation and payout decisions open.",
    evidenceIds: ["anthropic-founder-pledge", "anthropic-prospectus-nov10"],
    feedbackIds: ["md-founder-pledge"],
    details: [
      fundIssuanceSummary,
      "Founder pledges still vary in enforceability, timeline, cause allocation, and psychological durability. Both pathways must pass through liquidity and institutional process before becoming grants."
    ]
  },
  {
    title: "Gate 3: billionaire philanthropy often moves slowly",
    claim: "Asset stocks in foundations and donor-advised funds do not automatically become near-term operating grants.",
    evidenceIds: ["irs-daf-control", "irs-foundation-payout"],
    details: [
      "Donor-advised funds can pay out quickly in aggregate, but there is no general tax-code minimum payout requirement for individual accounts.",
      "The IRS generally calculates a private foundation's minimum investment return at 5% of noncharitable-use assets. That is a floor on qualifying distributions, not a requirement to spend down quickly."
    ]
  },
  {
    title: "Gate 4: AI philanthropy is broader than EA/AIS funding",
    claim: "OpenAI or Anthropic public-benefit money may prioritize health, economic transition, nonprofit AI adoption, public goods, or broad AI resilience.",
    evidenceIds: ["openai-foundation-value", "openai-foundation-2026", "openai-people-first-2026", "openai-common-health-100m", "anthropic-public-benefit-fund", "anthropic-gates", "openai-horizon-1000", "anthropic-claude-corps", "gates-ai-equity-1b"],
    feedbackIds: ["md-openai-foundation"],
    details: [
      "The new health and nonprofit programs are material evidence that the wave is real, but they are mostly restricted programs, technology support, or partnerships rather than flexible AIS/EA operating grants. The $100 million Common Health Coalition commitment is initially U.S.-focused. OpenAI Foundation value therefore remains broad context rather than a core AIS/EA conversion input."
    ]
  },
  {
    title: "Gate 5: lab-adjacent money may favor lab-compatible and socially proximate work",
    claim: "Funding may disproportionately support work acceptable to frontier labs and recipients already inside the relevant donor or grantmaker social graph.",
    evidenceIds: ["anthropic-claude-corps", "anthropic-economic-fund", "anthropic-public-first-40m", "coefficient-underfunded"],
    feedbackIds: ["md-merge-gates", "dr-merge-social-graph"],
    details: [
      "Technical safety, evals, interpretability, lab-compatible governance, and existing socially proximate organizations may be easier to fund than adversarial policy, liability work, lobbying, anti-race campaigning, or other politically awkward work.",
      "The concrete question is not just whether a cause is AIS/EA-relevant; it is whether the recipient organization is already legible to, trusted by, or connected to the donor/grantmaker network that controls the new resource."
    ]
  },
  {
    title: "Gate 6: deployment is bottlenecked on grantmakers and recipient capacity",
    claim: "Even large donor intent requires trusted evaluators, grantmaking operations, and senior judgment.",
    evidenceIds: ["grantmaker-bottleneck", "coefficient-givewell-1b", "coefficient-ghw-ai-rfp", "givewell-scaling-1b"],
    feedbackIds: ["md-capacity-cap"],
    details: [
      "The difference between billions existing and billions being usefully deployed is organizational capacity. In the model this is now a near-term dollar cap rather than a multiplier."
    ]
  },
  {
    title: "Epistemic caution: Bay social incentives can make optimistic funding rumors self-reinforcing",
    claim:
      "People who could puncture the rumor may also have reasons not to publicly challenge prospective donors, grantmakers, or their optimistic funding narratives.",
    evidenceIds: ["grantmaker-bottleneck"],
    feedbackIds: ["md-bay-incentives", "dr-expost-adjustment"],
    details: [
      "Treat this as an epistemic discount on locally circulating expectations, not as another mechanical conversion step in the funding-flow model."
    ]
  }
];
