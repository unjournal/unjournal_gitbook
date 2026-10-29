import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

export function EcosystemUpdate() {
  return (
    <section id="ecosystem-update" className="section section--narrow ecosystem-update" aria-label="Effective giving ecosystem update">
      <details>
        <summary>
          <strong>What GWWC’s survey of the effective-giving network adds to this model</strong>
          <span className="ecosystem-update__summary">
            GWWC surveyed a network of more than 70 organizations that research high-impact giving opportunities,
            raise money for them, or make grants. It reports about $2 billion moved in 2025, continued concentration
            in a few large funders, and a small evaluation field. This informs the model’s capacity and cause-allocation
            questions, but does not identify new AI-linked wealth or justify changing the numerical forecast.
          </span>
          <small>
            Source: {" "}
            <a href="https://forum.effectivealtruism.org/posts/T7CKswFYSgjePAwZh/updates-on-the-effective-giving-ecosystem-2026">
              Lucas Moore (GWWC), “Updates on the effective giving ecosystem 2026”
            </a>{" "}
            · Added 17 September 2026
          </small>
        </summary>
        <div className="ecosystem-update__body">
          <p>
            <strong>Why this belongs here.</strong> Moore describes possible new AI-generated fortunes as a potential
            “third wave” of effective giving. Some prospective donors already have ties to effective-giving organizations,
            but the post says it remains uncertain whether and when the wealth will become available, and how much donors
            will give through this network. Those are the same conversion questions this page models. The post describes
            the landscape as of May 2026 and reports mainly on 2025 giving. The interpretation here is ours. {" "}
            <ProvenanceTip ids={["ecosystem-sep-17"]} />
          </p>

          <h3>What the survey measured</h3>
          <p>
            “Money moved” means donations that reached a recipient recommended or funded by an impact-focused evaluator,
            such as GiveWell, Founders Pledge, or a grantmaking fund. It is not the evaluators’ operating budgets, and it
            is not a count of all charitable giving. The total also omits organizations that did not provide 2025 figures.
          </p>

          <h3>What it found, and how to read it</h3>
          <ul>
            <li>
              <strong>The network grew substantially in 2025.</strong> Reported money moved rose about 60%, from roughly
              $1.2 billion in 2024 to $2 billion in 2025. Even after excluding the two largest organizations, Coefficient
              Giving and GiveWell, it rose from about $340 million to $490 million. This is evidence that existing
              institutions can expand, although it does not show that new AI wealth has become available.
            </li>
            <li>
              <strong>The cause shares depend heavily on the largest funders.</strong> Of the full roughly $2 billion total,
              about 30% went to global catastrophic risk reduction, a broad category that includes more than AI safety.
              Among the roughly $490 million remaining after excluding Coefficient Giving and GiveWell, the corresponding
              share was about 20%. Neither percentage predicts how future AI-wealth donors will allocate their giving.
            </li>
            <li>
              <strong>The research and grantmaking layer is small.</strong> Only nine publicly accessible evaluators had at
              least three full-time staff working on evaluation or grantmaking. The list spans several causes, and the post
              identifies only Founders Pledge as an impact-focused evaluator covering AI risks, alongside several grantmakers
              active in that area. This makes capacity a real question, but staff counts do not tell us how many dollars the
              AI-safety and EA funding system could responsibly deploy by the model’s deadline.
            </li>
          </ul>

          <h3>What changed on this page</h3>
          <p>
            <strong>The numerical model did not change.</strong> The post gives no new estimate of AI-linked wealth,
            liquidity timing, donor follow-through, AI-safety allocation, or near-term deployment capacity. I therefore
            left the forecast defaults and commitment ledger unchanged. The $2 billion ecosystem total is historical giving
            from many donors and must not be added to the page’s AI-linked commitments. {" "}
            <CitationTip ids={["effective-giving-2026"]} />
          </p>
          <p>
            <strong>The interpretation did change.</strong> The reported growth makes a higher-capacity scenario more
            plausible than it looked from staff counts alone, while the concentration and cause-share figures reinforce
            the need to model cause allocation separately. A future model revision should test a larger deployment cap and
            alternative cause shares. It should change the central forecast only when there is evidence about an actual
            AI-linked funding program, its timing, or grants that recipient organizations can budget against.
          </p>
          <p className="ecosystem-update__limits">
            <strong>Limits:</strong> the underlying money-moved sheet is private; coverage and cause shares are approximate;
            and the post does not estimate the future AI-linked flows at the center of this page.
          </p>
        </div>
      </details>
    </section>
  );
}
