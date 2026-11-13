import { report } from "../content/report";
import { offeringSummary } from "../content/anthropicIpo";
import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

export function ExecutiveSummary() {
  return (
    <article className="summary-panel">
      <p className="kicker">Executive summary</p>
      <h2>
        The model focuses on philanthropic conversion. <ProvenanceTip ids={["ai-draft", "david-model-framing", "evidence-nov-13"]} />
      </h2>
      <p>
        The practical question is how much money reaches particular organizations, for particular purposes, on a useful
        timetable. {offeringSummary} <CitationTip ids={["anthropic-roadshow-nov10", "anthropic-prospectus-nov10"]} /> OpenAI's nonprofit Foundation controls a large equity stake and
        expects to invest at least $1 billion over the next year across several broad programs{" "}
        <CitationTip ids={["openai-foundation-structure", "openai-foundation-2026"]} />.
      </p>
      <blockquote>{report.coreSteelman}</blockquote>
      <p>
        Recent announcements strengthen the case that a broad AI-philanthropy wave has begun: Anthropic and the Gates
        Foundation announced a $200 million partnership, and Anthropic's SEC filing discloses the initial share contribution
        to its company-owned Public Benefit Fund. OpenAI and Gates committed $50 million to African
        primary care, while OpenAI's Foundation has announced substantial health, community, and smallholder-farmer
        programs. <CitationTip ids={["anthropic-public-benefit-fund", "anthropic-gates", "openai-horizon-1000", "openai-people-first-2026", "openai-common-health-100m", "openai-smallholder-farmers-60m"]} />.
        They do much less to establish a
        fast, flexible flow to AIS/EA organizations. That narrower conversion remains the model's target. {" "}
        <ProvenanceTip ids={["evidence-nov-13"]} />
      </p>
      <p>
        Coefficient Giving's $1 billion 2026 commitment to GiveWell is a different kind of update. It shows an existing
        funder spending early and building capacity partly because it expects more future funding, while warning that
        the volatile-asset-based expectation may fail. This is meaningful evidence about ecosystem behavior, not a new
        AIS/EA model input. <CitationTip ids={["coefficient-givewell-1b", "givewell-scaling-1b"]} />
      </p>
    </article>
  );
}
