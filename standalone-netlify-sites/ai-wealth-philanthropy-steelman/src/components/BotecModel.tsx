import { type FormEvent, useMemo, useState } from "react";
import { defaultModelInputs } from "../content/modelDefaults";
import { calculateModel, inputMeta, type ModelInputs, type ModelOutput } from "../utils/model";
import { formatBillions, formatInputValue } from "../utils/format";
import { UncertaintyChart } from "./UncertaintyChart";
import { CitationTip } from "./CitationTip";
import { FeedbackTip } from "./FeedbackTip";
import { CorrelatedUncertaintyModel } from "./CorrelatedUncertaintyModel";
import { EquationExplainer } from "./EquationExplainer";
import { defaultCorrelatedConfig, runCorrelatedSimulation } from "../utils/correlatedModel";

type ModelMode = "ev" | "correlated" | "equations";

export function BotecModel() {
  const [mode, setMode] = useState<ModelMode>("ev");
  const [inputs, setInputs] = useState<ModelInputs>(defaultModelInputs);

  return (
    <div className="model-tabs">
      <div className="segmented-control" aria-label="Model view">
        <button type="button" className={mode === "ev" ? "active" : ""} onClick={() => setMode("ev")}>
          Assumptions & result
        </button>
        <button type="button" className={mode === "correlated" ? "active" : ""} onClick={() => setMode("correlated")}>
          Correlated uncertainty
        </button>
        <button type="button" className={mode === "equations" ? "active" : ""} onClick={() => setMode("equations")}>
          Equations
        </button>
      </div>
      {mode === "ev" ? <ExpectedValueModel inputs={inputs} setInputs={setInputs} /> : null}
      {mode === "correlated" ? <CorrelatedUncertaintyModel inputs={inputs} /> : null}
      {mode === "equations" ? <EquationExplainer /> : null}
    </div>
  );
}

function ExpectedValueModel({ inputs, setInputs }: { inputs: ModelInputs; setInputs: React.Dispatch<React.SetStateAction<ModelInputs>> }) {
  const output = useMemo(() => calculateModel(inputs), [inputs]);
  const distribution = useMemo(() => runCorrelatedSimulation(inputs, defaultCorrelatedConfig).summary, [inputs]);
  const grouped = inputMeta.reduce<Record<string, typeof inputMeta>>((acc, meta) => {
    acc[meta.group] = [...(acc[meta.group] ?? []), meta];
    return acc;
  }, {});

  function updateInput(key: keyof ModelInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="model-grid">
      <div className="model-card model-card--inputs">
        <div className="model-header">
          <div>
            <p className="kicker">Editable assumptions</p>
            <h3>Conversion gates</h3>
          </div>
          <button className="button button--small" type="button" onClick={() => setInputs(defaultModelInputs)}>
            Reset
          </button>
        </div>
        <p className="model-note">
          Read these as sequential gates. Realization handles liquidity and legal availability; follow-through handles
          intent; allocation handles cause choice; deployment handles the timing of actual grants by the deadline. The
          defaults are editable stress-test assumptions, not forecasts with independent error terms.{" "}
          <FeedbackTip ids={["md-inline-citations", "md-distributions", "dr-distributions-ev-calculator"]} />
        </p>
        <div className="model-caveat">
          <p>
            <strong>The central-input calculation is one scenario.</strong> Its product of inputs need not equal the
            simulated mean or median. The distribution below uses these same edited assumptions; the uncertainty tab
            exposes the shared factors. Funding amounts refer to cash reaching recipient organizations by end-2027.{" "}
            <FeedbackTip ids={["md-distributions", "md-collapse-risk", "dr-distributions-ev-calculator", "dr-expost-adjustment"]} />
          </p>
        </div>
        {Object.entries(grouped).map(([group, metas], index) => (
          <details className="input-group" key={group} open={index === 0}>
            <summary>{group}</summary>
            <fieldset>
            <legend>{group}</legend>
            {metas.map((meta) => (
              <label className="range-row" key={meta.key}>
                <span className="range-label">
                  {meta.label}
                  {meta.evidenceIds ? <CitationTip ids={meta.evidenceIds} /> : null}
                  {meta.feedbackIds ? <FeedbackTip ids={meta.feedbackIds} /> : null}
                </span>
                <output>{formatInputValue(inputs[meta.key], meta.suffix)}</output>
                {meta.description ? <small className="input-description">{meta.description}</small> : null}
                <input
                  type="range"
                  min={meta.min}
                  max={meta.max}
                  step={meta.step}
                  value={inputs[meta.key]}
                  onChange={(event) => updateInput(meta.key, Number(event.target.value))}
                />
              </label>
            ))}
            </fieldset>
          </details>
        ))}
      </div>

      <aside className="model-card model-card--outputs">
        <p className="kicker">Modeled disbursement by end-2027</p>
        <div className="metric-list">
          <Metric label="Model median" value={formatBillions(distribution.p50)} prominent />
          <Metric label="80% model interval (P10–P90)" value={`${formatBillions(distribution.p10)}–${formatBillions(distribution.p90)}`} />
          <Metric label="Model probability of at least $1B" value={`${Math.round(distribution.probabilityOver1B * 100)}%`} />
          <Metric label="Anthropic founders" value={formatBillions(output.founderB)} />
          <Metric label="Anthropic employees" value={formatBillions(output.employeeB)} />
          <Metric label="Anthropic Public Benefit Fund" value={formatBillions(output.publicBenefitFundB)} />
          <Metric label="Raw modeled AIS/EA disbursement" value={formatBillions(output.rawTotalB)} prominent />
          <Metric
            label="After local-confidence adjustment"
            value={formatBillions(output.epistemicallyAdjustedRawTotalB)}
            prominent
          />
          <Metric label="Central-input scenario after cap" value={formatBillions(output.capacityAdjustedTotalB)} prominent />
        </div>
        <div className="equation">
          <code>min((founder flow + employee flow + Public Benefit Fund flow) x local-confidence adjustment, near-term deployment cap)</code>
        </div>
        <UncertaintyChart inputs={inputs} />
        <EstimateForm inputs={inputs} output={output} />
      </aside>
    </div>
  );
}

function Metric({ label, value, prominent = false }: { label: string; value: string; prominent?: boolean }) {
  return (
    <div className={prominent ? "metric metric--prominent" : "metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EstimateForm({ inputs, output }: { inputs: ModelInputs; output: ModelOutput }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new URLSearchParams();
    form.set("form-name", "estimate-submission");
    form.set("name", name);
    form.set("comment", comment);
    form.set("inputs_json", JSON.stringify(inputs));
    form.set("outputs_json", JSON.stringify(output));
    form.set("raw_total_b", output.rawTotalB.toFixed(3));
    form.set("capacity_adjusted_b", output.capacityAdjustedTotalB.toFixed(3));
    form.set("submitted_at", new Date().toISOString());

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString()
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="estimate-form" name="estimate-submission" method="POST" data-netlify="true" onSubmit={submitEstimate}>
      <input type="hidden" name="form-name" value="estimate-submission" />
      <input type="hidden" name="inputs_json" value={JSON.stringify(inputs)} />
      <input type="hidden" name="outputs_json" value={JSON.stringify(output)} />
      <input type="hidden" name="raw_total_b" value={output.rawTotalB.toFixed(3)} />
      <input type="hidden" name="capacity_adjusted_b" value={output.capacityAdjustedTotalB.toFixed(3)} />
      <p className="kicker">Submit your estimate</p>
      <p className="estimate-summary">
        Current capacity-adjusted estimate: <strong>{formatBillions(output.capacityAdjustedTotalB)}</strong>
      </p>
      <label>
        <span>Name or affiliation, optional</span>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name, org, or anonymous"
        />
      </label>
      <label>
        <span>Comment, optional</span>
        <textarea
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="What assumptions drive your estimate?"
          rows={4}
        />
      </label>
      <button className="button button--primary" type="submit" disabled={status === "submitting" || status === "success"}>
        {status === "submitting" ? "Submitting..." : status === "success" ? "Submitted" : "Submit estimate"}
      </button>
      {status === "success" ? <p className="form-status">Thanks. This estimate was submitted for aggregation.</p> : null}
      {status === "error" ? (
        <p className="form-status form-status--error">Submission failed. Please try again or annotate the page instead.</p>
      ) : null}
    </form>
  );
}
