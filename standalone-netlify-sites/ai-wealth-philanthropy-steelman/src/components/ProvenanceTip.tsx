import { provenanceById } from "../content/provenance";

export function ProvenanceTip({ ids }: { ids: string[] }) {
  return (
    <span className="provenance-cluster" aria-label="Draft provenance">
      {ids.map((id) => {
        const item = provenanceById[id];

        if (!item) {
          return null;
        }

        const marker = (
          <span className="provenance-marker" aria-label={`${item.title}. ${item.date}. ${item.note}`} tabIndex={0}>
            {item.marker}
          </span>
        );

        return (
          <span className="provenance-tip" key={id}>
            {marker}
            <span className="provenance-popover" role="tooltip">
              <strong>{item.title}</strong>
              <span>{item.note}</span>
              <span className="provenance-date">{item.date}</span>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.linkLabel ?? "Open source"}
                </a>
              ) : null}
            </span>
          </span>
        );
      })}
    </span>
  );
}
