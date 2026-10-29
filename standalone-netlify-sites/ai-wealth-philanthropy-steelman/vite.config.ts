import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { trackerData } from "./src/content/tracker";

function trackerDataPlugin(): Plugin {
  return {
    name: "emit-ai-wealth-tracker-data",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "tracker-data.json",
        source: `${JSON.stringify(trackerData, null, 2)}\n`
      });
    }
  };
}

// Discoverability for search engines and LLM crawlers (added 2026-10-01).
// Both routes share index.html, so the root route's canonical / Open Graph tags are
// injected here and a copy with the global-development values is written to
// dist/global-development/index.html (a real file wins over the SPA redirect in
// netlify.toml). Also writes robots.txt, sitemap.xml and llms.txt.
const SITE = "https://uj-ai-wealth-philanthropy-steelman.netlify.app/";
const ROUTES = {
  root: {
    url: SITE,
    title: "Will AI Wealth Actually Flood AIS/EA Philanthropy Soon?",
    description:
      "A sourced model and dashboard testing how AI-lab-adjacent paper wealth might become flexible AIS/EA funding."
  },
  gd: {
    url: `${SITE}global-development/`,
    title: "Will the AI Philanthropy Wave Reach Global Health and Development?",
    description:
      "A preliminary, sourced note on whether the emerging wave of AI-linked philanthropy will reach global health and development."
  },
  comparison: {
    url: `${SITE}model-comparison/`,
    title: "Comparing models of AI wealth and philanthropy",
    description: "Side-by-side predictions, uncertainty, assumptions, and a separate experimental synthesis calculator."
  },
  aw: {
    url: `${SITE}animal-welfare/`,
    title: "Will AI wealth reach animal welfare?",
    description: "Compare illustrative AI-linked animal-welfare funding scenarios through end-2027. No central forecast is adopted; within-model intervals are conditional on subjective allocation and timing assumptions."
  }
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function seoTags(r: { url: string; title: string; description: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: r.title,
    description: r.description,
    url: r.url,
    isPartOf: { "@type": "WebSite", name: "AI wealth and philanthropy models", url: SITE },
    publisher: { "@type": "Organization", name: "The Unjournal", url: "https://unjournal.org/" }
  };
  return [
    "<!-- discoverability tags (seoPlugin in vite.config.ts) -->",
    `<link rel="canonical" href="${esc(r.url)}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${esc(r.url)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta name="twitter:card" content="summary" />',
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`
  ].join("\n    ");
}

function seoPlugin(): Plugin {
  return {
    name: "ai-wealth-discoverability",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace("</head>", `    ${seoTags(ROUTES.root)}\n  </head>`);
    },
    writeBundle(options) {
      const dir = options.dir ?? "dist";
      const root = readFileSync(join(dir, "index.html"), "utf8");
      const gd = root
        .replace(seoTags(ROUTES.root), seoTags(ROUTES.gd))
        .replace(`<title>${ROUTES.root.title}</title>`, `<title>${ROUTES.gd.title}</title>`)
        .replace(`content="${ROUTES.root.description}"`, `content="${ROUTES.gd.description}"`);
      mkdirSync(join(dir, "global-development"), { recursive: true });
      writeFileSync(join(dir, "global-development", "index.html"), gd);
      const aw = root.replace(seoTags(ROUTES.root), seoTags(ROUTES.aw))
        .replace(`<title>${ROUTES.root.title}</title>`, `<title>${ROUTES.aw.title}</title>`)
        .replace(`content="${ROUTES.root.description}"`, `content="${ROUTES.aw.description}"`);
      mkdirSync(join(dir, "animal-welfare"), { recursive: true });
      writeFileSync(join(dir, "animal-welfare", "index.html"), aw);
      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(join(dir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
      writeFileSync(
        join(dir, "sitemap.xml"),
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          Object.values(ROUTES)
            .map((r) => `  <url><loc>${r.url}</loc><lastmod>${today}</lastmod></url>\n`)
            .join("") +
          "</urlset>\n"
      );
      writeFileSync(
        join(dir, "llms.txt"),
        [
          "# AI wealth and philanthropy models",
          "",
          "> Three sourced models on whether wealth from AI labs will turn into funding for AIS/EA, global health and development, and animal welfare. Each has an uncertainty-aware tracker and evidence log. The model-comparison page preserves an earlier snapshot.",
          "",
          "## Pages",
          "",
          `- [${ROUTES.root.title}](${ROUTES.root.url}): ${ROUTES.root.description}`,
          `- [${ROUTES.gd.title}](${ROUTES.gd.url}): ${ROUTES.gd.description}`,
          `- [${ROUTES.aw.title}](${ROUTES.aw.url}): ${ROUTES.aw.description}`,
          `- [${ROUTES.comparison.title}](${ROUTES.comparison.url}): ${ROUTES.comparison.description}`,
          "",
          "## Data",
          "",
          `- [Tracker data (JSON)](${SITE}tracker-data.json): dated forecast snapshots (model median and 80% interval) and named public commitments, as shown on both pages.`,
          "",
          "More from The Unjournal: https://unjournal.org/",
          ""
        ].join("\n")
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), trackerDataPlugin(), seoPlugin()]
});
