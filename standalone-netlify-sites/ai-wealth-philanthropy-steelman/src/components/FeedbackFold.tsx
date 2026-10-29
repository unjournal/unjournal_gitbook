import { ProvenanceTip } from "./ProvenanceTip";

export function FeedbackFold() {
  const canonicalUrl = window.location.pathname.startsWith("/global-development")
    ? "https://uj-ai-wealth-philanthropy-steelman.netlify.app/global-development/"
    : window.location.pathname.startsWith("/animal-welfare")
      ? "https://uj-ai-wealth-philanthropy-steelman.netlify.app/animal-welfare/"
      : "https://uj-ai-wealth-philanthropy-steelman.netlify.app/";
  const commentsUrl = `https://hypothes.is/search?q=${encodeURIComponent(`url:${canonicalUrl}`)}`;

  return (
    <aside className="feedback-fold" aria-label="Feedback and draft provenance">
      <details>
        <summary>
          <span>
            <strong>Help improve this draft</strong>
            <small>Comment with Hypothes.is; flag @daaronr for a response.</small>
          </span>
          <ProvenanceTip ids={["ai-draft", "david-orchestration", "evidence-oct-29"]} />
        </summary>
        <div className="feedback-fold__body">
          <p>
            Use the embedded Hypothes.is sidebar for corrections, missing sources, counterarguments, and model changes.
            David plans to respond, especially when a comment flags <code>@daaronr</code>.
          </p>
          <p>
            This is a preliminary, largely LLM-generated memo orchestrated by David Reinstein. The small markers beside
            passages explain whether text was AI-drafted, evidence-checked, or revised after named human feedback.
          </p>
          <div className="share-actions">
            <a className="button button--primary button--small" href="https://web.hypothes.is/start/" target="_blank" rel="noreferrer">
              Open Hypothes.is
            </a>
            <a
              className="button button--small"
              href={commentsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Read public comments
            </a>
          </div>
        </div>
      </details>
    </aside>
  );
}
