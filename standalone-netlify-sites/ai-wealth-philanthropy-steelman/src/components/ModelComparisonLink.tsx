export function ModelComparisonLink() {
  return (
    <section className="section section--narrow" aria-labelledby="comparison-link-title">
      <article className="summary-panel">
        <p className="kicker">Compare the models</p>
        <h2 id="comparison-link-title">Why do AI-philanthropy estimates differ?</h2>
        <p>
          The original AIS/EA and GH&D models, Jack Lewars’s spreadsheet, Metaculus/Radiant, and other public calculators count different
          donors, causes, and time windows. The <a href="/model-comparison/">interactive model comparison</a> puts
          overall giving, AI safety, EA-aligned giving, and global health and development side by side. It compares
          predictions and uncertainty, matches outcomes where possible, and traces differences to their assumptions.
          It also includes a separate experimental calculator and explains the limits of a synthesis.
        </p>
        <p>The comparison is a frozen October 2 snapshot. Current forecasts are in each route’s tracker; the <a href="/animal-welfare/">Animal Welfare model</a> is a newer exploratory extension.</p>
      </article>
    </section>
  );
}
