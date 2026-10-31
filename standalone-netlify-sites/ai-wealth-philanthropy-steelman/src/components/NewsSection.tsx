import { newsItems, type NewsItem, type TrackerScope } from "../content/tracker";
import { CitationTip } from "./CitationTip";
import { ProvenanceTip } from "./ProvenanceTip";

export function NewsSection({ scope }: { scope: TrackerScope }) {
  const items = newsItems
    .filter((item) => item.scope.includes(scope))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="news" className="section section--news" aria-labelledby="news-title">
      <div className="news-heading">
        <div>
          <p className="kicker">Latest evidence and news</p>
          <h2 id="news-title">What changed recently</h2>
        </div>
        <p>
          Short source-grounded updates, with commitments and reports kept separate. {scope !== "animal-welfare" ? "These headlines are included in the fortnightly tracker posts. " : ""}<ProvenanceTip ids={[scope === "animal-welfare" ? "evidence-oct-29" : "evidence-oct-31"]} />
        </p>
      </div>
      <div className="news-grid">
        {items.slice(0, 6).map((item) => <NewsCard key={`${item.date}-${item.title}`} item={item} />)}
      </div>
      {items.length > 6 ? <details className="older-news"><summary>Earlier evidence ({items.length - 6} items)</summary><div className="news-grid">{items.slice(6).map((item) => <NewsCard key={`${item.date}-${item.title}`} item={item} />)}</div></details> : null}
      <a className="anchor-link" href="#tracker">
        {scope === "animal-welfare" ? "See the scenarios and commitments tracker" : "See the forecast and commitments tracker"}
      </a>
    </section>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return <article className="news-card">
    <div className="news-card__meta"><time dateTime={item.date}>{formatDate(item.date)}</time><span>{item.strength}</span></div>
    <h3>{item.title}</h3><p>{item.summary} <CitationTip ids={item.evidenceIds} /></p>
  </article>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}
