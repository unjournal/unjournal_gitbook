import { useMemo, useState } from "react";
import { defaultModelInputs } from "../content/modelDefaults";
import type { ModelInputs } from "../utils/model";
import {
  defaultCorrelatedConfig,
  runCorrelatedSimulation,
  type CorrelatedConfig,
  type CorrelatedSimulation,
  type SimulationDraw
} from "../utils/correlatedModel";
import { formatBillions } from "../utils/format";
import { FeedbackTip } from "./FeedbackTip";

type ConfigKey = keyof CorrelatedConfig;

const controlGroups: Array<{
  title: string;
  controls: Array<{
    key: ConfigKey;
    label: string;
    description: string;
    min: number;
    max: number;
    step: number;
    suffix?: string;
  }>;
}> = [
  {
    title: "Model-wide uncertainty",
    controls: [
      {
        key: "uncertaintyScale",
        label: "Uncertainty scale",
        description: "Widens or narrows all stochastic perturbations around the current BOTEC defaults.",
        min: 0.3,
        max: 1.8,
        step: 0.05,
        suffix: "x"
      },
      {
        key: "seed",
        label: "Simulation seed",
        description: "Changes the deterministic pseudo-random draw set without changing the model structure.",
        min: 1,
        max: 99999,
        step: 1
      }
    ]
  },
  {
    title: "Positive shared factors",
    controls: [
      {
        key: "marketCoupling",
        label: "Market coupling",
        description: "How strongly valuation, employee wealth, and downside-collapse risk move together.",
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        key: "liquidityCoupling",
        label: "Liquidity coupling",
        description: "How strongly realization and fast deployment move with the same liquidity/plumbing state.",
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        key: "donorCoupling",
        label: "Donor-intent coupling",
        description: "How strongly follow-through and AIS/EA allocation move together.",
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        key: "capacityCoupling",
        label: "Capacity coupling",
        description: "How strongly deployment rates and the near-term deployment cap share one grantmaking bottleneck.",
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        key: "optimismCoupling",
        label: "Local-optimism coupling",
        description: "How strongly local confidence and employee cause allocation move with a shared social-information factor.",
        min: 0,
        max: 1,
        step: 0.05
      }
    ]
  },
  {
    title: "Anti-correlation",
    controls: [
      {
        key: "urgencyTradeoff",
        label: "Urgency-capacity tradeoff",
        description:
          "Higher values make deployment pressure raise deployment rates while lowering responsible deployment capacity.",
        min: 0,
        max: 1,
        step: 0.05
      }
    ]
  }
];

export function CorrelatedUncertaintyModel({ inputs = defaultModelInputs }: { inputs?: ModelInputs }) {
  const [config, setConfig] = useState<CorrelatedConfig>(defaultCorrelatedConfig);
  const simulation = useMemo(() => runCorrelatedSimulation(inputs, config), [inputs, config]);

  function updateConfig(key: ConfigKey, value: number) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="model-grid model-grid--wide">
      <div className="model-card model-card--inputs">
        <div className="model-header">
          <div>
            <p className="kicker">Correlated uncertainty</p>
            <h3>Shared unobservables</h3>
          </div>
          <button className="button button--small" type="button" onClick={() => setConfig(defaultCorrelatedConfig)}>
            Reset
          </button>
        </div>
        <p className="model-note">
          This mode treats your current calculator inputs as central values, then varies them through shared latent factors rather
          than independent sliders. The result is still a toy model, but it makes the main correlation assumptions
          explicit. <FeedbackTip ids={["md-distributions", "dr-distributions-ev-calculator"]} />
        </p>
        {controlGroups.map((group) => (
          <fieldset key={group.title}>
            <legend>{group.title}</legend>
            {group.controls.map((control) => (
              <label className="range-row" key={control.key}>
                <span className="range-label">{control.label}</span>
                <output>{formatControl(config[control.key], control.suffix)}</output>
                <small className="input-description">{control.description}</small>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={config[control.key]}
                  onChange={(event) => updateConfig(control.key, Number(event.target.value))}
                />
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <aside className="model-card model-card--outputs">
        <p className="kicker">Distribution of modeled disbursement</p>
        <div className="metric-list">
          <Metric label="Median" value={formatBillions(simulation.summary.p50)} prominent />
          <Metric label="Mean" value={formatBillions(simulation.summary.mean)} />
          <Metric label="80% model interval (P10–P90)" value={`${formatBillions(simulation.summary.p10)} to ${formatBillions(simulation.summary.p90)}`} />
          <Metric label="P(>= $1B)" value={formatPercent(simulation.summary.probabilityOver1B)} prominent />
          <Metric label="P(>= $5B)" value={formatPercent(simulation.summary.probabilityOver5B)} prominent />
        </div>
        <DistributionChart draws={simulation.draws} />
      </aside>

      <div className="model-card model-card--full">
        <p className="kicker">Latent-factor diagnostics</p>
        <h3>Which shared factors move the simulated result?</h3>
        <div className="latent-grid">
          {simulation.latentSummaries.map((latent) => (
            <article className="latent-card" key={latent.key}>
              <div className="latent-card__top">
                <h4>{latent.label}</h4>
                <span>{formatSigned(latent.correlationWithTotal)}</span>
              </div>
              <p>{latent.description}</p>
              <small>{latent.effect}</small>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function DistributionChart({ draws }: { draws: SimulationDraw[] }) {
  const bins = useMemo(() => {
    const capped = draws.map((draw) => Math.min(draw.totalB, 25));
    const max = 25;
    const count = 18;
    const buckets = Array.from({ length: count }, (_, index) => ({
      label: index === count - 1 ? "25+" : `${Math.round((index / count) * max)}`,
      value: 0
    }));
    for (const value of capped) {
      const index = Math.min(count - 1, Math.floor((value / max) * count));
      buckets[index].value += 1;
    }
    const maxBucket = Math.max(...buckets.map((bucket) => bucket.value), 1);
    return buckets.map((bucket) => ({ ...bucket, pct: bucket.value / maxBucket }));
  }, [draws]);

  return (
    <div className="distribution-chart" aria-label="Histogram of simulated deployment outcomes">
      <div className="distribution-bars">
        {bins.map((bin, index) => (
          <span key={`${bin.label}-${index}`} style={{ height: `${Math.max(3, bin.pct * 100)}%` }} />
        ))}
      </div>
      <div className="distribution-axis">
        <span>$0B</span>
        <span>$25B+</span>
      </div>
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

function formatControl(value: number, suffix?: string) {
  if (suffix === "x") return `${value.toFixed(2)}x`;
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2);
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function formatSigned(value: number) {
  const rounded = value.toFixed(2);
  return value > 0 ? `+${rounded}` : rounded;
}
