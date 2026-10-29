import type { Source } from "../utils/model";

export function SourceNote({ source }: { source: Source }) {
  return (
    <article className="source-note">
      <div>
        <p className="source-type">{source.type}</p>
        <h3>
          <a href={source.url}>{source.title}</a>
        </h3>
      </div>
      <p>{source.reliability}</p>
      <div className="tag-row">
        {source.supports.map((support) => (
          <span key={support}>{support}</span>
        ))}
      </div>
    </article>
  );
}
