import {
  commitmentLedger,
  trackerData,
  type CommitmentSnapshot,
  type ForecastSnapshot,
  type TrackerScope
} from "../content/tracker";
import { formatBillions } from "../utils/format";
import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

export function TrackerPanel({ scope }: { scope: TrackerScope }) {
  const route = scope === "main" ? trackerData.routes.main : scope === "animal-welfare" ? trackerData.routes.animalWelfare : trackerData.routes.globalDevelopment;
  const scopeLabel = scope === "main" ? "Overall AIS/EA" : scope === "animal-welfare" ? "Animal Welfare" : "Global Health & Development";
  const current = route.forecastHistory.at(-1)!;
  const ledger = commitmentLedger.filter((item) => item.scope.includes(scope));

  return (
    <section id="tracker" className="section section--tracker" aria-labelledby="tracker-title">
      <div className="tracker-heading">
        <div>
          <p className="kicker">Fortnightly tracker</p>
          <h2 id="tracker-title">{scopeLabel} forecast and public commitments</h2>
        </div>
        <p>
          Each forecast point is a dated re-estimation. A flat segment means the inputs were reviewed and retained, not
          that an old result was silently republished. The commitments line does not treat promises, credits, or
          cofunding as cash already paid. <ProvenanceTip ids={["ai-draft", "evidence-oct-29"]} />
        </p>
      </div>

      <div className="tracker-metrics" id="tracker-forecast">
        <article className="tracker-metric tracker-metric--primary">
          <span>Median forecast</span>
          <strong>{formatBillions(current.medianB)}</strong>
          <p>{route.forecastTarget}</p>
        </article>
        <article className="tracker-metric">
          <span>80% model interval</span>
          <strong>
            {formatBillions(current.low80B)}–{formatBillions(current.high80B)}
          </strong>
          <p>10th–90th percentile under the correlated simulation.</p>
        </article>
        <article className="tracker-metric">
          <span>{scopeLabel} named public commitments</span>
          <strong>{scope === "animal-welfare" ? "None identified" : formatBillions(route.namedCommitmentTotalB)}</strong>
          <p>Scope-filtered, publicly announced amounts; not a paid-out total.</p>
        </article>
        <article className="tracker-metric">
          <span>{scope === "animal-welfare" ? "Existing-funder context" : "Existing-funder bridge"}</span>
          {scope === "animal-welfare" ? <><strong>Separate</strong><p>Incumbent animal-welfare grants are excluded from this new-wealth estimate.</p></> : <>
          <strong>
            {formatBillions(route.existingFunderCommittedB)} / {formatBillions(route.existingFunderPromisedB)}
          </strong>
          <p>GiveWell reports committed so far / Coefficient-Good Ventures 2026 allocation.</p>
          </>}
        </article>
      </div>

      <p className="tracker-definition">
        <strong>How updates work:</strong> {trackerData.methodology}
      </p>

      <div className="tracker-charts">
        <ForecastLineChart snapshots={route.forecastHistory} scopeLabel={scopeLabel} forecastTarget={route.forecastTarget} />
        <CommitmentLineChart snapshots={route.commitmentHistory} scopeLabel={scopeLabel} />
      </div>

      <div className="tracker-notes">
        <p>{route.commitmentNote}</p>
        <p>The cause views overlap and cover different donor pathways and, for Animal Welfare, a prospective start date. Do not add the route totals together.</p>
        {scope === "global-development" ? (
          <p>
            Also tracked but not added to the commitment line: Coefficient's {formatBillions(trackerData.routes.globalDevelopment.plannedRfpLowB)}–
            {formatBillions(trackerData.routes.globalDevelopment.plannedRfpHighB)} RFP. <CitationTip ids={["coefficient-ghw-ai-rfp"]} />
          </p>
        ) : null}
        <p>
          A comparable verified cash-paid total is not yet consistently reported. I would rather show “not known” than
          turn announcements into apparent disbursements.
        </p>
      </div>

      <details className="commitment-ledger">
        <summary>{scopeLabel} named commitments included in this route</summary>
        <div className="table-wrap">
          <table>
            <caption>{scopeLabel} public commitment ledger</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Commitment</th>
                <th>Amount</th>
                <th>Qualification</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((item) => (
                <tr key={`${item.date}-${item.label}`}>
                  <td>{formatShortDate(item.date)}</td>
                  <td>
                    {item.label} <CitationTip ids={item.evidenceIds} />
                  </td>
                  <td>{formatBillions(item.amountB)}</td>
                  <td>{item.qualification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="tracker-links">
        <a href="#tracker-forecast">Link directly to the median and 80% interval</a>
        <a href="#news">Latest news</a>
      </div>
    </section>
  );
}

function ForecastLineChart({
  snapshots,
  scopeLabel,
  forecastTarget
}: {
  snapshots: ForecastSnapshot[];
  scopeLabel: string;
  forecastTarget: string;
}) {
  const width = 620;
  const height = 260;
  const margin = { top: 24, right: 24, bottom: 42, left: 58 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(...snapshots.map((item) => item.high80B), 0.1) * 1.12;
  const firstDate = Date.parse(snapshots[0].date);
  const dateSpan = Date.parse(snapshots.at(-1)!.date) - firstDate;
  const x = (index: number) => margin.left + (dateSpan === 0 ? chartWidth / 2 : ((Date.parse(snapshots[index].date) - firstDate) / dateSpan) * chartWidth);
  const y = (value: number) => margin.top + chartHeight - (value / maxValue) * chartHeight;
  const highPoints = snapshots.map((item, index) => `${x(index)},${y(item.high80B)}`);
  const lowPoints = snapshots.map((item, index) => `${x(index)},${y(item.low80B)}`).reverse();
  const upperBoundary = snapshots.map((item, index) => `${x(index)},${y(item.high80B)}`).join(" ");
  const lowerBoundary = snapshots.map((item, index) => `${x(index)},${y(item.low80B)}`).join(" ");
  const medianPoints = snapshots.map((item, index) => `${x(index)},${y(item.medianB)}`).join(" ");

  return (
    <figure className="tracker-chart">
      <figcaption>
        <strong>{scopeLabel} forecast history</strong>
        <span>{forecastTarget}</span>
      </figcaption>
      <div className="chart-legend" aria-label="Forecast chart legend">
        <span><i className="chart-legend__line" aria-hidden="true" />Median</span>
        <span><i className="chart-legend__band" aria-hidden="true" />80% model interval (P10–P90)</span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${scopeLabel} forecast median and 80 percent model interval from the 10th to 90th percentile over time`}
      >
        {[0, 0.5, 1].map((share) => {
          const value = maxValue * share;
          return (
            <g key={share}>
              <line x1={margin.left} x2={width - margin.right} y1={y(value)} y2={y(value)} className="chart-gridline" />
              <text x={margin.left - 10} y={y(value) + 4} textAnchor="end" className="chart-axis-label">
                {formatBillions(value)}
              </text>
            </g>
          );
        })}
        {snapshots.length === 1 ? <rect x={x(0) - 18} y={y(snapshots[0].high80B)} width="36" height={y(snapshots[0].low80B) - y(snapshots[0].high80B)} className="chart-interval" /> :
          <polygon points={[...highPoints, ...lowPoints].join(" ")} className="chart-interval" />}
        <polyline points={upperBoundary} className="chart-interval-boundary" />
        <polyline points={lowerBoundary} className="chart-interval-boundary" />
        <polyline points={medianPoints} className="chart-median-line" />
        {snapshots.map((item, index) => (
          <g key={item.date}>
            <line x1={x(index)} x2={x(index)} y1={y(item.high80B)} y2={y(item.low80B)} className="chart-range-marker" />
            <line x1={x(index) - 6} x2={x(index) + 6} y1={y(item.high80B)} y2={y(item.high80B)} className="chart-range-marker" />
            <line x1={x(index) - 6} x2={x(index) + 6} y1={y(item.low80B)} y2={y(item.low80B)} className="chart-range-marker" />
            <circle cx={x(index)} cy={y(item.medianB)} r="5" className="chart-point" />
            {(index === 0 || index === snapshots.length - 1 || index === Math.floor(snapshots.length / 2)) && <text x={x(index)} y={height - 14} textAnchor="middle" className="chart-axis-label">
              {formatChartDate(item.date)}
            </text>}
          </g>
        ))}
      </svg>
      <p className="chart-current-value">
        Current: <strong>{formatBillions(snapshots.at(-1)!.medianB)}</strong> median; 80% interval {formatBillions(snapshots.at(-1)!.low80B)}–
        {formatBillions(snapshots.at(-1)!.high80B)}.
      </p>
      <details className="chart-review-log">
        <summary>Re-estimation notes ({snapshots.length} dated {snapshots.length === 1 ? "review" : "reviews"})</summary>
        <ol>
          {snapshots.map((item) => (
            <li key={`${item.date}-review`}>
              <time dateTime={item.date}>{formatShortDate(item.date)}</time>: <b>{item.reviewStatus}.</b> {item.note}
              {item.supersededSameDayReview ? <p>Earlier same-day review: {formatBillions(item.supersededSameDayReview.medianB)} median ({formatBillions(item.supersededSameDayReview.low80B)}–{formatBillions(item.supersededSameDayReview.high80B)}). {item.supersededSameDayReview.note}</p> : null}
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}

function CommitmentLineChart({ snapshots, scopeLabel }: { snapshots: CommitmentSnapshot[]; scopeLabel: string }) {
  const width = 620;
  const height = 260;
  const margin = { top: 24, right: 24, bottom: 42, left: 58 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const maxValue = Math.max(...snapshots.map((item) => item.totalB), 0.1) * 1.12;
  const firstDate = Date.parse(snapshots[0].date);
  const dateSpan = Date.parse(snapshots.at(-1)!.date) - firstDate;
  const x = (index: number) => margin.left + (dateSpan === 0 ? chartWidth / 2 : ((Date.parse(snapshots[index].date) - firstDate) / dateSpan) * chartWidth);
  const y = (value: number) => margin.top + chartHeight - (value / maxValue) * chartHeight;
  const points = snapshots.map((item, index) => `${x(index)},${y(item.totalB)}`).join(" ");

  return (
    <figure className="tracker-chart">
      <figcaption>
        <strong>{scopeLabel} named public commitments</strong>
        <span>Cumulative announced amount in this route's scope</span>
      </figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${scopeLabel} cumulative named public commitments over time`}>
        {[0, 0.5, 1].map((share) => {
          const value = maxValue * share;
          return (
            <g key={share}>
              <line x1={margin.left} x2={width - margin.right} y1={y(value)} y2={y(value)} className="chart-gridline" />
              <text x={margin.left - 10} y={y(value) + 4} textAnchor="end" className="chart-axis-label">
                {formatBillions(value)}
              </text>
            </g>
          );
        })}
        <polyline points={points} className="chart-commitment-line" />
        {snapshots.map((item, index) => (
          <g key={`${item.date}-${item.label}`}>
            <circle cx={x(index)} cy={y(item.totalB)} r="4.5" className="chart-commitment-point" />
            {(index === 0 || index === snapshots.length - 1) && (
              <text x={x(index)} y={height - 14} textAnchor="middle" className="chart-axis-label">
                {formatChartDate(item.date)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <p className="chart-current-value">
        Current named total: <strong>{formatBillions(snapshots.at(-1)!.totalB)}</strong>. Cash paid is not inferred.
      </p>
    </figure>
  );
}

function formatChartDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}
