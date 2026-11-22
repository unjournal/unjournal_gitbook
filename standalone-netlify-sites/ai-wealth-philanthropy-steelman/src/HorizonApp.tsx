import { useEffect, useMemo, useState } from "react";
import { installHashNavigation } from "./utils/hashNavigation";
import {
  anchorYear, finalYear, horizonDefaults, projectHorizon, radiant, radiantPeoplePoolB, radiantPlugin,
  startHorizon, type HorizonSettings, type Scope
} from "./utils/horizonModel";
import { defaultModelInputs } from "./content/modelDefaults";
import "./horizon.css";

const scopeLabels: Record<Scope, string> = {
  ais: "AIS/EA · Anthropic people and Public Benefit Fund",
  all: "All causes · Anthropic people and Public Benefit Fund",
  people: "All causes · Anthropic people only"
};
const scopeOptions: Record<Scope, string> = {
  ais: "AIS/EA · people and fund",
  all: "All causes · people and fund",
  people: "All causes · people only"
};
const mapUrl = "https://radiant.metaculus.com/projects/1c3f7d1a-8ad9-4d6f-a906-90de0ec06f88";
const commentUrl = "https://forum.effectivealtruism.org/posts/3qMJWh4akZSggoZjt/mapping-the-ai-ipo-windfall?commentId=r3RuQdqjYLAdJKCsM";
const money = (n: number) => "$" + new Intl.NumberFormat("en-US", { maximumSignificantDigits: 2 }).format(n) + "B";
const sourceMoney = (n: number) => `$${n}B`;
const band = (s: {p10: number; p90: number}) => money(s.p10) + "–" + money(s.p90);
const projectDefaultPath = () => projectHorizon(horizonDefaults);
type Projection = ReturnType<typeof projectHorizon>;
const peoplePool = startHorizon(defaultModelInputs, "people").poolB;

export default function HorizonApp() {
  const [settings, setSettings] = useState<HorizonSettings>(horizonDefaults);
  const [flow, setFlow] = useState<"cumulative" | "annual">("cumulative");
  const [year, setYear] = useState(2031);
  useEffect(() => installHashNavigation(), []);
  const baseline = useMemo(projectDefaultPath, []);
  const projection = useMemo(() => settings === horizonDefaults ? baseline : projectHorizon(settings), [settings, baseline]);
  const comparisons = useMemo(() => ({
    ais: settings.scope === "ais" ? projection : projectHorizon({ ...settings, scope: "ais" }),
    all: settings.scope === "all" ? projection : projectHorizon({ ...settings, scope: "all" }),
    people: settings.scope === "people" ? projection : projectHorizon({ ...settings, scope: "people" })
  }), [settings, projection]);
  const row = projection.rows[year - anchorYear];
  const result = row[flow];
  const anchor = baseline.rows[0];

  return <>
    <header className="topbar grouped-topbar horizon-nav">
      <a className="brand" href="/long-horizon/">AI wealth after 2027</a>
      <nav className="grouped-nav" aria-label="Page navigation">
        <a href="#scenarios">Scenarios</a><a href="#comparison">Radiant comparison</a>
        <a href="#methods">Methods</a><a href="/#tracker">Original tracker</a>
      </nav>
    </header>
    <main className="horizon-page">
      <section className="horizon-intro">
        <p className="kicker">Anthropic giving scenarios · 2027–2035</p>
        <h1>How much AI wealth could reach charities after 2027?</h1>
        <p>Extend the Anthropic model through 2035 and see what changes when we match Radiant’s date and donor coverage. Later grants depend on how quickly donors spend down the modeled pool and how much grantmakers can deploy.</p>
        <p className="horizon-credit">Prompted by <a href={commentUrl}>Mo Putera’s question and reconciliation</a>. Uses the original AIS/EA model’s current defaults.</p>
      </section>

      <section id="scenarios" className="horizon-section">
        <h2>Explore future grants</h2>
        <div className="horizon-workbench">
          <div className="horizon-controls">
            <label>Donors and causes<select value={settings.scope} onChange={e => setSettings({ ...settings, scope: e.target.value as Scope })}>
              {Object.entries(scopeOptions).map(([key, value]) => <option value={key} key={key}>{value}</option>)}
            </select><small>All scenarios use Anthropic sources. “Fund” means its Public Benefit Fund.</small></label>
            <label>Annual payout after 2027 <output>{settings.annualPayoutPct}%</output>
              <input type="range" min="0" max="35" step="1" value={settings.annualPayoutPct} onChange={e => setSettings({ ...settings, annualPayoutPct: +e.target.value })} />
              <small>Share of the remaining pool paid each year before any cap.</small>
            </label>
            {settings.scope === "ais" && <>
              <label className="horizon-check"><input type="checkbox" checked={settings.capLaterYears} onChange={e => setSettings({ ...settings, capLaterYears: e.target.checked })} /> Apply an annual AIS/EA cap after 2027</label>
              {settings.capLaterYears && <label>Annual cap growth <output>{settings.annualCapGrowthPct}%</output>
                <input type="range" min="0" max="50" step="5" value={settings.annualCapGrowthPct} onChange={e => setSettings({ ...settings, annualCapGrowthPct: +e.target.value })} />
                <small>First-year capacity starts from the model’s 2027 cap, adjusted by this growth rate.</small>
              </label>}
            </>}
            <label>View<select value={flow} onChange={e => {
              const next = e.target.value as typeof flow;
              setFlow(next);
              if (next === "annual" && year === anchorYear) setYear(anchorYear + 1);
            }}>
              <option value="cumulative">Cumulative grants</option><option value="annual">Grants per year</option>
            </select></label>
            <label>Highlight year<select value={year} onChange={e => setYear(+e.target.value)}>
              {projection.rows.filter(r => flow === "cumulative" || r.year > anchorYear).map(r => <option key={r.year}>{r.year}</option>)}
            </select></label>
            <button type="button" onClick={() => { setSettings(horizonDefaults); setFlow("cumulative"); setYear(2031); }}>Reset</button>
          </div>
          <div className="horizon-result">
            <div className="horizon-metrics" aria-live="polite">
              <div><small>{flow === "annual" && year > anchorYear ? "During" : "Through"} {year} · median</small><strong>{money(result.median)}</strong></div>
              <div><small>Simulated mean</small><strong>{money(result.mean)}</strong></div>
              <div><small>80% model interval</small><strong>{band(result)}</strong></div>
            </div>
            <HorizonChart rows={projection.rows} flow={flow} year={year} />
            <p className="horizon-note">Nominal USD. The 80% model interval holds your later payout rate and cap settings fixed. The first cumulative point covers grants through end-2027.</p>
          </div>
        </div>
        <details className="horizon-fold">
          <summary>Values by year</summary>
          <table className="horizon-table"><caption>{scopeLabels[settings.scope]} · {flow === "cumulative" ? "cumulative" : "annual after 2027"}</caption>
            <thead><tr><th>Year</th><th>Plug-in</th><th>Mean</th><th>Median</th><th>P10–P90</th></tr></thead>
            <tbody>{projection.rows.filter(r => flow === "cumulative" || r.year > anchorYear).map(r => <tr key={r.year}><th scope="row">{r.year === anchorYear ? "Through 2027" : r.year}</th>
              <td>{money(r.point[flow === "annual" ? "annualB" : "cumulativeB"])}</td><td>{money(r[flow].mean)}</td>
              <td>{money(r[flow].median)}</td><td>{band(r[flow])}</td></tr>)}</tbody>
          </table>
        </details>
      </section>

      <section id="comparison" className="horizon-section">
        <h2>Compare at the same date</h2>
        <p>The original end-2027 {money(anchor.point.cumulativeB)} is a plug-in calculation. Its simulated mean is {money(anchor.cumulative.mean)} and its median is {money(anchor.cumulative.median)}. Radiant’s live map displayed a <strong>{sourceMoney(radiant.mean)} mean</strong> on November 21, 2026 (P1–P99 {sourceMoney(radiant.p1)}–{sourceMoney(radiant.p99)}). Its formula counts 60 months from July 2026, with individual and Foundation payouts starting after the later modeled lockup. This version includes the OpenAI Foundation, which the October comparison snapshot omitted. <a href={mapUrl}>Radiant map</a></p>
        <p>For the same cutoff and donors (Anthropic founders and employees, all causes), our plug-in estimate is <strong>{money(comparisons.people.dates[0].point)}</strong> versus <strong>{money(radiantPlugin.anthropicPeopleB)}</strong> using Radiant’s displayed inputs. The respective pools before payout are {money(peoplePool)} after our local-confidence adjustment and {money(radiantPeoplePoolB)} after Radiant’s founder conversion factor.</p>
        <p className="horizon-note">Our rows use your payout setting ({settings.annualPayoutPct}% per year) and AIS/EA cap settings. Radiant’s rows use its November 21 snapshot.</p>
        <table className="horizon-table horizon-comparison"><caption>One sequence of changes · cumulative operating-charity grants</caption>
          <thead><tr><th>Model and scope</th><th>Cutoff</th><th>Plug-in</th><th>Mean</th></tr></thead>
          <tbody>
            <tr><th scope="row">Original AIS/EA</th><td>End 2027</td><td>{money(anchor.point.cumulativeB)}</td><td>{money(anchor.cumulative.mean)}</td></tr>
            {([
              ["ais", "Extend AIS/EA timing"],
              ["all", "Use all causes and lift the AIS/EA cap"],
              ["people", "Exclude Anthropic’s Public Benefit Fund"]
            ] as const).map(([k, name]) => <tr key={k}><th scope="row">{name}</th><td>Mid-2031</td><td>{money(comparisons[k].dates[0].point)}</td><td>{money(comparisons[k].dates[0].mean)}</td></tr>)}
            <tr><th scope="row">Radiant · Anthropic people only</th><td>Mid-2031</td><td>{money(radiantPlugin.anthropicPeopleB)}</td><td>Unavailable</td></tr>
            <tr><th scope="row">Radiant · add OpenAI people</th><td>Mid-2031</td><td>{money(radiantPlugin.anthropicPeopleB + radiantPlugin.openAiPeopleB)}</td><td>Unavailable</td></tr>
            <tr><th scope="row">Radiant · add OpenAI Foundation</th><td>Mid-2031</td><td>{sourceMoney(Number((radiantPlugin.anthropicPeopleB + radiantPlugin.openAiPeopleB + radiantPlugin.foundationB).toFixed(1)))}</td><td>{sourceMoney(radiant.mean)}</td></tr>
          </tbody>
        </table>
        <p>For Anthropic people across all causes, our mid-2031 median is {money(comparisons.people.dates[0].median)} (P10–P90 {band(comparisons.people.dates[0])}). Radiant’s full-map interval covers the central 98% of its draws. The local interval covers the central 80%. The two intervals also cover different donors.</p>
        <p>The Foundation accounts for about two-thirds of the reconstructed Radiant total ({money(radiantPlugin.foundationB)}). That contribution comes from the assumed payout of {radiant.foundationRatePct}% of equity value per year.</p>
        <p>At the common date and donor scope, differences remain in equity pools, follow-through, and payout timing. Radiant applies a linear rate to a starting pool with one shared opening date. This extension spends a fraction of the remaining balance each year from 2028 onward. Without a growing cap, that means annual grants stay flat while the cap binds and fall as the pool depletes. Cumulative grants can still grow substantially. The sequence above depends on the order of changes.</p>
        <details className="horizon-fold"><summary>Radiant inputs and limits of the comparison</summary>
          <p>Mid-2031 here means cumulative to July 1, 2031. For illustration, our Anthropic people-only mean is {money(comparisons.people.dates[1].mean)} on November 19, 2031, the fifth anniversary of first trading. That is later than Radiant’s cutoff. The model prorates partial years by elapsed days.</p>
          <p>The plug-in rows use the displayed node means and Radiant’s formula. Multiplying marginal means can differ from the mean of their joint product. The public map displays the full model’s mean and interval. A native Anthropic-only distribution was unavailable for this comparison. The histogram’s midpoint labels the middle of the axis. <a href="https://radiant.metaculus.com/docs/forecasting/reading-results">Radiant’s guide to results</a></p>
          <p>For Anthropic people, the inputs are a {sourceMoney(radiant.founderLifetimeB)} lifetime founder pledge, a {(100 * radiant.founderWindowFraction).toFixed(1)}% founder conversion share, and a {sourceMoney(radiant.employeePoolB)} employee giving pool. Radiant applies a {(100 * radiant.individualRate).toFixed(2)}% annual rate for {radiant.periodMonths} months. The two OpenAI additions at these inputs are {money(radiantPlugin.openAiPeopleB)} for individuals and {money(radiantPlugin.foundationB)} for the Foundation.</p>
          <p>Radiant assumes annual Foundation grants of {radiant.foundationRatePct}% of modeled equity value. OpenAI Foundation’s 2024 return reports public charity status. The IRS rule cited by Radiant concerns private foundations and qualifying distributions can include more than grants. For scale, applying a hypothetical 1% rate to the same equity and window yields about {money(radiantPlugin.foundationB / radiant.foundationRatePct)} from the Foundation, versus {money(radiantPlugin.foundationB)} at Radiant’s rate. <a href="https://cdn.theconversation.com/static_files/files/4100/2024-IRS990-OpenAI.pdf">Foundation filing</a> · <a href="https://www.irs.gov/charities-non-profits/private-foundations/minimum-investment-return">IRS rule</a> · <a href="https://openai.com/index/update-on-the-openai-foundation/">Foundation program plans</a></p>
        </details>
      </section>

      <section id="methods" className="horizon-section">
        <h2>What the extension assumes</h2>
        <p>Each simulated path starts with the same sampled valuation, realization, donor, timing, and capacity assumptions as the 2027 model. After 2027, the scenario spends down a finite pool of modeled giving. Valuations, realization, and cause shares stay fixed within each draw. The same payout rate applies across all draws. Continued growth in corporate wealth, investment returns, new donors, and later liquidity would require additional assumptions.</p>
        <details className="horizon-fold"><summary>Calculation and accounting</summary>
          <p>Set each modeled channel’s 2027 deployment share to 100% to calculate its pool after realization, follow-through where applicable, and cause allocation. Apply the original local-confidence adjustment to those dollars and subtract the modeled grants through 2027. For each later year, take the smaller of the selected payout share of the remaining balance and that year’s cap. Subtract the payment before calculating the next year. The cap delays grants and the unspent balance carries forward into the same payout rule. Reusing the original cumulative cap as a yearly cap may overstate how quickly capacity recurs. You can vary it or turn it off for later years. It leaves out competing demands from other donors.</p>
          <p>The all-cause diagnostics set cause shares to 100% and remove the AIS/EA-specific cap. They carry over the original timing and local-confidence assumptions. Holding the realization haircut fixed can understate the pool if more equity becomes available later, or overstate it if asset values fall. The Public Benefit Fund is optional because its public-benefit mandate is broader than external grants to operating charities. Even in the all-cause view that includes it, its modeled pool is hypothetical. Company financing, share transfers, and grants paid to recipients occupy different stages.</p>
        </details>
        <p className="horizon-credit">Scenario extension drafted with Codex, with two source-read reviews by Claude Fable 5.2. <a href="/model-comparison/">Earlier comparison of funding models</a> · <a href="/global-development/">Global Health &amp; Development</a> · <a href="/animal-welfare/">Animal Welfare</a></p>
      </section>
    </main>
  </>;
}

function HorizonChart({ rows, flow, year }: {
  rows: Projection["rows"];
  flow: "cumulative" | "annual";
  year: number;
}) {
  const plotted = flow === "annual" ? rows.slice(1) : rows;
  const max = Math.max(...plotted.map(r => Math.max(r[flow].p90, r[flow].mean)), 0.1) * 1.1;
  const x = (yr: number) => 65 + 525 * (yr - plotted[0].year) / (finalYear - plotted[0].year);
  const y = (value: number) => 214 - 190 * value / max;
  const line = (key: "p10" | "p90" | "median") => plotted.map(r => `${x(r.year)},${y(r[flow][key])}`).join(" ");
  const polygon = line("p90") + " " + [...plotted].reverse().map(r => `${x(r.year)},${y(r[flow].p10)}`).join(" ");
  const selected = plotted.find(r => r.year === year);

  return <figure className="horizon-chart">
    <div className="chart-legend"><span><i className="chart-legend__line" aria-hidden="true" />Median</span>
      <span><i className="chart-legend__band" aria-hidden="true" />80% model interval (P10–P90)</span></div>
    <svg viewBox="0 0 620 250" role="img" aria-label={flow === "cumulative" ? "Cumulative modeled grant median and 80% interval, 2027 to 2035" : "Annual modeled grant median and 80% interval, 2028 to 2035"}>
      {[0, .5, 1].map(f => <g key={f}><line x1="65" x2="590" y1={y(max * f)} y2={y(max * f)} className="chart-gridline" />
        <text x="59" y={y(max * f) + 5} textAnchor="end">{money(max * f)}</text></g>)}
      <polygon points={polygon} className="chart-interval" />
      <polyline points={line("p10")} className="chart-interval-boundary" />
      <polyline points={line("p90")} className="chart-interval-boundary" />
      <polyline points={line("median")} className="chart-median-line" />
      {plotted.filter((_, i) => i % 2 === 0 || i === plotted.length - 1).map(r =>
        <text key={r.year} x={x(r.year)} y="240" textAnchor="middle">{r.year}</text>)}
      {selected && <g><line x1={x(year)} x2={x(year)} y1={y(selected[flow].p10)} y2={y(selected[flow].p90)} className="chart-range-marker" />
        <circle cx={x(year)} cy={y(selected[flow].median)} r="5" className="chart-point" /></g>}
    </svg>
  </figure>;
}
