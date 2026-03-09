# Instructions: Build two new pages for the Wellbeing Workshop site

## Context

The site at https://unjournal-workshop.netlify.app currently has:
- `index.html` — scheduling/availability form
- `thanks.html` — post-submission confirmation
- `styles.css` — shared styles (academic aesthetic: warm bg #f8f6f1, Source Serif 4 + DM Sans, sage/brown/tan palette)
- `app.js` — form interactivity
- `netlify.toml` — deployment config

You need to create TWO new HTML pages and add a shared navigation bar to ALL pages (index.html, about.html, beliefs.html, thanks.html). The site is plain HTML/CSS/JS with no build step, deployed to Netlify.

Working directory: the existing workshop-form site directory (wherever the current index.html lives).

---

## Task 1: Add shared navigation bar to all pages

Add a simple top nav bar that appears on index.html, about.html, beliefs.html, and thanks.html. It should sit BETWEEN the dark header and the page content (or at the very top of thanks.html).

### Nav design:
- Background: #1a1a1a (same as header), border-bottom: 1px solid #333
- Centered row of 3 links, DM Sans 13px font-weight 500
- Inactive: color #888, hover #ccc
- Active page: color #f8f6f1 with border-bottom 2px solid #5a7a5a (sage)
- Links: "Schedule" → `/`, "About" → `/about.html`, "Pivotal Questions" → `/beliefs.html`
- On thanks.html, show the same nav but with no active state

Add the nav styles to `styles.css` under a new comment block `/* Page Navigation */`.

Update index.html to include the nav bar after the closing `</header>` tag and before the context-bar div.

---

## Task 2: Create `about.html` — Workshop Overview

This is a static prose page explaining the workshop for invitees who want to understand the purpose before filling out the scheduling form. Match the existing site's design system exactly.

### Structure:
1. **Dark header** (same style as index.html but shorter):
   - Top line: "The Unjournal · Pivotal Questions Initiative"
   - Title: "About This Workshop"
   - Subtitle/lead: "Why we're bringing researchers, evaluators, and funders together to discuss how we measure and compare wellbeing across interventions."

2. **Navigation bar** (as specified in Task 1, with "About" active)

3. **Body content** — max-width 660px, centered, same background and font styling as the form page. Use Source Serif 4 for h2 headings, DM Sans for body text. Links in brown (#8b5e3c). Paragraphs: 15.5px, color #444, line-height 1.75.

### Content sections (write in clear, accessible prose — not bullet-heavy):

**Section: "The problem"**
Write 2-3 paragraphs explaining:
- Organizations like Founders Pledge, GiveWell, and Open Philanthropy compare interventions across different domains (physical health, mental health, poverty) to decide where funding does the most good. They need a common unit of measurement.
- Two measures dominate: the DALY (disability-adjusted life year, from health economics) and the WELLBY (wellbeing-adjusted life year, based on self-reported life satisfaction on a 0-10 scale). Each has strengths and limitations. How they relate — and whether either reliably captures what matters — directly affects which interventions get funded.
- Link to "Pivotal Questions initiative" at: https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/pivotal-questions
- Link Founders Pledge: https://www.founderspledge.com/
- Mention this is part of The Unjournal's Pivotal Questions initiative: working with impact-focused organizations to identify their highest-value research questions, connect them to evidence, and commission expert evaluations. Link: https://www.unjournal.org/

**Section: "What sparked this workshop"**
Write 2 paragraphs explaining:
- We recently commissioned an evaluation of Benjamin, Cooper, Heffetz, Kimball & Zhou's paper "Adjusting for Scale-Use Heterogeneity in Self-Reported Well-Being." Link the evaluation: https://unjournal.pubpub.org/pub/evalsumheterogenity/
- This is one of the most important recent papers on whether people use wellbeing scales in comparable ways. If "7 out of 10" means something very different to different people, that's a fundamental challenge for the WELLBY.
- The paper develops a method using "calibration questions" to detect and adjust for scale-use differences. Evaluators' verdict: encouraging but nuanced — differences may not be as severe as feared, but more work is needed. This raises immediate questions for anyone using WELLBYs to compare interventions.

**Section: "What we want to achieve"**
- This workshop brings together the paper's authors, evaluators, funders who use these measures, and researchers with relevant expertise.
- Present 4 key questions as styled cards (white background, sage left border, border-radius 8px):

  1. **Is the linear WELLBY reliable enough?** — Can we treat a 1-point improvement in life satisfaction as meaning the same thing for different people and starting points? What about cardinality — does a move from 3→4 mean the same as 7→8? Where is the "neutral point" on the scale?

  2. **How should we convert between DALYs and WELLBYs?** — Current approaches are rough. A 1 SD change in WELLBY is treated as equivalent to ~1 SD in DALYs, but is this defensible? How sensitive are funding decisions to the conversion factor used?

  3. **Could calibration questions improve things?** — Benjamin et al. show calibration questions can reduce bias from scale-use differences. Should funders push for this in future RCTs?

  4. **What should funders do now?** — Given the current evidence, how should organizations navigate the DALY–WELLBY question in their cost-effectiveness analyses today?

**Section: "How the workshop is structured"**
Write 2 paragraphs (prose, not a list):
- ~3.5 hours, online, scheduled segments — join for only the ones you're interested in
- Begins with stakeholder problem statement (Founders Pledge), paper presentation (Benjamin et al.), evaluator responses, two focused discussions (WELLBY reliability and DALY-WELLBY conversion), beliefs elicitation, practitioner panel
- Recording planned to be public by default, with AI-queryable transcript; participants can opt out of specific segments

**Section: "Pivotal Questions & Beliefs"**
Short section (1-2 paragraphs):
- We've developed specific, operationalized questions designed so experts can state beliefs quantitatively and answers directly inform funding decisions
- Link to beliefs page: "See the full set of questions and share your beliefs →" linking to /beliefs.html
- Three of these questions will also be posted on our Metaculus forecasting page. Link: https://www.metaculus.com/c/unjournal/

**Call to action area** at bottom:
- Two buttons side by side:
  - Primary (dark bg): "Submit Your Availability →" linking to /
  - Secondary (outlined): "View Pivotal Questions →" linking to /beliefs.html
- Below buttons: pill-links row (same style as index.html context bar) for:
  - "Pivotal Questions Initiative →" → https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/pivotal-questions
  - "Benjamin et al. Evaluation →" → https://unjournal.pubpub.org/pub/evalsumheterogenity/
  - "EA Forum Post →" → https://forum.effectivealtruism.org/posts/kftzYdmZf4nj2ExN7/the-unjournal-s-pivotal-questions-initiative
  - "Wellbeing PQ on Coda →" → https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH

---

## Task 3: Create `beliefs.html` — Pivotal Questions & Beliefs Elicitation

This is the most important new page. It presents the specific operationalized pivotal questions in an UNCLUTTERED way (contrast with the dense Coda page), and provides a Netlify Forms-backed form for participants to submit their beliefs.

### Structure:
1. **Dark header**:
   - Top line: "The Unjournal · Pivotal Questions Initiative"
   - Title: "Wellbeing Pivotal Questions"
   - Subtitle: "State your beliefs on specific, operationalized questions about WELLBY reliability and DALY–WELLBY interconvertibility."

2. **Navigation bar** (with "Pivotal Questions" active)

3. **Brief intro section** (max-width 660px, centered):
   Write 2-3 short paragraphs:
   - These are the operationalized questions from our Wellbeing Pivotal Questions project. We want to elicit expert and stakeholder beliefs — before, during, and after reviewing the evidence.
   - You don't need to be a specialist to contribute. We want your honest assessment and reasoning, whether you feel highly confident or very uncertain.
   - Three of these will also appear on our Metaculus forecasting page (link: https://www.metaculus.com/c/unjournal/ — coming soon). If you forecast on Metaculus, please share your Metaculus username below so we can link your contributions.

   Then a short "How to respond" guidance box (sage-bg callout):
   - For probability/percentage questions: Give your best estimate. If very uncertain, a wide range is fine — that's useful information too.
   - For open-ended questions: Even a sentence or two helps. We're looking for reasoning and considerations, not polished analysis.
   - You can return and update your responses as your views evolve.

4. **The Questions** — presented as expandable/collapsible cards

   Use a clean card-based layout. Each question gets a card with:
   - A short label/tag (e.g. "PQ1a · WELLBY Reliability") in small caps, tan color
   - The question itself in Source Serif 4, ~18px, dark color
   - A brief "Why this matters" explanation in smaller text
   - A "Context & definitions" expandable section (collapsed by default, toggle with JS)
   - Input fields for the response

### THE SPECIFIC QUESTIONS TO INCLUDE:

#### PQ1: WELLBY Reliability

**PQ1a: Is the WELLBY a useful and reliable measure?**
- Tag: "PQ1a · WELLBY Usefulness"
- Question: "Is the WELLBY (linear, 0–10 life satisfaction) a useful and reliable measure for comparing interventions — particularly those involving mental health, consumption, and life-saving — in the context that organizations like Founders Pledge use it?"
- Why it matters: "The WELLBY is increasingly used by major funders to compare interventions across very different domains. If it's unreliable or systematically misleading, billions of dollars in funding decisions could be poorly directed."
- Context & definitions (collapsed):
  - "A WELLBY is defined as an increase of 1 point for one person for one year on a 0–10 life satisfaction scale (e.g. Cantril's Ladder)."
  - "Key assumptions: cardinality (equal intervals on the scale reflect equal changes in wellbeing), interpersonal comparability (my '7' means roughly the same as your '7'), and linearity (a move from 3→4 is worth the same as 7→8)."
  - "Benjamin et al. (2023) found substantial scale-use heterogeneity but suggest calibration questions can partially adjust for it."
- Input fields:
  - **Slider or number input (0–100%)**: "How likely is it that the WELLBY — possibly with adjustments like calibration questions — is a 'good enough' measure for cross-intervention comparison in this context? (0% = certainly not reliable enough, 100% = certainly reliable enough)"
  - **Textarea**: "What's driving your assessment? What evidence or considerations matter most?"

**PQ1b: Best available measure**
- Tag: "PQ1b · Best Measure"
- Question: "Relative to the WELLBY, is there a different wellbeing measure (or transformation of the 0–10 scale) that would be substantially more useful for these funding decisions?"
- Why it matters: "Even if the WELLBY is 'good enough,' there might be better options — multi-item scales, log-transformed life satisfaction, or standardized composites. Switching measures has costs, so the improvement needs to be meaningful."
- Context (collapsed):
  - "Candidates include: multi-item life satisfaction scales (e.g. SWLS), experience sampling, the WB-Pro, WEMWBS, log-transformed 0-10 LS, or domain-specific instruments."
  - "Diener et al. (2018) found single-item life satisfaction has moderately high reliability (~0.70 correlation) with little validity loss compared to multi-item scales."
- Input fields:
  - **Dropdown/select**: "Which measure would you recommend as the primary metric?" Options: "WELLBY (0-10 LS, linear) is best or near-best", "WELLBY with calibration questions", "Log-transformed life satisfaction", "Multi-item life satisfaction scale", "A composite or multi-dimensional measure", "DALYs/QALYs should remain primary", "Other (specify below)"
  - **Textarea**: "Briefly explain your choice and any caveats."

#### PQ2: DALY–WELLBY Interconvertibility

**PQ2a: Conversion factor**
- Tag: "PQ2a · DALY–WELLBY Conversion"
- Question: "How does a 1 standard deviation change in WELLBY compare to a 1 standard deviation change in DALYs, in terms of actual welfare impact?"
- Why it matters: "Organizations currently treat 1 SD of improvement on mental health instruments as roughly equivalent to 1 SD on the WELLBY scale. The UK Treasury uses ~1 QALY ≈ 6-7 WELLBYs. Getting this conversion wrong means systematically over- or under-investing in mental health versus physical health interventions."
- Context (collapsed):
  - "Currently, standard practice (used by HLI and Founders Pledge) treats SDs on different mental health instruments as interconvertible with WELLBY SDs on a roughly 1:1 basis."
  - "The conversion between DALYs and WELLBYs depends on the 'neutral point' on the LS scale — the point below which life has negative value. This is currently unknown; one small study (Peasgood et al. 2018) suggested LS ≈ 2, but this is tentative."
  - "The relationship may also be non-linear — e.g., a WELLBY gained at very low wellbeing could be worth more than one gained at high wellbeing."
- Input fields:
  - **Number input**: "If 1 QALY = X WELLBYs, what is your best estimate for X? (Current UK Treasury estimate: ~6-7. Range in literature: ~2-15.)" — allow decimal input
  - **Slider 0-100%**: "How confident are you in this estimate?"
  - **Textarea**: "What's your reasoning? Do you think the relationship is roughly linear, or does it depend on the starting point?"

**PQ2b: Practical conversion approach**
- Tag: "PQ2b · Best Conversion Method"
- Question: "What is the best practical method for converting between WELLBYs and DALYs (or QALYs) for use in cost-effectiveness analyses?"
- Why it matters: "Funders need a usable conversion now, even if imperfect. The question is whether the current approach (SD equivalence) is defensible, or whether a better practical method exists."
- Context (collapsed):
  - "Options include: SD-equivalence (current practice), regression-based approaches (linking LS data to DALY weights in the same populations), time-tradeoff surveys, or simply maintaining separate analyses and comparing rankings."
- Input fields:
  - **Textarea**: "What conversion approach would you recommend, and why?"

#### PQ3: Future evidence & adoption (Metaculus-style)

**PQ3a: Research uptake** (TO BE POSTED ON METACULUS)
- Tag: "PQ3a · Metaculus-style · Research Uptake"
- Question: "By 2030, will more than 50% of GiveWell's top charities include a WELLBY-based cost-effectiveness analysis alongside or instead of DALY-based analysis?"
- Context: "This question gauges whether the WELLBY will gain institutional traction among the most influential funders."
- Input:
  - **Slider 0-100%**: "Your probability estimate"
  - **Textarea (optional)**: "Brief reasoning"

**PQ3b: Expert consensus** (TO BE POSTED ON METACULUS)
- Tag: "PQ3b · Metaculus-style · Expert Consensus"
- Question: "What share of development economists and research-informed practitioners surveyed by The Unjournal (before end of 2027) will agree that 'the WELLBY is a reasonably useful measure in this context, and switching to a different measure is unlikely to add much value'?"
- Input:
  - **Number input (0-100%)**: "Your estimate of the share who will agree"
  - **Textarea (optional)**: "Brief reasoning"

**PQ3c: Scale-use correction impact** (TO BE POSTED ON METACULUS)
- Tag: "PQ3c · Metaculus-style · Calibration Impact"
- Question: "If calibration questions (as in Benjamin et al.) were added to the major wellbeing surveys used in global health RCTs, would the resulting adjustments change the cost-effectiveness ranking of the top 5 interventions recommended by Founders Pledge?"
- Input:
  - **Slider 0-100%**: "Probability that rankings change by ≥2 positions"
  - **Textarea (optional)**: "Brief reasoning"

5. **Respondent info & submission section**

Use Netlify Forms (data-netlify="true") with:
- form name: "beliefs-elicitation"
- action: "/beliefs-thanks.html" (you'll also create a minimal thank-you page, or redirect to thanks.html with a query parameter)
- Hidden honeypot field for spam

Fields:
- Name (required)
- Email (required)
- Affiliation (optional)
- Metaculus username (optional) — with note: "If you forecast on Metaculus, share your username so we can link your contributions"
- All the question-specific inputs above
- A final textarea: "Any other thoughts, questions, or considerations we should be aware of?"

Submit button: same style as index.html ("Submit Your Beliefs")
Below: note that responses are stored securely and will be used to inform the synthesis report.

6. **Footer area**
Links row (pill-link style) to:
- "Submit Workshop Availability →" → /
- "About This Workshop →" → /about.html
- "Metaculus Community →" → https://www.metaculus.com/c/unjournal/
- "Wellbeing PQ on Coda →" → https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH

---

## Task 4: Create `beliefs-thanks.html`

Minimal thank-you page after beliefs submission. Same style as thanks.html:
- Checkmark, "Thank you!" (personalized with name from sessionStorage if available)
- Message: "Your beliefs and reasoning have been recorded. We'll incorporate these into our synthesis report alongside the evaluator assessments and Metaculus forecasts."
- Links to: about page, scheduling form, and Metaculus page
- Back button to /beliefs.html

---

## Design requirements

- ALL new CSS goes in `styles.css` — do NOT use inline styles or page-specific `<style>` blocks (except for thanks pages which are self-contained)
- Match the existing aesthetic exactly: warm #f8f6f1 background, Source Serif 4 for headings, DM Sans for body, sage/brown/tan accent colors
- The about.html page should feel like a well-typeset essay — generous line height, readable measure (max-width ~660px)
- The beliefs.html page should feel clean and inviting, NOT like a dense academic form. Use progressive disclosure (collapsed context sections) to keep it manageable
- All pages must be mobile-responsive (test at 375px width)
- All external links should use target="_blank" rel="noopener"

## Collapsible section JS

For the beliefs page, add a small JS file (beliefs.js) or inline script that handles:
- Clicking a "Context & definitions" toggle shows/hides that section with a smooth transition
- The toggle should have a small ▸/▾ indicator

## Deployment

After building all files:
1. Git add, commit with message "Add about and beliefs pages with shared navigation"
2. Deploy to Netlify (the site should auto-deploy from git push if already connected, or use `netlify deploy --prod`)
3. Verify all three pages work and navigation links are correct
4. Verify the beliefs form submits to Netlify Forms (check Netlify dashboard → Forms)

---

## File checklist

Files to CREATE:
- [ ] about.html
- [ ] beliefs.html
- [ ] beliefs-thanks.html
- [ ] beliefs.js (or add to app.js)

Files to MODIFY:
- [ ] styles.css — add nav styles, about-page styles, beliefs-page styles
- [ ] index.html — add nav bar after header
- [ ] thanks.html — add nav bar

Files to NOT modify:
- [ ] app.js (unless adding beliefs.js functionality there)
- [ ] netlify.toml (no changes needed)
