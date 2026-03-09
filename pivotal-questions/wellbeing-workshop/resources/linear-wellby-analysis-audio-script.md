# Linear WELLBYs for Comparing Interventions
## An Audio Briefing for Workshop Deliberation

This is an audio version of The Unjournal's briefing document on using linear WELLBYs—that is, Wellbeing-Adjusted Life Years—for comparing interventions. This document was prepared for the Pivotal Questions workshop on wellbeing measurement.

Note: This content was generated with AI assistance and revised based on over 75 workshop comments. It aims to frame issues for deliberation rather than prescribe conclusions.

---

## Section 1: The Decision Problem

Organizations comparing interventions face a measurement problem. Different interventions change different things: mortality, morbidity, consumption, mental health, social cohesion. The WELLBY approach proposes translating all of these into a common unit based on subjective wellbeing, enabling "welfare impact per dollar" comparisons.

This workshop's focal question is: How reliably can we compare interventions by aggregating changes in reported wellbeing, especially across different studies and contexts?

Think of it as a pipeline. An intervention leads to a study design, which produces measured outcomes—things like life satisfaction scores, DALYs, or depression scales. These measurements then go through a translation layer involving mapping and calibration. That produces a common currency—WELLBYs, DALYs, or dollars—which finally informs the decision.

The workshop goal is clarity about which assumptions matter most for which comparisons, and what evidence would change views—not reaching a single verdict.

---

## Section 2: Definitions and Key Concepts

Let's start with the basic definition. One WELLBY equals a one-point change in life satisfaction on a zero-to-ten scale, for one person, for one year. This definition comes from the UK Green Book Wellbeing Guidance published by Her Majesty's Treasury.

The standard life satisfaction question, following the OECD prototype, asks: "Overall, how satisfied are you with your life as a whole these days?" with anchors where zero means "not at all satisfied" and ten means "completely satisfied."

### Origins and Adoption

The WELLBY was originally proposed by Frijters, Clark, Krekel and Layard in a 2020 paper in Health Economics titled "A Happy Choice: Wellbeing as the Goal of Government."

Most usage defines WELLBY using life satisfaction—specifically the Cantril ladder with a zero to ten scale—but some researchers use affect-based measures that capture experienced happiness. The choice matters: life satisfaction captures evaluative wellbeing, while affect captures momentary experience.

Several organizations now use WELLBYs. The Happier Lives Institute uses it as their primary metric for charity comparison. Founders Pledge uses WELLBYs alongside DALYs for mental health cost-effectiveness analysis. GiveWell has explored WELLBY analysis but with significant reservations. And the UK Government includes it in official guidance for policy appraisal.

### Incremental versus Level-Based Accounting

There are two ways to count WELLBYs.

Incremental WELLBYs—which is what most intervention comparisons need—sum up the change in life satisfaction for each person over time, compared to a counterfactual. Mathematically, this is the sum over individuals and time periods of the difference between life satisfaction under the intervention versus the baseline, potentially discounted by a factor for future years.

Level-based WELLBYs, used for mortality comparisons, simply sum the life satisfaction scores themselves over individuals and time.

The key distinction: incremental WELLBYs measure changes from a reference point, while level-based WELLBYs measure totals.

### Technical Definitions

A few technical terms are important.

The "instrument" means the specific measurement tool—exact question wording, response format like zero-to-ten versus one-to-seven, anchors, translation, and survey mode.

The "reporting function" is the mathematical mapping from latent welfare to reported score. We can write this as: life satisfaction equals some function of underlying welfare, plus measurement error.

The "latent distribution" is the unobserved underlying welfare distribution. Since we only see reported scores, our conclusions can depend on assumptions about this hidden distribution.

---

## Section 3: Core Assumptions

Using linear WELLBYs for cross-intervention comparison requires assumptions. A common overstatement is that "equal scores mean equal welfare"—but this is stronger than most applications need.

There are four core assumptions.

First, cardinality or linearity. This assumes that equal intervals on the scale imply equal welfare differences—that moving from three to four equals the same welfare gain as moving from seven to eight. If violated, summing may distort comparisons.

Second, unit-change comparability. This assumes a one-point change has approximately the same welfare meaning across people. Importantly, this is weaker than requiring equal levels to mean equal welfare.

Third, temporal aggregation. This assumes that integrating wellbeing over time is meaningful. This may fail if adaptation returns people to baseline, or if respondents reinterpret the scale over time—something called response shift.

Fourth, cross-domain capture. This assumes that life satisfaction incorporates welfare from many domains—health, income, relationships—not merely transient mood.

### Time Structure and Discounting

For WELLBY estimation, you measure life satisfaction at baseline, then follow up over time, potentially discounting future periods. The key questions are: How does the effect persist or decay? Does response shift occur? What discount rate should be applied when aggregating?

### Response Shift: A Distinct Threat

Even if baseline scale-use differences cancel out by randomization, the treatment itself can change the meaning of the respondent's self-evaluation. This is called response shift: changes in internal standards, values, or conceptualization that alter how respondents answer over time.

For wellbeing interventions—especially psychosocial programs that may explicitly reframe cognition—response shift is not a corner case. If treatment changes how people use the scale, the observed change in life satisfaction mixes "true welfare change" with "scale change," biasing the WELLBY estimate in either direction.

---

## Section 4: The Key Critique—Identification and Transformations

Bond and Lang, in a 2019 paper in the Journal of Political Economy, argue that with ordinal happiness data, comparing "average happiness" between groups is not identified without strong assumptions. Monotonic transformations can reverse conclusions.

### What "Non-Identified" Means

A parameter is "identified" when data plus assumptions pin down a unique value. Ordinal responses only tell us which interval a latent value falls into. Many different latent distributions and transformations can generate the same observed category counts. This means rankings of means can change across equally admissible representations.

### Why This Matters for Intervention Comparison

This matters for two reasons. First, cross-study synthesis: comparing treatment effects measured on different scales can inherit the same vulnerability. Second, magnitude-sensitive cost-effectiveness: even if the signs of effects are stable, cost-effectiveness ratios rely on magnitudes.

You can see this with a simple example. Imagine two populations where population A has life satisfaction scores of 3, 4, 4, 5, 5, 5, 6, 6, 7, and population B has scores of 2, 4, 5, 5, 6, 6, 7, 7, 8. Using the raw scores, population B has the higher mean. But if you apply a transformation—say, raising each score to a power other than one—the ranking can flip. A concave transformation compresses high values; a convex transformation expands them. The ranking depends on which transformation you assume.

---

## Section 5: Scale-Use Heterogeneity—Shifters versus Stretchers

A useful way to think about scale-use differences is the affine model. In this model, underlying welfare equals a shift term plus a stretch factor times the reported life satisfaction score.

This gives us two types of heterogeneity.

Shifters are different intercepts—some people always report two points higher regardless of their actual welfare. With pure shifters, levels are not comparable, but differences are. If everyone has the same stretch factor, a one-point change means the same thing for everyone.

Stretchers are different slopes—some people compress the scale while others expand it. With stretchers, both levels and differences fail to be comparable. A one-point change for someone with a large stretch factor represents a smaller welfare change than for someone with a small stretch factor. This can reverse cross-population comparisons.

Benjamin and co-authors propose calibration questions to identify and adjust for scale-use heterogeneity. These are questions designed to have the same objective answer across respondents, allowing researchers to estimate individual stretch factors.

An important point: fixed effects in statistical analysis only remove shifts, not stretches. Fixed effects absorb level differences—the intercept terms—but if people have different stretch factors, the implied welfare change per reported point still differs.

---

## Section 6: Neutral Point and Mortality

There are two different "zeros" people reference.

The first is neutral wellbeing: the point where life is neither good nor bad—where living that moment is neither positive nor negative.

The second is death as zero: treating "dead people score zero" for life-year calculations.

For incremental comparisons among the living, the neutral point often cancels out. If you're comparing two interventions that both affect living people, subtracting the neutral point from both gives you the same relative comparison.

But for mortality comparisons—where you calculate "WELLBYs from life extension equals life-years times average wellbeing"—the origin is load-bearing.

Consider this example. A mortality intervention prevents a death, yielding 40 additional life-years at an average life satisfaction of 5. If you assume the neutral point is zero, the benefit is 40 times 5, equals 200 WELLBYs. But if you assume the neutral point is 2—meaning life is only positive above score 2—then the benefit is 40 times (5 minus 2), equals 120 "above-neutral" WELLBYs. That's a 40% difference.

The key question: When does the neutral point matter? It matters when comparing mortality-focused interventions to non-mortality wellbeing programs. For comparisons among living people only, it typically cancels.

---

## Section 7: Evidence and Alternatives

### Reliability

Single-item life evaluations have test-retest correlations around 0.5 to 0.7 over short windows. This is noisy but not useless. It means measurement error attenuates estimated effects—small real effects may be undervalued.

### Predictive Validity

Kaiser and Oswald, in a 2022 paper in PNAS, show that single numeric feelings responses predict consequential outcomes—like changing neighborhoods, jobs, or partners. The relationships tend to be replicable and close to linear.

### LMIC Evidence: GiveDirectly Cash Transfers

The Kenya randomized controlled trial by Haushofer and Shapiro provides important evidence. In the short run—about 9 months—they found life satisfaction increased by 0.17 standard deviations, and happiness increased by 0.16 standard deviations, using World Values Survey measures. In the long run—about 3 years—life satisfaction was still 0.08 standard deviations higher, which was statistically significant. The psychological wellbeing index was 0.16 standard deviations higher.

These findings show that life satisfaction measures have detectable signal in LMIC—low and middle income country—randomized trials, not just noise. And effects can persist.

### The Measurement Layer Problem

Many LMIC mental health studies report depression scales or symptom indices, not standard zero-to-ten life satisfaction. GiveWell's assessment of StrongMinds explicitly highlights uncertainty in translating depression improvements into life satisfaction gains.

Even if you accept WELLBY as the target unit, the measurement layer forces choices. You could use DALYs or QALYs—which are more standard in health evaluation—even if they miss non-health welfare. You could use life satisfaction directly, but only where trials collect it. Or you could use mapping models from depression to life satisfaction, but carry the mapping uncertainty explicitly.

### Comparison with Alternatives

How does WELLBY compare to other metrics?

WELLBY's strengths are that it captures non-health welfare, uses direct self-report, and has low respondent burden. Its weaknesses are scale-use and comparability assumptions, plus cross-study issues.

DALY and QALY are standardized with large evidence bases and a direct mortality link. But they may miss non-health welfare, and mental health weights are contentious.

Calibrated WELLBY—using Benjamin and co-authors' methods—can reduce scale-use bias by an estimated 30 to 50 percent. But it's complex, LMIC feasibility is unclear, and it introduces new assumptions.

---

## Section 8: The WELLBY Calculator

You can estimate total WELLBYs with a simple formula: effect size in life satisfaction points, times duration in years, times number of recipients.

For example, if an intervention improves life satisfaction by 0.5 points, lasts 2 years, and reaches 1,000 people, the total is 0.5 times 2 times 1,000 equals 1,000 WELLBYs.

If that program costs $100,000, the cost per WELLBY is $100.

This assumes constant effect size. Real applications should account for effect decay, discounting, and uncertainty.

---

## Section 9: Practical Considerations

### For Funders Comparing Interventions

Treat WELLBY estimates as one input among several, not the final answer.

Conduct sensitivity analyses across different neutral points and scale-comparability assumptions.

Report how rankings change under different assumptions.

Be explicit about uncertainty rather than giving false precision.

### For Researchers Designing Studies

Use standardized life satisfaction questions—the OECD prototype—to enable cross-study comparison.

Include long-term follow-up to capture duration effects and potential adaptation.

Consider calibration questions or vignettes if comparing across populations.

Pre-register analysis plans including functional form choices.

### Conditions for Stronger Inference

Stronger inference is possible with large effect sizes that overwhelm measurement error; within-person designs where each person serves as their own control; multiple wellbeing measures showing the same directional effect; and triangulation with behavioral or objective outcomes.

---

## Section 10: Open Questions

These are high-value areas for future research that could meaningfully improve the reliability of WELLBY-based comparisons.

First, neutral point estimation. What is the actual neutral point on the zero-to-ten scale for different populations? How stable is it across contexts?

Second, scale-use heterogeneity mapping. How do shifters versus stretchers vary across LMIC populations, and can we predict which matters more?

Third, cheap calibration methods. Can vignettes, anchoring questions, or other calibration approaches work in low-resource settings without excessive burden?

Fourth, the WELLBY-DALY relationship. What's the mapping between WELLBYs and DALYs, and is it linear? How much does it vary by health condition?

Fifth, demand effects and response shift. How do experimenter demand effects and response shift vary by intervention type?

---

## Section 11: Workshop Prompts

Here are neutral prompts for workshop deliberation.

Prompt 1: For which classes of intervention comparisons—same setting and instrument versus cross-study—does the linear WELLBY seem most defensible, and why?

Prompt 2: Which assumptions are most likely to be materially violated in LMIC contexts: linearity, intertemporal comparability, interpersonal comparability, or scale-use heterogeneity?

Prompt 3: When does the neutral point become decision-relevant? Which "zero" do you have in mind?

Prompt 4: How should analysts treat "mapping" between depression scales and life satisfaction when life satisfaction isn't measured? What minimum evidence would make a mapping credible?

Prompt 5: Which low-burden calibration approaches seem most promising for LMIC settings?

---

## References

The key references for this briefing include:

Frijters, Clark, Krekel and Layard, 2020, "A Happy Choice: Wellbeing as the Goal of Government," in Health Economics.

The OECD Guidelines on Measuring Subjective Well-being, published in 2013 and updated in 2024.

Bond and Lang, 2019, "The Sad Truth about Happiness Scales," in the Journal of Political Economy.

Benjamin and co-authors, 2023, "Adjusting for Scale-Use Heterogeneity," NBER Working Paper 31728.

Kaiser and Oswald, 2022, "The Scientific Value of Numerical Measures of Human Feelings," in PNAS.

Haushofer and Shapiro, 2016, "The Short-term Impact of Unconditional Cash Transfers," in the Quarterly Journal of Economics, with a 2018 long-term follow-up.

HM Treasury's Wellbeing Guidance for Appraisal, published in 2021 and updated in 2024.

And GiveWell's 2023 assessment of Happier Lives Institute's cost-effectiveness analysis of StrongMinds.

---

This concludes the audio briefing on Linear WELLBYs for Comparing Interventions, prepared for The Unjournal's Pivotal Questions Workshop.

For the full document with interactive demonstrations and diagrams, visit the workshop website at uj-wellbeing-workshop.netlify.app.
