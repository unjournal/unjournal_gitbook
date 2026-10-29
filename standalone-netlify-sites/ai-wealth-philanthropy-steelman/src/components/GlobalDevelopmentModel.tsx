import { useMemo, useState } from "react";
import { defaultModelInputs } from "../content/modelDefaults";
import { formatBillions, formatInputValue } from "../utils/format";
import {
  calculateGlobalDevelopmentModel,
  defaultGlobalDevelopmentInputs,
  type GlobalDevelopmentInputs
} from "../utils/globalDevelopmentModel";
import { calculateModel } from "../utils/model";
import { runGlobalDevelopmentSimulation } from "../utils/globalDevelopmentCorrelatedModel";
import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

type InputSpec = {
  key: keyof GlobalDevelopmentInputs;
  label: string;
  description: string;
  suffix: "B" | "%";
  min: number;
  max: number;
  step: number;
  group: string;
};

const inputSpecs: InputSpec[] = [
  {
    key: "namedProgramsGhdAllocationPct",
    label: "Named programs: GH&D share",
    description: "Subjective 70% central assumption for the mixed-scope $310M portfolio. The $200M partnership also covers U.S. and other work; no complete GH&D breakdown is public.",
    suffix: "%", min: 0, max: 100, step: 1, group: "Cause allocation"
  },
  {
    key: "founderGhdAllocationPct",
    label: "Founder GH&D allocation",
    description: "Share of followed-through founder philanthropy assigned to global health and development.",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    group: "Cause allocation"
  },
  {
    key: "employeeGhdAllocationPct",
    label: "Employee GH&D allocation",
    description: "Share of realized employee giving assigned to global health and development.",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    group: "Cause allocation"
  },
  {
    key: "publicBenefitFundGhdAllocationPct",
    label: "Public Benefit Fund GH&D allocation",
    description:
      "Share of the new Anthropic fund assigned to GH&D. No cause allocation has been announced, so this is a deliberately conservative judgmental input.",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    group: "Cause allocation"
  },
  {
    key: "openAiGhdAllocationPct",
    label: "Other OpenAI plan: GH&D allocation",
    description:
      "Share of an illustrative $790M residual envelope assigned to GH&D: $1B less $50M Horizon 1000, $60M farmer forecasting, and $100M U.S. health. This is an overlap-avoidance assumption, not a reconciled Foundation budget.",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    group: "Cause allocation"
  },
  {
    key: "founderDeploymentByEnd2027Pct",
    label: "Founder deployment by end-2027",
    description: "Share of the allocated founder pool actually paid out by the deadline.",
    suffix: "%",
    min: 0,
    max: 30,
    step: 0.5,
    group: "Timing"
  },
  {
    key: "employeeDeploymentByEnd2027Pct",
    label: "Employee deployment by end-2027",
    description: "Share of the allocated employee pool actually paid out by the deadline.",
    suffix: "%",
    min: 0,
    max: 40,
    step: 0.5,
    group: "Timing"
  },
  {
    key: "publicBenefitFundDeploymentByEnd2027Pct",
    label: "Public Benefit Fund paid by end-2027",
    description:
      "Share of the approved, realized, GH&D-allocated fund value actually paid out by the deadline. No schedule has been announced.",
    suffix: "%",
    min: 0,
    max: 40,
    step: 0.5,
    group: "Timing"
  },
  {
    key: "namedProgramsDeploymentByEnd2027Pct",
    label: "Named programs paid by end-2027",
    description: "Share of the multi-year $310M announced headline total deployed by the deadline.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Timing"
  },
  {
    key: "openAiDeploymentByEnd2027Pct",
    label: "Other OpenAI plan paid by end-2027",
    description: "Share of its GH&D-allocated, cash-equivalent amount deployed by the deadline.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Timing"
  },
  {
    key: "namedProgramsCashEquivalentPct",
    label: "Named programs cash-equivalent share",
    description: "Discount for model credits and technical support included in the announced totals.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Form and capacity"
  },
  {
    key: "publicBenefitFundRealizationPct",
    label: "Public Benefit Fund realization",
    description:
      "Share of paper equity value assumed to become available after stockholder approval, valuation changes, liquidity, lockups, and sale constraints. The displayed model separately assumes 90% approval.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Form and capacity"
  },
  {
    key: "openAiCashEquivalentPct",
    label: "Other OpenAI plan cash-equivalent share",
    description: "Discount for non-cash support and program spending that is not equivalent to recipient grants.",
    suffix: "%",
    min: 0,
    max: 100,
    step: 1,
    group: "Form and capacity"
  },
  {
    key: "nearTermDeploymentCapB",
    label: "GH&D near-term deployment cap",
    description: "A broader recipient ecosystem than the AIS/EA model, represented by a higher editable cap.",
    suffix: "B",
    min: 0.1,
    max: 30,
    step: 0.1,
    group: "Form and capacity"
  }
];

export function GlobalDevelopmentModel() {
  const [inputs, setInputs] = useState(defaultGlobalDevelopmentInputs);
  const output = useMemo(() => calculateGlobalDevelopmentModel(inputs), [inputs]);
  const summary = useMemo(() => runGlobalDevelopmentSimulation(inputs), [inputs]);
  const mainOutput = calculateModel(defaultModelInputs);
  const grouped = inputSpecs.reduce<Record<string, InputSpec[]>>((acc, spec) => {
    acc[spec.group] = [...(acc[spec.group] ?? []), spec];
    return acc;
  }, {});

  function updateInput(key: keyof GlobalDevelopmentInputs, value: number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  const pathwayRows = [
    {
      label: "Anthropic founders",
      formula: `${inputs.anthropicValuationB} x ${inputs.founderOwnershipPct}% x ${inputs.founderPledgePct}% x ${inputs.founderRealizationPct}% x ${inputs.founderFollowThroughPct}% x ${inputs.founderGhdAllocationPct}% x ${inputs.founderDeploymentByEnd2027Pct}%`,
      value: output.founderB
    },
    {
      label: "Anthropic employees",
      formula: `${inputs.employeeCommittedPoolB} x ${inputs.employeeRealizationPct}% x ${inputs.employeeGhdAllocationPct}% x ${inputs.employeeDeploymentByEnd2027Pct}%`,
      value: output.employeeB
    },
    {
      label: "Anthropic Public Benefit Fund",
      formula: `${inputs.anthropicValuationB} x ${inputs.publicBenefitFundEquityPct}% equity x ${inputs.publicBenefitFundApprovalPct}% approval x ${inputs.publicBenefitFundRealizationPct}% realized x ${inputs.publicBenefitFundGhdAllocationPct}% GH&D x ${inputs.publicBenefitFundDeploymentByEnd2027Pct}% by deadline`,
      value: output.publicBenefitFundB
    },
    {
      label: "Named $310M programs",
      formula: `${inputs.namedProgramsB} x ${inputs.namedProgramsGhdAllocationPct}% GH&D x ${inputs.namedProgramsCashEquivalentPct}% cash-equivalent x ${inputs.namedProgramsDeploymentByEnd2027Pct}% by deadline`,
      value: output.namedProgramsB
    },
    {
      label: "Other OpenAI Foundation plan",
      formula: `${inputs.openAiOtherPlanB} x ${inputs.openAiGhdAllocationPct}% GH&D x ${inputs.openAiCashEquivalentPct}% cash-equivalent x ${inputs.openAiDeploymentByEnd2027Pct}% by deadline`,
      value: output.openAiOtherB
    }
  ];

  return (
    <div className="global-model">
      <div className="model-grid model-grid--wide">
        <div className="model-card model-card--inputs">
          <div className="model-header">
            <div>
              <p className="kicker">Editable GH&amp;D assumptions</p>
              <h3>Allocation, form, and timing</h3>
            </div>
            <button className="button button--small" type="button" onClick={() => setInputs(defaultGlobalDevelopmentInputs)}>
              Reset
            </button>
          </div>
          <p className="model-note">
            The upstream Anthropic valuation, ownership, pledge, realization, and follow-through defaults match the main
            memo. The controls below expose the assumptions that differ for GH&amp;D.
          </p>
          {Object.entries(grouped).map(([group, specs], index) => (
            <details className="input-group" key={group} open={index === 0}>
              <summary>{group}</summary>
              <fieldset>
              <legend>{group}</legend>
              {specs.map((spec) => (
                <label className="range-row" key={spec.key}>
                  <span className="range-label">{spec.label}</span>
                  <output>{formatInputValue(inputs[spec.key], spec.suffix)}</output>
                  <small className="input-description">{spec.description}</small>
                  <input
                    type="range"
                    min={spec.min}
                    max={spec.max}
                    step={spec.step}
                    value={inputs[spec.key]}
                    onChange={(event) => updateInput(spec.key, Number(event.target.value))}
                  />
                </label>
              ))}
              </fieldset>
            </details>
          ))}
        </div>

        <aside className="model-card model-card--outputs">
          <p className="kicker">Modeled GH&amp;D disbursement by end-2027</p>
          <div className="metric-list">
            <div className="metric metric--prominent"><span>Model median</span><strong>{formatBillions(summary.p50)}</strong></div>
            <div className="metric"><span>80% model interval (P10–P90)</span><strong>{formatBillions(summary.p10)}–{formatBillions(summary.p90)}</strong></div>
            <div className="metric"><span>Model probability of at least $1B</span><strong>{Math.round(summary.probabilityOver1B * 100)}%</strong></div>
            {pathwayRows.map((row) => (
              <div className="metric" key={row.label}>
                <span>{row.label}</span>
                <strong>{formatBillions(row.value)}</strong>
              </div>
            ))}
            <div className="metric metric--prominent">
              <span>Central-input GH&amp;D scenario</span>
              <strong>{formatBillions(output.capacityAdjustedTotalB)}</strong>
            </div>
          </div>
          <div className="equation">
            <code>min(founder + employee + Public Benefit Fund + named programs + other OpenAI plan, GH&amp;D deployment cap)</code>
          </div>
          <p className="fine-print">
            This is a transparent assumption set, not a calibrated forecast. Announced program totals mix funding and
            in-kind support. A separate GH&amp;D-share input discounts mixed-scope programs. The illustrative OpenAI $790M residual removes the separately counted $50M Horizon 1000 and $60M
            smallholder-farmer programs, plus the U.S.-focused $100M Common Health Coalition commitment. The latter is
            not added to this GH&amp;D total. The $1B is a planning floor, and program overlap and donor shares are not fully disclosed; this residual is a scenario assumption, not an unspent-cash balance.{" "}
            <CitationTip ids={["anthropic-gates", "openai-horizon-1000", "openai-smallholder-farmers-60m", "openai-common-health-100m", "openai-foundation-2026"]} />
            <CitationTip ids={["anthropic-public-benefit-fund"]} />
            <ProvenanceTip ids={["ai-draft", "david-orchestration", "evidence-oct-29"]} />
          </p>
        </aside>
      </div>

      <div className="model-card model-card--full bridge-signal-card">
        <p className="kicker">Related evidence, excluded from the total</p>
        <h3>$1B of anticipatory GiveWell funding</h3>
        <p className="model-note">
          Coefficient Giving and Good Ventures increased their 2026 GiveWell allocation from $175M to $1B. This is a
          real commitment and a strong capacity signal. It is not added to the {formatBillions(output.capacityAdjustedTotalB)}{" "}
          central estimate because it uses incumbent funders' current resources; the link to future AI wealth is an
          expectation, not a realized transfer. <CitationTip ids={["coefficient-givewell-1b", "givewell-scaling-1b"]} />
        </p>
      </div>

      <div className="model-card model-card--full calculation-card">
        <p className="kicker">Calculation shown</p>
        <h3>How the current {formatBillions(output.capacityAdjustedTotalB)} is built</h3>
        <div className="calculation-table-wrap">
          <table className="calculation-table">
            <thead>
              <tr>
                <th>Pathway</th>
                <th>Current multiplication, in $B</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {pathwayRows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td><code>{row.formula}</code></td>
                  <td><strong>{formatBillions(row.value)}</strong></td>
                </tr>
              ))}
              <tr className="calculation-total">
                <td>Total after cap</td>
                <td><code>min({output.rawTotalB.toFixed(3)}, {inputs.nearTermDeploymentCapB})</code></td>
                <td><strong>{formatBillions(output.capacityAdjustedTotalB)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="model-card model-card--full comparison-card">
        <p className="kicker">Direct comparison</p>
        <h3>How this differs from the main AIS/EA calculation</h3>
        <div className="calculation-table-wrap">
          <table className="calculation-table comparison-table">
            <thead>
              <tr>
                <th>Model choice</th>
                <th>Main AIS/EA memo</th>
                <th>GH&amp;D fork</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anthropic founder allocation</td>
                <td>20% to AIS/EA</td>
                <td>{inputs.founderGhdAllocationPct}% to GH&amp;D</td>
              </tr>
              <tr>
                <td>Anthropic employee allocation</td>
                <td>50% to AIS/EA</td>
                <td>{inputs.employeeGhdAllocationPct}% to GH&amp;D</td>
              </tr>
              <tr>
                <td>Anthropic Public Benefit Fund</td>
                <td>10% to AIS/EA; 5% paid by end-2027</td>
                <td>{inputs.publicBenefitFundGhdAllocationPct}% to GH&amp;D; {inputs.publicBenefitFundDeploymentByEnd2027Pct}% paid by end-2027</td>
              </tr>
              <tr>
                <td>Named company/foundation programs</td>
                <td>Excluded as broad context</td>
                <td>Included after cash-equivalent and timing discounts</td>
              </tr>
              <tr>
                <td>OpenAI Foundation plan</td>
                <td>Excluded from the narrow conversion model</td>
                <td>Illustrative $790M residual included at {inputs.openAiGhdAllocationPct}% GH&amp;D allocation</td>
              </tr>
              <tr>
                <td>Coefficient-GiveWell $1B commitment</td>
                <td>Excluded from the narrow AIS/EA model</td>
                <td>Tracked as anticipatory bridge funding; excluded from the AI-linked total</td>
              </tr>
              <tr>
                <td>Near-term deployment cap</td>
                <td>$5B</td>
                <td>{formatInputValue(inputs.nearTermDeploymentCapB, "B")}</td>
              </tr>
              <tr className="calculation-total">
                <td>Central output by end-2027</td>
                <td>{formatBillions(mainOutput.capacityAdjustedTotalB)}</td>
                <td>{formatBillions(output.capacityAdjustedTotalB)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="fine-print">
          A lower central GH&amp;D output does not mean GH&amp;D has less recipient capacity. It mainly reflects lower
          assumed founder and employee cause shares. The Public Benefit Fund and named-program pathways partly offset that difference.
        </p>
      </div>
    </div>
  );
}
