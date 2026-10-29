import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { Layout } from "./components/Layout";
import { ReportSection } from "./components/ReportSection";
import { BotecModel } from "./components/BotecModel";
import { ScenarioTable } from "./components/ScenarioTable";
import { ShareBox } from "./components/ShareBox";
import { MethodologyBox } from "./components/MethodologyBox";
import { SourceNote } from "./components/SourceNote";
import { report, steelmanGates } from "./content/report";
import { getForecastRows } from "./content/modelDefaults";
import { sources } from "./content/sources";
import { CitationTip } from "./components/CitationTip";
import { FeedbackTip } from "./components/FeedbackTip";
import { EstimateSynthesis } from "./components/EstimateSynthesis";
import { ProvenanceTip } from "./components/ProvenanceTip";
import { ToplinePredictions, type ToplinePrediction } from "./components/ToplinePredictions";
import { calculateModel } from "./utils/model";
import { defaultModelInputs } from "./content/modelDefaults";
import { formatBillions, formatPercent } from "./utils/format";
import { defaultCorrelatedConfig, runCorrelatedSimulation } from "./utils/correlatedModel";
import { NewsSection } from "./components/NewsSection";
import { TrackerPanel } from "./components/TrackerPanel";
import { EcosystemUpdate } from "./components/EcosystemUpdate";
import { ModelComparisonLink } from "./components/ModelComparisonLink";

const claimEvidenceIds = [
  ["anthropic-s1", "openai-foundation-structure", "openai-foundation-2026"],
  ["anthropic-valuation", "anthropic-founder-pledge", "anthropic-public-benefit-fund"],
  ["irs-daf-control", "grantmaker-bottleneck"]
];

const planningEvidenceIds = [
  ["coefficient-underfunded", "anthropic-claude-corps", "anthropic-economic-fund", "coefficient-givewell-1b", "givewell-scaling-1b"]
];

const defaultMainOutput = calculateModel(defaultModelInputs);
const defaultMainSummary = runCorrelatedSimulation(defaultModelInputs, defaultCorrelatedConfig).summary;
const displayedForecastRows = getForecastRows(defaultMainSummary.probabilityOver1B);
const mainToplinePredictions: ToplinePrediction[] = [
  {
    outcome: "Central modeled AIS/EA disbursement by end-2027",
    value: formatBillions(defaultMainOutput.capacityAdjustedTotalB),
    note: "The editable BOTEC's current default, not a calibrated posterior or promise of funding.",
    evidenceIds: ["anthropic-valuation", "anthropic-founder-pledge", "anthropic-public-benefit-fund", "sec-ipo-lockup"]
  },
  {
    outcome: "Model probability of at least $1B to AIS/EA by end-2027",
    value: formatPercent(defaultMainSummary.probabilityOver1B),
    note: "Anthropic founder, employee, and Public Benefit Fund pathways. Derived from the tracker simulation, conditional on the stated assumptions.",
    evidenceIds: ["anthropic-s1", "anthropic-public-benefit-fund", "sec-ipo-lockup", "grantmaker-bottleneck"]
  },
  {
    outcome: "Chance of at least $5B cumulative AIS/EA commitments or disbursements by end-2028",
    value: "15-35%",
    note: "More time helps, but cause allocation and deployment capacity remain substantial gates.",
    evidenceIds: ["openai-foundation-value", "grantmaker-bottleneck"]
  }
];

export default function App() {
  return (
    <Layout toplinePredictions={mainToplinePredictions}>
      <EcosystemUpdate />
      <NewsSection scope="main" />
      <TrackerPanel scope="main" />
      <ModelComparisonLink />

      <section id="summary" className="section">
        <ExecutiveSummary />
        <ScenarioTable rows={displayedForecastRows} />
        <div className="prediction-note">
          <p>
            Prediction markets help most with the IPO and valuation gates, not the philanthropic conversion gate. I found
            relevant public markets on Anthropic IPO timing and trillion-dollar AI-lab valuation timing{" "}
            <CitationTip ids={["manifold-anthropic-ipo", "metaculus-ai-valuation"]} />, but not yet a clean market on
            AIS/EA donation timing, nonprofit grant deployment, or grantmaker-capacity constraints.
          </p>
          <p>
            The gates below are not meant to have equal weight. The model's sensitivity panel is the better guide to
            which assumptions move the estimate most. <FeedbackTip ids={["md-prioritize-gates", "dr-sensitivity-not-ranking"]} />
            <ProvenanceTip ids={["michael-revisions"]} />
          </p>
        </div>
      </section>

      <section id="model" className="section">
        <ReportSection eyebrow="Interactive uncertainty model" title="BOTEC model">
          <p>
            The model separates notional AI wealth from realized, cause-directed, near-term grants. Use the
            assumptions tab for editable central inputs, the correlated-uncertainty tab for shared unobservables
            and anti-correlations, and the equations tab for the derivation.{" "}
            <FeedbackTip ids={["md-distributions", "md-inline-citations", "dr-distributions-ev-calculator"]} />
            <ProvenanceTip ids={["ai-draft", "michael-revisions"]} />
          </p>
        </ReportSection>
        <div className="definition-strip" aria-label="Key model term definitions">
          <p>
            <strong>Paper value</strong> means notional equity value before taxes, lockups, sale timing, donor choices,
            and grantmaking capacity.
          </p>
          <p>
            <strong>OpenAI Foundation stake</strong> is treated as broad AI-era philanthropy context rather than core
            AIS/EA conversion-model input; its cause allocation is too uncertain for this narrow BOTEC.{" "}
            <CitationTip ids={["openai-foundation-structure", "openai-foundation-value"]} />{" "}
            <FeedbackTip ids={["md-openai-foundation"]} />
          </p>
          <p>
            <strong>Anthropic Public Benefit Fund</strong> is modeled separately because Anthropic proposed a specific
            5% company-equity stake. It remains subject to stockholder approval, and the model discounts it for
            realization, cause allocation, and deployment timing. <CitationTip ids={["anthropic-public-benefit-fund"]} />
          </p>
          <p>
            <strong>Near-term deployment cap</strong> combines grantmaker capacity and recipient absorption into a
            dollar cap on responsible near-term disbursement. <FeedbackTip ids={["md-capacity-cap"]} />
          </p>
        </div>
        <BotecModel />
      </section>

      <EstimateSynthesis />

      <section id="steelman" className="section">
        <ReportSection eyebrow="The claim being tested" title="The Bay-Area funding assumption">
          {report.claimBeingCritiqued.map((paragraph, index) => (
            <p key={paragraph}>
              {paragraph} <CitationTip ids={claimEvidenceIds[index] ?? []} />
            </p>
          ))}
          <blockquote>{report.coreSteelman}</blockquote>
          <p className="provenance-line">
            Draft status <ProvenanceTip ids={["ai-draft", "david-orchestration", "david-model-framing", "evidence-oct-29"]} />
          </p>
        </ReportSection>

        <div className="gate-grid" aria-label="Conversion gates">
          {steelmanGates.map((gate) => (
            <article className="gate-card" key={gate.title}>
              <h3>{gate.title}</h3>
              <p className="gate-claim">
                {gate.claim} <CitationTip ids={gate.evidenceIds ?? []} />
                {gate.feedbackIds ? <FeedbackTip ids={gate.feedbackIds} /> : null}
              </p>
              <ul>
                {gate.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="counterarguments" className="section section--narrow">
        <ReportSection eyebrow="Reasons this may be too pessimistic" title="What could make the model too pessimistic">
          {report.counterarguments.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <a href="#ecosystem-update">GWWC’s 2026 survey of more than 70 effective-giving organizations</a> adds evidence
            about institutional growth, concentration, cause allocation, and the small number of evaluators. It makes a
            faster-capacity scenario more plausible, but does not identify a new AI-linked amount or justify changing the
            central forecast. <CitationTip ids={["effective-giving-2026"]} />
          </p>
        </ReportSection>
      </section>

      <section id="planning" className="section section--narrow">
        <ReportSection eyebrow="Planning implications" title="Planning across two funding scenarios">
          <div className="scenario-note-grid" aria-label="Planning scenarios">
            {report.planningScenarios.map((scenario) => (
              <article className="scenario-note" key={scenario.title}>
                <h3>{scenario.title}</h3>
                <p>
                  {scenario.body} <CitationTip ids={scenario.evidenceIds ?? []} />
                  <FeedbackTip ids={scenario.feedbackIds ?? []} />
                </p>
              </article>
            ))}
          </div>
          {report.planningImplications.map((paragraph, index) => (
            <p key={paragraph}>
              {paragraph} <CitationTip ids={planningEvidenceIds[index] ?? []} />
            </p>
          ))}
        </ReportSection>
        <MethodologyBox />
      </section>

      <section id="sources" className="section">
        <ReportSection eyebrow="Source audit and uncertainty" title="Evidence base">
          <p>
            Source quality varies sharply. Official company announcements are useful for events, valuations, and stated
            structures. Forum posts and prediction markets are useful for local beliefs and hypotheses, not for proving
            grant timing.
          </p>
        </ReportSection>
        <div className="source-list">
          {sources.map((source) => (
            <SourceNote source={source} key={source.id} />
          ))}
        </div>
      </section>

      <section id="annotate" className="section section--narrow">
        <ShareBox />
      </section>
    </Layout>
  );
}
