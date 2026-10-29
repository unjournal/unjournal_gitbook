import { evidenceById } from "../content/evidence";

export function CitationTip({ ids }: { ids: string[] }) {
  return (
    <span className="citation-cluster" aria-label="Evidence links">
      {ids.map((id) => {
        const item = evidenceById[id];

        if (!item) {
          return null;
        }

        return (
          <span className="citation-tip" key={id}>
            <a
              className="citation-marker"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.title}: ${item.note}`}
            >
              {item.marker}
            </a>
            <span className="citation-popover" role="tooltip">
              <strong>{item.title}</strong>
              {item.quote ? <span className="citation-quote">"{item.quote}"</span> : null}
              <span>{item.note}</span>
              <span className="citation-link">Open source</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
