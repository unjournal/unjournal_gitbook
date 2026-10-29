import { useEffect, type ReactNode } from "react";
import { report } from "../content/report";
import { FeedbackFold } from "./FeedbackFold";
import { ProvenanceTip } from "./ProvenanceTip";
import { ToplinePredictions, type ToplinePrediction } from "./ToplinePredictions";
import { installHashNavigation } from "../utils/hashNavigation";
import { SiteNavigation } from "./SiteNavigation";

const navItems = [
  ["News", "#news"],
  ["Tracker", "#tracker"],
  ["Summary", "#summary"],
  ["Model", "#model"],
  ["Estimates", "#estimates"],
  ["Compare models", "/model-comparison/"],
  ["Argument", "#steelman"],
  ["Counterarguments", "#counterarguments"],
  ["Planning", "#planning"],
  ["Sources", "#sources"],
  ["Annotate", "#annotate"]
];

export function Layout({
  children,
  toplinePredictions
}: {
  children: ReactNode;
  toplinePredictions: ToplinePrediction[];
}) {
  useEffect(() => installHashNavigation(), []);

  return (
    <div className="page-shell">
      <SiteNavigation brand="AIS/EA funding model" home="/" groups={[
        { label: "Model", links: [{ label: "Calculator & uncertainty", href: "#model" }, { label: "Estimates & assumptions", href: "#estimates" }] },
        { label: "Read", links: navItems.filter(([label]) => ["Summary", "Argument", "Counterarguments", "Planning", "Annotate"].includes(label)).map(([label, href]) => ({ label, href })) }
      ]} />

      <main>
        <FeedbackFold />
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">Model and dashboard</p>
            <h1>{report.title}</h1>
            <p className="subtitle">{report.subtitle}</p>
          </div>
          <div className="hero-visual" aria-label="Topline AIS/EA funding predictions">
            <ToplinePredictions
              compact
              id="predictions"
              predictions={toplinePredictions}
              qualifier="Working ranges and a transparent central BOTEC, not promises of funding."
            />
          </div>
          <div className="hero-details">
            <div className="meta-row">
              <span>Last updated {report.lastUpdated}</span>
              <span>A model and dashboard, not a promise of funding.</span>
            </div>
            <p className="author-note">
              <strong>Orchestrated by David Reinstein</strong>, Co-Director of{" "}
              <a href="https://unjournal.org">Unjournal.org</a>. This is a preliminary, largely LLM-generated draft,
              iteratively edited in response to feedback from Michael Dickens and other EA Forum/Hypothes.is commenters.{" "}
              <ProvenanceTip
                ids={["ai-draft", "david-orchestration", "david-model-framing", "michael-revisions", "evidence-oct-29"]}
              />
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#tracker">
                Open forecast tracker
              </a>
              <a
                className="button"
                href="https://forum.effectivealtruism.org/posts/dtF6wBjH7yBD4kqLz/noah-birnbaum-s-quick-takes?commentId=sGRyGF5wjaaoMFmfK"
              >
                Open original EA Forum thread
              </a>
              <a className="button" href="#annotate">
                Copy linkpost blurb
              </a>
              <a className="button" href="#model">
                Jump to model
              </a>
              <a className="button" href="/global-development/">
                Global Health &amp; Development version
              </a>
              <a className="button" href="/model-comparison/">Compare AI-philanthropy models</a>
              <a className="button" href="/animal-welfare/">Animal Welfare funding model</a>
            </div>
          </div>
        </section>
        {children}
      </main>

      <footer className="site-footer">
        <p>Suggest corrections via Hypothes.is annotations on this page.</p>
        <p>This standalone Netlify app is intentionally kept outside GitBook navigation.</p>
        <p>
          <a href="https://projects.davidreinstein.org/">More projects by David Reinstein</a>
        </p>
      </footer>
    </div>
  );
}
