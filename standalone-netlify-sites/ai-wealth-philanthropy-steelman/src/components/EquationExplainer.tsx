import { FeedbackTip } from "./FeedbackTip";

const equations = [
  {
    title: "Deterministic founder flow",
    expression:
      "F = V_A x s_founder x pledge x realization x follow_through x AIS/EA_allocation x deployment_by_deadline",
    meaning:
      "Founder-linked giving starts from Anthropic realizable valuation, multiplies by founder ownership and pledge face value, then passes through liquidity, intent, cause-allocation, and timing gates."
  },
  {
    title: "Deterministic employee flow",
    expression: "E = employee_pool x realization x AIS/EA_allocation x deployment_by_deadline",
    meaning:
      "Employee-linked giving is modeled as an editable pool, then filtered through availability, cause choice, and timing."
  },
  {
    title: "Deterministic Public Benefit Fund flow",
    expression:
      "P = V_A x fund_equity x approval x realization x AIS/EA_allocation x deployment_by_deadline",
    meaning:
      "The new company-owned fund is modeled separately from founder and employee pledges. Its 5% equity share remains subject to approval, and its liquidity, cause allocation, and distribution schedule are unresolved."
  },
  {
    title: "Observed BOTEC output",
    expression: "Y_EV = min((F + E + P) x local_confidence_adjustment, near_term_deployment_cap)",
    meaning:
      "This is the result at the central inputs. With correlated uncertainty and a cap, it generally differs from the simulated mean. The local-confidence adjustment is an explicit ex-post correction; the cap represents deployment limits."
  },
  {
    title: "Correlated stochastic parameter",
    expression: "theta_i,d = transform(theta_i, beta_i · Z_d + epsilon_i,d)",
    meaning:
      "Each simulated parameter is a transformed central value. It moves with shared latent factors Z plus idiosyncratic noise epsilon, so the gates are not independent draws."
  },
  {
    title: "Shared latent factors",
    expression: "Z = {market, liquidity, donor_intent, grant_capacity, local_optimism, deployment_pressure}",
    meaning:
      "These are not directly observed. They stand for common causes that make several model inputs move together across a simulated world."
  },
  {
    title: "Anti-correlation channel",
    expression: "cap_d ∝ exp(+ grant_capacity + liquidity - urgency_tradeoff x deployment_pressure)",
    meaning:
      "Deployment pressure can raise deadline deployment rates while lowering responsible near-term capacity, representing a speed-versus-filtering tradeoff."
  },
  {
    title: "Simulated output",
    expression: "Y_d = min((F_d + E_d + P_d) x local_adjustment_d, cap_d)",
    meaning:
      "Each draw produces one possible disbursement amount. The displayed distribution summarizes the draws with percentiles and threshold probabilities."
  },
  {
    title: "Approval and boundary conditions",
    expression: "approval_d ∈ {0, 1}; share = 0 ⇒ flow = 0; uncertainty = 0 ⇒ central scenario",
    meaning: "The fund's approval is sampled as a yes/no event. Exact zero and 100% settings stay fixed. The market-collapse scenario reduces both founder equity and the employee pool; correlation controls preserve marginal variance. These are modeling choices, not observed frequencies."
  }
];

const factorRows = [
  {
    factor: "AI market level",
    positive: "Anthropic valuation, employee wealth, Public Benefit Fund value",
    negative: "Collapse risk falls when the factor is high",
    note: "High valuation worlds and employee-liquidity worlds are usually related."
  },
  {
    factor: "Liquidity plumbing",
    positive: "Founder, employee, and Public Benefit Fund realization and deployment timing",
    negative: "",
    note: "IPO timing, lockups, tax planning, and sale access tend to bind together."
  },
  {
    factor: "Donor intent and cause fit",
    positive: "Founder follow-through and founder, employee, and Public Benefit Fund cause allocation",
    negative: "Allocation can be diluted when market upside is broad-public-benefit oriented",
    note: "A sincere pledge does not independently settle cause allocation."
  },
  {
    factor: "Grantmaking capacity",
    positive: "Deployment rates, near-term deployment cap",
    negative: "",
    note: "More trusted grantmakers and recipient absorption move several downstream gates together."
  },
  {
    factor: "Local optimism / rumor bias",
    positive: "Local-confidence adjustment, some employee allocation",
    negative: "",
    note: "This captures information-selection and social-incentive concerns rather than a real funding gate."
  },
  {
    factor: "Deployment pressure",
    positive: "Deadline deployment rates",
    negative: "Responsible near-term deployment cap",
    note: "Urgency can increase speed while reducing careful filtering or fit."
  }
];

export function EquationExplainer() {
  return (
    <div className="equation-page">
      <div className="model-card">
        <p className="kicker">Equations and derivation</p>
        <h3>What the two model modes mean</h3>
        <p className="model-note">
          The deterministic model is the central-value equation. The correlated-uncertainty model wraps that same
          equation in shared latent factors. This is a structured uncertainty sketch, not a calibrated forecast.{" "}
          <FeedbackTip ids={["md-distributions", "dr-distributions-ev-calculator"]} />
        </p>
        <div className="equation-list">
          {equations.map((equation) => (
            <article className="equation-row" key={equation.title}>
              <h4>{equation.title}</h4>
              <code>{equation.expression}</code>
              <p>{equation.meaning}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="model-card">
        <p className="kicker">Correlation structure</p>
        <h3>How shared unobservables enter</h3>
        <div className="factor-table-wrap">
          <table className="factor-table">
            <thead>
              <tr>
                <th>Shared factor</th>
                <th>Moves up together</th>
                <th>Can move against</th>
                <th>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {factorRows.map((row) => (
                <tr key={row.factor}>
                  <td>{row.factor}</td>
                  <td>{row.positive}</td>
                  <td>{row.negative || "None in this sketch"}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
