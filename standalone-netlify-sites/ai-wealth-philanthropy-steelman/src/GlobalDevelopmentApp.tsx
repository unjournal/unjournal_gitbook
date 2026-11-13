import { ModelComparisonLink } from "./components/ModelComparisonLink";
import { offeringSummary, lockupSummary, fundIssuanceSummary } from "./content/anthropicIpo";
import { useEffect } from "react";
import { CitationTip } from "./components/CitationTip";
import { FeedbackFold } from "./components/FeedbackFold";
import { ProvenanceTip } from "./components/ProvenanceTip";
import { ReportSection } from "./components/ReportSection";
import { SourceNote } from "./components/SourceNote";
import { GlobalDevelopmentModel } from "./components/GlobalDevelopmentModel";
import { ToplinePredictions, type ToplinePrediction } from "./components/ToplinePredictions";
import { sources } from "./content/sources";
import { formatBillions, formatPercent } from "./utils/format";
import { runGlobalDevelopmentSimulation } from "./utils/globalDevelopmentCorrelatedModel";
import { calculateGlobalDevelopmentModel, defaultGlobalDevelopmentInputs } from "./utils/globalDevelopmentModel";
import { installHashNavigation } from "./utils/hashNavigation";
import { NewsSection } from "./components/NewsSection";
import { TrackerPanel } from "./components/TrackerPanel";
import { SiteNavigation } from "./components/SiteNavigation";

const globalSourceIds = new Set([
  "anthropic-roadshow-nov10",
  "anthropic-prospectus-nov10",
  "openai-financing-nov6-report",
  "givewell-all-grants-nov12",
  "anthropic-s1",
  "anthropic-ipo-current-reporting",
  "anthropic-ipo-oct-21",
  "anthropic-public-s1",
  "polymarket-anthropic-ipo",
  "anthropic-series-h",
  "anthropic-public-benefit-fund",
  "openai-structure",
  "openai-foundation-2026",
  "openai-people-first-2026",
  "openai-common-health-100m",
  "anthropic-gates",
  "gates-anthropic",
  "openai-horizon-1000",
  "coefficient-givewell-1b",
  "coefficient-ghw-ai-rfp",
  "givewell-scaling-1b",
  "gates-ai-equity-1b",
  "investor-gov-lockups",
  "irs-foundation-payout"
]);

const uncertaintyRows = [
  {
    title: "1. The liquidity event is plausible, but not scheduled",
    body:
      offeringSummary,
    evidenceIds: ["anthropic-roadshow-nov10", "anthropic-prospectus-nov10"]
  },
  {
    title: "2. Valuation and political risk still matter",
    body:
      "The model retains the $965B completed-round anchor as an editable scenario, not a current IPO market-cap estimate. Proposed IPO prices and reported OpenAI financing do not reconcile the model's historical equity percentages with current dilution. Market conditions, regulation, litigation, and performance can change realizable wealth before remaining shares are sold.",
    evidenceIds: ["anthropic-valuation", "anthropic-s1", "openai-foundation-structure"]
  },
  {
    title: "3. Paper wealth can remain illiquid after an IPO",
    body:
      lockupSummary,
    evidenceIds: ["anthropic-prospectus-nov10"]
  },
  {
    title: "4. Commitments are not the same as grants paid out",
    body:
      fundIssuanceSummary,
    evidenceIds: ["anthropic-prospectus-nov10"]
  },
  {
    title: "5. Global development has evidence of allocation, but the form is narrow",
    body:
      "The question is no longer whether the expected wave will affect global development. It already has: Coefficient and GiveWell are pulling funding forward and building capacity. Direct AI-company programs still emphasize AI-enabled health, education, agriculture, data, and public goods. OpenAI's latest $100 million health commitment is initially U.S.-focused, which is useful evidence that health allocation does not automatically imply GH&D allocation. The evidence for flexible funding is stronger than before, but most of it is bridge funding from incumbent funders rather than new AI wealth.",
    evidenceIds: ["anthropic-gates", "gates-anthropic", "openai-horizon-1000", "openai-common-health-100m", "coefficient-givewell-1b", "coefficient-ghw-ai-rfp", "givewell-scaling-1b"]
  }
];

const defaultGlobalOutput = calculateGlobalDevelopmentModel(defaultGlobalDevelopmentInputs);
const defaultGlobalSummary = runGlobalDevelopmentSimulation(defaultGlobalDevelopmentInputs);
const globalToplinePredictions: ToplinePrediction[] = [
  {
    outcome: "Central modeled AI-linked GH&D disbursement by end-2027",
    value: formatBillions(defaultGlobalOutput.capacityAdjustedTotalB),
    note: "This includes discounted named programs plus founder, employee, Anthropic Public Benefit Fund, and other OpenAI Foundation pathways.",
    evidenceIds: ["anthropic-public-benefit-fund", "anthropic-gates", "openai-horizon-1000", "openai-foundation-2026"]
  },
  {
    outcome: "Chance of at least $1B newly disbursed to GH&D by AI-linked funders by end-2027",
    value: formatPercent(defaultGlobalSummary.probabilityOver1B),
    note: "Derived from the same conditional simulation as the tracker. GiveWell's existing-funder bridge is excluded; this is a model probability rather than an independently calibrated judgment.",
    evidenceIds: ["anthropic-gates", "openai-horizon-1000", "openai-foundation-2026", "coefficient-givewell-1b", "givewell-scaling-1b"]
  },
  {
    outcome: "Chance that most AI-linked GH&D support is flexible rather than AI-tied by end-2028",
    value: "10-30%",
    note: "The visible programs currently emphasize AI deployment, technical support, credits, and large institutional partnerships.",
    evidenceIds: ["anthropic-gates", "gates-anthropic", "openai-horizon-1000"]
  }
];

export default function GlobalDevelopmentApp() {
  useEffect(() => {
    document.title = "Will the AI Philanthropy Wave Reach Global Health and Development?";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      "A preliminary, sourced note on whether the emerging wave of AI-linked philanthropy will reach global health and development."
    );
    return installHashNavigation();
  }, []);

  return (
    <div className="page-shell global-development-page">
      <SiteNavigation brand="Global development funding" home="/global-development/" groups={[
        { label: "Model", links: [{ label: "Interactive calculation", href: "#ghd-model" }, { label: "Predictions", href: "#predictions" }] },
        { label: "Read", links: [{ label: "Current read", href: "#current-read" }, { label: "Five uncertainties", href: "#uncertainties" }, { label: "Implications", href: "#implications" }] }
      ]} />

      <main>
        <FeedbackFold />
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">Global Health &amp; Development fork</p>
            <h1>Will the AI philanthropy wave reach global health and development?</h1>
            <p className="subtitle">
              My current read: some of it already has, but the scale, timing, form, and cause allocation remain quite
              uncertain.
            </p>
          </div>
          <div className="hero-visual" aria-label="Topline AI-linked global development predictions">
            <ToplinePredictions
              compact
              id="predictions"
              predictions={globalToplinePredictions}
              qualifier="Preliminary judgments. Existing-funder bridge commitments and RFPs are tracked separately from the central AI-linked model."
            />
          </div>
          <div className="hero-details">
            <div className="meta-row">
              <span>Last updated 13 November 2026</span>
              <span>Preliminary, largely LLM-generated</span>
            </div>
            <p className="author-note">
              <strong>Orchestrated by David Reinstein</strong>, Co-Director of{" "}
              <a href="https://unjournal.org">Unjournal.org</a>. This fork was prompted by Jessica Leight's question and
              retains her uncertainty rather than assuming that a large general-purpose giving wave is inevitable.{" "}
              <ProvenanceTip ids={["ai-draft", "david-orchestration", "jessica-fork", "evidence-nov-13"]} />
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#tracker">
                Open forecast tracker
              </a>
              <a className="button" href="https://lnkd.in/p/gnzmdK8d" target="_blank" rel="noreferrer">
                Jessica Leight's comment
              </a>
              <a className="button" href="/">
                Read the AIS/EA version
              </a>
              <a className="button" href="#uncertainties">
                Review the uncertainties
              </a>
              <a className="button" href="/model-comparison/">Compare AI-philanthropy models</a>
              <a className="button" href="/animal-welfare/">Animal Welfare funding model</a>
            </div>
          </div>
        </section>

        <NewsSection scope="global-development" />
        <TrackerPanel scope="global-development" />
        <ModelComparisonLink />

        <section id="current-read" className="section section--narrow">
          <article className="summary-panel">
            <p className="kicker">Current read</p>
            <h2>
              The expected wave is already changing GH&amp;D spending. <ProvenanceTip ids={["jessica-fork", "evidence-oct-29"]} />
            </h2>
            <p>
              Coefficient Giving and Good Ventures increased their 2026 allocation for GiveWell recommendations from
              $175 million to $1 billion. Coefficient says it is spending earlier partly because it expects much more
              future funding and wants grantees to build capacity. It also says much of that expectation depends on
              volatile assets and may not materialize. GiveWell reports more than $600 million directed in 2026 and
              expects its grantmaking to approach or exceed $1 billion this year.{" "}
              <CitationTip ids={["coefficient-givewell-1b", "givewell-september-600m"]} />
            </p>
            <p>
              Coefficient earlier announced a $10-30 million RFP for research, policy, implementation,
              and field-building on transformative AI and the global poor. Its linked page was unavailable in the
              November 13 review, so I do not treat it as a verified current application opportunity. It remains
              historical allocation context, outside new AI-wealth cash.{" "}
              <CitationTip ids={["coefficient-ghw-ai-rfp"]} />
            </p>
            <p>
              Separately, Anthropic and the Gates Foundation announced a $200 million partnership spanning global
              health, education, and economic mobility. OpenAI and Gates committed $50 million to primary care in
              Africa. The Gates Foundation also plans at least $1 billion over two years for equitable AI across health,
              education, agriculture, and digital infrastructure, although that existing-funder plan may overlap these
              named partnerships. <CitationTip ids={["anthropic-gates", "openai-horizon-1000", "gates-ai-equity-1b"]} />
            </p>
            <p>
              Anthropic's initial Public Benefit Fund share contribution is disclosed in its SEC filing. Interim board
              control is specified, but no GH&amp;D allocation or external payout schedule is announced. The model
              includes it with conservative discounts rather than treating the stake as a grant.{" "}
              <CitationTip ids={["anthropic-public-benefit-fund"]} />
            </p>
            <p>
              On 13 August, the OpenAI Foundation separately committed $100 million to AI-enabled health delivery in
              the United States. This is a substantial health allocation, but I do not count it as GH&amp;D funding.{" "}
              <CitationTip ids={["openai-common-health-100m"]} />
            </p>
            <blockquote>
              There is now a large, flexible GH&amp;D commitment made partly in anticipation of future funding. The
              missing step is still the arrival and cause allocation of new AI wealth itself.
            </blockquote>
            <p>
              I do not add the $1 billion GiveWell commitment to the central AI-linked BOTEC. It is existing
              Coefficient/Good Ventures funding pulled forward in expectation of a possible future wave. It is strong
              evidence about planning and absorptive capacity, and weaker evidence about who ultimately supplies the
              future money.
            </p>
          </article>
        </section>

        <section id="ghd-model" className="section">
          <ReportSection eyebrow="Explicit GH&D BOTEC" title="What is being calculated, and what changes">
            <p>
              This fork should not simply reuse the AIS/EA number. It keeps the main memo's upstream Anthropic defaults,
              changes the cause-allocation shares, and adds two pathways that the narrow AIS/EA model excludes: named
              company/foundation programs and the remaining OpenAI Foundation plan. The result is shown line by line
              below. <ProvenanceTip ids={["ai-draft", "david-orchestration", "evidence-oct-29"]} />
            </p>
          </ReportSection>
          <GlobalDevelopmentModel />
        </section>

        <section id="uncertainties" className="section">
          <ReportSection eyebrow="Jessica Leight's question, updated" title="Five uncertainties that still matter">
            <p>
              Jessica's central question was whether people were moving too quickly from prospective AI wealth to a
              near-certain philanthropic wave, especially for global development. The evidence since then narrows some
              uncertainties and leaves others largely open. <ProvenanceTip ids={["jessica-fork", "evidence-oct-29"]} />
            </p>
          </ReportSection>
          <div className="gate-grid">
            {uncertaintyRows.map((row) => (
              <article className="gate-card" key={row.title}>
                <h3>{row.title}</h3>
                <p>
                  {row.body} <CitationTip ids={row.evidenceIds} />
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="implications" className="section section--narrow">
          <ReportSection eyebrow="What follows" title="What this should change in planning">
            <p>
              Global-development organizations should treat AI-linked philanthropy as a live funding source, especially
              where they can credibly connect AI to health systems, research, education, agriculture, or public data.
              They should not build budgets around an assumed general-purpose windfall.
            </p>
            <p>
              The near-term opportunity may be partly a partnership and implementation opportunity rather than ordinary
              grant fundraising. This favors organizations that can work with health ministries, major foundations,
              technical teams, and local implementers. It may leave proven interventions with no strong AI component
              largely dependent on existing donor pools.
            </p>
            <p>
              The Coefficient-GiveWell move makes capacity-building less hypothetical. GiveWell is hiring, searching for
              larger opportunities, and lowering its funding threshold. For other GH&amp;D funders, this is also a reason
              to ask where marginal opportunities remain strongest rather than assuming that every GiveWell-adjacent
              gap is as neglected as it was last year. <CitationTip ids={["coefficient-givewell-1b", "givewell-scaling-1b"]} />
            </p>
            <p>
              The most informative next evidence would be actual cash disbursements, named grantees outside large partner
              institutions, unrestricted or intervention-agnostic funding, and commitments extending beyond AI-enabled
              delivery. The weekly maintenance review checks for those signals.
            </p>
          </ReportSection>
        </section>

        <section className="section section--narrow">
          <details className="provenance-box">
            <summary>Why this fork exists and how it was generated</summary>
            <p>
              Jessica Leight wrote that “even if there's philanthropy, it's of course uncertain if global development
              will be a major focus.” David Reinstein asked for a fork centered on that question. Codex drafted the page,
              checked the cited official sources, and marked the resulting text as preliminary. <ProvenanceTip ids={["jessica-fork", "ai-draft"]} />
            </p>
          </details>
        </section>

        <section id="sources" className="section">
          <ReportSection eyebrow="Primary and partner sources" title="Evidence used for this update">
            <p>
              Announcement pages are good evidence about commitments and stated program design. They are weaker evidence
              about eventual disbursement, additionality, implementation quality, and impact.
            </p>
          </ReportSection>
          <div className="source-list">
            {sources.filter((source) => globalSourceIds.has(source.id)).map((source) => (
              <SourceNote source={source} key={source.id} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Suggest corrections through the Hypothes.is panel at the top.</p>
        <p>
          <a href="/">Back to the AIS/EA philanthropy memo</a>. This remains outside GitBook navigation.
        </p>
        <p>
          <a href="https://projects.davidreinstein.org/">More projects by David Reinstein</a>
        </p>
      </footer>
    </div>
  );
}
