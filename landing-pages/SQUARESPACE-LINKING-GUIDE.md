# Squarespace Linking Guide for info.unjournal.org Pages

This guide helps Claude in Browser (or any editor) add appropriate links from the main Squarespace site (unjournal.org) to the landing pages hosted at info.unjournal.org.

## Overview

**Main site:** `https://unjournal.org` (Squarespace)
**Landing pages:** `https://info.unjournal.org/[page].html` (Linode VPS)

The info.unjournal.org pages serve as:
- **Focused landing pages** for Google Ads and specific audiences
- **Rich content pages** with interactive elements that don't fit Squarespace's limitations
- **Supplementary resources** that complement the main site

---

## Page Directory & Linking Strategy

### Audience-Specific Pages (High Priority Links)

| Page | URL | Purpose | Where to Link From |
|------|-----|---------|-------------------|
| **For Authors** | `info.unjournal.org/for-authors.html` | FAQ and benefits for researchers considering submission | "For Researchers" nav item, submission CTAs, any "learn more about submitting" links |
| **For Evaluators** | `info.unjournal.org/for-evaluators.html` | Recruitment page for reviewers | "For Evaluators" nav item, reviewer recruitment sections, "become a reviewer" CTAs |
| **Donate** | `info.unjournal.org/donate.html` | Comprehensive donation page with impact info | Footer "Support Us", any donation CTAs, "ways to give" links |

### Informational Pages

| Page | URL | Purpose | Where to Link From |
|------|-----|---------|-------------------|
| **About (In a Nutshell)** | `info.unjournal.org/about.html` | Quick overview of The Unjournal | About section "learn more", quick intro links, "what is The Unjournal" CTAs |
| **Benefits & Features** | `info.unjournal.org/benefits.html` | Why journal-independent evaluation matters | "Why Us" sections, comparison pages, feature highlights |
| **Follow & Connect** | `info.unjournal.org/follow.html` | Social media hub and engagement | Footer social links, "stay connected" sections, community pages |
| **Main Landing** | `info.unjournal.org/index.html` | Overview hub for all landing pages | Can be linked as "Explore Our Resources" or from specific campaigns |

### Program & Initiative Pages

| Page | URL | Purpose | Where to Link From |
|------|-----|---------|-------------------|
| **Pivotal Questions** | `info.unjournal.org/pivotal-questions.html` | High-value-of-information research initiative | Research priorities section, "what we evaluate", commissioned evaluations info |
| **Forecasting Tournament** | `info.unjournal.org/forecasting-tournament.html` | Animal welfare forecasting with Metaculus | News/events, forecasting mentions, Metaculus collaboration references |
| **Evaluator Prizes 2024-25** | `info.unjournal.org/evaluator-prizes-2024-25.html` | Prize winners announcement | Evaluator pages, news section, "why evaluate for us" sections |
| **Lottery** | `info.unjournal.org/lottery.html` | Transparent random selection tool | Prize pages, transparency mentions, methodology pages |

### Team & News

| Page | URL | Purpose | Where to Link From |
|------|-----|---------|-------------------|
| **Team** | `info.unjournal.org/team.html` | Management, advisors, field specialists | About > Team nav item, "our team" links |
| **News** | `info.unjournal.org/news.html` | News feed page | News section, "latest updates" links |

---

## Instructions for Claude in Browser

### To Add Links on Squarespace:

1. **Navigate to unjournal.org** and ensure you're logged into Squarespace editing mode

2. **Find the relevant page/section** where the link should be added:
   - Click "Edit" on the page
   - Navigate to the text block or button that needs linking

3. **For text links:**
   - Select the text to be linked
   - Click the link icon
   - Enter the full URL: `https://info.unjournal.org/[page].html`
   - Set "Open in new tab" = Yes (recommended for external links)

4. **For buttons/CTAs:**
   - Click the button element
   - Edit the link URL
   - Enter the full URL: `https://info.unjournal.org/[page].html`

### Suggested Link Placements:

**Navigation Menu:**
- Consider adding "For Researchers" → `info.unjournal.org/for-authors.html`
- Consider adding "For Evaluators" → `info.unjournal.org/for-evaluators.html`

**Footer:**
- "Support Us" / "Donate" → `info.unjournal.org/donate.html`
- "Follow Us" → `info.unjournal.org/follow.html`

**About Section:**
- "Learn more about The Unjournal" → `info.unjournal.org/about.html`
- "Our Team" → `info.unjournal.org/team.html`

**For Researchers Page:**
- "Why submit?" or "Benefits" → `info.unjournal.org/for-authors.html`
- Any FAQ links → `info.unjournal.org/for-authors.html#faq`

**For Evaluators Page:**
- "Become an evaluator" → `info.unjournal.org/for-evaluators.html`
- "Evaluator prizes" → `info.unjournal.org/evaluator-prizes-2024-25.html`

---

## Link Text Suggestions

When adding links, use descriptive anchor text:

| Instead of... | Use... |
|--------------|--------|
| "Click here" | "Learn about submitting your research" |
| "More info" | "See benefits for authors" |
| "Link" | "Explore ways to support our work" |

**Good examples:**
- "Researchers: see why you should submit →"
- "Become a paid evaluator"
- "View all ways to donate"
- "Read the full FAQ for authors"
- "Meet our team of field specialists"

---

## Notes

- All info.unjournal.org pages include Google Tag Manager tracking (GTM-P9XSTK8T) consistent with the main site
- Pages are mobile-responsive
- Each page has a "back to all pages" link to `index.html#explore` for navigation
- Pages use consistent branding (logo, colors) with the main site
