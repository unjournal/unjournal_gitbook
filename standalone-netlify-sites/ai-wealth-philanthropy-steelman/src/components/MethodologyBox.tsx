import { FeedbackTip } from "./FeedbackTip";
import { report } from "../content/report";
import { ProvenanceTip } from "./ProvenanceTip";

export function MethodologyBox() {
  return (
    <aside className="method-box">
      <p className="kicker">Methodology</p>
      <h3>What would update this memo?</h3>
      <p className="update-date">
        Last updated: <strong>{report.lastUpdated}</strong>. An automated monitor now checks Anthropic
        liquidity/valuation evidence and major AI-safety/EA-relevant grant announcements, then flags review-trigger
        items for the maintenance process. A separate maintenance agent reviews both versions every two weeks,
        implements conservative source-grounded updates, and flags judgment calls. <FeedbackTip ids={["uj-update-prominence"]} />{" "}
        <ProvenanceTip ids={["evidence-oct-29"]} />
      </p>
      <ul>
        <li>
          Anthropic's realizable valuation at liquidity or lockup expiry, including any evidence that the equity value
          has materially collapsed or far exceeded the current default. <FeedbackTip ids={["md-update-priority"]} />
        </li>
        <li>Concrete donor vehicles with named grantmakers and explicit AIS/EA cause allocations.</li>
        <li>Evidence that lab-adjacent donors are funding non-lab-compatible policy, advocacy, and governance work.</li>
        <li>Early large grants that move beyond broad AI public benefit into constrained operating organizations.</li>
        <li>Clear liquidity timelines, lockup exceptions, or credible bridge financing against restricted shares.</li>
        <li>
          Evidence that anticipatory commitments, such as Coefficient Giving's $1B GiveWell allocation, are followed by
          new donors rather than remaining a temporary pull-forward by incumbent funders.
        </li>
      </ul>
    </aside>
  );
}
