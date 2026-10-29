import { feedbackById } from "../content/feedback";

export function FeedbackTip({ ids }: { ids: string[] }) {
  return (
    <span className="feedback-cluster" aria-label="Feedback acknowledgements">
      {ids.map((id) => {
        const item = feedbackById[id];

        if (!item) {
          return null;
        }

        return (
          <span className="feedback-tip" key={id}>
            <a
              className="feedback-marker"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.title}: ${item.note}`}
            >
              {item.marker}
            </a>
            <span className="feedback-popover" role="tooltip">
              <strong>{item.title}</strong>
              <span className="feedback-quote">"{item.quote}"</span>
              <span>{item.note}</span>
              <span className="feedback-link">Open Michael Dickens comment</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
