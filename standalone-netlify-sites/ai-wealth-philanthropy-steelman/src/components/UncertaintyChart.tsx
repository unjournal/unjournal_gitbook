import { sensitivityRows, type ModelInputs } from "../utils/model";
import { formatBillions } from "../utils/format";

export function UncertaintyChart({ inputs }: { inputs: ModelInputs }) {
  const rows = sensitivityRows(inputs).slice(0, 7);
  const maxDelta = Math.max(...rows.map((row) => row.delta), 0.01);

  return (
    <div className="sensitivity">
      <p className="kicker">Sensitivity</p>
      <h3>Most important assumptions</h3>
      {rows.map((row, index) => (
        <div className="sensitivity-row" key={row.key}>
          <div className="sensitivity-label">
            <span>{index + 1}. {row.label}</span>
            <small>
              {formatBillions(row.lowOutput)} to {formatBillions(row.highOutput)}
            </small>
          </div>
          <div className="sensitivity-track">
            <span style={{ width: `${Math.max(4, (row.delta / maxDelta) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
