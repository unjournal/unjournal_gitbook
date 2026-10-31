import { animalWelfareEvidence } from "./animalWelfare";

export type Evidence = {
  id: string;
  marker: string;
  title: string;
  url: string;
  quote: string;
  note: string;
};

export const evidence: Evidence[] = [
  {
    id: "givewell-malaria-scale-2026",
    marker: "GW27",
    title: "GiveWell: further scaling malaria grantmaking",
    url: "https://blog.givewell.org/2026/10/26/further-scaling-our-malaria-grantmaking/",
    quote: "aiming to grant at least $2.5 billion in new malaria funding",
    note: "Published 2026-10-26; reiterated 2026-10-30; accessed 2026-10-31. The goal covers 2027–32; GiveWell also expects more than $1B outside malaria in 2027. Funding, scalability, country demand, and cost-effectiveness remain conditions. The proposed Global Fund mechanism is not yet board-approved. No amount is added to AI-linked commitments or cash-paid totals."
  },
  ...animalWelfareEvidence.map((item, index) => ({
    id: item.id, marker: `AW${index + 1}`, title: item.title, url: item.url, quote: "",
    note: `${item.finding} ${item.implication} Event: ${item.eventDate}; accessed ${item.accessed}.`
  })),
  {
    id: "openai-cities-deliver-50m", marker: "OCD", title: "OpenAI Foundation and Rockefeller: Cities Deliver",
    url: "https://openaifoundation.org/news/helping-cities-deliver-more-for-their-residents",
    quote: "a $50 million initiative",
    note: "Announced 2026-10-14; accessed 2026-10-29. Joint grants of $500K–$2M over 24 months, with a city partner required. Donor contributions and a GH&D share are not disclosed, so this amount is not added to the new-AI-wealth ledger or a recipient-cash total."
  },
  {
    id: "effective-giving-2026",
    marker: "EG26",
    title: "GWWC: effective giving ecosystem, 2026 overview",
    url: "https://forum.effectivealtruism.org/posts/T7CKswFYSgjePAwZh/updates-on-the-effective-giving-ecosystem-2026",
    quote: "whether and when this money will materialise",
    note: "Published 2026-07-28; accessed 2026-09-17. Context for the folded update; no numerical model recalibration."
  },
  {
    id: "anthropic-s1",
    marker: "S1",
    title: "Anthropic confidential draft S-1",
    url: "https://www.anthropic.com/news/confidential-draft-s1-sec",
    quote: "confidentially submitted a draft registration statement on Form S-1",
    note: "Supports the claim that an IPO/liquidity event is live, while still conditional."
  },
  {
    id: "anthropic-public-s1",
    marker: "S1P",
    title: "Anthropic files public S-1 for proposed IPO",
    url: "https://www.anthropic.com/news/s1-sec",
    quote: "filed a registration statement on Form S-1",
    note:
      "Official announcement published and accessed 2026-10-26. It confirms a public registration statement and intended Nasdaq listing, while leaving the share count, price range, effectiveness, first trading date, and lockup terms unset."
  },
  {
    id: "anthropic-ipo-reporting",
    marker: "B20",
    title: "Bloomberg reporting on Anthropic's public IPO filing",
    url: "https://news.bloomberglaw.com/artificial-intelligence/anthropic-expects-to-match-spacexs-record-ipo-size-or-top-it",
    quote: "prepares to file publicly for its potential mega-IPO as soon as the end of this month",
    note:
      "Historical unnamed-source reporting published 2026-08-20. Its filing speculation was superseded by Anthropic's official public S-1 announcement on October 26; it does not establish offering terms or a first trading date."
  },
  {
    id: "anthropic-ipo-current-reporting",
    marker: "A30",
    title: "Axios on the current Anthropic IPO timetable",
    url: "https://www.axios.com/2026/09/30/ipo-stocks-oura-anthropic",
    quote: "expected to make its debut on the Nasdaq in November",
    note:
      "Published 2026-09-30; reviewed 2026-10-29. Historical reporting on a November debut. Its no-public-filing status was superseded by Anthropic's October 26 announcement; it remains useful provenance for the earlier forecast."
  },
  {
    id: "anthropic-ipo-oct-21",
    marker: "A21",
    title: "Axios on Anthropic's IPO financing pressure",
    url: "https://www.axios.com/2026/10/21/anthropic-ipo-ai-costs",
    quote: "Anthropic is expected to IPO before Thanksgiving",
    note:
      "Published and accessed 2026-10-21. Credible context for the reported timetable and financing pressure, but not confirmation of a public filing, offering terms, lockup terms, or first trading date."
  },
  {
    id: "anthropic-public-benefit-fund",
    marker: "APBF",
    title: "Anthropic Public Benefit Fund",
    url: "https://www.anthropic.com/news/public-benefit-fund",
    quote: "Subject to stockholder approval, 5% of Anthropic's shares will be committed today",
    note:
      "Official announcement published 2026-10-18 and accessed 2026-10-21. High-confidence evidence for the proposed 5% equity share and broad mandate. Approval, governance, valuation baseline, liquidity, external cause allocation, and distribution timing remain unresolved."
  },
  {
    id: "anthropic-valuation",
    marker: "AV",
    title: "Anthropic Series H valuation",
    url: "https://www.anthropic.com/news/series-h",
    quote: "valuing the company at $965 billion post-money",
    note: "Supports the model's Anthropic valuation default and the paper-wealth premise."
  },
  {
    id: "openai-foundation-structure",
    marker: "OF",
    title: "OpenAI Foundation equity stake",
    url: "https://openai.com/our-structure/",
    quote: "holds a 26% equity stake in OpenAI Group",
    note: "Supports the claim that OpenAI's nonprofit foundation has direct equity exposure."
  },
  {
    id: "openai-foundation-value",
    marker: "OV",
    title: "OpenAI Foundation stake value",
    url: "https://openai.com/index/scaling-ai-for-everyone/",
    quote: "increases the value of the OpenAI Foundation's stake",
    note: "Supports the $180B-plus paper-capacity premise for broad OpenAI-linked philanthropy."
  },
  {
    id: "openai-foundation-2026",
    marker: "O26",
    title: "OpenAI Foundation 2026 plans",
    url: "https://openai.com/index/update-on-the-openai-foundation/",
    quote: "expects to invest at least $1 billion",
    note:
      "Evidence of near-term broad philanthropic activity. The announced portfolio includes life sciences, economic impact, AI resilience, and community programs, not a dedicated AIS/EA pool."
  },
  {
    id: "gates-ai-equity-1b",
    marker: "GA1B",
    title: "Gates Foundation equitable-AI commitment",
    url: "https://www.gatesfoundation.org/ideas/media-center/press-releases/2026/09/goalkeepers-report-equitable-ai",
    quote: "spend at least US$1 billion over the next two years",
    note:
      "Official existing-funder commitment published 2026-09-14 and accessed 2026-10-21. It covers health, education, agriculture, and digital infrastructure in the U.S. and abroad. It may overlap named partnerships already tracked, so it is not added to the AI-new-wealth commitment total."
  },
  {
    id: "openai-people-first-2026",
    marker: "PF26",
    title: "OpenAI Foundation 2026 People-First AI Fund",
    url: "https://openaifoundation.org/news/2026-people-first-ai-fund",
    quote: "Grants are unrestricted and can be deployed as best serves your mission",
    note:
      "A concrete $50M grant commitment. The money is flexible once awarded, but eligibility remains tied to community organizations engaging with AI."
  },
  {
    id: "openai-common-health-100m",
    marker: "CH100",
    title: "OpenAI Foundation commitment to the Common Health Coalition",
    url: "https://openaifoundation.org/news/civil-society-and-philanthropy",
    quote: "$100 million commitment to the Common Health Coalition",
    note:
      "A concrete health commitment announced on 13 August 2026. The initial program is U.S.-focused and AI-enabled, so it is evidence of broad cause allocation rather than AIS/EA or global-development disbursement."
  },
  {
    id: "openai-smallholder-farmers-60m",
    marker: "OF60",
    title: "OpenAI Foundation smallholder-farmer forecasting portfolio",
    url: "https://openaifoundation.org/news/ai-forecasting-for-smallholder-farmers",
    quote: "$60 million investment to bring AI-powered weather forecasting to 100 million smallholder farmers",
    note:
      "A confirmed three-year Foundation portfolio across South and Southeast Asia and East Africa. It is a commitment, not a cash-paid total; the public announcement does not establish how much will be disbursed by end-2027."
  },
  {
    id: "openai-teen-development-5m",
    marker: "OT5",
    title: "OpenAI teen-development research grants",
    url: "https://openai.com/index/teen-development-research-grants/",
    quote: "individual research grants up to $1 million and totaling up to $5 million",
    note:
      "OpenAI Group PBC, not the Foundation, funds the program. Reviewed 2026-10-31: applications closed October 6, with selection notifications due by November 13. The announced budget does not establish completed awards or cash disbursement."
  },
  {
    id: "openai-daybreak-1b",
    marker: "OD1B",
    title: "OpenAI Daybreak for Frontline Defenders",
    url: "https://openai.com/index/daybreak-for-frontline-defenders/",
    quote: "$1 billion in subsidized Daybreak access, training, technical support, and partnerships",
    note:
      "Announced 2026-09-03; accessed 2026-09-21. The global six-month package is primarily in-kind access and support. It is a named AI-linked commitment rather than cash paid, and the announcement does not specify a Global Health & Development allocation."
  },
  {
    id: "openai-public-data-health-125m",
    marker: "OPD",
    title: "OpenAI Foundation Public Data for Health grants",
    url: "https://openaifoundation.org/news/public-data-for-health",
    quote: "more than $125 million in grants across an initial tranche of nonprofits and universities",
    note:
      "Announced 2026-09-15; accessed 2026-10-01. This is a confirmed initial grant tranche for public life-sciences datasets and research infrastructure, but the page does not report cash paid or a specific Global Health & Development allocation."
  },
  {
    id: "openai-low-resource-voice",
    marker: "OLV",
    title: "OpenAI Foundation focus on low-resource-language voice AI",
    url: "https://openaifoundation.org/news/broadening-the-benefits-of-ai-starting-with-voice",
    quote: "enhancing model performance in low-resource languages a significant focus of our work",
    note:
      "Announced 2026-09-21; accessed 2026-10-01. This is a global cause-allocation and program-direction signal. No amount, grant round, or disbursement was announced."
  },
  {
    id: "openai-lenfest-10m",
    marker: "OL10",
    title: "OpenAI and Lenfest AI Collaborative expansion",
    url: "https://openai.com/index/lenfest-ai-collaborative-expansion/",
    quote: "a new $5 million commitment from OpenAI, along with up to $5 million in software credits and engineering support",
    note:
      "Announced 2026-09-28; accessed 2026-10-01. The stated maximum combines a $5M commitment with up to $5M in-kind support for U.S. local journalism; it is not a cash-paid total or AIS/EA operating funding."
  },
  {
    id: "anthropic-gates",
    marker: "AG",
    title: "Anthropic-Gates Foundation partnership",
    url: "https://www.anthropic.com/news/gates-foundation-partnership",
    quote: "commit $200 million in grant funding, Claude usage credits, and technical support",
    note:
      "Concrete evidence that AI-company resources are reaching global health and development, spread over four years and combining cash with in-kind support."
  },
  {
    id: "anthropic-genesis-150m",
    marker: "AG150",
    title: "Anthropic support for the Genesis Mission",
    url: "https://www.anthropic.com/news/genesis-mission-commitment",
    quote: "committing $150 million over three years",
    note:
      "Announced 2026-10-08; accessed 2026-10-11. The U.S. federal-science package consists of Claude access, API credits, training, onboarding, and technical support. It is not a cash grant, AIS/EA operating funding, or a GH&D allocation."
  },
  {
    id: "gates-anthropic",
    marker: "GF",
    title: "Gates Foundation confirmation of Anthropic partnership",
    url: "https://www.gatesfoundation.org/ideas/media-center/press-releases/2026/05/ai-anthropic-partnership",
    quote: "includes commitments of $200 million over four years",
    note:
      "The partner's account confirms the scale and emphasizes health, education, and agriculture in low- and middle-income countries."
  },
  {
    id: "openai-horizon-1000",
    marker: "H1K",
    title: "OpenAI and Gates Foundation Horizon 1000",
    url: "https://openai.com/index/horizon-1000/",
    quote: "committing $50 million in funding, technology, and technical support",
    note:
      "A specific global-health commitment aimed at 1,000 African primary-care clinics and their communities by 2028."
  },
  {
    id: "anthropic-public-first-40m",
    marker: "PFA",
    title: "Anthropic support for Public First Action",
    url: "https://www.anthropic.com/news/donation-public-first-action",
    quote: "bringing our total support to $40 million",
    note:
      "Evidence of actual lab-funded AI-policy advocacy at a tens-of-millions scale. The support is restricted to public education and policy, not candidate elections."
  },
  {
    id: "coefficient-givewell-1b",
    marker: "CG1B",
    title: "Coefficient Giving's $1B 2026 GiveWell allocation",
    url: "https://coefficientgiving.org/research/increasing-our-2026-allocation-to-givewells-recommendations-to-1-billion/",
    quote: "increasing that commitment to $1 billion for 2026",
    note:
      "Strong evidence that expectations about future volatile-asset funding are already changing GH&D spending and capacity. Coefficient explicitly says the future funding may not materialize."
  },
  {
    id: "givewell-september-600m",
    marker: "GW600",
    title: "GiveWell September 2026 grantmaking update",
    url: "https://blog.givewell.org/2026/09/30/september-2026-updates/",
    quote: "already directed over $600 million in 2026",
    note:
      "Published 2026-09-30; accessed 2026-10-01. This is direct evidence of existing-funder deployment and replaces the earlier more-than-$400M bridge figure. It is not newly liquid AI wealth, and 'directed' is not treated as a cash-paid total."
  },
  {
    id: "coefficient-health-aid-transition-165m",
    marker: "HAT165",
    title: "Coefficient Giving Health Aid Transition Fund",
    url: "https://coefficientgiving.org/research/announcing-the-health-aid-transition-fund/",
    quote: "a $165 million initiative to help governments navigate the transition",
    note:
      "Announced 2026-09-18; accessed 2026-10-01. This is a new existing-funder GH&D initiative for technical assistance, bridge financing, and some service delivery, not newly liquid AI wealth or a reported cash-paid total."
  },
  {
    id: "coefficient-ghw-ai-rfp",
    marker: "CG30",
    title: "Coefficient Giving RFP on transformative AI and global health",
    url: "https://coefficientgiving.org/funds/global-health-wellbeing-opportunities/request-for-proposals-global-health-and-wellbeing-in-an-era-of-transformative-ai/",
    quote: "We expect to allocate $10-30 million through this RFP",
    note:
      "A concrete cause-allocation signal for research, policy, implementation, and field-building focused on transformative AI and the global poor. It is an announced allocation from an existing funder, not a completed grant or newly liquid AI wealth."
  },
  {
    id: "givewell-scaling-1b",
    marker: "GW1B",
    title: "GiveWell scaling with the $1B commitment",
    url: "https://blog.givewell.org/2026/07/23/scaling-our-impact-with-support/",
    quote: "already committed over $400 million in 2026",
    note:
      "Partner confirmation that GiveWell expects 2026 grantmaking to approach or exceed $1B and is expanding research and deployment capacity."
  },
  {
    id: "coefficient-amf-276m",
    marker: "CG276",
    title: "Coefficient and GiveWell grant to Against Malaria Foundation",
    url: "https://coefficientgiving.org/research/coefficient-givings-largest-grant-ever-276-million-co-funded-with-givewell-to-the-against-malaria-foundation/",
    quote: "$276 million, co-funded with GiveWell",
    note:
      "A confirmed grant award: $212M from Coefficient Giving/Good Ventures and $64M from GiveWell for DRC bed-net campaigns. It draws in part on the pre-existing $1B GiveWell allocation and is not a new AI-wealth flow or a verified cash-paid total."
  },
  {
    id: "coefficient-ai-biosecurity-2026",
    marker: "CG160",
    title: "Coefficient Giving on its AI and biosecurity scaling",
    url: "https://coefficientgiving.org/research/were-urgently-scaling-our-work-on-ai-and-biosecurity/",
    quote: "recently approved $160 million for Resolution",
    note:
      "An established funder's confirmed AI-safety grant approval and capacity signal, not a new AI-wealth flow or a cash-paid total. Coefficient says formally committed grants approximate money likely to reach grantees."
  },
  {
    id: "anthropic-founder-pledge",
    marker: "AP",
    title: "AP on Anthropic founder pledges",
    url: "https://apnews.com/article/anthropic-ai-claude-corps-daniela-amodei-b1c130a08417d13e1256f8982d233b0e",
    quote: "pledged that they will donate 80% of their wealth",
    note: "Supports the pledge premise, while leaving timing and cause allocation unresolved."
  },
  {
    id: "anthropic-claude-corps",
    marker: "CC",
    title: "AP on Claude Corps",
    url: "https://apnews.com/article/anthropic-ai-claude-corps-daniela-amodei-b1c130a08417d13e1256f8982d233b0e",
    quote: "donate $150 million to launch a fellowship program",
    note: "Shows real AI-era philanthropy, but aimed at broad nonprofit AI adoption rather than AIS/EA operating grants."
  },
  {
    id: "anthropic-economic-fund",
    marker: "EF",
    title: "AP on Anthropic economic impact fund",
    url: "https://apnews.com/article/anthropic-dario-amodei-ai-afeb5279eef406980dffa46ff91495e0",
    quote: "initial $200 million investment to research AI's impact",
    note: "Supports the claim that broad public-benefit spending can be real without directly resolving AIS/EA funding gaps."
  },
  {
    id: "anthropic-wellbeing-5m",
    marker: "AW5",
    title: "Anthropic wellbeing-evaluations grant program",
    url: "https://www.anthropic.com/news/wellbeing-research-grants",
    quote: "launching a $5 million grant program",
    note:
      "A program for independent, open-source evaluations of AI and user wellbeing, combining direct funding, model access, and technical support. Reviewed 2026-10-31: initial applications closed September 21, with full-proposal invitations due October 5. No completed-award or cash-paid total was verified in this review."
  },
  {
    id: "irs-daf-control",
    marker: "DAF",
    title: "IRS donor-advised fund guidance",
    url: "https://www.irs.gov/charities-non-profits/charitable-organizations/donor-advised-funds",
    quote: "the organization has legal control over it",
    note: "Supports the claim that DAF assets are not the same thing as donor-controlled near-term grants."
  },
  {
    id: "irs-foundation-payout",
    marker: "PF",
    title: "IRS private-foundation minimum investment return",
    url: "https://www.irs.gov/charities-non-profits/private-foundations/minimum-investment-return",
    quote: "minimum investment return for any private foundation is 5 percent",
    note:
      "Supports the distinction between a qualifying-distribution floor and rapid spend-down. The detailed distributable amount includes adjustments."
  },
  {
    id: "sec-ipo-lockup",
    marker: "SEC",
    title: "Investor.gov on IPO lockups",
    url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/initial-public-offerings-lockup-agreements",
    quote: "most prevent insiders from selling their shares for 180 days",
    note:
      "Supports a typical six-month lockup as a timing prior. Anthropic's actual terms will only be known from its prospectus."
  },
  {
    id: "coefficient-underfunded",
    marker: "CG",
    title: "Coefficient Giving on AI safety funding gaps",
    url: "https://coefficientgiving.org/research/ai-safety-and-security-need-more-funders/",
    quote: "AI safety and security as a whole remains underfunded",
    note: "Supports the claim that additional funding and donor diversity can still matter."
  },
  {
    id: "grantmaker-bottleneck",
    marker: "GM",
    title: "EA Forum on grantmaker bottlenecks",
    url: "https://forum.effectivealtruism.org/posts/B6d8Wzk4gNzHsXvdi/ai-safety-is-extremely-bottlenecked-on-grantmakers",
    quote: "capital is bottlenecked on a tiny number",
    note: "Supports the conversion-bottleneck claim: dollars need judgment, advisors, and institution-building."
  },
  {
    id: "manifold-anthropic-ipo",
    marker: "PM",
    title: "Manifold market on Anthropic IPO timing",
    url: "https://manifold.markets/JonasVollmer/when-will-anthropic-ipo",
    quote: "Will resolve to the first trading day on a stock exchange",
    note: "Useful for the IPO-timing gate; not a market on donation timing or AIS/EA grant deployment."
  },
  {
    id: "polymarket-anthropic-ipo",
    marker: "PX",
    title: "Polymarket Anthropic IPO markets",
    url: "https://polymarket.com/all/anthropic-ipo",
    quote: "December 31, 2026 95%",
    note:
      "Accessed 2026-10-29. The year-end contract was near 95%, compared with 78% on October 21. Market prices depend on contract rules, liquidity, and time of access; this is neither an official listing date nor a philanthropy probability."
  },
  {
    id: "metaculus-ai-valuation",
    marker: "MC",
    title: "Metaculus on $1T AI-lab valuation timing",
    url: "https://www.metaculus.com/questions/38601/year-openai-deepmind-or-anthropic-reach-valuation-of-1-trillion/",
    quote: "first reach a valuation of at least $1 trillion",
    note: "Useful for valuation timing priors; not direct evidence of philanthropic conversion."
  }
];

export const evidenceById = Object.fromEntries(evidence.map((item) => [item.id, item])) as Record<string, Evidence>;
