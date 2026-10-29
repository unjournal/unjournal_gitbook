import { useEffect, useMemo, useState } from "react";
import { FeedbackFold } from "./components/FeedbackFold";
import { NewsSection } from "./components/NewsSection";
import { ProvenanceTip } from "./components/ProvenanceTip";
import { SiteNavigation } from "./components/SiteNavigation";
import { TrackerPanel } from "./components/TrackerPanel";
import { animalWelfareEvidence, animalWelfareForecastTarget, animalWelfarePublishedScenarios, animalWelfareReviewDate } from "./content/animalWelfare";
import {
  animalWelfareInputGroups,
  animalWelfareScenarios,
  calculateAnimalWelfareModel,
  defaultAnimalWelfareInputs,
  formatAnimalWelfareMoney as money,
  runAnimalWelfareSimulation,
  type AnimalWelfareInputs,
  type AnimalWelfareSimulation
} from "./utils/animalWelfareModel";
import { installHashNavigation } from "./utils/hashNavigation";
import "./animal-welfare.css";

function initialInputs(): AnimalWelfareInputs {
  try {
    const encoded = new URLSearchParams(window.location.search).get("aw");
    if (!encoded) return { ...defaultAnimalWelfareInputs };
    const candidate: unknown = JSON.parse(encoded);
    if (!candidate || typeof candidate !== "object") return { ...defaultAnimalWelfareInputs };
    const next = { ...defaultAnimalWelfareInputs };
    for (const spec of animalWelfareInputGroups.flatMap((group) => group.specs)) {
      const value = (candidate as Record<string, unknown>)[spec.key];
      if (typeof value === "number" && Number.isFinite(value)) next[spec.key] = Math.max(0, Math.min(spec.max, value));
    }
    return next;
  } catch {
    return { ...defaultAnimalWelfareInputs };
  }
}

export default function AnimalWelfareApp() {
  useEffect(() => {
    document.title = "AI wealth and animal-welfare funding: an exploratory model";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Compare illustrative scenarios for AI-linked animal-welfare cash by end-2027. No central forecast is adopted; allocation, timing, and pooled-giving assumptions remain uncertain.");
    return installHashNavigation();
  }, []);

  return (
    <div className="page-shell animal-welfare-page">
      <SiteNavigation brand="AI wealth and animal welfare" home="/animal-welfare/" groups={[
        { label: "Model", links: [{ label: "Compare published scenarios", href: "#aw-scenarios" }, { label: "Change assumptions", href: "#aw-model" }, { label: "Scenarios and sensitivity", href: "#aw-sensitivity" }, { label: "Equations and uncertainty", href: "#aw-method" }] },
        { label: "Read the evidence", links: [{ label: "Current read", href: "#current-read" }, { label: "Other models and research", href: "#aw-research" }, { label: "What counts", href: "#aw-scope" }, { label: "What would change the estimate", href: "#aw-update-triggers" }] }
      ]} />
      <main>
        <FeedbackFold />
        <section className="hero aw-hero">
          <div className="hero-copy">
            <p className="kicker">Animal-welfare fork · exploratory scenarios</p>
            <h1>How much new AI wealth might reach animals by end-2027?</h1>
            <p className="subtitle">AI-linked animal giving is already reported, but its scale by end-2027 remains weakly constrained. Compare assumptions here; no central funding forecast is adopted.</p>
          </div>
          <div className="hero-details">
            <div className="meta-row"><span>Evidence and model reviewed {animalWelfareReviewDate}</span><span>Preliminary, largely AI-generated</span></div>
            <p className="author-note">Orchestrated by David Reinstein. Built and reviewed with Codex, public sources, and comparisons with other models. Its allocation probabilities remain subjective judgments, with no donor elicitation or statistical calibration. <ProvenanceTip ids={["ai-draft", "david-orchestration"]} /></p>
            <div className="hero-actions"><a className="button button--primary" href="#aw-scenarios">Compare scenarios</a><a className="button" href="#aw-model">Change the assumptions</a><a className="button" href="#tracker">Tracker and history</a><a className="button" href="/">AIS/EA memo</a><a className="button" href="/global-development/">Global-development memo</a></div>
          </div>
        </section>

        <NewsSection scope="animal-welfare" />
        <PublishedScenarioComparison />
        <TrackerPanel scope="animal-welfare" />

        <section id="current-read" className="section section--narrow">
          <p className="kicker">Current read</p>
          <h2>There is a real giving pathway, but its near-term scale is uncertain.</h2>
          <p>Anthropic's public IPO filing makes liquidity more concrete. Its founders' equity pledges, employee matching, and proposed Public Benefit Fund could create substantial giving capacity. The announcements reviewed here establish neither an animal-welfare share nor a timetable for cash gifts. <a href="https://www.anthropic.com/news/s1-sec">IPO announcement</a>; <a href="https://www.anthropic.com/news/public-benefit-fund">fund and pledges</a>.</p>
          <p><a href="https://farmanimalwelfare.substack.com/p/the-ai-windfall">Bollard's August account</a> supports expecting further personal animal giving. It does not identify future cash from our narrower donor pool. The 65% and 85% giving gates, and 2% and 5% animal shares, are illustrative judgments. The available sources do not identify one combination as a better-calibrated forecast.</p>
          <p>The OpenAI Foundation has announced substantial programs focused on people, health, jobs, and AI resilience. That is evidence about its current priorities. An animal-welfare path remains possible, but this model gives it a separate, low uptake probability rather than assigning animals a fixed share of all Foundation assets. <a href="https://openai.com/index/update-on-the-openai-foundation/">Foundation plan</a>.</p>
          <p>Established animal grantmakers provide credible routes for giving. Their existence tells us little about how much new AI wealth will reach them. The model therefore leaves Coefficient Giving, EA Funds, and ACE's existing funding outside the new-wealth total. It also lacks a separate estimate for OpenAI individuals and other AI-company donors; it is not a whole-sector forecast.</p>
        </section>

        <AnimalWelfareCalculator />

        <section id="aw-research" className="section section--narrow">
          <p className="kicker">Other models and research</p>
          <h2>What the evidence changes, and what it leaves open.</h2>
          <p>Reports of existing giving support a live funding pathway. External allocation models suggest useful scenarios. Neither supplies a donor-matched estimate of recipient cash by end-2027. A several-fold difference between scenarios can come from subjective assumptions and the pooled giving gate, without a new donation or liquidity event.</p>
          <details className="aw-disclosure"><summary>Metaculus: allocation weights, with a different donor pool and deadline</summary>
            <p>The <a href="https://radiant.metaculus.com/projects/e80a5e79-b71f-4c4b-bf4a-821497fedcee">public cause-area map</a> covers individuals at both labs through end-2031. Its animal weight has raw P10/P50/P90 values of 1.87/5.93/17.3 percentage points, from three predictions by two people when inspected. Every draw is normalized against the other causes. Those raw values are not percentiles of the final animal share.</p>
            <p>The 5% scenario is informed by this comparison, but the map does not establish that 5% is better calibrated than 2% for our pool and deadline. The <a href="https://metaculus.substack.com/p/ai-ipo-windfall-forecasting-funding-cause-area-biosecurity-ai-safety-risk">authors explain</a> that these cause forecasts are not directly resolvable. Agreement between model outputs and strategy essays does not supply independent observations of donors' allocations. We do not convert their end-2031 dollars into annual installments.</p>
          </details>
          <details className="aw-disclosure"><summary>Donor preferences are not dollar-weighted giving</summary>
            <p>The <a href="https://forum.effectivealtruism.org/posts/CKwDgZGLipchAoxtN/ea-survey-2024-cause-prioritization">2024 EA Survey</a> puts preferred animal-focused resources around 24% on average. Its respondents are not a representative sample of AI shareholders, and preferences are not cash transfers. A 24% setting is available in the sensitivity table as a deliberately high-allocation test, without an assigned probability.</p>
          </details>
          <details className="aw-disclosure"><summary>Capacity, lockups, and the difference between cash and impact</summary>
            <p><a href="https://frontieranimals.substack.com/p/the-san-francisco-strategy-for-animal">Weinstock's strategy</a> calls for a $1B capacity buildout. Its spring-2027 timeline depends on IPO and lockup assumptions, not established sale terms. <a href="https://rethinkpriorities.org/research-area/wild-animal-welfare-rfmf/">RP's wild-animal report</a> instead lists self-reported 2027 room for funding of $3.16M–$8.23M for the organizations covered. Neither measures the entire animal movement's capacity.</p>
            <p>The 5% personal payout center is also a judgment, not an established disbursement rate. Delay and weaker allocation can lower the scenario sharply. No measured all-animal cash ceiling is available. Cash can exceed what grantees spend effectively within the window. Large upper-tail outcomes require donor follow-through and recipient readiness, not merely an IPO.</p>
          </details>
          <details className="aw-disclosure"><summary>How the pooled gate changes the median</summary><p>Holding the 2% animal-share setting fixed, changing only the personal gate from 65% to 85% moves the total median from about $34M to $67M, while the mean rises about 17%. The median responds to how often the entire personal channel is zero. It is not simply a forecast of larger gifts from each donor.</p><p>Different founders, employees, and matched gifts can arrive at different times. One binary gate for their aggregate is an unvalidated simplification. We expose that dependence rather than inventing donor counts, ownership weights, or new gate probabilities. A donor-specific model needs better evidence.</p></details>
          <p><a href="https://github.com/unjournal/unjournal_gitbook/blob/main/standalone-netlify-sites/ai-wealth-philanthropy-steelman/research/animal-welfare-2026-10-29/quantitative-model-diagnostics-REPORT.md">Reproducible diagnostics and review decisions</a> cover input provenance, joint sweeps, channel shutoffs, and distribution choices. They check computation and sensitivity, not whether the assumptions are true or the interval has calibrated coverage.</p>
        </section>

        <section id="aw-scope" className="section section--narrow">
          <p className="kicker">What counts</p>
          <h2>Cash reaching animal-focused work, with each transfer counted once.</h2>
          <p>{animalWelfareForecastTarget}. Scope includes farmed and aquatic animals, neglected invertebrates, wild-animal welfare, and research or advocacy with an explicit path to improving animals' lives. It includes charitable alternatives-to-animal-products work where animal welfare is the purpose.</p>
          <details className="aw-disclosure"><summary>Boundary choices and double counting</summary>
            <ul>
              <li>Shares held by a foundation or donor-advised fund remain financial capacity until cash reaches an implementing or research recipient. A regranting intermediary and its subsequent grant count as one flow.</li>
              <li>The approximate personal/matching equity pool excludes the proposed 5% corporate fund stake. Company matching is already inside that pool; the founder 80% pledge is not added again.</li>
              <li>Incumbent funders' existing grants and spending brought forward in expectation of AI wealth are context. Only a separately attributable new AI-wealth contribution belongs in this total.</li>
              <li>Commercial investments in alternative proteins, product discounts, model credits, and conservation justified only by ecosystem benefits are outside this version. Companion-animal shelter funding is outside its intended effective-animal-advocacy scope.</li>
              <li>This is gross funding, not counterfactual additionality or welfare impact. Substitution for other donors, grants that replace planned spending, and ineffective interventions can make additional benefit much smaller.</li>
            </ul>
          </details>
        </section>

        <section id="aw-update-triggers" className="section section--narrow">
          <p className="kicker">Useful next evidence</p>
          <h2>An animal allocation or a recipient cash report would matter more than another headline valuation.</h2>
          <p>The most informative updates would be itemized post-review animal-welfare gifts from this donor pool, donors' stated animal allocations, the fund's approved governance and payout terms, verified liquidity and sale constraints, or recipient cash reports. Broad reports of earlier AI-donor giving help establish interest but cannot fill this prospective ledger. A public share offering can improve liquidity while leaving cause choice unresolved.</p>
          <p>As the deadline approaches, review the absence of these signals as well as positive announcements. Any change should explain its connection to the remaining time; this first version uses no automatic weekly decay.</p>
        </section>

        <section id="sources" className="section">
          <p className="kicker">Primary sources, models, and their limits</p>
          <h2>Evidence reviewed on {animalWelfareReviewDate}</h2>
          <div className="aw-evidence-grid">{animalWelfareEvidence.map((source) => <article className="aw-evidence" key={source.id} id={source.id}>
            <h3><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></h3>
            <p className="aw-source-date">Event/publication: {source.eventDate}. Accessed {source.accessed}.</p>
            <p>{source.finding}</p><p><strong>Model implication:</strong> {source.implication}</p>
          </article>)}</div>
        </section>
      </main>
      <footer className="footer"><p>Preliminary model, built with AI assistance and public sources. <a href="/">AIS/EA memo</a> · <a href="/global-development/">Global health &amp; development</a> · <a href="/model-comparison/">Model comparison</a> · <a href="https://unjournal.org">The Unjournal</a></p></footer>
    </div>
  );
}

function PublishedScenarioComparison() {
  return <section id="aw-scenarios" className="section section--narrow">
    <p className="kicker">Compare assumptions</p><h2>Two published scenarios; neither is an adopted best estimate.</h2>
    <div className="aw-comparison-grid">{animalWelfarePublishedScenarios.map(scenario => <article className="aw-evidence" key={scenario.id}>
      <h3>{scenario.label}</h3><p>Personal pooled-giving gate: {scenario.personalAwUptakePct}%. Animal-share setting: {scenario.personalAwAllocationPct}%. Other inputs are the same.</p>
      <p className="aw-scenario-value">{money(scenario.medianB)} <span>scenario median</span></p>
      <p>Within-scenario 80% model interval (P10–P90): <strong>{money(scenario.low80B)}–{money(scenario.high80B)}</strong>.</p>
      <a href={`/animal-welfare/?${new URLSearchParams({ aw: JSON.stringify({ personalAwUptakePct: scenario.personalAwUptakePct, personalAwAllocationPct: scenario.personalAwAllocationPct }) })}#aw-model`}>Edit the {scenario.personalAwAllocationPct}% allocation scenario</a>
    </article>)}</div>
    <p>These are not lower and upper bounds on a single forecast. No weights or midpoint are assigned. The intervals describe uncertainty inside each chosen model; they do not establish an 80% probability that real funding falls in either range.</p>
  </section>;
}

function AnimalWelfareCalculator() {
  const [inputs, setInputs] = useState<AnimalWelfareInputs>(initialInputs);
  const [showSensitivity, setShowSensitivity] = useState(false);
  const simulation = useMemo(() => runAnimalWelfareSimulation(inputs), [inputs]);
  const weighted = useMemo(() => calculateAnimalWelfareModel(inputs), [inputs]);
  const sensitivity = useMemo(() => showSensitivity ? [
    { label: "Current settings", inputs },
    { label: "Half the conditional animal shares", inputs: { ...inputs, personalAwAllocationPct: inputs.personalAwAllocationPct / 2, publicFundAwAllocationPct: inputs.publicFundAwAllocationPct / 2, openAiAwAllocationPct: inputs.openAiAwAllocationPct / 2 } },
    { label: "Half the Anthropic payout rates", inputs: { ...inputs, personalPaidByEnd2027Pct: inputs.personalPaidByEnd2027Pct / 2, publicFundPaidByEnd2027Pct: inputs.publicFundPaidByEnd2027Pct / 2 } },
    { label: "Half the Anthropic paper value", inputs: { ...inputs, anthropicValuationB: inputs.anthropicValuationB / 2 } },
    { label: "Personal pooled gate set to 65% (other inputs fixed)", inputs: { ...inputs, personalAwUptakePct: 65 } },
    { label: "Personal pooled gate always open (structural stress test)", inputs: { ...inputs, personalAwUptakePct: 100 } },
    { label: "Slower personal cash (2%), weaker animal share (2%), uptake 65%", inputs: { ...inputs, personalPaidByEnd2027Pct: 2, personalAwAllocationPct: 2, personalAwUptakePct: 65 } },
    { label: "24% personal animal share (EA preference stress test)", inputs: { ...inputs, personalAwAllocationPct: 24 } },
    { label: "No institutional animal allocation", inputs: { ...inputs, publicFundAwUptakePct: 0, openAiAwUptakePct: 0 } }
  ].map((row) => ({ label: row.label, summary: runAnimalWelfareSimulation(row.inputs) })) : [], [inputs, showSensitivity]);
  const shareHref = `/animal-welfare/?${new URLSearchParams({ aw: JSON.stringify(inputs) }).toString()}#aw-model`;
  const percentage = (value: number) => `${Math.round(value * 100)}%`;

  return <section id="aw-model" className="section aw-calculator">
    <div className="section-heading"><div><p className="kicker">Editable scenario</p><h2>Animal-welfare funding by end-2027</h2></div><p>Without shared settings, the editor starts with the higher-allocation reference. Neither published parameter set is an endorsed best estimate. Change the assumptions or compare the alternatives above.</p></div>
    <div className="aw-scenarios" aria-label="Animal-welfare scenarios">{animalWelfareScenarios.map((scenario) => <button type="button" className="button" key={scenario.name} onClick={() => setInputs({ ...scenario.inputs })} title={scenario.description}>{scenario.name}</button>)}<a className="button" href={shareHref}>Link to these settings</a></div>
    <div className="tracker-metrics aw-live-results" aria-live="polite" aria-atomic="true">
      <article className="tracker-metric tracker-metric--primary"><span>Current-scenario median</span><strong>{money(simulation.medianB)}</strong><p>Within-scenario 80% model interval: {money(simulation.low80B)}–{money(simulation.high80B)}.</p></article>
      <article className="tracker-metric"><span>Model draws reaching at least $100M</span><strong>{percentage(simulation.probabilityAtLeast100M)}</strong><p>{percentage(simulation.probabilityAtLeast10M)} reach at least $10M. Conditional on these assumptions.</p></article>
      <article className="tracker-metric"><span>Model draws with zero animal funding</span><strong>{percentage(simulation.probabilityZero)}</strong><p>Depends on the assumed pooled giving gates.</p></article>
    </div>
    <IntervalChart summary={simulation} />
    <p className="aw-model-note">The mean is {money(simulation.meanB)}; the upper tail can pull it above the median. {simulation.medianGivenPersonalGivingB === null ? "No draw has positive personal-channel giving under these settings." : <>Among draws with positive personal-channel giving, the total median is {money(simulation.medianGivenPersonalGivingB)}. This conditional statistic excludes the no-personal-giving cases; it is not a separate forecast.</>} Percentiles and draw fractions are model outputs, not validated real-world probabilities. Editing changes only your scenario.</p>

    <div className="aw-input-groups">{animalWelfareInputGroups.map((group, index) => <details className="aw-input-group" open={index === 0} key={group.title}>
      <summary>{group.title}</summary>
      <div className="aw-controls">{group.specs.map((spec) => <label className="aw-control" key={spec.key}>
        <span className="aw-control-heading"><strong>{spec.label}</strong><span className={`aw-anchor aw-anchor--${spec.anchor === "Source anchor" ? "source" : "judgment"}`}>{spec.anchor}</span></span>
        <span className="aw-control-description" id={`aw-help-${spec.key}`}>{spec.description}</span>
        <span className="aw-input-row"><input aria-label={`${spec.label} slider`} type="range" min="0" max={spec.max} step={spec.step} value={inputs[spec.key]} aria-describedby={`aw-help-${spec.key}`} onChange={(event) => setInputs((current) => ({ ...current, [spec.key]: Number(event.target.value) }))} /><input aria-label={spec.label} type="number" min="0" max={spec.max} step={spec.step} value={inputs[spec.key]} aria-describedby={`aw-help-${spec.key}`} onChange={(event) => setInputs((current) => ({ ...current, [spec.key]: Math.max(0, Math.min(spec.max, Number(event.target.value))) }))} /><span>{spec.unit}</span></span>
      </label>)}</div>
    </details>)}</div>

    <details id="aw-sensitivity" className="aw-disclosure" open={showSensitivity} onToggle={(event) => setShowSensitivity(event.currentTarget.open)}><summary>What drives the result?</summary>
      <p>Reusing 20,000 seeded worlds. Changes are one at a time unless the row names a joint scenario. The 24% preference case is not an observed donor allocation. This is sensitivity to assumptions, not a ranking of evidence quality.</p>
      <div className="table-wrap"><table className="aw-sensitivity-table"><caption>Animal-welfare scenario sensitivity</caption><colgroup><col style={{ width: "48%" }} /><col style={{ width: "19%" }} /><col style={{ width: "33%" }} /></colgroup><thead><tr><th>Change</th><th>Median</th><th>80% model interval</th></tr></thead><tbody>{sensitivity.map((row) => <tr key={row.label}><td>{row.label}</td><td>{money(row.summary.medianB)}</td><td>{money(row.summary.low80B)}–{money(row.summary.high80B)}</td></tr>)}</tbody></table></div>
    </details>

    <details id="aw-method" className="aw-disclosure"><summary>Equations, distribution choices, and limitations</summary>
      <p><strong>Individuals and matching:</strong> valuation × approximate pledged equity share × realization × payout by end-2027 × animal share, conditional on the animal-allocation event.</p>
      <p><strong>Public Benefit Fund:</strong> valuation × fund stake × approval event × realization × payout by end-2027 × animal share, conditional on its own animal-allocation event.</p>
      <p><strong>OpenAI Foundation:</strong> prospective program envelope × cash paid × animal share, conditional on its own animal-allocation event. The full Foundation equity stake is not separately added.</p>
      <div className="table-wrap"><table><caption>Plug-in weighted calculation at current inputs (not the simulation median)</caption><thead><tr><th>Pathway</th><th>Weighted amount</th></tr></thead><tbody><tr><td>Anthropic individual/matched pool</td><td>{money(weighted.personalB)}</td></tr><tr><td>Anthropic Public Benefit Fund</td><td>{money(weighted.publicFundB)}</td></tr><tr><td>OpenAI Foundation</td><td>{money(weighted.openAiFoundationB)}</td></tr><tr><th>Total</th><td>{money(weighted.totalB)}</td></tr></tbody></table></div>
      <p>The display uses {simulation.draws.toLocaleString()} Monte Carlo draws with seed {simulation.seed}. Valuation has log-scale standard deviation 0.6; the prospective Foundation envelope uses 0.5. Percentage uncertainty is applied on log odds, preserving exact 0% and 100% inputs. Realization has log-odds spread 0.7, personal payout 1.0, institutional payout and animal shares 1.2, and Foundation cash conversion 0.6. These widths are subjective and have not been fitted to data.</p>
      <p>Anthropic pathways share valuation and liquidity shocks. Cause-choice events share a separate latent shock (pairwise latent correlation 0.36); favorable animal-choice worlds also tend to have larger conditional animal shares. The personal hurdle refers to any new cash from the entire pool, not a proportion of individual donors. Pooling founders, employees, and matching is a simplification: a few early gifts can coexist with delayed large pledges. The model does not reconstruct individual portfolios or general-equilibrium effects. Simultaneous upside in other causes could reduce animal allocation; that tradeoff remains inside uncertain animal shares rather than an explicit multi-cause budget.</p>
      <p>The 5% animal-share setting locates its uncertain distribution before the uptake gate is applied. Because favorable cause-choice worlds also have larger shares, the simulated share among worlds that fund animals can have a higher median. The weighted product above does not capture that selection effect.</p>
      <p>The model omits unknown AI-linked donors, future new programs, public-fund milestone top-ups, and induced changes in other funders. It applies no arbitrary absorption cap. Very large tail outcomes require unusually fast giving and substantial recipient capacity. Amounts are nominal dollars and measure funding, not animals helped.</p>
    </details>
  </section>;
}

function IntervalChart({ summary }: { summary: AnimalWelfareSimulation }) {
  const width = 760;
  const left = 50;
  const right = 710;
  const ceiling = Math.max(summary.high80B * 1.12, 0.001);
  const x = (value: number) => left + (value / ceiling) * (right - left);
  const low = x(summary.low80B);
  const high = x(summary.high80B);
  return <figure className="tracker-chart aw-interval-chart">
    <figcaption><strong>Animal Welfare: scenario median and within-model 80% interval</strong><span>Cash reaching recipients by 31 December 2027</span></figcaption>
    <div className="chart-legend"><span><i className="chart-legend__line" aria-hidden="true" />Median</span><span><i className="chart-legend__band" aria-hidden="true" />80% model interval (P10–P90)</span></div>
    <svg viewBox={`0 0 ${width} 170`} role="img" aria-label={`Illustrative Animal Welfare scenario, not an adopted forecast: median ${money(summary.medianB)}, within-model 80 percent interval ${money(summary.low80B)} to ${money(summary.high80B)}. The interval is from the 10th to 90th percentile of simulated draws.`}>
      <line x1={left} x2={right} y1="100" y2="100" stroke="#94a3b8" />
      <rect x={low} y="48" width={Math.max(0, high - low)} height="52" fill="#8fbfb0" fillOpacity="0.35" />
      <line x1={low} x2={high} y1="74" y2="74" stroke="#216b58" strokeWidth="3" />
      {[{ value: summary.low80B, label: "P10", anchor: "start" }, { value: summary.high80B, label: "P90", anchor: "end" }].map((bound) => <g key={bound.label}><line x1={x(bound.value)} x2={x(bound.value)} y1="40" y2="108" stroke="#216b58" strokeWidth="2" strokeDasharray="5 4" /><line x1={x(bound.value) - 7} x2={x(bound.value) + 7} y1="74" y2="74" stroke="#216b58" strokeWidth="3" /><text x={x(bound.value)} y={summary.high80B === 0 && bound.label === "P90" ? 157 : 28} textAnchor={summary.high80B === 0 ? "start" : bound.anchor as "start" | "end"} fill="#334155">{bound.label}: {money(bound.value)}</text></g>)}
      <circle cx={x(summary.medianB)} cy="74" r="7" fill="#163f34" stroke="white" strokeWidth="2" />
      <text x={x(summary.medianB)} y="136" textAnchor={summary.medianB / ceiling < 0.15 ? "start" : "middle"} fill="#163f34">Median: {money(summary.medianB)}</text>
    </svg>
    <p className="chart-current-value">Median {money(summary.medianB)}; P10 {money(summary.low80B)}; P90 {money(summary.high80B)}. The shaded band, dashed bounds, end markers, and median dot all use the same linear dollar scale.</p>
  </figure>;
}
