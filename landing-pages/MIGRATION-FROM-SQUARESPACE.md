# Moving the main Unjournal site off Squarespace

Last reconciled: 2026-09-13 (Codex handoff note merged with Claude Code audit results)

Shared plan, evidence and checklist for Codex, Claude Code and human collaborators. Goal: replace the
Squarespace site at `www.unjournal.org` with pages we host and control, without losing inbound links,
search ranking, Google Ad Grants, or email — and with a site that reads as a credible research
organisation, not a template or an AI-generated page.

- **Status:** planning. Nothing has been cut over. Squarespace still serves `www.unjournal.org`.
- **Owner:** not yet assigned (decision D12).
- **Do not treat any option below as selected until it is recorded in the decision log (section 3).**
- This file supersedes `SQUARESPACE-LINKING-GUIDE.md` and `SQUARESPACE-LANDING-PAGE-LINKS.md` as the
  plan. Those two describe the transitional set-up in which Squarespace stays the main site.

## How the planning sources fit together

| Source | What it governs | How to use it |
| --- | --- | --- |
| This file | Evidence, decisions, and the step-by-step checklist for the website move | Keep current. Record decisions here with dates. |
| This repo's `landing-pages/` | Current replacement pages (served at `info.unjournal.org`) | Treat as working material; verify against the live server before changing or deploying (see section 5). |
| Notion: Infrastructure & Consolidation Hub → *Playbooks B (Squarespace exit)* and *F (make our pages look institutional)* | Strategy and rationale | Planning intent. Playbook B recommends Netlify + Quarto/Astro; that is a recommendation, not a decision. |
| Notion: *Restructuring Source of Truth* | Overall restructuring plan | Lists the website move as a later workstream (owner TBD) and says the public site needs its own migration plan — this file. |
| Coda: *Tech audit* page | Historical cost and platform recommendation | Rationale only ("eliminate Squarespace, migrate to Netlify"). |
| `SQUARESPACE-LINKING-GUIDE.md`, `SQUARESPACE-LANDING-PAGE-LINKS.md` | Legacy cross-linking instructions | Historical. Assume Squarespace remains home base. |

---

## 1. What exists today (observed 2026-09-13)

| Thing | Current state |
| --- | --- |
| `www.unjournal.org` | Squarespace 7.1, "Core" website plan (billing appears monthly — confirm). Canonical host `https://www.unjournal.org`; `unjournal.org` and `http://` 301 to it, keeping path and query. |
| Squarespace content | 22 sitemap URLs: `/`, `/home` (duplicate of `/`), `/about`, `/commissioned-evaluations-1`, `/contact` (not in nav), `/for-evaluators`, `/for-researchers`, `/getting-involved`, `/pivotal-questions`, `/team`, `/news`, and 12 posts under `/news/<slug>`. No custom redirects. About 45 images on Squarespace's CDN (24 team headshots). No downloadable files. |
| Squarespace features in use | Contact form on `/contact`; site-wide "We value your feedback" popup (links to the Coda stakeholder form); RSS at `/news?format=rss`; built-in `/search` (unlinked). No newsletter signup, donations or commerce. |
| Tracking | GTM `GTM-P9XSTK8T` and GA4 `G-G908FSQH5J` on every page; Google Ads tag only on `/`, `/home`, `/commissioned-evaluations-1`. Cookiebot loads via GTM but errors ("domain not authorised"), so no working consent banner. No Search Console meta tag (may be verified via DNS/GA). |
| Domain | Registered with Squarespace Domains (moved from Google Domains). Auto-renews each September — check the payment method before then. Cancelling the website plan does not cancel the domain. |
| DNS | Nameservers `ns-cloud-c1..c4.googledomains.com`. `www` CNAME → `ext-cust.squarespace.com`; apex A → Squarespace; `info` A → Linode; MX → Google Workspace. **MX and any TXT/SPF/DKIM records must survive every change.** |
| `info.unjournal.org` | ~25 static pages from this folder, nginx on the Linode VPS. Pages differ between git, this folder and the server (section 5). No robots.txt, sitemap or favicon; canonicals inconsistent. |
| Design | Squarespace: Libre Baskerville headings, Arial-rendered body, black on white, green/orange ring logo, flat nav that wraps to two lines, no hero imagery. `info` pages: Libre Baskerville + Georgia, navy/teal on cream, stat tiles, numbered step cards, pill chips, dark CTA band. |

Coverage of Squarespace URLs by existing pages here: equivalents exist for home, about, team,
for-evaluators, for-researchers (`for-authors.html`), getting-involved, pivotal-questions and the prize
post. Partial: contact (no form), news (5 of 12 posts, linking back to Squarespace). **Missing:**
commissioned evaluations; 6 older posts.

### Broken on the live Squarespace site today
- Homepage "Latest updates" renders empty (PubPub feed blocked by CORS); donut-chart counts are hand-typed.
- Footer "contact@unjournal.org" links to `http://squarespace.com`, not `mailto:`.
- Footer code injection throws a JavaScript error on every page (the org-chart bar never shows).
- `/news` has the title of one post; one post still has template slug `blog-post-title-one-9n6cj` dated 2019.
- Homepage links to `info.unjournal.org/donate/`, an old server-side copy rather than the current page.

---

## 2. Links we must not break

Inventory sources: Squarespace sitemap; local repos (GitBook, landing pages, Coda mirrors, workshop
sites); all 203 PubPub pubs; David's EA Forum and LessWrong posts and comments; Bluesky; ROR/Wikidata;
Wayback Machine request logs. Regenerate before cutover.

| Path | Refs | Main sources | Rule |
| --- | --- | --- | --- |
| `/` | 805 (527 public) | every PubPub pub (logo, nav, footer), 43 forum pages, Bluesky, ROR, Wikidata | keep |
| `/team` | 341 | Coda email templates already sent to authors/evaluators; 3 forum posts | keep permanently |
| `/news/2024-25-evaluator-prize-winners` | 40 | outreach emails, landing pages | keep |
| `/commissioned-evaluations-1` | 13 | GitBook ToC, landing pages, EA Forum funding post; Ads tag | keep, or 301 if renamed (D5) |
| `/news`, `/news?format=rss` | 11 | forum posts, landing pages | keep; serve the feed at the same URL |
| `/pivotal-questions`, `/about`, `/getting-involved`, `/for-evaluators`, `/for-researchers`, `/contact` | 2–8 each | forum posts, GitBook, Google index | keep |
| all 12 `/news/<slug>` | 1–8 each | LinkedIn (dlvr.it), Bluesky, forum comments | keep every slug |
| `/home` | — | Squarespace duplicate | 301 → `/` |

Already broken, cheap to fix at cutover:
- Trailing backslash variants (`/team%5C`, `/about%5C`, `/%5C` …) from markdown exports → strip `\`/`%5C`.
- `/news/stakeholder-feedback` (truncated slug in grant drafts) → full post.
- `/guidelines` (linked from `unjournal-database/docs/public/PUBLIC_OVERVIEW.md`, never existed) → fix link or 301 to GitBook guidelines.

General rules:
- Keep `unjournal.org/*` and `http://*` → `https://www.unjournal.org/*` (single 301, path and query kept).
- `/x/` → `/x`; `/x.html` → `/x`. No redirect chains; never blanket-redirect to the homepage.
- When `info.unjournal.org` is merged into www, every `/<page>`, `/<page>.html`, `/<page>/` gets a 301 to its www path. About 5,700 references to `info.` exist across 17 local repos, plus Google Ads final URLs.
- ~40 links inside the info pages point at Squarespace URLs; make them relative.

---

## 3. Decisions

Options are ordered with the current recommendation first. Trade-offs are set out in the September
2026 decision form prepared for David; record outcomes in the log below.

| ID | Decision | Options | Status |
| --- | --- | --- | --- |
| D1 | Sequencing | clean up → design → build on staging → cut over / move existing pages now, redesign later / defer 90+ days | open |
| D2 | Hosting for www | Netlify deployed from git / Linode nginx / Cloudflare Pages | open |
| D3 | Repo | dedicated website repo (history carried over) / this repo's `landing-pages/` | open (see log) |
| D4 | Build tool | Eleventy / Astro / Quarto / plain HTML + include script | open |
| D5 | URL policy | keep all Squarespace paths and merge `info.` into www with 301s / new slugs with 301s | open |
| D6 | News posts | port all 12 at the same slugs / recent only / move elsewhere | open |
| D7 | Design direction | evolve the brand into a sober scholarly site / faithful Squarespace look / keep the info look / human designer | open |
| D8 | Design process | design canvas in Claude Code / Claude Design with handoff / designer in Figma / straight to staging | open |
| D9 | Homepage live content | build-time pull of latest evaluations / hand-updated / none | open |
| D10 | Contact and popup | email + existing Coda forms, drop popup / Netlify form / embedded Coda form | open |
| D11 | Analytics | GA4 + Ads conversion tag with consent banner, drop GTM/Cookiebot / cookieless analytics / both | open |
| D12 | Owner and editing | named owner; agents edit via PRs with previews / add a git-based CMS | open |
| D13 | Pages where live ≠ git | live wins, then review local edits as diffs / local wins / page by page | open |
| D14 | Pending team/org-chart/news update on info | deploy / hold / check first | open |
| D15 | Domain registrar | keep Squarespace Domains for now / transfer after cutover | open |

### Decision log

| Date | Decision | Rationale | Owner |
| --- | --- | --- | --- |
| 2026-09-13 | Provisional: `landing-pages/` in this repo is the working home until D3 is decided. | It holds the existing replacement pages. Recorded by an agent, not yet confirmed by David; a dedicated website repo is the recommended alternative (separates site deploys from GitBook sync). | Pending David |
| 2026-09-13 | Netlify is not selected. | Recommended by Coda audit and Notion Playbook B, but the working pages run on Linode; D2 is open. | Pending David |

---

## 4. Checklist

### Phase 0 — Protect what exists (no visible change)
- [ ] Confirm the domain's payment method in Squarespace Domains before the September renewal.
- [ ] Export the full DNS zone and store it privately.
- [ ] Confirm who has admin on GA4, Search Console, Google Ads / Ad Grants, Squarespace, and the Netlify team; add a second admin to each.
- [ ] Verify `unjournal.org` as a Domain property in Search Console (DNS TXT) to monitor coverage through the move.
- [ ] Reference mirror of the Squarespace site (`wget --mirror --page-requisites --convert-links`) plus Squarespace's WordPress export for the posts. Store privately.
- [ ] Download all Squarespace-hosted images, including team headshots used via `team_photos.json`; switch `generate_team_html.py` to local copies.
- [ ] Record the Squarespace billing cycle so cancellation timing is known.

### Phase 1 — Make `info.unjournal.org` match git
- [ ] Keep private working files (email drafts, correspondence) out of this public repo.
- [ ] Resolve pages where server, folder and git disagree (D13), then commit.
- [ ] Commit live-but-untracked files (`impact.html`, `legal-scholarship-candidates.html`, `evaluation-workflow-simplified.png`).
- [ ] Remove server-only leftovers (old `/<page>/index.html` copies, `*.bak`, `update-news.py`, `follow-old.html`, duplicate `index.htmL`); add 301s `/x/` → `/x`.
- [ ] nginx: deny `.md .py .bak .json .toml`, custom 404, `server_tokens off`.
- [ ] Point the Squarespace homepage's donate link at `/donate`.

### Phase 2 — Build the new site on a staging URL (`noindex`)
- [ ] Repo, host and build tool per D2–D4. Deploys come from git only — no CLI deploys from a laptop folder.
- [ ] Shared layout (header, nav, footer) and one stylesheet; no per-page inline style blocks.
- [ ] Design system per D7–D8, written down in the repo. Exported design-tool HTML is input to the repo, never a second source of truth.
- [ ] Port all 22 Squarespace URLs; write the commissioned-evaluations page and the 6 missing posts.
- [ ] News as markdown at identical slugs; RSS at `/news?format=rss` and `/news/rss.xml`.
- [ ] Homepage live content per D9, generated at build time (no client-side fetches that can silently fail).
- [ ] Contact/feedback per D10. If a Netlify form is used, run `netlify_forms_check.py` after deploying.
- [ ] Analytics per D11; Ads conversion tracking must keep working (Ad Grants requirement).
- [ ] SEO: unique title and meta description, one `h1`, self-canonical on `https://www.unjournal.org/…`, https `og:image`, `robots.txt`, `sitemap.xml`, favicon, JSON-LD `Organization` + `Periodical` (ISSN 3071-2173).
- [ ] Accessibility: alt text, heading order, contrast, keyboard focus, reduced motion.

### Phase 3 — Redirect map
- [ ] One redirects file covering section 2, `/home`, slash/`.html`/`%5C` rules, all `info.` paths, known broken slugs.
- [ ] Script that reads the URL inventory and asserts each old URL returns 200 or a single 301 to a 200.
- [ ] Update links we control: GitBook, Coda email templates, social bios, Google Ads final URLs, email signatures.

### Phase 4 — Pre-launch review
- [ ] Link checker and redirect script pass on staging.
- [ ] A person reviews mobile and desktop screenshots of every page.
- [ ] Credibility review (section 6) by someone who did not build it.
- [ ] Lighthouse performance, accessibility and SEO ≥ 90 on home and team.

### Phase 5 — Cutover
- [ ] Lower TTL on `www`/apex to 300s, 48h ahead.
- [ ] Add the custom domain on the host; point `www` and apex; confirm TLS for both names.
- [ ] Verify immediately: MX unchanged (send/receive test), top 10 paths, redirect script on production, Ads landing pages, GA4 realtime.
- [ ] Submit the new sitemap in Search Console; request indexing for home, team, about.
- [ ] Update Google Ads final URLs the same day if any slug changed.
- [ ] Rollback: repoint `www` to `ext-cust.squarespace.com` (keep Squarespace paid until Phase 6).

### Phase 6 — After
- [ ] Watch Search Console coverage and 404s weekly for 4 weeks; add redirects for real misses.
- [ ] Cancel the Squarespace website plan (not the domain) about a month after cutover.
- [ ] Retire `info.unjournal.org` as a separate site; keep its 301s permanently.
- [ ] Update this file, Notion Playbook B, and repo docs.

---

## 5. This folder vs the live server (audit 2026-09-13)

- Live = local, newer than git: about, contact, donate, evaluations, evaluator-pool, follow, for-authors, forecasting-tournament-thanks, getting-involved, index, lottery.
- Live matches neither local nor git: benefits, for-evaluators, evaluator-prizes-2024-25, home, pivotal-questions.
- Local newer than live (not deployed): news, team, org-chart.
- Live but untracked: `impact.html`, `legal-scholarship-candidates.html`.
- nginx `try_files $uri $uri.html $uri/` lets `/donate` and `/donate/` serve different files (also follow, lottery, evaluator-prizes-2024-25).
- `update-news.py` is not scheduled anywhere; it last rewrote the server's `follow/index.html` in April 2026.
- Hazards removed: `landing-pages/.netlify/` (publish dir pointed at the whole repo) was deleted locally on 2026-09-13. The repo-root `.netlify/state.json` still binds to the uj-aw-overview site — never run `netlify deploy` from the repo root.

---

## 6. Credibility: not looking template-made or AI-generated

The audience is researchers, funders and policy people. Credibility comes mostly from specific content
and consistency, not visual effects.

Do:
- Lead with checkable specifics: real evaluation packages with titles, DOIs, dates and rating intervals; named people with real photos; dated news.
- One typographic system across every page, a comfortable reading measure, consistent spacing.
- Plain, specific copy in our own voice; say what we do and for whom in the first two sentences.
- "Last updated" dates on pages that go stale.

Avoid (several are on `info.unjournal.org` now):
- Rounded stat tiles with `100+` numbers, numbered-circle step cards, pill chips, gradient CTA bands, an arrow on every button.
- Cream background + serif headline + single accent as a default look.
- Generic claims ("meaningful ways to contribute to rigorous, open science") and sections that exist because templates have them.
- Empty or broken widgets.

Open question: the info pages carry a footer line ("created with the help of Claude Code"). Decide
whether that stays on the main site's institutional pages, moves to an about/colophon page, or goes.

Reference points our audience trusts: NBER, Institute for Replication, Center for Open Science, eLife,
Our World in Data, GiveWell. Borrow their restraint, not their layouts.
