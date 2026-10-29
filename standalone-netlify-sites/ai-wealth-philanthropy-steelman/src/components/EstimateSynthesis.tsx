import { submittedEstimates } from "../content/estimates";
import { defaultModelInputs } from "../content/modelDefaults";
import { calculateModel } from "../utils/model";
import { formatBillions } from "../utils/format";
import { ReportSection } from "./ReportSection";

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[midpoint];
  return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
}

export function EstimateSynthesis() {
  const totals = submittedEstimates.map((estimate) => estimate.capacityAdjustedB);
  const currentDefault = calculateModel(defaultModelInputs).capacityAdjustedTotalB;

  return (
    <section id="estimates" className="section">
      <ReportSection eyebrow="Reader estimates" title="Submitted estimates and synthesis">
        <p>
          The estimate form is working. This section tracks submitted model outputs and summarizes the emerging spread.
          The first submission arrived before the model deadline was revised from end-2026 to end-2027, so it is best
          read as evidence about a very short near-term timing case.
        </p>
      </ReportSection>

      <div className="estimate-synthesis-grid">
        <article className="estimate-summary-card">
          <p className="kicker">Aggregate so far</p>
          <dl className="estimate-stat-list">
            <div>
              <dt>Submissions received</dt>
              <dd>{submittedEstimates.length}</dd>
            </div>
            <div>
              <dt>Median submitted estimate</dt>
              <dd>{formatBillions(median(totals))}</dd>
            </div>
            <div>
              <dt>Current end-2027 default</dt>
              <dd>{formatBillions(currentDefault)}</dd>
            </div>
          </dl>
          <p>
            The initial submission is far below the current default mainly because it used a 0.5% deployment rate by the
            old end-2026 deadline. After Michael Dickens's timing objection, the main model now asks about disbursement
            by end-2027 instead.
          </p>
        </article>

        <div className="estimate-list">
          {submittedEstimates.map((estimate) => (
            <article className="submitted-estimate" key={estimate.id}>
              <div className="estimate-row-head">
                <div>
                  <p className="kicker">Submitted estimate</p>
                  <h3>{estimate.contributor}</h3>
                </div>
                <strong>{formatBillions(estimate.capacityAdjustedB)}</strong>
              </div>
              <p className="estimate-meta">
                Submitted {new Date(estimate.submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}.
                {" "}{estimate.source}
              </p>
              <p>{estimate.comment}</p>
              <p className="estimate-timing-note">{estimate.timingFrame}</p>
              <details>
                <summary>Show submitted inputs</summary>
                <dl className="input-pair-list">
                  {estimate.inputs.map((input) => (
                    <div key={input.label}>
                      <dt>{input.label}</dt>
                      <dd>{input.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
