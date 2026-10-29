import { useState } from "react";

const linkpostBlurb = `I'm sharing a model and dashboard for testing a live assumption in Bay/EA/AIS circles: that large AI-lab-adjacent philanthropy is likely to arrive soon enough, and in a sufficiently usable form, that organizations should plan around it.

My tentative conclusion is about conversion rather than whether AI-wealth philanthropy exists. The broad wave has started: Anthropic and OpenAI have made substantial targeted commitments. Coefficient Giving and Good Ventures have also raised their 2026 GiveWell allocation from $175 million to $1 billion, partly to prepare for much more future funding. They explicitly warn that the volatile-asset-based expectation may not materialize.

That GiveWell commitment is important evidence that the expected wave is already changing budgets and capacity. It is not new Anthropic/OpenAI wealth, so I track it separately rather than adding it to the central AI-linked BOTEC.

The interactive model lets readers vary assumptions about Anthropic valuation, founder ownership, pledge follow-through, employee giving, lockups, deployment rates, local-confidence adjustment, and grantmaker/recipient deployment capacity.

Original motivating thread/comment:
https://forum.effectivealtruism.org/posts/dtF6wBjH7yBD4kqLz/noah-birnbaum-s-quick-takes?commentId=sGRyGF5wjaaoMFmfK

Global Health & Development fork:
https://uj-ai-wealth-philanthropy-steelman.netlify.app/global-development/`;

const generationPrompt = `Build and deploy a Netlify-hosted static web app for a research report tentatively titled:

Will AI Wealth Actually Flood AIS/EA Philanthropy Soon? A Steelman Against the Bay-Area Funding Assumption

The site should present a deeply sourced, critique-and-countercritique report, plus an interactive BOTEC / uncertainty model. It should be easy to linkpost on the EA Forum and LessWrong, and should support Hypothes.is annotation for public feedback and iterative improvement.

Minimum sections requested:
1. Executive summary
2. The claim being steelmanned against
3. The strongest case against imminent AIS/EA philanthropy
4. BOTEC model
5. Critique of the critique
6. Planning implications
7. Source audit and uncertainty
8. Interactive uncertainty model
9. Share / linkpost box, including the original EA Forum thread link

Implementation note: the initial app was generated from this prompt and then edited/deployed as a standalone Netlify site. Please treat it as a draft research memo whose assumptions, framing, and source interpretation are open to correction.`;

export function ShareBox() {
  const [copied, setCopied] = useState(false);

  async function copyBlurb() {
    await navigator.clipboard.writeText(linkpostBlurb);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="share-box">
      <p className="kicker">Share or inspect the draft</p>
      <h2>Original prompt and linkpost text</h2>

      <details className="provenance-box">
        <summary>How this draft was generated</summary>
        <p>
          This page began as a Codex-generated standalone web app from a handoff prompt. The prompt asked for a sourced
          steelman memo, an interactive BOTEC model, and public Hypothes.is feedback support.
        </p>
        <pre>{generationPrompt}</pre>
      </details>

      <h3>Copyable linkpost blurb</h3>
      <textarea value={linkpostBlurb} readOnly aria-label="Copyable linkpost blurb" />
      <div className="share-actions">
        <button className="button button--primary" type="button" onClick={copyBlurb}>
          {copied ? "Copied" : "Copy linkpost blurb"}
        </button>
        <a className="button" href="https://web.hypothes.is/start/">
          Open Hypothes.is
        </a>
      </div>
      <p className="fine-print">For the fastest response, include <code>@daaronr</code> in the Hypothes.is comment.</p>
    </article>
  );
}
