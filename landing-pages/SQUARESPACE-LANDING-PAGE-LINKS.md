# Squarespace → Landing Page Cross-Links

This file is a script you can paste to Claude Code in browser to add links to `info.unjournal.org` landing pages in the relevant Squarespace pages at `unjournal.org`.

---

## Instructions for Claude Code in browser

**Before starting:**
1. Make sure you are logged into squarespace.com with the `contact@unjournal.org` account
2. Navigate to `https://unjournal.org` and confirm you can see the Edit button

**Goal:** For each Squarespace page listed below, add a visually distinct button block (or styled text block) near the top of the page content that links to the corresponding landing page at `info.unjournal.org`. Use the label "Visual overview →" or similar. Place it right after any existing introductory paragraph — before the main content begins.

---

## Pages to update

| Squarespace page | Landing page URL | Button label |
|---|---|---|
| `/about` or `/about-us` | `https://info.unjournal.org/about.html` | "In a Nutshell: Quick Visual Overview" |
| `/team` | `https://info.unjournal.org/team.html` | "Team Page with Photos" |
| `/team` | `https://info.unjournal.org/org-chart.html` | "Interactive Org Chart" |
| `/for-evaluators` or `/evaluators` | `https://info.unjournal.org/for-evaluators.html` | "Evaluator Overview Page" |
| `/for-authors` or `/researchers` | `https://info.unjournal.org/for-authors.html` | "Author/Researcher Overview" |
| `/benefits` or equivalent | `https://info.unjournal.org/benefits.html` | "Benefits & Features Visual Overview" |
| `/pivotal-questions` or equivalent | `https://info.unjournal.org/pivotal-questions.html` | "Pivotal Questions Overview" |
| `/donate` or `/support-us` | `https://info.unjournal.org/donate.html` | "Support & Donate" |

---

## Step-by-step for each page

For each page above:

1. Navigate to `https://unjournal.org/[page-slug]`
2. Click the **Edit** button (top left when logged into Squarespace)
3. Click just before the first content block to position your cursor
4. Click the **+** button to add a new block
5. Choose **Button** block
6. Set button text to the label in the table above
7. Set URL to the `info.unjournal.org` URL from the table
8. Set button style to **outline** or **ghost** (not filled — keep it understated)
9. Optionally: add a short text block before the button: *"For a quick visual overview, see our landing page:"*
10. Save the page

Alternatively, use a **Text** block with an inline link styled as: `→ [Label](URL)` if buttons feel too heavy.

---

## JavaScript helper (for use in browser console if needed)

If you need to inspect the current page structure before editing, run this in the DevTools console on any Squarespace page:

```javascript
// List all content blocks on the current page (useful for finding insertion points)
document.querySelectorAll('[data-block-type]').forEach(function(el) {
  console.log(el.getAttribute('data-block-type'), el.textContent.trim().substring(0, 60));
});
```

---

## Squarespace navigation tips

- The Squarespace admin URL is: `https://unjournal.squarespace.com` or accessible via Edit mode on any page
- Pages panel: click the folder icon in the left sidebar while in Edit mode
- To find a page's slug: hover over the page name in Pages and look at the URL shown
- "Not linked" pages (not in nav) are in the "Not Linked" section of the Pages panel

---

## Priority order

1. `/team` — add links to both team.html and the new org-chart.html
2. `/for-evaluators` — high traffic from Google Ads
3. `/for-authors` — high traffic from Google Ads
4. `/about` — main entry point
5. All others

---

## Notes

- The landing pages at `info.unjournal.org` are designed to be cleaner, faster, and more visual than Squarespace pages
- Goal: Squarespace pages remain the "home base" but each links prominently to the more focused landing page
- After adding links on Squarespace, also consider updating the main `https://info.unjournal.org/index.html` hub to cross-link back to the Squarespace pages where relevant
