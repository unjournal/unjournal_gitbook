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

3. **Shared definitions area** (displayed prominently before any questions)

Present three expandable/collapsible definition blocks. The FIRST (focal example) should be EXPANDED by default. The other two collapsed by default.

**Block A: "Focal example" — EXPANDED by default**

Use a styled callout box (white bg, sage left-border, slightly larger text). Content:

> Suppose Founders Pledge is considering whether to donate $100,000, either
> - to StrongMinds (to treat depression in women in low-income settings through group interpersonal psychotherapy)
> - or to extend a seasonal malaria chemoprevention campaign.
>
> Suppose they have substantial evidence on the impact of each intervention coming from RCTs combined with typical self-reported wellbeing surveys as well as objective income and health measures and outcomes. They also have the opportunity to fund the collection of more data in future studies.
>
> They want to allocate the funds to the intervention that leads to greater "social wellbeing or welfare" in expectation.

**Block B: "What is a WELLBY?" — collapsed by default**

> A WELLBY (Wellbeing-Year) is defined as one point of self-reported life satisfaction measured on a 0-to-10 Likert scale for one individual for one year (Frijters et al., 2020; Frijters and Krekel, 2021). It is typically measured using annual surveys.
>
> We use the definition from Frijters et al, 2024, based on a life satisfaction scale (acknowledging that WELLBY has been defined differently in other contexts).

**Block C: "What do we mean by 'best'?" — collapsed by default**

> "Best" = leads to the decisions that yield the highest "true welfare" on average, in the particular relevant domain (e.g., in comparing mental health interventions in Africa), perhaps taking into account the cost of doing the measurements.
>
> More precisely: the "best" measures and aggregations would be those that, if we collected and made decisions based on them, would yield policy and funding choices with the highest overall wellbeing or welfare in expectation. Consider reliability, practicality, cost, comparability, and other real-world considerations.
>
> The "best" mappings would be those that, if used to make conversions between WELLBYs, DALYs, etc., would be likely to lead to the better/best decisions in most relevant situations.

4. **Brief intro section** (max-width 660px, centered):
   Write 2-3 short paragraphs:
   - These are the operationalized questions from our Wellbeing Pivotal Questions project. We want to elicit beliefs from workshop participants, evaluators, and other experts and stakeholders — before, during, and after reviewing the evidence.
   - You don't need to be a specialist to contribute. We want your honest assessment and reasoning, whether you feel highly confident or very uncertain.
   - Some of these will also appear on our Metaculus forecasting page (link: https://www.metaculus.com/c/unjournal/ — coming soon). If you forecast on Metaculus, please share your Metaculus username below so we can link your contributions.

   Then a short "How to respond" guidance box (sage-bg callout):
   - For quantitative questions: Give your best estimate. If very uncertain, a wide range is fine — that's useful information too.
   - For discussion questions: Even a sentence or two helps. We're looking for reasoning and considerations, not polished analysis.
   - You can return and update your responses later. All questions are optional — answer whichever ones you have views on.
   - Note on DALYs vs QALYs: These questions focus on DALYs as the comparison metric. If you think the QALY comparison is more relevant, please note that in your response.

5. **The Questions** — presented as cards grouped under two PQ headings

Use a clean card-based layout. Each question gets a card with:
- A code tag (e.g. "WELL_01") and short label in small caps, tan color
- The full question text in Source Serif 4, ~17px, dark color
- Input fields for the response (textarea for most; some get additional specific inputs as noted)
- Focal questions (type "(1) PQ for evaluation") should be visually prominent: slightly larger card, sage left-border accent
- Subquestions and secondary questions should be visually subordinate: indented slightly, thinner border, smaller heading

---

### GROUP 1: "PQ1 — WELLBY Reliability: Is the WELLBY a useful and reliable measure?"

Brief intro line: "These questions address whether the WELLBY — based on 0-10 life satisfaction — is reliable enough for comparing interventions, and what alternatives might work better."

---

**WELL_01 — FOCAL QUESTION: Best measure for comparing multi-outcome interventions**
- Style: Prominent card (focal)
- Question text: "What combination of (a) subjective wellbeing survey data (e.g., life-satisfaction, happiness, depression), (b) income and health-outcome data, (c) metrics based on this data (e.g., linear or logarithmic WELLBYs, standard deviations, scale-use adjustments), and (d) possible conversions between different measures would be 'best' for making funding choices between interventions which may impact mental health, physical health, and/or consumption, as in the focal example above?"
- Note below question: "(We ask you about sub-elements of this question below. See the definition of 'best' above.)"
- Input: Large textarea

**WELL_01a — Extension: Cost of using WELLBY vs your preferred measure (available data)**
- Style: Subordinate card
- Question text: "Consider your answer to WELL_01. (If you stated that using the linear WELLBY measure is optimal, skip this question.) Consider the welfare-improvement from allocating $100,000 among a large set of charities/interventions given the information provided by the 'best measure' you propose above. How much more would it cost to achieve the same welfare-improvement outcome using the linear WELLBY measure? State this as a proportion. E.g., 1.1 means 10% more, 1.5 means 50% more, 3 means 3 times as much."
- Inputs:
  - Number field (labeled "Cost ratio", placeholder "e.g. 1.2")
  - Small textarea for reasoning

**WELL_02 — Best wellbeing measure for mental health interventions (available data)**
- Style: Regular card (goal-oriented)
- Question text: "Given the available collected data from surveys and intervention trials, how should Founders Pledge measure the impact on wellbeing in the context of mental health interventions? E.g., should they use the WELLBY measure (as defined above) or another metric? Consider reliability, insight, and practicability."
- Input: Textarea

**WELL_03 — What measures to collect? How should these be used?**
- Style: Regular card (goal-oriented)
- Question text: "What measures of well-being (or life satisfaction, or happiness, etc.) should charities, NGOs, and RCTs collect for impact analysis, particularly in contexts that may involve less tangible well-being outcomes (such as mental health interventions)? This could also include stated-preference and calibration surveys. How should these be used?"
- Input: Textarea

**WELL_03a — Extension: Cost of using WELLBY vs your preferred measure (new data)**
- Style: Subordinate card
- Question text: "Consider your answer to WELL_03. (If you stated that using the linear WELLBY measure is optimal, skip this question.) Consider the welfare-improvement from allocating $100,000 among a large set of charities/interventions given the information provided by the 'best measure' you propose above, allowing new data collection. How much more would it cost to achieve the same welfare-improvement outcome using the linear WELLBY measure? State as a proportion (e.g. 1.1 = 10% more). You may want to factor in the costs of additional data collection."
- Inputs:
  - Number field (labeled "Cost ratio", placeholder "e.g. 1.5")
  - Small textarea for reasoning

**WELL_04 — Single WELLBY vs combining multiple measures**
- Style: Regular card (secondary/goal-oriented)
- Note: add small "(secondary)" tag next to code
- Question text: "Consider general contexts where interventions may have impacts on both mental health, physical health, and consumption, such as the focal example above. Do you agree: 'In these contexts it is best to use a (potentially imperfect but single) overall WELLBY-based measure instead of directly measuring each dimension separately and then converting and combining these?' Discuss: in which contexts might it be better or worse to do this?"
- Inputs:
  - Radio buttons or select: "Agree — single WELLBY is best", "Disagree — separate measures are better", "Depends on context (explain below)"
  - Textarea

**WELL_07 — WELLBY in comparison: what is lost and where?**
- Style: Subordinate card
- Question text: "How reliable is the WELLBY measure of well-being/mental health relative to other available measures in the 'wellbeing space' (including other transformations of the 0-10 life satisfaction scale)? How much insight is lost by using WELLBY and when will it steer us wrong?"
- Input: Textarea

**WELL_08 — Life satisfaction vs happiness questions**
- Style: Subordinate card
- Question text: "In the contexts discussed above, would it be better to base the metric on a self-reported life satisfaction measure or instantaneous experience measures (e.g., happiness, affect balance)?"
- Inputs:
  - Radio or select: "Life satisfaction is better", "Experience/happiness measures are better", "Both should be used", "Unsure / depends on context"
  - Textarea for reasoning

**WELL_09 — Best metric based on Cantril ladder**
- Style: Subordinate card
- Question text: "If we needed to rely on the Cantril ladder measure (as typically collected for WELLBY estimation), how would we best convert it into a welfare metric to use for decision-making (comparing interventions, etc.)?"
- Input: Textarea

---

### GROUP 2: "PQ2 — DALY–WELLBY Interconvertibility: How should we convert between these measures?"

Brief intro line: "These questions address how to convert between WELLBYs and DALYs when comparing interventions measured in different units. Note: if you think the QALY is a more relevant comparison metric than the DALY, please say so in your responses."

---

**DALY_01 — FOCAL QUESTION: Best simple WELLBY/DALY conversion or mapping**
- Style: Prominent card (focal)
- Question text: "If the impact of one program is measured in WELLBYs (as defined above) and another program impact is measured in DALYs, and we have a reported effect size and standard deviation for each, what is the best numerical conversion or mapping between them?"
- Note below question: "(See the definition of 'best' above. If you think QALY is the more relevant comparison, please note that.)"
- Input: Large textarea

**DALY_02 — Best WELLBY/DALY conversion for Founders Pledge**
- Style: Regular card (goal-oriented)
- Question text: "Which mapping between WELLBYs and DALYs should Founders Pledge use in comparisons like the focal example above in order to make decisions between charities like these? I.e., what is the best mapping for their use case?"
- Input: Textarea

**DALY_03 — Best conversion method between WELLBYs and DALYs (or QALYs)**
- Style: Regular card (PQ for evaluation)
- Question text: "If the effectiveness of some programs have already been measured in terms of WELLBYs, while others are measured in terms of DALYs, what method or 'mapping structure or approach' should we use to compare and convert between them? E.g., direct units vs standard deviations, linear vs something else, etc.? (Feel free to consider conversion measures going beyond just means and standard deviations.)"
- Note below: "Discuss, as applicable: What numerical conversion factor(s) should we use? If the optimal factor varies greatly from one domain to another (e.g. mental health, physical health, income/consumption; or rural Africa vs urban India), what are the domains where it varies the most?"
- Input: Large textarea

**DALY_05 — Loss from SD-SD conversion**
- Style: Subordinate card
- Question text: "What is the loss from the 'one SD change in WELLBY is equivalent to one SD change in DALY' approach that Founders Pledge is currently taking, relative to the best feasible approach? Where will their approach be particularly incorrect?"
- Input: Textarea

---

6. **Respondent info & submission section**

Put respondent info fields at the TOP of the form (before the question cards), and the submit button at the BOTTOM after all questions. Use Netlify Forms (data-netlify="true") with:
- form name: "beliefs-elicitation"
- action: "/beliefs-thanks.html"
- Hidden honeypot field for spam

**Top fields (before questions):**
- Name (required)
- Email (required)
- Affiliation (optional)
- Metaculus username (optional) — with note: "If you forecast on Metaculus, share your username so we can link your contributions"

**Bottom fields (after all question cards):**
- A final textarea: "Any other thoughts, questions, or considerations we should be aware of?"
- Submit button: same style as index.html ("Submit Your Beliefs")
- Below submit: note that responses will be used to inform the synthesis report alongside evaluator assessments and Metaculus forecasts.

7. **Footer area**
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
