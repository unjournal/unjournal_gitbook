# Moving the main Unjournal site off Squarespace

Last reconciled: 2026-11-03 (DNS cutover completed; `info` certificate renewal still pending)

Shared plan, evidence and checklist for Codex, Claude Code and human collaborators. Goal: replace the
Squarespace site at `www.unjournal.org` with pages we host and control, without losing inbound links,
search ranking, Google Ad Grants, or email — and with a site that reads as a credible research
organisation, not a template or an AI-generated page.

- **Status:** Phase 5 cutover is in progress. On 2026-11-03, the apex, `www`, and `info` DNS records
  were pointed to Netlify; `www` was made the primary Netlify domain; and the temporary `noindex`
  header was removed in website PR #7. The main certificate covers `unjournal.org` and
  `www.unjournal.org`, and the main site passes launch checks. The certificate does not yet include
  `info.unjournal.org`: Netlify still sees a cached pre-cutover `www` record and will retry after the
  former four-hour TTL expires. Some visitors may likewise see cached Squarespace responses until
  then. Do not cancel Squarespace yet.
- **Owner:** David Reinstein for now (others may be brought in later).
- **Only options recorded in the decision log (section 3) count as decided.**
- This file supersedes `SQUARESPACE-LINKING-GUIDE.md` and `SQUARESPACE-LANDING-PAGE-LINKS.md` as the
  plan. Those two describe the transitional set-up in which Squarespace stays the main site.

## How the planning sources fit together

| Source | What it governs | How to use it |
| --- | --- | --- |
| This file | Evidence, decisions, and the step-by-step checklist for the website move | Keep current. Record decisions here with dates. |
| Private repo `unjournal/unjournal-website` | Canonical replacement website and Netlify deployment source | Make website changes by pull request; `main` deploys production. PR #3 merged on 2026-11-02. |
| This repo's `landing-pages/` | Historical source pages and the migration plan; some pages are still served at `info.unjournal.org` | Treat the HTML as reference material, not the replacement site's source of truth. Verify against the live server before changing or deploying it (see section 5). |
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

### Current implementation snapshot (verified 2026-11-03)

- Authoritative DNS and the Google and Cloudflare public resolvers now return apex A `75.2.60.5`,
  `www` CNAME `unjournal-website.netlify.app`, and `info` CNAME
  `unjournal-website.netlify.app`. `api.unjournal.org` remains on the Linode host. The former website
  records had a 14,400-second TTL, so resolver caches may continue serving Squarespace for up to four
  hours after the change.
- `https://unjournal-website.netlify.app` is the replacement production site. Website PR #7 merged
  at commit `ff02258` and removed the temporary `X-Robots-Tag: noindex` header. Netlify now treats
  `www.unjournal.org` as the primary domain; the apex and `info` redirect to it.
- Website PR #3 merged to `main` at commit `e417fee`. The production Netlify address
  (`https://unjournal-website.netlify.app`) serves the merged site. It uses the shared landing layout for the homepage,
  For researchers, and For evaluators, and exposes only the Plain style. Alternative style assets
  remain in the repository for possible post-migration use.
- Main-branch GitHub CI and the Netlify production deployment passed. The full historical URL
  inventory returned 22 direct 200s and 10 single permanent redirects. Three URLs that were already
  404 on Squarespace remain 404; there were no newly broken inventoried links.
- The old GTM/Cookiebot blocks are removed. A first-party choice now loads GA4 and the Google Ads base
  tag only after opt-in; browser testing confirmed decline and reopen behavior without opting in.
- DNS verification succeeded and Netlify issued a Let's Encrypt certificate for `unjournal.org` and
  `www.unjournal.org`. Renewal to include the `info` alias is pending expiry of Netlify's cached old
  `www` record. Direct launch checks at Netlify returned 200 for the homepage, For researchers, For
  evaluators, team, news, robots.txt, and sitemap.xml. `/home`, `/for-authors`, and
  `/commissioned-evaluations-1` each make the intended single 301. Canonical URLs and the sitemap use
  `https://www.unjournal.org`; no `noindex` remains.
- MX, SPF, DKIM, DMARC, Google verification TXT records, and `api.unjournal.org` were preserved.

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

Decided by David on 2026-09-13 through a decision form that set out the options and trade-offs for
each question. Record any later change in the log below rather than editing the table silently.

| ID | Decision | Chosen (2026-09-13) |
| --- | --- | --- |
| D1 | Sequencing | Clean up first, then design, build on a staging URL, then cut over (target ~8 weeks). |
| D2 | Hosting for www | Netlify, deployed from git only (no CLI deploys from local folders). |
| D3 | Repo | New dedicated **private** repo for the website, with `landing-pages/` history carried over. Created 2026-09-13: `unjournal/unjournal-website` (history kept via filter-repo, prize email drafts stripped from all history). |
| D4 | Build tool | Eleventy. Existing pages drop in as-is and move into shared layouts one at a time. |
| D5 | URL policy | Keep every Squarespace path except `/commissioned-evaluations-1` → `/commission-evaluations` (301; update the Google Ads final URL at cutover). Merge `info.unjournal.org` into www with 301s from every old address. |
| D6 | News posts | Port all 12 posts at their existing slugs; keep `/news?format=rss` working; fix the template post's date. |
| D7 | Design direction | **Landing-page layout in the Plain style for launch.** Do not expose a public style picker during the migration. Keep the Lens, Tesserae and Studio assets for possible post-launch use. Updated 2026-11-01; implemented in unjournal-website PR #3. |
| D8 | Design process | Design canvases (13 Sep; 28 Sep with palettes from David's own photos and painting), then a page explorer comparing layouts × styles on real pages (unjournal-website PR #1). Layout and style decided 2026-10-12 (see D7). |
| D9 | Homepage live content | Rebuilt nightly from PubPub and the database; never a client-side widget that can render empty. |
| D10 | Contact and popup | Contact page with the email address and links to existing Coda forms; drop the popup, put the feedback link in the footer and on News. |
| D11 | Analytics | Keep GA4 and the Google Ads tag; drop GTM and Cookiebot; add a small consent banner (Google consent mode). David Reinstein holds admin on GA4, Search Console and Google Ads (confirmed 2026-10-07); add a second admin before cutover. |
| D12 | Owner and editing | David owns it for now. Claude/Codex make changes as pull requests with preview links; David approves. Revisit a web editor if others start editing. |
| D13 | Pages where live ≠ git | Live wins. Local uncommitted edits to those pages are kept for review as diffs. |
| D14 | Pending team/org-chart/news update | Deploy. |
| D15 | Domain registrar | Keep Squarespace Domains for now; revisit after cutover. |
| D16 | "Created with the help of Claude Code" footer | Move to a single "How this site is made" note linked from the footer. |

### Decision log

| Date | Decision | Rationale | Owner |
| --- | --- | --- | --- |
| 2026-09-13 | D1–D16 as above, from David's answers to the decision form. | Trade-offs set out in the form; all recommendations accepted. | David |
| 2026-11-01 | D7 update: launch with the Plain style only; defer the public style picker until after the Squarespace migration. | Move first with a restrained design; reconsider the picker once the new site and old URLs are safely established. | David |
| 2026-10-12 | D7: landing-page layout, Plain style by default, visitor style picker (Lens, Tesserae, Studio). | "C is best" on 7 Oct could mean either canvas's C; asked again, David chose landing + Plain "for now" and wants visitors able to pick a style. | David |
| 2026-09-13 | Superseded: "`landing-pages/` in this repo is the working home" (provisional agent entry). | D3 chose a dedicated private website repo. `landing-pages/` stays the source until that repo exists, then becomes a pointer. | David |
| 2026-09-13 | Superseded: "Netlify is not selected." | D2 chose Netlify, deployed from git only. | David |

---

## 4. Checklist

### Phase 0 — Protect what exists (no visible change)
- [ ] Confirm the domain's payment method in Squarespace Domains before the September renewal.
- [ ] Export the full DNS zone and store it privately.
- [ ] Confirm who has admin on GA4, Search Console, Google Ads / Ad Grants, Squarespace, and the Netlify team; add a second admin to each.
- [ ] Verify `unjournal.org` as a Domain property in Search Console (DNS TXT) to monitor coverage through the move.
- [ ] Reference mirror of the Squarespace site (`wget --mirror --page-requisites --convert-links`) plus Squarespace's WordPress export for the posts. Store privately.
- [x] Download the 22 team headshots used via `team_photos.json` into `img/team/` and point `team.html` at them (2026-09-13). Other Squarespace images (news posts) still to save with the mirror.
- [ ] Record the Squarespace billing cycle so cancellation timing is known.

### Phase 1 — Make `info.unjournal.org` match git
- [x] Keep private working files (email drafts, correspondence) out of this public repo (prize email drafts removed 2026-09-13; `landing-pages/.gitignore` added).
- [x] Resolve pages where server, folder and git disagree (D13: live wins), then commit (2026-09-13).
- [x] Commit live-but-untracked files (`impact.html`, `legal-scholarship-candidates.html`, `evaluation-workflow-simplified.png`) (2026-09-13).
- [x] Remove server-only leftovers (old `/<page>/index.html` copies, `*.bak`, `update-news.py`, `follow-old.html`, duplicate `index.htmL`); add 301s `/x/` → `/x` (2026-09-13; moved to `/root/backups/info.unjournal.org/removed-2026-09-13/` on the server).
- [x] nginx: 404 for dotfiles and `.md .py .sh .toml .bak`, custom `404.html`, `server_tokens off` (2026-09-13; config copy in `ops-internal/linode/nginx/`). JSON left servable because `/cruxes/` may need it.
- [ ] Point the Squarespace homepage's donate link at `/donate`.

### Phase 2 — Build the new site on a staging URL (`noindex`)
- [x] Repo and build tool per D3–D4: `unjournal/unjournal-website` (Eleventy 3, pages copied byte-identical, `_redirects` draft, CI with privacy scan and link check, `tests/check_redirects.py`) (2026-09-13).
- [x] Link the repo in Netlify (daaronr nonprofit team, site `unjournal-website`); build settings come from `netlify.toml`, deploys come from git only, and no custom domain is attached yet (verified 2026-11-01).
- [ ] Shared layout (header, nav, footer) and one stylesheet; no per-page inline style blocks.
- [x] Design direction per D7–D8 is written down in the website repo and implemented for the homepage, For researchers, and For evaluators (PR #3, merged 2026-11-02). Launch with Plain only; other pages can move into the shared layout incrementally after migration.
- [x] Port all 22 Squarespace URLs (2026-10-07): `/commission-evaluations` written from the Squarespace page, `/for-researchers` renamed from `for-authors.html` with a 301, and all 12 news posts built at their existing slugs with their images rehosted. The commissioning page links to the individual-sponsorship proposal (https://uj-prioritization-dashboard.netlify.app/sponsor/), described as an idea under discussion; that page links back.
- [ ] Open content decisions: `/news/2024-25-evaluator-prize-winners` and `/evaluator-prizes-2024-25` both exist (decide which is canonical, 301 the other), and `/evaluations` overlaps `/commission-evaluations`.
- [x] News at identical slugs; `/news` lists all 12 locally; RSS generated at build time at `/news/rss.xml`, with `/news?format=rss` redirecting to it (2026-10-07). `tests/check_redirects.py` passes against staging with nothing broken.
- [ ] Homepage live content per D9, generated at build time (no client-side fetches that can silently fail).
- [ ] Contact/feedback per D10. If a Netlify form is used, run `netlify_forms_check.py` after deploying.
- [x] Analytics code per D11 merged in PR #3: GA4 (`G-G908FSQH5J`) and the Ads base tag (`AW-16652212666`) load only after opt-in; old GTM/Cookiebot code is removed. Verify GA4 realtime and any Ads conversion actions after the production domain is attached.
- [ ] SEO: unique title and meta description, one `h1`, self-canonical on `https://www.unjournal.org/…`, https `og:image`, `robots.txt`, `sitemap.xml`, favicon, JSON-LD `Organization` + `Periodical` (ISSN 3071-2173). PR #3 adds the site-wide launch files and CI now verifies the title, description, Open Graph title, canonical URL, and single `h1` on all 35 sitemap pages. Complete the remaining Open Graph image and structured-data audit before checking this off.
- [ ] Accessibility: alt text, heading order, contrast, keyboard focus, reduced motion.

### Phase 3 — Redirect map
- [ ] One redirects file covering section 2, `/home`, slash/`.html`/`%5C` rules, all `info.` paths, known broken slugs. PR #3 covers the inventoried paths and canonical hosts; audit all non-inventoried `info.` `.html` and slash variants before checking this off.
- [x] Script reads the URL inventory and asserts each old URL returns 200 or a single 301 to a 200. It passed against Netlify production on 2026-11-02 (22 direct 200s, 10 one-hop 301s, no newly broken URLs).
- [ ] Update links we control: GitBook, Coda email templates, social bios, Google Ads final URLs, email signatures.

### Phase 4 — Pre-launch review
- [x] Link checker and redirect script pass on the Netlify production deployment (477 page/asset links on a clean build; historical redirect inventory passed on 2026-11-02).
- [ ] A person reviews mobile and desktop screenshots of every page.
- [ ] Credibility review (section 6) by someone who did not build it.
- [ ] Lighthouse performance, accessibility and SEO ≥ 90 on home and team.

### Phase 5 — Cutover
- [ ] Lower TTL on `www`/apex to 300s, 48h ahead. (Missed: Squarespace records remained at four hours; allow caches to expire.)
- [x] Remove the temporary `X-Robots-Tag: noindex` header from `netlify.toml` in `unjournal-website` (website PR #7, merged 2026-11-03).
- [x] Add the custom domains on Netlify; point `www`, apex, and `info`; make `www` primary; confirm TLS for the apex and `www` (2026-11-03).
- [ ] Renew the Netlify certificate after the old `www` cache expires and confirm that it includes `info.unjournal.org`.
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
- Resolved 2026-09-13: git now matches the server for every page; the team/org-chart/news update is deployed; old directory copies redirect. Local uncommitted edits to benefits, evaluator-prizes-2024-25, for-evaluators, home and pivotal-questions were kept aside for review, not published.
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


## Content update: initiative mentions (2026-10-23)

The homepage, About page, and impact page now describe contributions to Animal Futures and The Alignment Journal. The canonical copy is in `landing-pages/index.html`, `about.html`, and `impact.html`; matching replacement-site edits were approved by David and merged in [unjournal-website PR #5](https://github.com/unjournal/unjournal-website/pull/5) on 2026-10-25 (merge commit `f41e18da738c6ffa009c9e7a2dcd4b2e88b06837`). The replacement-site build, privacy scan, and 374 internal-link checks passed locally; GitHub CI and the Netlify preview checks also passed. The new About section was verified in the [deploy preview](https://deploy-preview-5--unjournal-website.netlify.app/about#related-initiatives).

The [GitBook homepage](https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/) and [initiative descriptions](https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/parallel-partner-initiatives-and-resources) were verified live after the source push. Reusable copy and source links are in `management-tech-details-discussion/communication-and-style.md`.

The three info.unjournal.org pages matched their previous committed versions before editing. Their new versions are committed and pushed, but **not deployed**: SSH authentication failed (`Permission denied (publickey)`). Next deployment step: restore the documented server access, publish only the reviewed files from clean, pulled, pushed main, then fetch each served page and compare it to the committed bytes. The replacement-site merge does not switch the main domain or deploy these files to info.unjournal.org.

**Production verification (2026-10-25):** PR #5 is merged and its merge-commit CI build passed. The homepage, [About page](https://unjournal-website.netlify.app/about#related-initiatives), and [impact page](https://unjournal-website.netlify.app/impact) are deployed at the replacement site's production address. HTTPS read-back confirmed that all three pages' text matches merged main; Netlify rewrites internal links to clean URLs. The local replacement-site checkout was fast-forwarded to merged main, preserving the existing untracked folder. Future edits follow the same PR-and-deploy workflow; verify the served text against the merged source after deployment. The main-domain migration and the separate info.unjournal.org SSH blocker remain outside this completed merge.
