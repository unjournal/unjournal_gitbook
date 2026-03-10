# Suggested Changes for Wellbeing Workshop Pages

Based on Hypothes.is annotations (reviewed March 6, 2026). Items tagged `#implement` have been addressed where straightforward; items below require discussion or user input.

---

## linear-wellby-analysis.html (User currently editing)

### High Priority - Formula Notation

**Annotation:** "I'm missing the definition of the indices i and t, as well as the definition of the variable LS"
**Quote:** `ΔWELLBY(k) = Σi Σt δt (LSit(k) − LSit(0))`

**Suggestion:** Add a notation key before or after the formula:

- `i` = individual (summing across people)
- `t` = time period (summing across years)
- `LS` = Life Satisfaction score (0-10 scale)
- `δt` = discount factor for year t
- `k` = intervention, `0` = counterfactual

--> Implement, agreed

---

**Annotation:** "Is this really how it's depicted in the literature? It's a bit confusing... the incremental one seems to require knowledge of a counterfactual"
**Quote:** Same formula

**Discussion needed:** The notation implies you need both intervention and counterfactual life satisfaction levels. In practice, RCT designs estimate the *difference* directly. Consider clarifying that this is the underlying conceptual model, while in practice we estimate `LS(k) - LS(0)` via experimental comparison.

--> OK, this clarification is helpful, but some detail and revision to the notation might also make this clearer





---

### High Priority - Level-Based WELLBYs Explanation

**Annotation:** "Might benefit from some further explanation. How could Level-based be used for comparing interventions -- that's not clear here. How many people are we summing over? How do 'dead people' enter into that?"
**Quote:** "This second form requires a defined zero point (e.g., death = 0)"

**Suggestion:** Add explanatory text or footnote:

- Level-based WELLBYs matter when comparing interventions that affect mortality (or birth rates)
- Dead people contribute 0 to the sum (they have no life satisfaction)
- This requires knowing the "neutral point" - the LS level equivalent to death
- For interventions that don't change population, incremental and level-based approaches are equivalent

--> This explanation is not particularly helpful, need ot reformulate



---

### Medium Priority - Make AI-Generated Note a Folding Box

**Annotation:** "Make this a folding box"
**Quote:** AI-Generated Content notice

**Suggestion:** Wrap in `<details><summary>` to reduce visual clutter while keeping the warning accessible.

--> Implement please 



---

### Medium Priority - WELLBY Origin Box

**Annotation:** "Link//reference the original WELLBY statement. Add a folding box discussing and linking the origin of the WELLBY, alternative definitions, if any, and how it has been used."
**Quote:** "Source: UK Green Book Wellbeing Guidance (HM Treasury, 2021/2024)"

**Suggestion:** Add collapsible box with:

- Link to original UK Treasury Green Book
- Frijters et al. (2020) original proposal
- Note on alternative definitions (some use affect/experience measures rather than life satisfaction)
- Brief history of adoption (HLI, Founders Pledge, etc.)

--> AGREE, implement this

---

### Low Priority - Text Fixes

1. **Annotation:** "quick signup for a free account to post"
  - Current text may need minor clarification

1. **Annotation:** "Adjust this to 'if you compare interventions that affect mortality (or, in some accounting, birth rates)'"
  - Update "if you compare to mortality-preventing interventions" to be more precise
2. **Annotation:** "Or 'for interventions that change mortality rates' perhaps?"
  - Related to point above - clarify when level-based matters

--> AGREE, implement this



---

### Discussion Items (Not Actionable Without Research)

**Annotation:** "Obviously this notation is extremely crude! I wonder if important nuance is lost here"
**Quote:** `ΔU(3→4) = ΔU(7→8)`

**Response:** This is intentionally simplified to illustrate the cardinality assumption. The page already notes this is controversial and cites evidence against strict cardinality. No change needed unless user wants more nuance added.

--> This misses the point, you're writing something mathematically as if it's a function, but the argument to the function is not precise



---

## live/results.html

**Annotation:** "Have this link to the *specific* linked metaculus forecast, not just the general community page. But we should also embed the more detailed belief elicitation that is already here."

**Status:** Results page was removed from live/index.html navigation (to avoid anchoring). Consider whether this page should be updated or remain hidden until after workshop.  
  
--> right, we don't want to show the results because we want to avoid anchoring. so maybe this bit should be removed/adjusted  


---

## live/daly.html

**Annotation (from beliefs.html):** "It might be too many questions on conversion here if the workshop's not focusing on conversion. We might want to move some of these more detailed questions to a second outlinked page."

**Discussion:** Consider whether DALY conversion questions should be on a separate "advanced" page if the workshop is primarily about WELLBY reliability.

--> Not for the advanced; it's just a different subject, And we'll be building that page soon. you can also link to the live page for now -- [https://uj-wellbeing-workshop.netlify.app/live/daly](https://uj-wellbeing-workshop.netlify.app/live/daly)



---

## beliefs.html

**Annotation:** "I'd like to link a 'calibrate your judgment' tool here over a very quick exercise."

**Status:** Already added - link to Clearer Thinking calibration tool is in the credible interval explanation box.

---

## General - Remaining Discussion Items

### From Benjamin Correspondence Doc

- **"Practical finding: Importance ratings correlate 0.8-0.9 with stated-preference tradeoffs"** — needs citation verification

--> yes, can you find the citation to this



- **Visual calibrations as partial scale-use corrections** — could be added to methodology discussion

---

--> proposed some addition here



- **Israeli think tank implementation** — mention as real-world application?

--> yes, if you have enough context. but the point of this is we're going to have a presentation illustrating work trying to implement the Benjamin methodology in some way, which will give us a sense of what's possible and the limitations  


### From FP/Lerner Discussion Doc

- **"Caspar Kaiser's 4 concerns: comparability, linearity, neutral point, concepts"** — could structure WELLBY reliability discussion around these  
what do you wanna do with this?

---

## Implemented Changes (March 6, 2026)

The following have been implemented across pages:

- ✅ Removed "or submit them via beliefs elicitation form" from Q&A sections (all live pages)
- ✅ Added workshop date to live/index.html header
- ✅ Added Resources nav link to live/index.html
- ✅ Removed "View Aggregated Results" link (anchoring concern)
- ✅ Updated "structured Q&A (Coda)" reference
- ✅ Added "linear" before WELLBY in beliefs.html questions
- ✅ Privacy notice already a folding box (beliefs.html)
- ✅ "and key arguments" already added (beliefs.html)
- ✅ Submission type dropdown already added (beliefs.html)
- ✅ Stakeholder segment updated to ~35 min with CG/FP ~10 min each
- ✅ Stakeholder subtitle broadened from "WELLBY vs DALY" to "wellbeing metrics"
- ✅ Evaluator page mentions PQ evaluators
- ✅ Most index.html (main) changes already implemented
- ✅ About.html changes already implemented ("experts and stakeholders", etc.)

### Implemented March 6, 2026 (Session 2)

- ✅ **Formula notation key added** - Collapsible section defining i, t, LS, δ, k with note about RCT estimation
- ✅ **AI-Generated notice made collapsible** - Now a `<details>` element to reduce visual clutter
- ✅ **WELLBY origin box added** - Collapsible section with Frijters et al. (2020), UK Treasury link, alternative definitions, organizational adoption list
- ✅ **Mortality comparison text fixed** - Changed to "interventions that affect mortality (or, in some accounting, birth rates)"
- ✅ **Level-based explanation added** - New collapsible section explaining when level-based accounting matters
- ✅ **ΔU notation improved** - Changed from `ΔU(3→4)` to proper `U(LS=4) − U(LS=3)` format with explanation
- ✅ **Results page anti-anchoring notice** - Added prominent pre-workshop placeholder warning
- ✅ **Metaculus links clarified** - Added note that specific question links will be added once posted

### Citation found for SUGGESTED-CHANGES.md item

**"Importance ratings correlate 0.8-0.9 with stated-preference tradeoffs"** → This refers to:
- Benjamin, Heffetz, Kimball & Szembrot (2014). "Beyond Happiness and Satisfaction: Toward Well-Being Indices Based on Stated Preference." *American Economic Review*, 104(9): 2698-2735.
- The 0.81 correlation is between coefficient pairs from personal ("you") vs policy ("everyone") scenarios.

---

### Implemented March 6, 2026 (Session 3)

- ✅ **live/index.html: "(Google Doc)" now linked** - Added hyperlink to collaborative notes Google Doc
- ✅ **"Reporting function" definition added** - Tooltip explaining f<sub>i</sub>(·) as mapping from true welfare to reported LS
- ✅ **"Instrument" definition added** - Tooltip explaining survey instrument (wording, scale, anchors, mode)
- ✅ **"Latent distribution" definition added** - Tooltip explaining unobserved underlying welfare distribution
- ✅ **30-50% bias reduction citation added** - Benjamin et al. (2023/2024) citation in comparison table
- ✅ **Calculator effect size clarified** - Added explanatory text and tooltip with typical effect size ranges

---

### Major Revision March 6, 2026 (Session 4) — Deep Research Integration

**Scope:** Substantial revision of `linear-wellby-analysis.html` integrating ChatGPT deep research report addressing 75+ Hypothes.is annotations.

**Structural Changes:**
- ✅ **12-section structure** — Replaced 9-section layout with workshop-neutral 12-section structure:
  1. The decision problem
  2. Definitions & notation
  3. Validity & gold standards
  4. Assumptions & failures
  5. Identification critique (Bond & Lang)
  6. Response times (Liu & Netzer)
  7. Evidence
  8. Scale-use heterogeneity
  9. Neutral point & mortality
  10. Metrics & translation
  11. Worked examples
  12. What frameworks do
  + Workshop prompts & References

- ✅ **Legacy version preserved** — Created `linear-wellby-analysis-legacy.html` with ARCHIVED notice for rollback

**Interactive Modules:**
- ✅ **Transformation sensitivity demo** — Slider for transformation curvature (θ), toggle between level-based vs change-based comparison; shows how rankings can flip under monotone transformations (Bond & Lang visualization)
- ✅ **Shifter/stretcher calibration demo** — Two-population panels with shift (a) and stretch (b) sliders; shows why fixed effects only remove shifts, not stretches (Benjamin et al. method)
- ✅ **Enhanced neutral point demo** — Slider for neutral point LS₀ with explicit formulas; shows when neutral point matters (mortality) vs cancels (incremental changes)

**Mermaid Diagrams:**
- ✅ **Measurement-to-decision pipeline** — Flowchart from intervention → study design → measured outcomes → translation layer → common currency → decision
- ✅ **Time structure/discounting sequence** — Sequence diagram showing baseline → follow-up → later follow-ups with notes on persistence/decay assumptions

**Content Improvements:**
- ✅ **Rigorous definitions** — Added formal notation section with i, t, k, LS, δ, u definitions
- ✅ **Bond & Lang expanded** — Full explanation of "non-identified," "latent distribution," monotone transformations
- ✅ **Workshop-neutral framing** — Changed "Practical Recommendations" to "What frameworks actually do" (descriptive)
- ✅ **Worked examples** — 4 examples showing where assumptions bite (same instrument, different instruments, mortality, stretch-factor differences)
- ✅ **Proper citations** — 13 footnotes with hover tooltips; references to primary sources

---

### Implemented March 7, 2026 (Session 5) — Hypothes.is Annotation Review

**Files modified:** `linear-wellby-analysis.html`, `daly-wellby-conversion.html`

**Changes to linear-wellby-analysis.html:**
- ✅ **Mermaid diagrams enlarged** — Increased CSS sizing (min-width: 600px, font-size: 16px); added mobile-responsive breakpoint
- ✅ **Diagram explanations added** — Added "diagram-intro" text before each Mermaid diagram; added collapsible "How to read this diagram" section for the measurement-to-decision pipeline
- ✅ **Focal question framing clarified** — Changed from "This workshop's focal question" to "A focal question for this workshop"; explicitly acknowledged DALY/QALY, capability approaches, and monetary valuation as alternatives
- ✅ **Standard LS questions expanded** — Added Cantril ladder question text alongside OECD single-item; added note about difference between satisfaction vs. ladder framing
- ✅ **Practical recommendations prompt added** — Added workshop prompt #6 asking "What should funders do now, given current evidence and uncertainty?"

**Changes to daly-wellby-conversion.html:**
- ✅ **Plant (2025) citation title fixed** — Changed from hallucinated "A Happy Possibility: Rational Behavior and the Cardinality Thesis" to actual title "A Happy Possibility About Happiness Scales: An Exploration of the Cardinality Assumption"

**Additional changes (Session 5 continued):**
- ✅ **Workshop goals expanded** — Changed "Workshop goal" to "Workshop goals" with three numbered objectives: (1) clarity about assumptions, (2) share information and synthesize expertise, (3) generate practical insights and actionable recommendations
- ✅ **LMIC context added** — Added "especially in low- and middle-income countries (LMICs)" to opening paragraph about comparing interventions
- ✅ **linear-wellby-analysis-technical.html synchronized** — Applied same updates: focal question clarification, workshop goals, LMIC context, Cantril ladder question

---

### Implemented March 9, 2026 (Session 6) — Demo Fixes & Literature Citations

**Files modified:** `linear-wellby-analysis.html`

**Transformation Sensitivity Demo fixed:**
- ✅ **Demo data redesigned** — Changed intervention data so rankings can actually flip under transformation
  - Old: B always won (larger raw effect, same post levels as A)
  - New: A has smaller raw effect at HIGH levels (6-8), B has larger raw effect at LOW levels (2-5)
  - Result: At θ=1 B wins (effect=2 vs 1); at θ≈1.5+ A wins (convex transformation amplifies high-level gains)
- ✅ **Demo instruction text added** — Clear "Try it:" prompt explaining how to see the flip

**Literature citations added:**
- ✅ **Shifters vs. stretchers footnote [11]** — Added citation to Benjamin et al. (2012, 2014, 2023), Oswald (2008), Kaiser & Oswald (2022)
- ✅ **Michael Plant footnotes [12, 13]** — Added Plant (2025) cardinality paper and HLI methodology citations
- ✅ **HLI expanded** — Added "(Plant et al.)" and footnote link in organizational adoption list

**Text corrections from annotations:**
- ✅ **"The key critique" → "A key critique"** — Changed in TOC and section heading (subjective framing)
- ✅ **"biasing" → "potentially biasing"** — More accurate hedging
- ✅ **"corner case" → "rare edge case"** — Clearer terminology
- ✅ **"MH" → "mental health"** — Expanded abbreviation in Mermaid diagram
- ✅ **"cancels" explained** — Added footnote [14] with algebraic explanation of why neutral point cancels for incremental comparisons
- ✅ **LMIC study examples footnote [15]** — Added Haushofer & Shapiro (2016, 2018) and StrongMinds examples

**Changes to daly-wellby-conversion.html:**
- ✅ **AI-Generated notice made collapsible** — Converted prominent warning box to `<details>` element per annotation request

---

**Note on annotation coverage:** Some annotations reference text from an older deployed version (e.g., "This workshop's focal question is not 'which countries are happier'", "bounded ordinal categories", "many workshop annotations objected") that no longer exists in current files. These items were likely addressed in earlier revision sessions.

---

*Last updated: March 9, 2026*
---

## Outstanding Annotation Items (March 10, 2026)

### about.html - OOM Claim Needs Source

**Quote:** "Cost-effectiveness estimates vary by an order of magnitude depending on how WELLBYs are valued relative to DALYs."
**Annotation:** "What's the source for this OOM claim?? Find and link it with a verbatim quote. Also it's not in our 'evaluation summary' as far as I know"

**Status:** NEEDS USER INPUT
- The claim is in footnote [3] but lacks citation
- The annotation questions whether this OOM variance is documented
- Possible sources: HLI's StrongMinds CEA variations? GiveWell's analysis?
- **Action needed:** Find specific citation or reframe the claim

---

### about.html - "Does any of this matter?" addition

**Quote:** End of question 1 ("Where is the neutral point on the scale?")
**Annotation:** Add at the end: "Does any of this matter? Is the linear WELLBY likely to yield 'as good/similar' recommendations as other methods when comparing interventions?"

**Status:** NEEDS USER INPUT - this is already added to about.html, verify if index.html also needs it

---

### linear-wellby-analysis.html - "cancels" explanation

**Quote:** Text mentioning that something "cancels"
**Annotation:** "'cancels' is vague -- explain what is meant here in a footnote"

**Status:** NEEDS LOCATION - couldn't find this text; may have been removed or reworded

---

### linear-wellby-analysis.html - "average happiness" focus

**Quote:** "comparing 'average happiness'"
**Annotation:** "But we're focused on interventions, not on average happiness between groups. - Be more specific to this."

**Status:** NEEDS USER INPUT - the Bond & Lang critique is framed around group comparisons but the workshop focus is intervention comparison. May need framing adjustment.

---

## Implemented This Session (March 10, 2026)

- ✅ **index.html:** Changed "Open Philanthropy" → "Coefficient Giving" with hyperlink
- ✅ **index.html:** Changed "CEA organizations" → "impact-focused organizations"
- ✅ **index.html:** Removed "and what would change their minds" from question 4
- ✅ **index.html:** Removed "and why does it matter for comparing interventions" from question 1
- ✅ **daly-wellby-conversion.html:** Changed "Open Philanthropy" → "Coefficient Giving"
- ✅ **about.html:** Made participants table collapsible
- ✅ **about.html:** Changed "Paper Presentation" → "Research Presentation"
- ✅ **about.html:** Removed "and what would change their minds" from question 4
- ✅ **live/daly.html:** Added beliefs elicitation and Metaculus links to DALY_01 focal question
- ✅ **live/results.html:** Updated DALY_01 Metaculus link to specific question URL

