export const report = {
  title: "Will AI Wealth Actually Flood AIS/EA Philanthropy Soon?",
  subtitle:
    "A preliminary model and dashboard for testing how much AI-lab-adjacent wealth may become usable funding for AI safety and EA cause areas, and how quickly.",
  lastUpdated: "29 October 2026",
  coreSteelman:
    "A liquidity event is plausible, maybe likely; a fast, very large, flexible flow of money into AIS/EA operating organizations by the post-lockup near term is much less likely.",
  claimBeingCritiqued: [
    "The live claim is not merely that AI companies may become extremely valuable. Anthropic publicly filed an S-1 for a proposed IPO, though the offering date, price, share count, lockup terms, and first trading date remain unset. OpenAI's nonprofit Foundation holds a major equity stake in OpenAI Group and has begun announcing large programs.",
    "The stronger planning claim is that AI-lab-adjacent paper wealth will soon become flexible, cause-directed AIS/EA operating money at a scale that should change organizational decisions today.",
    "This report tests the skeptical case. Paper philanthropic capacity, meaning notional equity value before taxes, lockups, sale timing, donor choices, and grantmaking capacity, is separated from realized grants by several gates."
  ],
  counterarguments: [
    "The model could be too pessimistic if the Anthropic Public Benefit Fund is approved, becomes liquid quickly, and makes large external grants; if founders or employees treat liquidity as an urgent moral obligation; if existing funders rapidly expand grantmaking capacity; or if Anthropic's realizable valuation is far above the current default. The new fund is real institutional plumbing, but its governance, cause allocation, and distribution schedule remain unspecified.",
    "Broad public-benefit capacity is no longer only hypothetical. Anthropic proposes putting 5% of its shares into a company-owned Public Benefit Fund, subject to stockholder approval. It has also announced a $200 million Gates Foundation partnership and $150 million in mixed in-kind support for U.S. federal science projects. OpenAI and Gates committed $50 million to primary health care in Africa, and the OpenAI Foundation has announced more than $125 million for public health datasets. These signals still do not show that specific AIS/EA bottlenecks will be funded.",
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
    evidenceIds: ["anthropic-s1", "anthropic-public-s1", "anthropic-ipo-current-reporting", "anthropic-ipo-oct-21", "anthropic-valuation", "polymarket-anthropic-ipo", "sec-ipo-lockup"],
    feedbackIds: ["md-lockup-delay", "dr-lockup-time-profile"],
    details: [
      "Anthropic publicly filed its S-1 on October 26 and intends to list on Nasdaq. It has not announced an offer price, share count, effective date, lockup terms, or first trading date.",
      "A late-2026 IPO could still imply mid-2027 or later insider liquidity. Investor.gov says most IPO lockups prevent insider sales for about 180 days, though the actual prospectus controls. The main uncertainty is the time profile of donations after valuation changes, taxes, sale timing, and donor planning during that delay.",
      "Markets usually resolve on public trading, not on grants disbursed to AIS/EA organizations."
    ]
  },
  {
    title: "Gate 2: equity commitments are not binding near-term grants",
    claim: "Founder pledges and the proposed Public Benefit Fund can still become slow, partial, broad, or institutionally constrained giving.",
    evidenceIds: ["anthropic-founder-pledge", "anthropic-public-benefit-fund"],
    feedbackIds: ["md-founder-pledge"],
    details: [
      "Anthropic's initial 5% fund stake is subject to stockholder approval. The company has not yet disclosed governance, the valuation baseline for possible additions, cause allocation, or a distribution schedule.",
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
