import type { Source } from "../utils/model";

export const sources: Source[] = [
  {
    id: "openai-cities-deliver-50m", title: "OpenAI Foundation: Cities Deliver with Rockefeller",
    url: "https://openaifoundation.org/news/helping-cities-deliver-more-for-their-residents",
    type: "Primary announcement; 2026-10-14; accessed 2026-10-29",
    reliability: "Authoritative joint-program announcement; donor split and GH&D allocation unspecified.",
    supports: ["$50M joint initiative", "city partner required", "$500K–$2M grants over 24 months"]
  },
  {
    id: "effective-giving-2026",
    title: "Lucas Moore (GWWC): Updates on the effective giving ecosystem 2026",
    url: "https://forum.effectivealtruism.org/posts/T7CKswFYSgjePAwZh/updates-on-the-effective-giving-ecosystem-2026",
    type: "Ecosystem survey overview; published 2026-07-28, accessed 2026-09-17",
    reliability: "First-party synthesis of survey data, with a private underlying money-moved sheet. Useful context, not a calibration of this model.",
    supports: ["institutional scaling", "cause allocation", "evaluation capacity"]
  },
  {
    id: "noah-quicktake",
    title: "Noah Birnbaum's quick take asking for steelman",
    url: "https://forum.effectivealtruism.org/posts/dtF6wBjH7yBD4kqLz/noah-birnbaum-s-quick-takes?commentId=sGRyGF5wjaaoMFmfK",
    type: "EA Forum thread",
    reliability: "Community discussion; useful for local beliefs and incentives, not authoritative on legal or cap-table details.",
    supports: ["claim being critiqued", "Bay rumor", "social incentives"]
  },
  {
    id: "third-wave",
    title: "Nan Ransohoff, The Third Wave of American Philanthropy",
    url: "https://nanransohoff.substack.com/p/the-third-wave-of-american-philanthropy",
    type: "Substack essay",
    reliability: "Argumentative essay; useful for bullish case and BOTEC framing.",
    supports: ["bullish case", "$37B-$100B claim", "deployment bottleneck"]
  },
  {
    id: "anthropic-ipo-ea",
    title: "The Anthropic IPO is coming. We aren't ready for it.",
    url: "https://forum.effectivealtruism.org/posts/ychu2LAw54sNcocKH/the-anthropic-ipo-is-coming-we-aren-t-ready-for-it",
    type: "EA Forum post",
    reliability: "Community analysis; useful for capacity bottlenecks, concentration, and comments about IPO uncertainty.",
    supports: ["grantmaker bottleneck", "lab-compatible bias", "field capacity"]
  },
  {
    id: "anthropic-s1",
    title: "Anthropic confidential draft S-1 announcement",
    url: "https://www.anthropic.com/news/confidential-draft-s1-sec",
    type: "Official company announcement",
    reliability: "High for filing existence and caveats; not evidence of donation timing.",
    supports: ["IPO plausible", "timing conditional"]
  },
  {
    id: "anthropic-public-s1",
    title: "Anthropic files S-1 with the SEC for proposed initial public offering",
    url: "https://www.anthropic.com/news/s1-sec",
    type: "Official company announcement; published and accessed 2026-10-26",
    reliability:
      "High for the public filing and intended Nasdaq listing. It leaves the offer price, share count, effectiveness, first trading date, and lockup terms unresolved.",
    supports: ["public S-1 filed", "IPO timing more concrete", "terms remain unresolved"]
  },
  {
    id: "anthropic-ipo-reporting",
    title: "Bloomberg on Anthropic's potential public IPO filing",
    url: "https://news.bloomberglaw.com/artificial-intelligence/anthropic-expects-to-match-spacexs-record-ipo-size-or-top-it",
    type: "Financial news report",
    reliability:
      "Credible reporting for a timing update, but based on unnamed sources and not confirmation of a filing, valuation, offering terms, or trading date.",
    supports: ["possible late-August public filing", "IPO timetable remains uncertain"]
  },
  {
    id: "anthropic-ipo-current-reporting",
    title: "Axios on the current Anthropic IPO timetable",
    url: "https://www.axios.com/2026/09/30/ipo-stocks-oura-anthropic",
    type: "Financial news report; published 2026-09-30, accessed 2026-10-11",
    reliability:
      "Credible reporting that a prospectus is circulating and a November debut is expected; not confirmation of a public filing, offering terms, lockup terms, or first trading date.",
    supports: ["historical November IPO timetable reporting; filing confirmed October 26"]
  },
  {
    id: "anthropic-ipo-oct-21",
    title: "Axios on Anthropic's IPO financing pressure",
    url: "https://www.axios.com/2026/10/21/anthropic-ipo-ai-costs",
    type: "Financial news report; published and accessed 2026-10-21",
    reliability:
      "Credible context for the reported pre-Thanksgiving timetable and financing pressure; not confirmation of a public filing, offering terms, lockup terms, or first trading date.",
    supports: ["historical November IPO timetable reporting", "financing pressure; filing confirmed October 26"]
  },
  {
    id: "anthropic-public-benefit-fund",
    title: "Anthropic: Investing in the public benefit",
    url: "https://www.anthropic.com/news/public-benefit-fund",
    type: "Official company announcement; published 2026-10-18, accessed 2026-10-21",
    reliability:
      "High for the proposed 5% equity share, subject to stockholder approval, and broad mandate. Governance, liquidity, cause allocation, and distribution timing remain unresolved.",
    supports: ["5% company-equity commitment", "new public-benefit vehicle", "broad cause mandate"]
  },
  {
    id: "anthropic-series-h",
    title: "Anthropic Series H / $965B valuation announcement",
    url: "https://www.anthropic.com/news/series-h",
    type: "Official company announcement",
    reliability: "High for reported valuation and company metrics.",
    supports: ["valuation", "paper wealth"]
  },
  {
    id: "openai-structure",
    title: "OpenAI structure page",
    url: "https://openai.com/our-structure/",
    type: "Official company page",
    reliability: "High for OpenAI's stated structure and Foundation stake framing.",
    supports: ["OpenAI Foundation", "broad philanthropy"]
  },
  {
    id: "openai-scaling",
    title: "OpenAI scaling AI for everyone",
    url: "https://openai.com/index/scaling-ai-for-everyone/",
    type: "Official company post",
    reliability: "High for OpenAI's own claims about Foundation value and commitments.",
    supports: ["Foundation value", "health", "AI resilience"]
  },
  {
    id: "openai-foundation-2026",
    title: "OpenAI Foundation 2026 program update",
    url: "https://openai.com/index/update-on-the-openai-foundation/",
    type: "Official foundation update",
    reliability: "High for the Foundation's stated plans and commitments; not evidence that all planned funding has been disbursed or produced impact.",
    supports: ["at least $1B planned over the next year", "$25B longer-run commitment", "program allocation"]
  },
  {
    id: "gates-ai-equity-1b",
    title: "Gates Foundation equitable-AI commitment",
    url: "https://www.gatesfoundation.org/ideas/media-center/press-releases/2026/09/goalkeepers-report-equitable-ai",
    type: "Official foundation announcement; published 2026-09-14, accessed 2026-10-21",
    reliability:
      "High for the two-year $1B plan and announced allocation. It is existing-funder spending and may overlap named partnerships already tracked, so it is not evidence of newly liquid AI wealth.",
    supports: ["$1B two-year plan", "health, education, agriculture, and digital infrastructure", "existing-funder deployment"]
  },
  {
    id: "openai-people-first-2026",
    title: "OpenAI Foundation 2026 People-First AI Fund",
    url: "https://openaifoundation.org/news/2026-people-first-ai-fund",
    type: "Official foundation announcement",
    reliability: "High for the $50M commitment and grant terms; not yet evidence about selected grantees or impact.",
    supports: ["unrestricted grants", "community nonprofits", "AI-centered program design"]
  },
  {
    id: "openai-common-health-100m",
    title: "OpenAI Foundation: AI for Civil Society and Philanthropy",
    url: "https://openaifoundation.org/news/civil-society-and-philanthropy",
    type: "Official foundation announcement",
    reliability:
      "High for the $100M commitment and its initial U.S. health focus; a commitment is not the same as completed disbursement or health impact.",
    supports: ["$100M health commitment", "U.S. health delivery", "AI-centered program design", "cause allocation"]
  },
  {
    id: "openai-smallholder-farmers-60m",
    title: "OpenAI Foundation: AI forecasting for smallholder farmers",
    url: "https://openaifoundation.org/news/ai-forecasting-for-smallholder-farmers",
    type: "Official foundation announcement",
    reliability:
      "High for the announced $60M portfolio, six named organizations, three-year horizon, and LMIC scope; a commitment is not a cash-paid total or proof of eventual outcomes.",
    supports: ["$60M global-development commitment", "smallholder farmers", "AI-enabled weather and crop-disease forecasts"]
  },
  {
    id: "openai-teen-development-5m",
    title: "OpenAI: research grants on AI and teen development",
    url: "https://openai.com/index/teen-development-research-grants/",
    type: "Official company announcement",
    reliability:
      "High for the announced $5M research-grant budget and OpenAI Group PBC funding source; applications remain open, so it is not evidence of completed awards or cash disbursement.",
    supports: ["$5M research-grant program", "AI impacts and safeguards", "not a Foundation grant"]
  },
  {
    id: "openai-daybreak-1b",
    title: "OpenAI: Daybreak for Frontline Defenders",
    url: "https://openai.com/index/daybreak-for-frontline-defenders/",
    type: "Official company announcement; published 2026-09-03, accessed 2026-09-21",
    reliability:
      "High for the stated $1B, six-month package and its components. The announcement describes subsidized access, training, technical assistance, and partnerships, not cash paid or a specified Global Health & Development allocation.",
    supports: ["$1B mixed in-kind commitment", "frontline cyber defenders", "no scoped GH&D allocation"]
  },
  {
    id: "openai-public-data-health-125m",
    title: "OpenAI Foundation: Public Data for Health",
    url: "https://openaifoundation.org/news/public-data-for-health",
    type: "Official foundation announcement; published 2026-09-15, accessed 2026-10-01",
    reliability:
      "High for the more-than-$125M initial grant tranche and program design; not evidence of cash paid, ultimate health impact, or a specific GH&D allocation.",
    supports: ["public life-sciences data", "more than $125M in grants", "research infrastructure"]
  },
  {
    id: "openai-low-resource-voice",
    title: "OpenAI Foundation: broadening the benefits of AI through voice",
    url: "https://openaifoundation.org/news/broadening-the-benefits-of-ai-starting-with-voice",
    type: "Official foundation announcement; published 2026-09-21, accessed 2026-10-01",
    reliability:
      "High for the stated program direction and coalition participation; no amount, application process, or disbursement is announced.",
    supports: ["low-resource languages", "voice-data infrastructure", "global cause allocation"]
  },
  {
    id: "openai-lenfest-10m",
    title: "OpenAI and Lenfest AI Collaborative expansion",
    url: "https://openai.com/index/lenfest-ai-collaborative-expansion/",
    type: "Official joint announcement; published 2026-09-28, accessed 2026-10-01",
    reliability:
      "High for the $5M commitment and up-to-$5M in software credits and engineering support; not a cash-paid total or an AIS/EA operating grant.",
    supports: ["local journalism", "embedded AI fellows", "mixed cash and in-kind support"]
  },
  {
    id: "anthropic-gates",
    title: "Anthropic-Gates Foundation partnership",
    url: "https://www.anthropic.com/news/gates-foundation-partnership",
    type: "Official partnership announcement",
    reliability: "High for the announced $200M four-year commitment and program scope; the amount combines grants, usage credits, and technical support.",
    supports: ["global health", "education", "economic mobility", "in-kind support"]
  },
  {
    id: "anthropic-genesis-150m",
    title: "Anthropic: Genesis Mission science commitment",
    url: "https://www.anthropic.com/news/genesis-mission-commitment",
    type: "Official company announcement; published 2026-10-08, accessed 2026-10-11",
    reliability:
      "High for the $150M three-year amount and stated components. The package is access, credits, training, onboarding, and technical support for U.S. federal science projects, not a cash grant or GH&D allocation.",
    supports: ["$150M mixed in-kind commitment", "U.S. federal science", "broad public benefit"]
  },
  {
    id: "gates-anthropic",
    title: "Gates Foundation on its Anthropic partnership",
    url: "https://www.gatesfoundation.org/ideas/media-center/press-releases/2026/05/ai-anthropic-partnership",
    type: "Partner confirmation",
    reliability: "Independent confirmation by the named partner; still a commitment announcement rather than an impact evaluation.",
    supports: ["$200M partnership", "LMIC focus", "health, education, and agriculture"]
  },
  {
    id: "openai-horizon-1000",
    title: "Horizon 1000: AI for African primary health care",
    url: "https://openai.com/index/horizon-1000/",
    type: "Official partnership announcement",
    reliability: "High for the announced $50M commitment and 2028 target; the total combines funding, technology, and technical support.",
    supports: ["African primary care", "Gates partnership", "global development allocation"]
  },
  {
    id: "anthropic-public-first-40m",
    title: "Anthropic's additional donation to Public First Action",
    url: "https://www.anthropic.com/news/donation-public-first-action",
    type: "Official company announcement",
    reliability: "High for Anthropic's stated $40M total support and restrictions; not independent evidence of policy impact.",
    supports: ["AI policy funding", "public education", "lab-compatible advocacy"]
  },
  {
    id: "coefficient-givewell-1b",
    title: "Coefficient Giving increases its 2026 GiveWell allocation to $1B",
    url: "https://coefficientgiving.org/research/increasing-our-2026-allocation-to-givewells-recommendations-to-1-billion/",
    type: "Official funder announcement",
    reliability: "High for the commitment, reasons, and caveats; it is anticipatory funding from existing funders, not proof of new AI-wealth liquidity.",
    supports: ["$1B 2026 commitment", "anticipatory bridge funding", "volatile future assets", "GH&D capacity building"]
  },
  {
    id: "coefficient-ghw-ai-rfp",
    title: "Coefficient Giving RFP on global health in an era of transformative AI",
    url: "https://coefficientgiving.org/funds/global-health-wellbeing-opportunities/request-for-proposals-global-health-and-wellbeing-in-an-era-of-transformative-ai/",
    type: "Official funder RFP",
    reliability:
      "High for the stated $10-30M allocation and scope; it is an open funding plan rather than evidence of completed grant decisions or disbursement.",
    supports: ["$10-30M planned allocation", "global poor", "research and field-building", "GH&D capacity"]
  },
  {
    id: "givewell-scaling-1b",
    title: "GiveWell on scaling with Coefficient Giving's $1B commitment",
    url: "https://blog.givewell.org/2026/07/23/scaling-our-impact-with-support/",
    type: "Recipient and grantmaker confirmation",
    reliability: "High for GiveWell's commitments, staffing, and grantmaking plans; planned grantmaking is not the same as completed disbursement or impact.",
    supports: ["over $400M committed in 2026", "roughly $1B expected 2026 grantmaking", "grantmaker capacity"]
  },
  {
    id: "givewell-september-600m",
    title: "GiveWell September 2026 update",
    url: "https://blog.givewell.org/2026/09/30/september-2026-updates/",
    type: "Official grantmaker update; published 2026-09-30, accessed 2026-10-01",
    reliability:
      "High for GiveWell's own more-than-$600M directed figure and expectations; 'directed' is not treated as a cash-paid total or new AI-wealth liquidity.",
    supports: ["more than $600M directed in 2026", "existing-funder deployment", "roughly $1B expected 2026 grantmaking"]
  },
  {
    id: "coefficient-health-aid-transition-165m",
    title: "Coefficient Giving Health Aid Transition Fund",
    url: "https://coefficientgiving.org/research/announcing-the-health-aid-transition-fund/",
    type: "Official funder announcement; published 2026-09-18, accessed 2026-10-01",
    reliability:
      "High for the $165M initiative and its stated uses; it is an existing-funder plan rather than newly liquid AI wealth or a cash-paid total.",
    supports: ["$165M GH&D initiative", "technical assistance", "bridge financing", "aid-transition capacity"]
  },
  {
    id: "coefficient-amf-276m",
    title: "Coefficient and GiveWell's $276M Against Malaria Foundation grant",
    url: "https://coefficientgiving.org/research/coefficient-givings-largest-grant-ever-276-million-co-funded-with-givewell-to-the-against-malaria-foundation/",
    type: "Official funder announcement",
    reliability:
      "High for the award's amount, funders, and intended use. The announcement says it will fund future campaigns; it is not a cash-paid total or new AI-wealth liquidity.",
    supports: ["$276M grant award", "existing-funder bridge deployment", "DRC malaria campaigns"]
  },
  {
    id: "coefficient-ai-biosecurity-2026",
    title: "Coefficient Giving: scaling AI safety and biosecurity work",
    url: "https://coefficientgiving.org/research/were-urgently-scaling-our-work-on-ai-and-biosecurity/",
    type: "Official funder announcement",
    reliability:
      "High for Coefficient's stated 2026 committed-giving figures and its recently approved $160M Resolution grant; committed amounts approximate expected grantee funding and are not cash-paid totals or new AI-wealth liquidity.",
    supports: ["$160M Resolution AI-safety grant", "existing-funder AI-safety capacity", "2026 commitment pace"]
  },
  {
    id: "ap-anthropic-philanthropy",
    title: "AP report on Anthropic philanthropy and founder pledge",
    url: "https://apnews.com/article/b1c130a08417d13e1256f8982d233b0e",
    type: "News report",
    reliability: "Useful outside reporting; verify key figures against primary sources when possible.",
    supports: ["80 percent founder pledge", "Claude Corps", "economic impacts"]
  },
  {
    id: "anthropic-wellbeing-5m",
    title: "Anthropic: funding better evaluations of AI's impact on wellbeing",
    url: "https://www.anthropic.com/news/wellbeing-research-grants",
    type: "Official company announcement",
    reliability:
      "High for the announced $5M program and its scope; applications are still open, so it is not evidence of completed awards, cash disbursement, or impact.",
    supports: ["$5M wellbeing-evaluations program", "independent research", "direct funding and in-kind support"]
  },
  {
    id: "coefficient-more-funders",
    title: "Coefficient Giving: AI safety and security need more funders",
    url: "https://coefficientgiving.org/research/ai-safety-and-security-need-more-funders/",
    type: "Funder analysis",
    reliability: "High for Coefficient's self-description and funding-gap argument; interested party.",
    supports: ["funding concentration", "need more funders"]
  },
  {
    id: "coefficient-grantmakers",
    title: "Coefficient Giving grantmaker hiring page",
    url: "https://coefficientgiving.org/gcr-grantmakers-and-senior-generalists/",
    type: "Funder hiring page",
    reliability: "High for Coefficient's claims about its own grantmaking volume.",
    supports: ["$140M in 2025", "grantmaker bottleneck"]
  },
  {
    id: "luke-grantmakers",
    title: "AI safety is extremely bottlenecked on grantmakers",
    url: "https://forum.effectivealtruism.org/posts/B6d8Wzk4gNzHsXvdi/ai-safety-is-extremely-bottlenecked-on-grantmakers",
    type: "EA Forum post",
    reliability: "Useful insider analysis; claims about future deployment should be treated as informed but uncertain.",
    supports: ["grantmaker bottleneck", "deployment capacity"]
  },
  {
    id: "investor-gov-lockups",
    title: "Investor.gov: IPO lockup agreements",
    url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/initial-public-offerings-lockup-agreements",
    type: "SEC investor guidance",
    reliability: "High for general US IPO mechanics; Anthropic-specific terms will be in its prospectus.",
    supports: ["typical 180-day lockup", "timing between IPO and insider liquidity"]
  },
  {
    id: "irs-foundation-payout",
    title: "IRS: private-foundation minimum investment return",
    url: "https://www.irs.gov/charities-non-profits/private-foundations/minimum-investment-return",
    type: "Official tax guidance",
    reliability: "High for the general 5% minimum-investment-return calculation; actual distributable amounts involve adjustments.",
    supports: ["private-foundation payout floor", "slow spend-down can be legally compatible"]
  },
  {
    id: "manifold-anthropic-ipo",
    title: "Manifold: When will Anthropic IPO?",
    url: "https://manifold.markets/JonasVollmer/when-will-anthropic-ipo",
    type: "Prediction market",
    reliability: "Useful market signal; not a donation forecast.",
    supports: ["IPO market probability"]
  },
  {
    id: "polymarket-anthropic-ipo",
    title: "Polymarket: Anthropic IPO markets",
    url: "https://polymarket.com/all/anthropic-ipo",
    type: "Prediction market; accessed 2026-10-29",
    reliability:
      "Useful live aggregation of trader beliefs, with changing prices and contract-specific resolution criteria; not official evidence of a filing or eventual listing.",
    supports: ["approximately 95% market price for IPO by 2026-12-31", "late-2026 timing"]
  },
  {
    id: "metaculus-ai-1t",
    title: "Metaculus: year OpenAI, DeepMind, or Anthropic reach $1T valuation",
    url: "https://www.metaculus.com/questions/38601/year-openai-deepmind-or-anthropic-reach-valuation-of-1-trillion/",
    type: "Forecasting platform",
    reliability: "Useful for valuation timing priors; not direct evidence of grantmaking.",
    supports: ["valuation market probability"]
  },
  {
    id: "hypothesis-embed",
    title: "Hypothes.is publisher embedding docs",
    url: "https://github.com/hypothesis/client/blob/main/docs/publishers/embedding.rst",
    type: "Documentation",
    reliability: "High for embed instructions.",
    supports: ["Hypothes.is embed"]
  },
  {
    id: "netlify-vite",
    title: "Netlify Vite docs",
    url: "https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/",
    type: "Documentation",
    reliability: "High for Netlify/Vite deployment settings.",
    supports: ["deployment"]
  }
];
