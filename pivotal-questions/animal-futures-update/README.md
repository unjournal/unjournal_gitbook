# Animal Futures tournament update

Public, dated report for tournament collaborators, forecasters, advocates, funders, and policymakers. `site/index.html` is the compact dashboard, `site/report.html` is a shorter shareable report, and `site/report.md` is its EA Forum-ready Markdown. Hypothes.is is embedded on both HTML pages. `snapshot.json` records the question-card values used for this edition and stays outside the published directory.

Metaculus is the live source for forecasts and resolution rules. This site is a checked interpretation, not a live API feed. Do not silently change its checked date without re-reading the source pages.

## Hosting

Dedicated Netlify site under the `daaronr` team: `https://uj-animal-futures-update.netlify.app/`, site ID `be7830b5-b011-4d32-8437-4c21d4275b8f`. Publish **only `site/`** and pass that explicit ID; the parent repo has an unrelated Netlify link. No repository-root deployment.

Deploy: `netlify deploy --prod --dir=site --site be7830b5-b011-4d32-8437-4c21d4275b8f --no-build` from this project source folder (the folder containing `netlify.toml`), not from inside `site/`. Retain `netlify/edge-functions`: a 3 October deploy omitted the aggregate engagement counter, which was restored on 5 October. After each deploy, verify `/__engagement/summary` returns JSON for `animal_futures_update` with `validation: false`, as well as checking the dashboard, report and feed. The existing ten-day maintenance automation now uses this source-folder command.

## Ten-day update

1. Open the live [tournament](https://www.metaculus.com/tournament/33016/), load all question cards and leaderboard rows, and inspect all new or changed resolutions and substantive comments. Compare the public counts with `snapshot.json`. Do not infer revision frequency or distinct-human counts from per-question counts.
2. Check each forecast and comment used in the lead report against its own question page, its resolution criteria, and a relevant primary source when an external event is claimed. Distinguish a reported event, an actual resolution, and a crowd forecast.
3. Update `snapshot.json` and the pages and feed in `site/` together. Keep the first screen brief. Put methodology, comparisons, and less central questions behind `<details>` or source links. Add a dated feed entry describing material changes; if nothing material moved, say that briefly in the private update and do not manufacture a public narrative.
4. Scan proposed public files for evaluator attribution, private correspondence, individual payment figures, internal assessments of identifiable people, and pseudonymous IDs. Do not publish any such material.
5. Check links and HTML, preview both pages locally at desktop and mobile widths, deploy the site with its explicit ID, then read back the production URL and both pages. Distinguish local, deployed, and live verification in the update to David.
6. Tell David what changed and what did not, with the current public links. Inform the specified collaborators through the agreed channel once recipients and method are supplied; until then, the public RSS feed is the opt-in notification route.

The desired cadence is every ten days from September 23, 2026. The November 13, 2026 check is complete; the next check is due November 23. David subsequently requested a public refresh, so the report and dashboard now carry the November 13 figures. The main implications remain steady. Continue through the July 1, 2027 tournament close, then do a post-tournament results report rather than quietly stopping.

## Copy and discussion

Use direct, source-linked prose. Hypothes.is is for annotations to this analysis; Metaculus comments are for forecasts, evidence, and question criteria. Public annotations and participant responses should be reviewed at each update. Do not describe a suggestion as an organizer decision until it is confirmed.

## October 23 continuation

The new Mexico question comment requests resolution, but the platform still lists it open. Its target is the first available official 2027 forecast, not realized consumption. Verify the first-release USDA source before accepting a proposed numeric result; the PDF was inaccessible this cycle. Public Plant Based Cities coverage cites the sales forecast as a possible benchmark, without documenting a changed decision. Direct article access was geographically blocked; its primary text was available in the search index. The three dashboard Hypothes.is comments from October 14 were already addressed in the site; preserve those improvements. The report had no public annotations.

Prior dated data are retained in `snapshots/` outside the published directory. Comparator tournament counts remain explicitly dated October 3; do not present them as refreshed. A public EA Forum quick take by David is visible as of the November 13 check. Publication on other platforms is not established; do not infer approval for additional posts or messages.

Published source commit `e595b01` as Netlify deployment `6adb2c336ae3b19efe1bda60`, using this source folder and its edge-function configuration. Production read-back confirmed October 23 content on `/` and `/report.html`, the October 23 RSS item on `/feed.xml`, and JSON with `site: animal_futures_update` and `validation: false` on `/__engagement/summary`. Desktop and 390px phone previews passed; the full question table stays within its scrolling container. The feed/summary access blocker from the previous run is cleared.

## November 13 check

Reviewed all 21 question cards and the changed forecast pages, the expanded leaderboard, and public feedback. The official resolved count remains 1. The additional Mexico reply repeats the resolution request without new evidence. No material change to the headline implications or new confirmed decision use was found; the public HTML, Markdown, RSS, and `snapshot.json` remain the October 23 edition. Question-level observations and computed comparisons are retained in `checks/2026-11-13.json` outside `site/`.

Production dashboard, report, feed, and engagement-summary reads succeeded. The summary still returns `site: animal_futures_update` and `validation: false`. The USDA PDF remains inaccessible, so its proposed numeric result is unverified. The next check should revisit that resolution, any new discussion or decision use, and the growing coverage of the September questions.

## November 13 requested refresh

After the scheduled check, David requested an update to the public report. Refreshed the dashboard, short HTML/Markdown report, snapshot, and RSS together from today’s checked rows; archived the October 23 snapshot. Counts and selected forecasts are current as of November 13; comparator counts remain explicitly dated October 3. No new official resolution or documented changed decision is claimed. Keep the Hypothes.is prompt near the top. The original no-public-update assessment in the check record describes the earlier automated pass; this requested refresh supersedes that publication decision.

A fresh-context consistency review passed after two tooltip count fixes (shrimp agreements and Save Our Bacon). The discrepancy record is in `checks/2026-11-13-refresh-review.json`. All question rows match today’s observations; local links, inline JS, feed/sitemap XML, desktop, and 390px phone previews passed. Because the parent repository has unrelated dirty work, publish an archive of the pushed project source, including `netlify.toml` and `netlify/edge-functions`, rather than the working tree.

Published the requested refresh from pushed source commit `d245516c801990f9701a40aaa766a366b8c81e7c` as Netlify deployment `6af74473c6e88a5efc629e39`. Production reads at 17:11 UTC on November 13 returned HTTP 200 for dashboard, report HTML, report Markdown, feed, and engagement summary. HTML content matched committed source after Netlify pretty-URL normalization; Markdown and feed matched byte-for-byte. The engagement endpoint returned `site: animal_futures_update`, `validation: false`. Details: `checks/2026-11-13-release.json`. The next scheduled check remains due November 23.

## November 13 sharing

David requested sharing the refreshed report across relevant social and forum pages. Verified updates are recorded in `outreach/2026-11-13.json`: The Unjournal LinkedIn page, existing Bluesky Animal Futures thread, EA Forum tournament announcement, and a reply under David’s Animal Futures quick take. All identify the AI-prepared report. Do not duplicate these posts. Facebook, Mastodon, personal X, and the Metaculus notebook remain pending sign-in/access; no recurring social publication was enabled.
