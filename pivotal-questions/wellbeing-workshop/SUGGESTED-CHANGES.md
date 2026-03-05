# Suggested Changes for Workshop Live Event Pages

Based on content from:
- [Benjamin Correspondence](https://docs.google.com/document/d/1k7RSMNivX4oa4i4nXkLNddtB54pS6IIHNoOCI-HFzwg/edit)
- [FP/Lerner PQ Discussion](https://docs.google.com/document/d/1z-OgDLaKjVizmZEQUb5j2rfXRGMKCiFeEjBLT-pskpE/edit)
- [Third doc](https://docs.google.com/document/d/1fKymxTxpgwx1SA9Qai0PZlhu1QA9mCEngCnrgJPIbBc/edit) - **NOTE: Too large to fetch; please review manually**

---

## Summary of Key Themes from Source Docs

### From Benjamin Correspondence (Doc 1)
- **Benjamin's core skepticism**: Single broad measures like "life satisfaction" are limited; people's choices suggest they care about more than just life satisfaction and happiness
- **Proposed ideal approach**:
  1. Collect comprehensive wellbeing data across multiple specific dimensions
  2. Use stated-preference surveys to estimate how people trade off wellbeing aspects
  3. Create individual-level "personal wellbeing indices" for policy evaluation
  4. Apply calibration questions for interpersonal comparability
- **Practical finding**: Importance ratings correlate 0.8-0.9 with stated-preference tradeoffs (a feasible alternative)
- **Visual calibrations** offer partial scale-use corrections when direct questions prove too costly
- **Israeli think tank implementation** is underway but funding-dependent

### From FP/Lerner Discussion (Doc 2)
- **Priority areas identified by Lerner**: Moral weights and DALY/WELLBY interconvertibility
- **Three key problems**:
  1. Justifiability of treating mental health measurements as interconvertible with DALYs remains unclear
  2. Using different metrics produces "dramatically different cost-effectiveness estimates"
  3. Linearizing DALY-WELLBY conversion may be inappropriate
- **Primary Question**: Is the WELLBY a reliable measure considering comparability across 0-10 scale, reliability relative to other instruments, interpersonal/scale-dependent validity
- **GiveWell context**: 2023 StrongMinds analysis using WELLBYs; funds IDinsight research on beneficiary preference trade-offs (2025)
- **Key literature cited**: Cooper (2023) "New approaches to measuring welfare"; "The WELLBY: a new measure of social value and progress" (Nature 2024)
- **Dan Benjamin suggested inviting**: Yaniv Reingewertz (implementing Benjamin et al. in Israel), Dimitry Taubinsky

---

## Suggested Changes by Page

### 1. Stakeholder Page (`live/stakeholder.html`)

**Add context on what stakeholders are wrestling with:**

```html
<!-- After the "Stakeholder Presentations" section, add: -->
<h3>Key Tensions to Address</h3>
<p>Practitioners face concrete challenges when comparing interventions:</p>
<ul>
  <li><strong>Dramatic estimate divergence:</strong> Using DALYs vs WELLBYs can produce vastly different cost-effectiveness rankings for the same interventions</li>
  <li><strong>Conversion uncertainty:</strong> No consensus on whether linear conversion between measures is appropriate</li>
  <li><strong>Mental health credibility:</strong> Can mental health interventions measured in WELLBYs be justifiably compared to physical health interventions measured in DALYs?</li>
</ul>
```

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

### 2. Paper Presentation Page (`live/paper.html`)

**Add Benjamin's broader critique to contextualize the presentation:**

```html
<!-- After "Key Topics" section, add: -->
<h3>Benjamin's Broader View on Wellbeing Measurement</h3>
<p>
  Beyond scale-use heterogeneity, Benjamin's research program questions the reliance on single broad measures.
  Their proposed "gold standard" involves:
</p>
<ul>
  <li>Collecting data across multiple specific wellbeing dimensions</li>
  <li>Using stated-preference surveys to weight how people trade off aspects</li>
  <li>Creating individual-level "personal wellbeing indices"</li>
  <li>Applying calibration for interpersonal comparisons</li>
</ul>
<p style="font-size: 13px; color: var(--text-light);">
  <em>Practical note: Importance ratings correlate 0.8-0.9 with stated-preference tradeoffs, offering a feasible shortcut.</em>
</p>
```

**Add suggested invitee note (if not already contacted):**
> Benjamin suggested inviting Yaniv Reingewertz (implementing these methods in Israel) and Dimitry Taubinsky.

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

### 3. WELLBY Reliability Page (`live/wellby.html`)

**Strengthen the discussion prompts with specific concerns from docs:**

```html
<!-- Replace or augment "Discussion Prompts" with: -->
<h3>Discussion Prompts</h3>
<ul>
  <li>What are the strongest arguments for and against using linear WELLBYs?</li>
  <li><strong>Comparability:</strong> Can we trust 0-10 life satisfaction to mean the same thing across populations?</li>
  <li><strong>Reliability:</strong> How does WELLBY reliability compare to other mental health instruments?</li>
  <li><strong>Interpersonal validity:</strong> What calibration approaches are most promising for cross-person comparisons?</li>
  <li>How much precision is lost using simple approaches vs. Benjamin's "personal wellbeing indices"?</li>
</ul>
```

**Add GiveWell/IDinsight context:**

```html
<!-- Add to "Related Resources" or new section: -->
<h3>Institutional Context</h3>
<ul>
  <li><strong>GiveWell (2023):</strong> Conducted analysis of StrongMinds using WELLBYs</li>
  <li><strong>IDinsight (2025):</strong> GiveWell-funded research on beneficiary preference trade-offs</li>
  <li><strong>Open Philanthropy/Coefficient Giving:</strong> Limited public documentation of subjective wellbeing methodology</li>
</ul>
```

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

### 4. DALY/WELLBY Conversion Page (`live/daly.html`)

**Add the specific range from literature:**

```html
<!-- In the conversion table, update the "Direct estimates" row: -->
<tr>
  <td>Direct estimates</td>
  <td>Literature-based conversion factors (e.g., 1 SD WELLBY ≈ X DALYs)</td>
  <td>Wide range: 2-15 WELLBYs per DALY across studies</td>
</tr>
```

**Add note on linearity concern:**

```html
<!-- Add callout box: -->
<div class="focal-question" style="border-color: #e65100; background: #fff3e0;">
  <h3>Key Methodological Concern</h3>
  <p>
    Linearizing the DALY-WELLBY conversion may be inappropriate. The relationship may vary by:
  </p>
  <ul style="margin-top: 8px; font-size: 14px;">
    <li>Starting baseline (median vs. lower percentiles)</li>
    <li>Domain (mental health vs. physical health vs. consumption)</li>
    <li>Population characteristics</li>
  </ul>
</div>
```

**Add literature references:**

```html
<!-- Add to Related Resources: -->
<h3>Key Literature</h3>
<ul>
  <li><a href="https://onlinelibrary.wiley.com/doi/full/10.1111/1475-5890.12333" target="_blank">Cooper (2023): "New approaches to measuring welfare"</a></li>
  <li><a href="https://www.nature.com/articles/s41599-024-03229-5" target="_blank">"The WELLBY: a new measure of social value and progress" (Nature 2024)</a></li>
</ul>
```

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

### 5. Practitioner Panel Page (`live/practitioner.html`)

**Add specific practitioner questions from Lerner discussion:**

```html
<!-- Replace or augment "Key Questions" with: -->
<h3>Key Questions</h3>
<ul>
  <li><strong>For now:</strong> What conversion factor or approach should funders use today when comparing WELLBY-measured and DALY-measured interventions?</li>
  <li><strong>For research:</strong> What data collection would most reduce the uncertainty around mental health CEA?</li>
  <li><strong>On communication:</strong> How should organizations communicate when their estimates dramatically diverge based on metric choice?</li>
  <li><strong>On credibility:</strong> When can we justifiably treat mental health improvements as comparable to mortality/morbidity reductions?</li>
</ul>
```

**Update recording notice (per CLAUDE.md notes about Lerner/Hickman flexibility):**

```html
<!-- Replace restricted-notice with softer version: -->
<div class="restricted-notice" style="background: #e8f5e9; border-color: #a5d6a7; border-left-color: #4caf50;">
  <strong>Recording Note:</strong> Both panelists have indicated flexibility on recording.
  We expect to record with adjustments based on participant preferences.
  Sensitive organizational details may be discussed off-record.
</div>
```

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

### 6. Main Index Page (`live/index.html`)

**No major changes needed, but consider:**

- Update the "privacy notice" to reflect the softer recording stance
- Add link to third Google Doc once you determine which segment it belongs to

**Decision:** [ ] Accept [ ] Modify [ ] Reject

---

## Content for Google Docs (Workshop Collaborative Notes)

If you have Google Docs for each segment, consider adding these discussion starters:

### Stakeholder Segment Doc
- **Question for funders:** When your cost-effectiveness estimates diverge dramatically based on WELLBY vs DALY methodology, how do you currently handle this?
- **Question for researchers:** What data would you need to see to change your current approach?

### Paper Presentation Doc
- **Pre-discussion prompt:** How feasible is it to implement Benjamin's "personal wellbeing indices" approach in practice?
- **Follow-up:** Are importance ratings (0.8-0.9 correlation with stated preferences) good enough?

### WELLBY Reliability Doc
- **Caspar Kaiser's 4 concerns** (from CLAUDE.md): comparability, linearity, neutral point, concepts
- **Central tension:** Can we trust intervention effects on stated well-being given potential experimenter demand effects?

### DALY Conversion Doc
- **Hickman claim to address:** "WELLBY worth 0.1 DALYs" - what evidence supports or refutes this?
- **Range discussion:** Why do estimates span 2-15 WELLBYs per DALY? What drives this variation?

---

## Items I Couldn't Review

- **Third Google Doc** (`1fKymxTxpgwx1SA9Qai0PZlhu1QA9mCEngCnrgJPIbBc`): Too large to fetch automatically. Please review manually and let me know if there's content that should be incorporated.

---

## Next Steps

1. Review each suggested change above
2. For accepted changes, I can directly edit the HTML files
3. For Google Doc content, you'll need to add manually (or share specific docs for me to suggest exact text placement)
4. Review the third Google Doc manually and flag any additional content to incorporate

---

*Generated: March 4, 2026*
