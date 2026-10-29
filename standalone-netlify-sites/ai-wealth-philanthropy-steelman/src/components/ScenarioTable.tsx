import type { ForecastRow } from "../utils/model";

export function ScenarioTable({ rows }: { rows: ForecastRow[] }) {
  return (
    <div className="table-wrap">
      <table>
        <caption>Forecast sketch</caption>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Probability</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.outcome}>
              <td>{row.outcome}</td>
              <td>
                <span className="probability">{row.probability}</span>
                <span className="bar" style={{ "--bar-width": `${row.midpoint * 100}%` } as React.CSSProperties} />
              </td>
              <td>{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
