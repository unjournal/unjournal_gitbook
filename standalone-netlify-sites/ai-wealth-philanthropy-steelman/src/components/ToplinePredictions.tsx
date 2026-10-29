import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

export type ToplinePrediction = {
  outcome: string;
  value: string;
  note: string;
  evidenceIds?: string[];
};

export function ToplinePredictions({
  predictions,
  qualifier,
  compact = false,
  id = "topline-predictions"
}: {
  predictions: ToplinePrediction[];
  qualifier: string;
  compact?: boolean;
  id?: string;
}) {
  return (
    <div
      className={compact ? "topline-predictions topline-predictions--compact" : "topline-predictions"}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="topline-predictions__header">
        <div>
          <p className="kicker">Topline predictions</p>
          <h2 id={`${id}-title`}>What I would currently forecast</h2>
        </div>
        <p>
          {qualifier} <ProvenanceTip ids={["ai-draft", "david-orchestration", "evidence-oct-29"]} />
        </p>
      </div>
      <div className="topline-predictions__grid">
        {predictions.map((prediction) => (
          <article className="topline-prediction" key={prediction.outcome}>
            <strong>{prediction.value}</strong>
            <h3>{prediction.outcome}</h3>
            <p>
              {prediction.note} {prediction.evidenceIds ? <CitationTip ids={prediction.evidenceIds} /> : null}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
