# Evidence: Do Authors Engage with Unjournal Evaluations?

A natural question for funders and potential participants is: do authors actually read and act on Unjournal evaluations? Do papers get revised as a result?

This page documents preliminary evidence from a systematic analysis of 34 paper pairs—the same paper observed before and after receiving an Unjournal evaluation.

{% hint style="info" %}
This analysis is preliminary and ongoing. The methodology and a deeper attribution analysis are maintained in the companion research project: [Comparing LLM and Human Reviews of Social Science Research](https://llm-uj-research-eval.netlify.app/impact\_engagement.html).
{% endhint %}

## Study Design

We assembled 34 confirmed paper pairs where the "before" version is the working paper evaluated by Unjournal reviewers and the "after" version is a later iteration retrieved from preprint servers or journal websites. For each pair, we used PDF-to-text extraction and line-level diffing to quantify the magnitude of revisions. We then matched pairs against our corpus of published evaluation files to identify which papers had received Unjournal evaluations.

## Key Findings

| | Count |
|---|---|
| Total paper pairs analyzed | 34 |
| Papers matched to Unjournal evaluations | 20 |
| Papers with evaluations **and** substantial revisions (>50 net line changes) | **6** |
| Papers with large-scale revisions overall (>200 net line changes) | 11 |

Six of the 20 papers with Unjournal evaluations (30%) showed substantial line-level revisions in the post-evaluation version—a conservative lower bound given imperfect paper matching and the high threshold used.

### Papers with Evaluations and Substantial Revisions

| Paper | Evaluations | Net line changes | Text length change |
|---|---|---|---|
| Zero-Sum Thinking, the Evolution of Effort-Suppressing Beliefs, and Economic Development | 2 | 3,207 | −1.4% |
| When Celebrities Speak: A Nationwide Twitter Experiment Promoting Vaccination In Indonesia | 2 | 2,403 | −36.6% |
| Misperceptions and Demand for Democracy under Authoritarianism | 2 | 1,660 | +3.9% |
| A Welfare Analysis of Policies Impacting Climate Change | 2 | 1,291 | +0.3% |
| Does Conservation Work in General Equilibrium? | 1 | 223 | −0.5% |
| Does the Squeaky Wheel Get More Grease? The Direct and Indirect Effects of Citizen Participation on Environmental Governance in China | 2 | 110 | −0.8% |

Several patterns are worth noting:

* **Four of six papers received two independent evaluations**, suggesting more comprehensive feedback may correlate with more revision activity.
* **Text length changes are modest** despite large line counts—cases with near-zero text length change and thousands of line changes (e.g., Zero-Sum Thinking) suggest substantial internal restructuring rather than simple expansion.
* **The celebrity vaccination paper** shows a large text reduction (−36.6%), consistent with condensation from a working paper into a submission-ready version—a common pattern following reviewer feedback.

## Important Caveats

{% hint style="warning" %}
**Correlation, not causation.** Demonstrating that a paper was revised after an evaluation does not establish that the revision was caused by the evaluation. Authors revise papers for many reasons—journal referee feedback, co-author cycles, conference presentations. A planned follow-up analysis will use LLM-assisted comparison of specific evaluator suggestions against detected changes to assess attribution.
{% endhint %}

Additional limitations:

* **Diff noise**: PDF-to-text extraction introduces artifacts; line-level diffs can overcount changes due to page-layout differences.
* **Version identification**: The "after" papers were identified via manual matching and may not represent the most recent post-evaluation version.
* **Missing evaluations**: Not all Unjournal evaluations are in our markdown corpus; some evaluated papers may be classified as unevaluated.

## Planned: Attribution Analysis

For the six candidate papers, a follow-up analysis will use a frontier LLM to extract specific suggestions from each evaluation and assess whether detected changes plausibly reflect that feedback. This has been scoped and costed at roughly $1.50–6.00 in API costs. Results will be added here when complete.

## Related Evidence Streams

**Publication outcomes.** The Unjournal records journal-tier predictions alongside evaluations. Comparing predicted tier to actual outlet for papers that have since been published provides external validation of evaluation quality—and demonstrates that evaluated papers continue to progress through the academic pipeline.

**Citation networks.** Analysis via the OpenAlex API tracks citations to Unjournal-evaluated papers, enabling longitudinal analysis of whether evaluated papers accumulate citations at rates consistent with their predicted quality tier.

**Author acknowledgments.** A qualitative scan of published versions of evaluated papers for explicit acknowledgments of Unjournal reviewers would provide direct evidence of author recognition—this has not yet been systematically undertaken.
