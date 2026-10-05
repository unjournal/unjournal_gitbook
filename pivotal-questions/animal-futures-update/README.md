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

The desired cadence is every ten days from September 23, 2026. The October 3, 2026 check is complete; the next check is October 13. Continue through the July 1, 2027 tournament close, then do a post-tournament results report rather than quietly stopping.

## Copy and discussion

Use direct, source-linked prose. Hypothes.is is for annotations to this analysis; Metaculus comments are for forecasts, evidence, and question criteria. Public annotations and participant responses should be reviewed at each update. Do not describe a suggestion as an organizer decision until it is confirmed.
