# GTM deployment for info.unjournal.org (2026-02-03)

## Summary
- Switched all landing pages to rely on GTM container `GTM-P9XSTK8T` only (GA4 `G-G908FSQH5J` and Google Ads `AW-16652212666` are configured inside GTM).
- Removed standalone `gtag.js` snippets from all pages by deploying the updated HTML from `landing-pages/`.
- Ensured subdirectory pages (e.g., `/follow/`, `/donate/`) serve the updated GTM-only HTML by copying updated root files into their subdirectory `index.html`/`thanks.html` locations.

## Server actions
- Uploaded updated HTML files to `/var/www/info.unjournal.org/`:
  - `index.html`
  - `follow.html`
  - `donate.html`
  - `evaluator-prizes-2024-25.html`
  - `forecasting-tournament.html`
  - `forecasting-tournament-thanks.html`
  - `lottery.html`
- Copied updated root files to subdirectory pages so directory URLs serve GTM version:
  - `/var/www/info.unjournal.org/follow/index.html`
  - `/var/www/info.unjournal.org/donate/index.html`
  - `/var/www/info.unjournal.org/evaluator-prizes-2024-25/index.html`
  - `/var/www/info.unjournal.org/evaluator-prizes-2024-25/lottery.html`
  - `/var/www/info.unjournal.org/lottery/index.html`
  - `/var/www/info.unjournal.org/forecasting-tournament/index.html`
  - `/var/www/info.unjournal.org/forecasting-tournament/thanks.html`
  - `/var/www/info.unjournal.org/forecasting-tournament/thanks/index.html`

## Verification
- Server HTML scan confirmed no remaining `gtag.js`, `G-G908FSQH5J`, or `AW-16652212666` snippets.
- Live server curl checks confirmed `GTM-P9XSTK8T` appears on:
  - `/`, `/follow/`, `/donate/`, `/evaluator-prizes-2024-25/`, `/evaluator-prizes-2024-25/lottery.html`, `/lottery/`, `/forecasting-tournament/`, `/forecasting-tournament/thanks/`.

## Notes
- The site uses directory-based landing pages; these are served from subdirectory `index.html`/`thanks.html` files in addition to root-level `.html` files.
- Ensure future landing-page updates are copied to both root and subdirectory versions.
