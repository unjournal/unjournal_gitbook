import { defaultModelInputs } from "./modelDefaults";
import { defaultCorrelatedConfig, runCorrelatedSimulation } from "../utils/correlatedModel";
import { defaultGlobalDevelopmentInputs } from "../utils/globalDevelopmentModel";
import { runGlobalDevelopmentSimulation } from "../utils/globalDevelopmentCorrelatedModel";
import { animalWelfareReviewedForecast, animalWelfareForecastTarget, animalWelfareNews } from "./animalWelfare";

export type TrackerScope = "main" | "global-development" | "animal-welfare";

export type ForecastSnapshot = {
  date: string;
  medianB: number;
  low80B: number;
  high80B: number;
  reviewStatus: string;
  inputsChanged: boolean;
  note: string;
  supersededSameDayReview?: { medianB: number; low80B: number; high80B: number; note: string };
};

export type CommitmentSnapshot = {
  date: string;
  totalB: number;
  label: string;
};

export type CommitmentLedgerItem = {
  date: string;
  amountB: number;
  label: string;
  scope: TrackerScope[];
  evidenceIds: string[];
  qualification: string;
};

export type NewsItem = {
  date: string;
  title: string;
  socialTitle?: string;
  summary: string;
  scope: TrackerScope[];
  evidenceIds: string[];
  strength: "Confirmed" | "Reported" | "Planned";
};

const mainSimulation = runCorrelatedSimulation(defaultModelInputs, defaultCorrelatedConfig).summary;
const globalSimulation = runGlobalDevelopmentSimulation(defaultGlobalDevelopmentInputs);

export const commitmentLedger: CommitmentLedgerItem[] = [
  {
    date: "2026-01-20",
    amountB: 0.05,
    label: "OpenAI and Gates Foundation: Horizon 1000",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-horizon-1000"],
    qualification: "Funding, technology, and technical support for African primary care; not a cash-only figure."
  },
  {
    date: "2026-05-14",
    amountB: 0.2,
    label: "Anthropic and Gates Foundation partnership",
    scope: ["main", "global-development"],
    evidenceIds: ["anthropic-gates", "gates-anthropic"],
    qualification: "Four-year grant, Claude-credit, and technical-support commitment with U.S. and LMIC work."
  },
  {
    date: "2026-06-11",
    amountB: 0.15,
    label: "Anthropic: Claude Corps",
    scope: ["main"],
    evidenceIds: ["anthropic-claude-corps"],
    qualification: "A U.S. nonprofit fellowship program; broad public benefit rather than AIS/EA operating grants."
  },
  {
    date: "2026-06-15",
    amountB: 0.05,
    label: "OpenAI Foundation: 2026 People-First AI Fund",
    scope: ["main"],
    evidenceIds: ["openai-people-first-2026"],
    qualification: "A U.S.-focused unrestricted-grant commitment for eligible community organizations."
  },
  {
    date: "2026-07-21",
    amountB: 0.04,
    label: "Anthropic: total support for Public First Action",
    scope: ["main"],
    evidenceIds: ["anthropic-public-first-40m"],
    qualification: "Restricted to public education and policy; not candidate-election spending."
  },
  {
    date: "2026-06-10",
    amountB: 0.2,
    label: "Anthropic Economic Futures Research Fund",
    scope: ["main"],
    evidenceIds: ["anthropic-economic-fund"],
    qualification: "External research on AI's economic effects; a commitment rather than reported completed grants."
  },
  {
    date: "2026-08-13",
    amountB: 0.1,
    label: "OpenAI Foundation: Common Health Coalition",
    scope: ["main"],
    evidenceIds: ["openai-common-health-100m"],
    qualification: "Initially U.S.-focused health delivery; excluded from the GH&D total."
  },
  {
    date: "2026-08-25",
    amountB: 0.005,
    label: "Anthropic: wellbeing-evaluations grant program",
    scope: ["main"],
    evidenceIds: ["anthropic-wellbeing-5m"],
    qualification: "A $5M program combining direct funding, model access, and technical support; awards have not yet been announced."
  },
  {
    date: "2026-09-08",
    amountB: 0.005,
    label: "OpenAI: teen-development research grants",
    scope: ["main"],
    evidenceIds: ["openai-teen-development-5m"],
    qualification: "A Group PBC, rather than Foundation, grant program. Applications are open; awards and cash disbursements have not yet been announced."
  },
  {
    date: "2026-09-10",
    amountB: 0.06,
    label: "OpenAI Foundation: smallholder-farmer forecasting portfolio",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-smallholder-farmers-60m"],
    qualification: "A three-year $60M commitment for AI-enabled weather and crop-disease forecasting in LMICs, not a cash-paid total."
  },
  {
    date: "2026-09-03",
    amountB: 1,
    label: "OpenAI: Daybreak for Frontline Defenders",
    scope: ["main"],
    evidenceIds: ["openai-daybreak-1b"],
    qualification:
      "A global six-month package of subsidized cyber-model access, training, technical assistance, and partnerships. It is an announced mixed in-kind commitment, not a cash-paid total; the announcement does not identify a Global Health & Development allocation."
  },
  {
    date: "2026-09-15",
    amountB: 0.125,
    label: "OpenAI Foundation: Public Data for Health",
    scope: ["main"],
    evidenceIds: ["openai-public-data-health-125m"],
    qualification:
      "More than $125M in an initial tranche of grants for public life-sciences datasets. This is a grant total, not a reported cash-paid total, and the announcement does not establish a GH&D allocation."
  },
  {
    date: "2026-09-28",
    amountB: 0.01,
    label: "OpenAI and Lenfest: AI Collaborative expansion",
    scope: ["main"],
    evidenceIds: ["openai-lenfest-10m"],
    qualification:
      "A $5M commitment plus up to $5M in software credits and engineering support for U.S. local journalism; the ledger records the stated maximum mixed package, not cash paid."
  },
  {
    date: "2026-10-08",
    amountB: 0.15,
    label: "Anthropic: Genesis Mission science support",
    scope: ["main"],
    evidenceIds: ["anthropic-genesis-150m"],
    qualification:
      "A three-year package of Claude access, API credits, training, onboarding, and technical support for U.S. federal science projects. It is not a cash grant or AIS/EA operating funding."
  }
];

const mainCommitmentHistory: CommitmentSnapshot[] = [
  { date: "2026-01-20", totalB: 0.05, label: "Horizon 1000" },
  { date: "2026-05-14", totalB: 0.25, label: "Anthropic-Gates partnership" },
  { date: "2026-06-10", totalB: 0.45, label: "Economic Futures Research Fund" },
  { date: "2026-06-11", totalB: 0.6, label: "Claude Corps" },
  { date: "2026-06-15", totalB: 0.65, label: "People-First AI Fund" },
  { date: "2026-07-21", totalB: 0.69, label: "Public First Action" },
  { date: "2026-08-13", totalB: 0.79, label: "Common Health Coalition" },
  { date: "2026-08-25", totalB: 0.795, label: "Wellbeing-evaluations program" },
  { date: "2026-09-03", totalB: 1.795, label: "Daybreak for Frontline Defenders" },
  { date: "2026-09-08", totalB: 1.8, label: "Teen-development research grants" },
  { date: "2026-09-10", totalB: 1.86, label: "Smallholder-farmer forecasting" },
  { date: "2026-09-15", totalB: 1.985, label: "Public Data for Health" },
  { date: "2026-09-28", totalB: 1.995, label: "Lenfest AI Collaborative expansion" },
  { date: "2026-10-08", totalB: 2.145, label: "Genesis Mission science support" }
];

const globalCommitmentHistory: CommitmentSnapshot[] = [
  { date: "2026-01-20", totalB: 0.05, label: "Horizon 1000" },
  { date: "2026-05-14", totalB: 0.25, label: "Anthropic-Gates partnership" },
  { date: "2026-09-10", totalB: 0.31, label: "Smallholder-farmer forecasting" }
];

export const newsItems: NewsItem[] = [
  ...animalWelfareNews.map((item) => ({ ...item, scope: ["animal-welfare"] as TrackerScope[] })),
  {
    date: "2026-10-26",
    title: "Anthropic publicly files its S-1 for a proposed IPO",
    socialTitle: "Anthropic publicly files its S-1",
    summary:
      "The public filing and intended Nasdaq listing make the IPO timetable more concrete, but it does not set an offer price, share count, effective date, lockup terms, or first trading date. It is a liquidity-timing signal, not cash or a completed IPO.",
    scope: ["main", "global-development"],
    evidenceIds: ["anthropic-public-s1"],
    strength: "Confirmed"
  },
  {
    date: "2026-10-18",
    title: "Anthropic proposes a 5% equity stake for a new Public Benefit Fund",
    socialTitle: "Anthropic proposes a 5% equity stake for its Public Benefit Fund",
    summary:
      "The initial stake is subject to stockholder approval. The fund is a wholly owned LLC with a broad mandate; governance, liquidity, cause allocation, and distribution timing remain unspecified. It is modeled as paper capacity rather than counted as a dollar commitment or cash paid.",
    scope: ["main", "global-development"],
    evidenceIds: ["anthropic-public-benefit-fund"],
    strength: "Confirmed"
  },
  {
    date: "2026-10-14",
    title: "OpenAI and Rockefeller launch a $50M city-services initiative",
    summary: "Cities Deliver offers grants for AI-enabled public services, with a city-government partner required. The jointly announced amount has no disclosed donor split or specific GH&D total; it is tracked as a mixed-source commitment, outside the new-AI-wealth ledger.",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-cities-deliver-50m"],
    strength: "Confirmed"
  },
  {
    date: "2026-10-08",
    title: "Anthropic commits $150M to U.S. federal science projects",
    socialTitle: "Anthropic's $150M Genesis Mission science commitment",
    summary:
      "The three-year package provides Claude access, API credits, training, onboarding, and technical support. It is a broad public-benefit commitment, not cash paid, AIS/EA operating funding, or a Global Health & Development allocation.",
    scope: ["main"],
    evidenceIds: ["anthropic-genesis-150m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-30",
    title: "GiveWell reports more than $600M directed in 2026",
    socialTitle: "GiveWell reports more than $600M directed in 2026",
    summary:
      "GiveWell says its 2026 grantmaking may approach or exceed $1B. This updates the existing-funder bridge from more than $400M to more than $600M directed; it is not newly liquid AI wealth.",
    scope: ["main", "global-development"],
    evidenceIds: ["givewell-september-600m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-28",
    title: "OpenAI expands the Lenfest AI journalism program with up to $10M",
    socialTitle: "OpenAI expands the Lenfest AI journalism program with up to $10M",
    summary:
      "The package combines a $5M commitment with up to $5M in software credits and engineering support. It is a broad public-benefit commitment, not AIS/EA operating funding or a cash-paid total.",
    scope: ["main"],
    evidenceIds: ["openai-lenfest-10m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-21",
    title: "OpenAI Foundation makes low-resource-language voice AI a program focus",
    socialTitle: "OpenAI Foundation adds low-resource-language voice AI as a program focus",
    summary:
      "The Foundation joined a global coalition and plans to support voice-data and infrastructure work for commercially underserved languages. No amount or grant round was announced, so this is a cause-allocation signal rather than a named commitment.",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-low-resource-voice"],
    strength: "Planned"
  },
  {
    date: "2026-09-18",
    title: "Coefficient launches a $165M Health Aid Transition Fund",
    socialTitle: "Coefficient launches a $165M Health Aid Transition Fund",
    summary:
      "The initiative will support governments facing aid cuts through technical assistance, bridge financing, and some service delivery. It is deployment by existing funders, not newly liquid AI wealth.",
    scope: ["global-development"],
    evidenceIds: ["coefficient-health-aid-transition-165m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-15",
    title: "OpenAI Foundation announces more than $125M in public-health-data grants",
    socialTitle: "OpenAI Foundation announces more than $125M in public-health-data grants",
    summary:
      "The initial tranche funds public life-sciences datasets, benchmarks, and challenges. It is a confirmed broad health and research-infrastructure allocation, not AIS/EA operating funding or a cash-paid total.",
    scope: ["main"],
    evidenceIds: ["openai-public-data-health-125m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-14",
    title: "Gates Foundation plans at least $1B for equitable AI over two years",
    socialTitle: "Gates Foundation's two-year $1B equitable-AI plan",
    summary:
      "The existing-funder plan allocates 40% to education, 40% to health, 10% to agriculture, and 10% to digital foundations in the U.S. and abroad. It may overlap named partnerships already tracked, so it is news and capacity evidence rather than an addition to the AI-new-wealth commitment total.",
    scope: ["main", "global-development"],
    evidenceIds: ["gates-ai-equity-1b"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-10",
    title: "OpenAI Foundation commits $60M to AI forecasting for smallholder farmers",
    socialTitle: "OpenAI Foundation's $60M smallholder-farmer forecasting portfolio",
    summary:
      "The confirmed three-year portfolio spans South and Southeast Asia and East Africa. It is a named commitment, not a cash-paid total; the public announcement does not specify the share disbursed by end-2027.",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-smallholder-farmers-60m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-09",
    title: "Coefficient reports a $160M approved AI-safety grant",
    socialTitle: "Coefficient's $160M approved AI-safety grant",
    summary:
      "Coefficient describes this as its largest AI-safety grant, to a new alignment-research organization. It is existing-funder deployment and capacity evidence, not newly liquid AI wealth or a cash-paid total.",
    scope: ["main"],
    evidenceIds: ["coefficient-ai-biosecurity-2026"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-08",
    title: "OpenAI opens a $5M teen-development research grant call",
    socialTitle: "OpenAI's $5M teen-development research grants",
    summary:
      "OpenAI Group PBC, rather than the Foundation, will fund and administer the call. Applications are open, so the amount is a commitment rather than announced awards or cash disbursements.",
    scope: ["main"],
    evidenceIds: ["openai-teen-development-5m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-03",
    title: "OpenAI announces a $1B Daybreak package for frontline cyber defenders",
    socialTitle: "OpenAI's $1B Daybreak cyber-defense package",
    summary:
      "The six-month global package combines subsidized access, training, technical assistance, and partnerships. It is a named mixed in-kind commitment, not cash paid; the announcement gives no specific Global Health & Development allocation.",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-daybreak-1b"],
    strength: "Confirmed"
  },
  {
    date: "2026-08-25",
    title: "Anthropic opens a $5M wellbeing-evaluations grant program",
    socialTitle: "Anthropic opens a $5M wellbeing-evaluations grant program",
    summary:
      "The program combines direct funding with model access and technical support for independent, open-source evaluations. It is a confirmed commitment, not a completed grant or cash-disbursement record.",
    scope: ["main"],
    evidenceIds: ["anthropic-wellbeing-5m"],
    strength: "Confirmed"
  },
  {
    date: "2026-08-24",
    title: "Coefficient and GiveWell award $276M for DRC malaria prevention",
    socialTitle: "Coefficient and GiveWell award $276M for DRC malaria prevention",
    summary:
      "The confirmed award draws in part on Coefficient's existing $1B GiveWell allocation. It is evidence of existing-funder deployment capacity, not newly liquid AI wealth or a cash-paid total.",
    scope: ["global-development"],
    evidenceIds: ["coefficient-amf-276m"],
    strength: "Confirmed"
  },
  {
    date: "2026-09-30",
    title: "Reporting points to a November Anthropic IPO, but no public filing yet",
    socialTitle: "Reporting points to a November Anthropic IPO",
    summary:
      "At publication, Axios reported that a prospectus was circulating and a November Nasdaq debut was expected. Anthropic subsequently confirmed its public S-1 on October 26; that filing supersedes this earlier no-public-filing status.",
    scope: ["main", "global-development"],
    evidenceIds: ["anthropic-ipo-current-reporting", "anthropic-s1"],
    strength: "Reported"
  },
  {
    date: "2026-08-13",
    title: "OpenAI Foundation commits $100M to U.S. health delivery",
    socialTitle: "OpenAI Foundation's $100M U.S.-health commitment",
    summary:
      "This is a material health allocation, but the initial program is U.S.-focused and is not counted as GH&D funding.",
    scope: ["main", "global-development"],
    evidenceIds: ["openai-common-health-100m"],
    strength: "Confirmed"
  },
  {
    date: "2026-08-21",
    title: "Coefficient sets a $10–30M transformative-AI/global-health RFP",
    socialTitle: "Coefficient's $10–30M AI/global-health RFP",
    summary:
      "I treat this as a cause-allocation and field-capacity signal from an existing funder, not a completed grant or newly liquid AI wealth.",
    scope: ["main", "global-development"],
    evidenceIds: ["coefficient-ghw-ai-rfp"],
    strength: "Planned"
  }
];

export const trackerData = {
  generatedAt: "2026-10-29",
  methodology:
    "Each dated point is a reviewed re-estimate from the correlated model, not an automatic rerun. At least every 14 days, the review should reconsider current evidence, elapsed time, and relevant non-events such as no filing, liquidity, or disbursement. The shaded P10–P90 range is an 80% model interval, not an empirical confidence interval. Commitment totals may mix cash, credits, technical support, cofunding, and multi-year plans.",
  forecastReview: {
    cadenceDays: 14,
    maximumPostingAgeDays: 21,
    rule:
      "Reassess both routes at least every 14 days. Append a dated point even when the numerical forecast is unchanged, and record why. For fixed end-2027 targets, explicitly consider elapsed time and the absence of expected events."
  },
  routes: {
    main: {
      label: "AIS/EA and broad AI-linked philanthropy",
      url: "https://uj-ai-wealth-philanthropy-steelman.netlify.app/#tracker",
      forecastTarget: "Modeled AIS/EA disbursement by end-2027",
      forecastHistory: [
        {
          date: "2026-08-10",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Retrospective baseline",
          inputsChanged: true,
          note: "Retrospective baseline using the current simulation method and the August 10 defaults."
        },
        {
          date: "2026-08-21",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "The August 21 evidence review retained the AIS/EA inputs. This flat segment records that judgment; it is not an automatic refresh. Future reviews must explicitly consider elapsed time and relevant non-events."
        },
        {
          date: "2026-08-24",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh August 24 re-estimation retained the inputs. Only three days had elapsed; Anthropic had not publicly filed or released liquidity or lockup terms, and no new Foundation transfer or cash disbursement was identified. Additional press coverage still rests on unnamed sources."
        },
        {
          date: "2026-09-11",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the AIS/EA inputs. The OpenAI Group $5M research call and Coefficient's $160M existing-funder grant improve the tracker, but do not establish Anthropic liquidity, a Foundation transfer, or a changed end-2027 conversion path. No public IPO filing, lockup terms, or cash-paid total was found."
        },
        {
          date: "2026-09-21",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the AIS/EA inputs. OpenAI's $1B Daybreak package is a six-month mixed in-kind cyber-defense commitment, so it raises the named-commitment ledger without establishing additional end-2027 AIS/EA cash deployment. No public Anthropic IPO filing, liquidity or lockup terms, OpenAI Foundation transfer, or cash-paid total was found; ten further days alone do not justify mechanical decay."
        },
        {
          date: "2026-10-01",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the AIS/EA inputs. New public-health-data and journalism commitments expand the broad public-benefit ledger, while GiveWell's higher 2026 total shows faster existing-funder deployment. None establishes Anthropic liquidity, lockup terms, a new OpenAI Foundation transfer, or additional AIS/EA cash conversion. Ten elapsed days and the absence of those events do not support arbitrary mechanical decay."
        },
        {
          date: "2026-10-11",
          medianB: 0.8302332866972336,
          low80B: 0.1617220518623742,
          high80B: 2.975508804396831,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the AIS/EA inputs. Anthropic's $150M Genesis Mission package expands the broad public-benefit ledger but consists of access, credits, training, and support rather than AIS/EA cash. Current reporting and market pricing still support the prior 2026 IPO range. Ten elapsed days, no public filing or lockup terms, and no new Foundation transfer or comparable cash-paid total do not justify a mechanical change to the end-2027 forecast."
        },
        {
          date: "2026-10-21",
          medianB: 0.9409303448726277,
          low80B: 0.20696872308502828,
          high80B: 3.1254516866495545,
          reviewStatus: "Reviewed; forecast adjusted",
          inputsChanged: true,
          note:
            "Anthropic's proposed 5% Public Benefit Fund adds a distinct company-equity pathway, separate from founder and employee pledges. The model applies conservative approval, realization, AIS/EA-allocation, and by-end-2027 deployment gates because the fund's governance and distribution schedule remain unspecified. This raises the median and lower bound modestly. The reported IPO remains plausible, but the year-end market price fell to 78% and there is still no public filing or lockup disclosure."
        },
        {
          date: "2026-10-29",
          medianB: mainSimulation.p50,
          low80B: mainSimulation.p10,
          high80B: mainSimulation.p90,
          reviewStatus: "Reviewed; model implementation corrected",
          inputsChanged: true,
          supersededSameDayReview: { medianB: 0.9409303448726277, low80B: 0.20696872308502828, high80B: 3.1254516866495545, note: "Earlier October 29 S-1 evidence review, published before this simulation correction. Retained here for audit history." },
          note:
            "The October 26 public S-1 strengthens the IPO case, but it does not establish insider liquidity or philanthropic payout timing. Central inputs are retained after considering the fixed end-2027 deadline. This numerical revision corrects simulation behavior: fund approval is binary, collapse also reduces employee equity, exact zero/100% inputs stay fixed, and correlation controls preserve marginal variance. Headline threshold probabilities now come from this same distribution. Earlier dated values are frozen."
        }
      ] satisfies ForecastSnapshot[],
      commitmentHistory: mainCommitmentHistory,
      namedCommitmentTotalB: 2.145,
      existingFunderCommittedB: 0.6,
      existingFunderPromisedB: 1,
      commitmentNote:
        "The $2.145B total is named AI-linked commitments, not a cash-disbursement total. It includes OpenAI's $1B Daybreak package, more than $125M in Public Data for Health grants, and Anthropic's $150M mixed in-kind Genesis Mission support. Anthropic's proposed 5% Public Benefit Fund stake has no company-stated dollar amount and is excluded from this ledger. GiveWell's bridge funding and the Gates Foundation's $1B equitable-AI plan are existing-funder deployment and are also tracked separately."
    },
    globalDevelopment: {
      label: "Global Health & Development",
      url: "https://uj-ai-wealth-philanthropy-steelman.netlify.app/global-development/#tracker",
      forecastTarget: "Modeled AI-linked GH&D disbursement by end-2027",
      forecastHistory: [
        {
          date: "2026-08-10",
          medianB: 0.5376286600383207,
          low80B: 0.1502100050899894,
          high80B: 2.7768379289676357,
          reviewStatus: "Retrospective baseline",
          inputsChanged: true,
          note: "Retrospective baseline using the current simulation method and the August 10 $950M residual OpenAI plan."
        },
        {
          date: "2026-08-21",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; forecast adjusted",
          inputsChanged: true,
          note:
            "The median fell slightly after excluding the separate $100M U.S.-health commitment from the residual OpenAI plan."
        },
        {
          date: "2026-08-24",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh August 24 re-estimation retained the inputs. The three-day interval and no observed filing, liquidity, lockup terms, Foundation transfer, cash disbursement, or new GH&D award did not defensibly change the end-2027 forecast."
        },
        {
          date: "2026-09-11",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; forecast adjusted",
          inputsChanged: true,
          note:
            "A fresh re-estimation adds the confirmed $60M OpenAI Foundation smallholder-farmer portfolio to named GH&D programs. It is a three-year commitment rather than a cash-paid total, so the existing 60% cash-equivalent and 40% by-end-2027 assumptions are retained. The review found no public Anthropic IPO filing, liquidity or lockup terms, Foundation transfer, or new cash-paid total."
        },
        {
          date: "2026-09-21",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the GH&D inputs. OpenAI's $1B Daybreak package is global but gives no specific GH&D allocation and consists of subsidized access, support, and partnerships rather than a cash-paid total, so it is news but excluded from the GH&D model. No public Anthropic IPO filing, liquidity or lockup terms, Foundation transfer, cash-paid total, or new scoped GH&D award was found; elapsed time alone does not support a mechanical change."
        },
        {
          date: "2026-10-01",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the GH&D inputs. GiveWell's more than $600M directed and Coefficient's Health Aid Transition Fund strengthen evidence of existing-funder deployment capacity; OpenAI's low-resource-language plan has no announced amount. These do not establish new AI-linked GH&D cash, Anthropic liquidity, lockup terms, or a Foundation transfer, so the end-2027 model remains unchanged."
        },
        {
          date: "2026-10-11",
          medianB: 0.5447036735556445,
          low80B: 0.16172284897426498,
          high80B: 2.7822699185130935,
          reviewStatus: "Reviewed; no numerical change",
          inputsChanged: false,
          note:
            "A fresh re-estimation retained the GH&D inputs. Anthropic's Genesis Mission package is restricted to U.S. federal science projects and adds no scoped GH&D amount. Current reporting and market pricing still support the prior 2026 IPO range, but there is no public filing, lockup terms, Foundation transfer, new AI-linked GH&D award, or comparable cash-paid total. Ten elapsed days do not otherwise justify mechanical decay."
        },
        {
          date: "2026-10-21",
          medianB: 0.668973503069852,
          low80B: 0.16408247719324257,
          high80B: 3.3334020056461076,
          reviewStatus: "Reviewed; forecast adjusted",
          inputsChanged: true,
          note:
            "Anthropic's proposed 5% Public Benefit Fund creates a new broad public-benefit pathway. The GH&D model assigns only a conservative 10% cause share and 5% by-end-2027 deployment, with separate approval and realization gates, because Anthropic has announced neither a GH&D allocation nor a distribution schedule. Gates' separate $1B equitable-AI plan strengthens existing-funder capacity evidence but may overlap tracked partnerships and is not newly liquid AI wealth."
        },
        {
          date: "2026-10-29",
          medianB: globalSimulation.p50,
          low80B: globalSimulation.p10,
          high80B: globalSimulation.p90,
          reviewStatus: "Reviewed; model and overlap assumptions corrected",
          inputsChanged: true,
          supersededSameDayReview: { medianB: 0.668973503069852, low80B: 0.16408247719324257, high80B: 3.3334020056461076, note: "Earlier October 29 S-1 evidence review, published before the model and overlap corrections. Retained here for audit history." },
          note:
            "The public S-1 improves the liquidity evidence without settling lockup, cause allocation, or payout timing by end-2027. The revised model uses binary fund approval, links employee equity to collapse risk, and preserves exact zero/100% inputs. It adds a subjective 70% GH&D share for mixed-scope named programs and corrects the illustrative residual OpenAI envelope from $850M to $790M after the $60M farmer portfolio. This residual is a scenario, not a reconciled unspent budget. Earlier dated values are frozen."
        }
      ] satisfies ForecastSnapshot[],
      commitmentHistory: globalCommitmentHistory,
      namedCommitmentTotalB: 0.31,
      existingFunderCommittedB: 0.6,
      existingFunderPromisedB: 1,
      plannedRfpLowB: 0.01,
      plannedRfpHighB: 0.03,
      commitmentNote:
        "The $310M total covers Horizon 1000, the Anthropic-Gates partnership, and OpenAI Foundation's smallholder-farmer portfolio; it includes non-cash support where announced. Anthropic's proposed fund has no stated GH&D amount and is modeled rather than added to this ledger. GiveWell's bridge funding and the Gates Foundation's broader $1B equitable-AI plan are existing-funder deployment and are tracked separately."
    },
    animalWelfare: {
      label: "Animal Welfare",
      url: "https://uj-ai-wealth-philanthropy-steelman.netlify.app/animal-welfare/#tracker",
      forecastTarget: animalWelfareForecastTarget,
      forecastHistory: [animalWelfareReviewedForecast] satisfies ForecastSnapshot[],
      commitmentHistory: [{ date: "2026-10-29", totalB: 0, label: "No named animal-welfare allocation identified in reviewed sources" }],
      namedCommitmentTotalB: 0,
      existingFunderCommittedB: 0,
      existingFunderPromisedB: 0,
      commitmentNote: "No itemized named animal-welfare amount from these modeled pathways was identified. Bollard reports earlier AI-donor gifts in aggregate, covering a broader donor pool; those are neither new commitments nor post-October-29 cash. Zero records an empty identified ledger, not no giving. Existing funders and their room for funding remain context."
    }
  },
  commitments: commitmentLedger,
  news: [...newsItems].sort((a, b) => b.date.localeCompare(a.date))
};

export type TrackerData = typeof trackerData;
