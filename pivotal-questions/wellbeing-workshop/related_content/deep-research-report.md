# Linear WELLBYs for Comparing Interventions in LMICs

## Why linear WELLBYs are on the table in the first place

A **WELLBY** (wellbeing-adjusted life year) is a “common currency” proposal: summarize an intervention’s welfare impact as the **change in subjective wellbeing per person-year**, so interventions with very different mechanisms (health, income, education, safety, mental health) can be compared on a single outcome scale. This is explicitly motivated in the WELLBY policy literature by the practical difficulty of aggregating disparate outcomes under conventional cost–benefit analysis when willingness-to-pay is unavailable or unreliable for key outcomes like health, unemployment, or loneliness. citeturn21search0

In UK government practice, the **Green Book supplementary “Wellbeing guidance for appraisal”** frames a role for **social cost‑effectiveness analysis** where, if wellbeing captures the relevant outcomes and there is sufficient causal evidence, analysts can compare options by the **cost per change in life satisfaction per year on a 0–10 scale** (“WELLBYs”). citeturn4view0turn4view2 The same guidance gives the canonical **unit definition**: **one WELLBY equals a one-point change in life satisfaction (0–10) per person per year**. citeturn4view2

For LMIC-focused funders/decision makers, the attraction is straightforward: many interventions plausibly affect welfare through channels that are **not well captured by health-only metrics like DALYs/QALYs** (e.g., depression treatment; reduced stress and insecurity; empowerment; social cohesion). The UK guidance itself notes that **QALYs (e.g., EQ‑5D) capture a subset of what is reflected in life satisfaction**, and highlights conceptual “extra dimensions” in life satisfaction beyond the EQ‑5D dimensions. citeturn4view3

At the same time, using linear WELLBYs in LMIC comparisons raises hard questions because it rests on turning **self-reported, bounded survey responses** into something used like a **cardinal, interpersonally comparable** welfare unit. Those questions are not merely academic; they affect **rankings**, **confidence intervals**, and whether cross-program comparisons (cash vs therapy vs mortality reduction) are meaningful.

## A clean formal framework with the indexing fixed

The core object should be made explicit: are we summing **levels** of wellbeing, or **changes** relative to a counterfactual? These are different, and the “neutral point” (and “death point”) matters mainly for the first.

### Notation

Let:

- Individuals \(i \in \{1,\dots,N\}\)  
- Time (years) \(t \in \{0,1,\dots,T\}\)  
- A subjective wellbeing measure \(LS_{it}\in[0,10]\), typically life satisfaction as elicited by a standard question (OECD prototype: “Overall, how satisfied are you with life as a whole these days?” with 0 = “not at all satisfied”, 10 = “completely satisfied”). citeturn18view2  
- An intervention/policy option \(k \in \{0,1,\dots,K\}\), where \(k=0\) is the counterfactual (status quo/no program).

### Incremental WELLBYs (what most intervention comparisons actually need)

For policy comparison, the natural “WELLBY gain” is the **incremental (counterfactual) change**:

\[
\Delta WELLBY(k) \;=\; \sum_{i=1}^{N}\sum_{t=0}^{T} \delta^{t}\,\Big( LS_{it}^{(k)} - LS_{it}^{(0)} \Big)
\]

where \(\delta\) is a discount factor (if used). The World Happiness Report WELLBY chapter uses discounted sums in a social welfare expression and explicitly treats wellbeing on a 0–10 scale. citeturn2view0

A single-person “one-point for one year” improvement is:

\[
1\;WELLBY = (LS\ \text{increases by}\ 1)\times(1\ \text{person})\times(1\ \text{year})
\]

which matches the UK Green Book wellbeing guidance definition. citeturn4view2

### Levels-based WELLBYs (where neutral point and “death = 0” become central)

Some WELLBY writing (including the World Happiness Report chapter) also sums **levels** of wellbeing “over life-years”:

\[
W = \sum_i\sum_t \delta^t\, LS_{it}
\]

and—crucially—adds assumptions to make that meaningful, including that the **difference between 3 and 4 is like the difference between 7 and 8** (interval/cardinal interpretation) and that **dead people score 0**. citeturn2view0

That “dead = 0” (or, more generally, the **zero point** of the welfare scale) is what makes “life-years saved” comparable to “wellbeing improvements among the living.” UK guidance explicitly grapples with mapping between **life satisfaction levels** and **QALY anchors** (including discussion of “as bad as death” and the difficulty of the lower end of the life satisfaction scale). citeturn4view3

**Key takeaway for your workshop page:** If your comparisons are mainly **incremental changes among living people**, the **choice of scale origin** (neutral point) often cancels out. If you are comparing to **mortality-preventing interventions**, or doing anything like “WELLBYs per person = average wellbeing \(\times\) life expectancy,” the origin (and interpretation of the bottom end) becomes **load-bearing**. citeturn2view0turn4view3

## What must be true for linear WELLBY comparisons to be valid

This section targets the conceptual “fault lines” that matter most for LMIC cross-intervention comparison, and corrects a common overstatement (including the one you flagged) about interpersonal comparability.

### Cardinality is a substantive assumption, not a notational convenience

To use **linear** WELLBYs as a welfare unit, we are treating a 0–10 response as at least **approximately interval-scaled**: a one‑point change has the same welfare meaning regardless of where it occurs on the scale. The World Happiness Report WELLBY chapter states this as a key assumption (“measured like weight—difference between 3 and 4 is the same as 7 and 8”) and claims supporting evidence. citeturn2view0

The OECD’s survey-design guidance does not claim philosophical proof of cardinality, but it does codify best practice that implicitly treats 0–10 life evaluation measures as meaningful quantitative variables, recommending standardized questions and emphasizing comparability. citeturn18view2turn16view2

A central practical point: many empirical SWB applications in economics treat life satisfaction as cardinal (e.g., OLS on 0–10), and a well-known result in this literature is that—as far as estimating “determinants of happiness”—assuming ordinality vs cardinality often makes little difference to coefficient patterns, while other modeling choices (like fixed effects) matter more. citeturn1search7turn1search3  
This is **supportive** for “OLS is often a decent approximation,” but it is **not** the same as proving linear welfare comparability.

### Interpersonal comparability: separate “levels” from “unit changes”

The statement you quoted (paraphrasing):  
> “\(LS_A=7 \approx LS_B=7 \Rightarrow U_A\approx U_B\)”  
is **stronger than what many intervention comparisons need**, and it can be misleading.

What most **incremental WELLBY** applications actually require is closer to:

> A one-point change has (approximately) the same welfare meaning across people/groups, at least in expectation, and within the range of changes we are using.

Formally, let \(u_{it}\) be “true” welfare (unobserved). Assume each person has a reporting function:

\[
LS_{it} = f_i(u_{it}) + \varepsilon_{it}
\]

If \(f_i(\cdot)\) differs across people, “equal reported levels” need not mean equal welfare. But it can still be fine for *differences* if the heterogeneity is “only a shift.”

A useful decomposition is the **affine** case:

\[
u_{it} = a_i + b_i\,LS_{it}
\]

- If **\(a_i\)** varies across people (different intercepts; “some people always report +2 higher”), but **\(b_i\)** is common, then **levels are not comparable**, but **differences are**:  
  \(\Delta u = b\,\Delta LS\).
- If **\(b_i\)** varies (different slopes; “stretchers/compressors”), then even **differences** are not comparable:  
  \(\Delta u_i = b_i\,\Delta LS_i\).

This is the conceptual core of why your critique matters: the page should not imply you must believe “equal scores mean equal welfare” to do *any* useful cost‑effectiveness comparison. What you need depends on whether the problematic heterogeneity is mostly “shift” (less damaging for incremental comparisons) or “slope”/nonlinearity (more damaging).

![Why equal levels need not matter, but unequal slopes do](sandbox:/mnt/data/shift_vs_slope_wellby.png)

This distinction is not merely theoretical. Recent work on **scale-use heterogeneity** in self-reports (including SWB) finds substantial heterogeneity and explicitly models it in terms of linear transformations—conceptually close to “shifters” and “stretchers”—and proposes calibration-question approaches to adjust for it. citeturn9view0turn9view2turn9view3

### When does scale-use heterogeneity actually break intervention comparisons?

Scale-use heterogeneity is most dangerous when it **differs systematically across the units you are comparing** in ways that do **not cancel**.

Common scenarios:

- **Within one RCT, same instrument, random assignment:** If treatment and control groups have the same distribution of reporting functions \(f_i\) (by randomization), then interpersonal noncomparability is less of a threat for estimating an average treatment effect in reported \(LS\). The main risk shifts to (i) measurement error noise, and (ii) whether treatment changes scale-use itself (response shift).
- **Comparing across studies/countries (common in LMIC portfolio choice):** Now you are comparing \(\Delta LS\) estimated under different instruments, translations, norms, and populations. If the distribution of “stretch factors” \(b_i\) differs across the populations/studies, then “1 point-year” is not the same welfare unit across the evidence base.
- **Comparisons involving very different baseline distributions (ceiling/floor issues):** Even if reporting functions were identical, bounded scales can cause mechanical differences in responsiveness at high or low baselines, and the welfare meaning of a one-point change may not be constant across the range.

The OECD guidance emphasizes that details like **scale labelling** and **anchors** affect response distributions and can induce systematic differences; it argues for cross-survey consistency and careful instrument design. citeturn16view3turn16view2

### “Distribution is the same” can rescue some comparisons, but only under clear conditions

Your intuition—“it could still be reliable if the distribution between the two populations is the same”—can be made precise.

Suppose an analyst compares two interventions \(A\) and \(B\) implemented in different populations \(P_A\) and \(P_B\). Each yields a reported effect \(\Delta LS^{A}\) and \(\Delta LS^{B}\). True effects are \(\Delta u^{A}\) and \(\Delta u^{B}\).

Under the affine model \(u = a + b LS\), the ratio of true effects is:

\[
\frac{\Delta u^{A}}{\Delta u^{B}} = \frac{\mathbb{E}[b\mid P_A]\,\Delta LS^{A}}{\mathbb{E}[b\mid P_B]\,\Delta LS^{B}}
\]

Thus, comparing interventions by \(\Delta LS\) alone is valid *for ranking* if \(\mathbb{E}[b\mid P_A] \approx \mathbb{E}[b\mid P_B]\) (and both are measured comparably), even if intercepts \(a\) differ. This is one reason the “\(LS_A=7\Rightarrow u_A=u_B\)” claim is not necessary for many comparative exercises.

But the rescue hinges on something you’d want to surface transparently on the page: the relevant “stretch” distribution needs to be similar across the populations/studies—an assumption that is **plausible in some contexts and shaky in others**, particularly across cultures and languages.

### Response shift is a distinct threat from scale-use heterogeneity

Even if baseline scale-use heterogeneity cancels (e.g., by randomization), treatment can change the **meaning** of the respondent’s self-evaluation. In quality-of-life research, this is often discussed as **response shift**: changes in internal standards, values, or conceptualization that alter how respondents answer over time. citeturn7search0

For wellbeing interventions in LMICs—especially psychosocial programs that may explicitly reframe cognition and evaluation—response shift is not a corner case. If treatment changes the reporting function \(f_i(\cdot)\), then observed \(\Delta LS\) mixes “true welfare change” with “scale change,” and the WELLBY estimate may be biased in either direction.

### Why the “neutral point” matters, formally and with examples

You explicitly asked for a reminder of why “neutral point” matters. There are two different “zeros” people mean:

- **Neutral wellbeing (life neither good nor bad)**: \(u=0\)
- **Dead-as-zero (life-years saved)**: treat death as \(u=0\) or \(LS=0\)

If you only ever compute incremental changes \(\Delta LS\) among the living, adding a constant \(c\) to everyone’s reported LS (\(LS' = LS + c\)) does not change \(\Delta LS\). Neutral point is mostly irrelevant.

But once you do anything like \(\text{WELLBYs from life extension} = \text{(life-years gained)} \times \text{(average wellbeing level in those years)}\), the origin matters because a shift changes the integral.

That’s why the World Happiness Report WELLBY chapter makes “dead people score 0” an explicit key assumption, and notes ongoing research asking respondents what point on the scale is “as bad as being dead.” citeturn2view0 In parallel, UK Green Book wellbeing guidance discusses aligning the bottom of life satisfaction with a “QALY = 0 (as bad as death)” anchor, noting evidence suggesting an indifference point around 2 for some respondents, yet adopting a working assumption of 1 (and using “8-to-1” to relate a QALY to a 7‑point life‑satisfaction difference). citeturn4view3

**Example (why origin matters):**  
If an LMIC program prevents a death and yields 40 additional life-years, valuing the benefit as \(40\times 5\) WELLBYs implicitly assumes “0 means dead and 5 is five units above death.” If instead you believed the appropriate zero for “worth living vs not” is closer to 2 (as discussed in the UK guidance), then the same 40 years at LS=5 would be valued as \(40\times (5-2)=120\) “above-neutral WELLBYs,” not 200. citeturn4view3  
That is a **ranking-relevant** difference once you compare mortality-focused interventions (e.g., malaria prevention) to non-mortality wellbeing programs (e.g., psychotherapy).

## What the empirical evidence says about reliability and meaning of SWB numbers

Your workshop page will be stronger if it distinguishes: **(a) psychometric reliability**, **(b) external validity/predictive meaning**, and **(c) comparability/identification**.

### Reliability: life satisfaction is noisy but not useless

OECD guidance synthesizes evidence that single-item life evaluations have **test–retest correlations often around 0.5–0.7** over short windows (1 day to 2 weeks), while also reporting estimates around **0.68–0.74** in some large samples and noting that **country averages** can be much more stable (e.g., very high year-to-year correlations for country-level means). citeturn16view1

Krueger and Schkade’s work (also cited in the OECD discussion) is a canonical economics reference point: in their sample, life satisfaction measured two weeks apart had a correlation around 0.59, and diary-based net affect around 0.64. citeturn19search7turn19search19turn16view1  
Two implications for WELLBY CEA:

- Measurement error attenuates estimated effects (bias toward zero), implying that small but real effects may be undervalued unless corrected.
- But the noise also inflates uncertainty, so credible WELLBY estimates need adequate sample sizes and good designs.

### External validity: numerical feelings predict behavior in broadly regular ways

A strong response to skepticism is: even if the numbers are “made up,” do they behave like a measurement?

Kaiser and Oswald argue that a single numeric feelings response has strong predictive power and that relationships from feelings to later “get-me-out-of-here” actions (neighborhood/job/partner/hospital changes) tend to be **replicable and close to linear in structure** in large longitudinal datasets. citeturn32view0

This kind of result supports the pragmatic view: self-reported wellbeing is not an arbitrary label; it tracks consequential outcomes in systematic ways.

### Identification and comparability: the hardest critique is about what the data cannot pin down

Bond and Lang’s critique is not about random noise; it is more fundamental: with **ordinal** response data, comparing “average happiness” between groups is generally not identified without strong assumptions, because monotonic transformations can reverse results; they argue it is “(almost) never possible” to rank group mean happiness from discrete ordinal responses, and that key conclusions depend on assumptions about the latent distribution. citeturn11view1turn11view3turn11view0

Three clarifications matter for a WELLBY workshop page:

- Their critique is most directly aimed at **cross-group mean comparisons** and the latent-variable interpretation of ordinal scales.
- It does not automatically imply that **within-study randomized treatment effects** on reported wellbeing are meaningless; rather, it implies you should be explicit about what assumptions let you treat “0.3 points” as “0.3 welfare units.”
- The OECD 2025 update treats Bond & Lang as a “prominent critique” but summarizes subsequent work as supporting the view that subjective wellbeing data are meaningful, citing rebuttals and methodological approaches addressing scale-use heterogeneity rather than abandoning SWB measures. citeturn12view0

Recent econometric work also aims to directly address identification concerns. For example, Liu and Netzer (AER 2023) propose using **survey response times** to help solve identification problems in ordered response models (i.e., to learn about the latent distribution that otherwise drives sensitivity). citeturn19search1turn19search9

### Scale-use heterogeneity: we now have methods, but they introduce their own assumptions

Classic work by King et al. introduced **anchoring vignettes** as a way to improve cross-respondent and cross-cultural comparability when people interpret response categories differently. citeturn5search20turn5search24

More recent work develops alternative calibration-question strategies, emphasizing that “scale-use” can be decomposed into general response tendencies and dimension-specific tendencies, and that responses across calibration items can often be approximated as linear transformations—again echoing “shifters” and “stretchers.” citeturn9view2turn9view0turn9view3

However (and this is important for transparency), these correction methods require assumptions about how calibration items relate to the SWB questions and about “response consistency” across item types. citeturn9view2turn9view0 A workshop page should present these as *tradeoffs* rather than a free fix.

## What LMIC evidence implies for WELLBY use in practice

### Life satisfaction is responsive to major LMIC interventions, at least in some well-studied cases

Large RCT evidence on GiveDirectly-style unconditional cash transfers in Kenya shows measurable improvements in life satisfaction/happiness components.

In the short run, Haushofer and Shapiro report that transfers improved a psychological wellbeing index, and they attribute much of this to increases including roughly **0.17 SD in life satisfaction** and **0.16 SD in happiness** (WVS measures), alongside reductions in stress and depression. citeturn25view0turn25view1

In a longer-run follow-up (about three years after transfer start), they report continued positive psychological wellbeing effects; a table of treatment effects shows **life satisfaction (WVS)** increased by about **0.08 SD** (statistically significant at 10%), and the overall psychological wellbeing index by **0.16 SD**. citeturn29view1

These findings matter for WELLBY discussions because they show:

- The life satisfaction-type measures have **detectable signal** in LMIC RCTs, not just noise.
- Effects can persist, meaning the “duration” piece of WELLBY accounting is empirically relevant.

### Many LMIC mental health interventions do not measure life satisfaction directly

A major practical constraint for WELLBY-based portfolio choice is that many psychosocial/mental health studies report **depression scales, symptom indices, or quality-of-life instruments**, but not a standard 0–10 life satisfaction question.

This is not a theoretical issue; it currently shapes major evaluators’ disagreements. For example, GiveWell’s assessment of Happier Lives Institute’s work on StrongMinds explicitly highlights uncertainty in **translating improvements in depression into life satisfaction gains**, noting that psychotherapy studies often do not report life satisfaction effects and arguing that mapping assumptions might overstate life satisfaction impacts unless directly measured. citeturn22search11turn22search3

For your workshop, this is a good “why it matters” case study: even if you accept WELLBY as the target unit, the **measurement layer** (what studies actually measure) forces choices:

- Use DALYs/QALYs or symptom scales (more standard in health evaluation), even if they miss non-health welfare channels.
- Use life satisfaction directly (preferred for WELLBY), but only where trials collect it.
- Use mapping models (depression → life satisfaction), but then you must carry mapping uncertainty explicitly.

### Instrument differences are not a footnote in cross-study LMIC work

International SWB evidence uses multiple “life evaluation” questions (life satisfaction vs Cantril ladder). The OECD prototypes emphasize using consistent modules and careful anchor wording for comparability. citeturn18view2turn16view3

Even within the broad “0–10 life evaluation” family, distributions can differ by instrument and population, and response-style phenomena (such as strong “10” clustering in some regions) have been documented and discussed in the literature. citeturn5search9

**Practical implication:** if an LMIC funder is comparing effect sizes from (say) a Kenya cash transfer study using one life evaluation question to a Uganda therapy study using a different one (or none), the key uncertainty is not only the causal effect—it’s **measurement commensurability**.

## Relative reliability versus alternatives: DALYs, richer surveys, and hybrid approaches

You emphasized a crucial workshop requirement: we cannot stop at “linear wellbeing is unreliable.” Decision makers must choose *something*, and the relevant question is often comparative.

### DALYs and QALYs are standardized, but narrower by design

Health metrics such as QALYs and DALYs are built around health states, combining longevity with health quality/disability weights. A standard definition (used widely in burden-of-disease work) decomposes DALYs into **years of life lost (YLL)** and **years lived with disability (YLD)**. citeturn20search12turn20search16 QALYs similarly combine years of life with a 0–1 health utility weight; NICE’s glossary defines a QALY as a year of life weighted by a quality-of-life score, with 1 QALY equal to one year in perfect health. citeturn20search5

Strengths relative to WELLBYs for LMIC priority setting:

- Strong institutional standardization and large existing evidence bases.
- Direct linkage to mortality and health morbidity.

Weaknesses relative to WELLBYs:

- May miss or underweight welfare impacts not captured by health-state descriptions (e.g., empowerment, social status, security, meaning).
- For mental health, DALY/QALY methods exist, but instrument choice and disability weights can still be contentious, and they may not capture broader life evaluation improvements; UK guidance explicitly suggests life satisfaction can reflect dimensions beyond standard QALY instruments. citeturn4view3

### More detailed wellbeing surveys can reduce some measurement problems but introduce others

OECD guidance explicitly proposes not only the single life satisfaction item but also extended modules and multi-item scales; it notes that more detailed measures can have higher reliability, and it provides standardized question modules for life evaluation and affect. citeturn18view2turn17view2turn16view1

More detailed instruments can help with:

- Reliability (averaging item noise)
- Construct coverage (eudaimonia, affect, domain satisfaction)

But they can increase:

- Respondent burden and survey cost (important in LMIC field work)
- Translation/cognitive testing challenges (OECD notes translation and wording challenges for some constructs). citeturn13view3turn12view0

### Hybrid approach as the realistic “policy” stance

A neutral, decision-relevant stance—consistent with how the UK guidance positions wellbeing evidence alongside other appraisal methods—is:

- Use DALYs/QALYs where the primary pathway is health and the evidence base is deep.
- Use WELLBYs where interventions plausibly change welfare through broader channels (especially mental health and social interventions), *but* require stronger transparency about the measurement assumptions and do sensitivity analysis. citeturn4view0turn4view2

From a workshop perspective, “WELLBY vs DALY” should be framed less as a winner-take-all debate and more as a **portfolio comparison problem under measurement uncertainty**.

## Concrete instructions to improve your linear WELLBY analysis page

I could not access the ChatGPT project page you linked because it redirects to a login screen. citeturn0view0 I also do not currently have access to your internal project files in this chat environment (no uploaded files available), so the guidance below is written as **implementation-ready structure and fixes** rather than line-by-line edits to your specific HTML. If you upload `linear-wellby-analysis.html`, I can give precise rewrite suggestions anchored to its exact wording.

### Fix conceptual claims that are currently too strong or mis-scoped

Replace any statement of the form “\(LS_A = LS_B \Rightarrow u_A = u_B\)” with a clearly scoped set of assumptions that distinguishes:

- **Level comparability** (rarely needed for incremental WELLBYs)
- **Unit-change comparability** (often needed for comparing interventions by \(\Delta LS\))
- **Zero-point/neutral-point anchoring** (needed for mortality/life-extension comparisons)

Use the affine example explicitly:

- If \(u = a_i + b\,LS\), then differences are comparable even if levels are not.
- If \(u = a_i + b_i\,LS\), then both levels and differences can fail.

Then ground it in the modern scale-use heterogeneity literature: “shifter” vs “stretcher” is not just intuition; it is an explicit modeling approach used in recent work on adjusting self-reports. citeturn9view0turn9view3

### Repair the WELLBY definition and indexing with “incremental WELLBYs” front and center

Replace ambiguous lines like “\(W=\sum_i\sum_t LS_{it}\)” with a two-part definition:

- **Incremental WELLBYs (policy comparison target):**  
  \(\Delta WELLBY(k)=\sum_i\sum_t \delta^t(LS^{(k)}_{it}-LS^{(0)}_{it})\)
- **Level-based WELLBY accounting (only when needed):**  
  \(W=\sum_i\sum_t \delta^t LS_{it}\), with an explicit warning: *requires a defined zero point (e.g., death=0) and is not invariant to shifting the LS scale*.

Anchor the question wording to an authoritative source (OECD prototype module) and specify the response anchors (0 = not at all satisfied; 10 = completely satisfied). citeturn18view2

### Add a dedicated “why this matters” block after every major assumption

For each assumption, add:

1) what breaks if it fails,  
2) why it might plausibly fail in LMIC cross-study comparison,  
3) what can be done (design or sensitivity).

Examples you can reuse:

- **Scale shift** across people/cultures: doesn’t necessarily break \(\Delta LS\) comparisons if it’s only an intercept shift, but breaks “levels × life years” valuations.
- **Scale stretch** differences: can reverse cross-population comparisons of “how much welfare per point”; show a toy numeric example.
- **Response shift**: can bias even within-study effects for psychosocial interventions; cite response shift theory conceptually. citeturn7search0

### Add an “empirics” section that includes at least one LMIC RCT with life satisfaction results

A minimal-but-rigorous empirics panel could include:

- Short-run GiveDirectly RCT: cash transfers increased life satisfaction and happiness components (WVS) and improved a psychological wellbeing index. citeturn25view0turn25view1  
- Long-run follow-up: still-positive (smaller) life satisfaction effect and significant psychological wellbeing index effect after ~3 years. citeturn29view1

Then explicitly connect empirics to assumptions:

- These studies illustrate that life satisfaction measures can move in plausible directions and magnitudes in LMIC RCTs.
- They do **not** solve cross-study comparability; they show that in at least one setting, SWB is responsive and not pure noise.

### Add a balanced “identification and critique” section with a clear map of the debate

Include a neutral “two-column” narrative (not necessarily a visual table) summarizing:

- **Hard critique:** Ordinal nature can make mean comparisons non-identified; transformations can reverse conclusions; strong assumptions needed. citeturn11view1turn11view3  
- **Responses/mitigations:** Predictive validity and systematic structure in large panels; use of response times to address identification; explicit adjustment methods for scale-use heterogeneity; OECD’s stance that the data remain meaningful for policy and that the past decade includes rebuttals/solutions. citeturn32view0turn19search1turn12view0turn9view0

Make this “debate map” explicit so the page is reasoning-transparent rather than asserting consensus.

### Provide an explicit “relative reliability vs DALYs” comparison so the page doesn’t end in nihilism

You requested exactly this: do not stop at “WELLBY unreliable.” Add a section:

- Define DALYs and QALYs in one sentence each with citations. citeturn20search12turn20search5  
- State where DALYs/QALYs dominate (mortality/health morbidity evidence bases) and where WELLBYs plausibly add information (mental health and non-health welfare channels), citing UK guidance that QALYs are a subset of life satisfaction. citeturn4view3  
- Conclude with a decision rule: “choose the metric that best matches the intervention’s welfare channels and the available data; when using WELLBYs across heterogeneous contexts, report sensitivity to scale-comparability assumptions.”

### Add simple interactivity that teaches, not overwhelms

Start with one interactive widget and add more only if it’s helpful:

- **WELLBY calculator:** inputs: effect size \(\Delta LS\), duration (years), number treated, discount rate \(\delta\) → outputs: WELLBYs and cost per WELLBY.
- **Neutral point toggle:** only for modules that value mortality or “life-years” (illustrate why shifting the origin changes life-year valuations). Reference the “death point / indifference point” discussion. citeturn2view0turn4view3  
- **Scale-use heterogeneity slider:** let users toggle between “shift only” vs “slope differences,” using the shifter/stretcher diagram logic, and show when rankings change.

### Upgrade citation practice and reasoning transparency

Implement a consistent citation system:

- Every factual claim about measurement practice, reliability, or government definitions should have a footnote linking to (a) OECD question module, (b) UK Green Book wellbeing guidance definition, (c) key critique/response papers. citeturn18view2turn4view2turn11view1turn12view0  
- For each assumption, include “If this fails, here is the failure mode” plus “How to mitigate / sensitivity test,” and cite the method sources (anchoring vignettes; calibration questions). citeturn5search24turn9view2

### Suggested page outline that fits workshop needs

Use a structure that supports both a quick read and deep dives:

1. Definition and use-case of incremental WELLBYs (with notation and question wording) citeturn4view2turn18view2  
2. When neutral point matters (and when it doesn’t) citeturn2view0turn4view3  
3. Assumptions for validity, separated into level vs difference comparability (with examples/diagram) citeturn9view0turn16view3  
4. Empirics: measurement reliability + at least one LMIC RCT illustrating responsiveness citeturn16view1turn25view1turn29view1  
5. Critiques and responses (Bond & Lang vs later work and OECD stance) citeturn11view1turn12view0turn32view0turn19search1  
6. Alternatives and relative reliability (DALY/QALY vs WELLBY vs richer SWB instruments) citeturn20search12turn20search5turn4view3turn17view2  
7. Practical recommendations: what to measure in future LMIC evaluations; what sensitivity analyses to report (especially for cross-study comparisons)

This outline directly addresses your concerns: it corrects overstrong comparability claims, repairs notation, adds empirics, explains “why it matters,” and ends with an actionable decision framework rather than skepticism-only.