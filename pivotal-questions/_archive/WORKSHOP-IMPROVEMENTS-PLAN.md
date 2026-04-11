# Workshop Improvements Plan: CM & PBA

Based on the wellbeing workshop structure and post-workshop survey design. Created March 18, 2026.

---

## Summary: What Wellbeing Workshop Has That CM/PBA Lack

| Feature | Wellbeing | CM | PBA | Priority | Notes |
|---------|-----------|-----|-----|----------|-------|
| **live/ directory** with segment pages | ✅ 7 pages | ❌ | ❌ | HIGH | Embedded Google Docs, segment navigation |
| **readings.html** curated reading list | ✅ tiered | ❌ | ❌ | HIGH | Essential/Recommended/Supplementary tiers |
| **Deep analysis pages** | ✅ 2 pages | ❌ | ❌ | MEDIUM | Topic-specific briefing documents |
| **survey.html** post-workshop feedback | ✅ | ❌ | ❌ | HIGH | Impact measurement, format feedback |
| **Hypothes.is integration** | ✅ banner | ❌ | ❌ | MEDIUM | Annotation capability |
| **interest.html** (vs schedule.html) | ✅ | ❌ | ❌ | LOW | Naming consistency |
| **Workshop links section** | ✅ | ❌ | ❌ | LOW | Cross-promotion |
| **zoom-setup.html** | ✅ | ❌ | ❌ | LOW | Technical instructions |
| **Duration** | 3.5 hours | 2 hours | 2.5-3 hours | — | CM may be too short |

---

## Proposed Changes

### 1. Create live/ Directory Structure (HIGH PRIORITY)

**What:** Create segment-specific pages for each workshop session with:
- Embedded Google Doc tab for collaborative notes
- Related Pivotal Questions links
- Segment timing and navigation arrows
- Pre-reading callouts

**CM Workshop segments:**
1. `live/stakeholder.html` - Stakeholder context (~15 min)
2. `live/tea-review.html` - TEA evidence review (~30 min)
3. `live/cost-trajectory.html` - Cost trajectory discussion + beliefs (~35 min)
4. `live/welfare-roi.html` - Animal welfare ROI & practitioner panel (~30 min)

**PBA Workshop segments:**
1. `live/stakeholder.html` - Stakeholder context (~15 min)
2. `live/evidence.html` - Evidence review (~30 min)
3. `live/bray-paper.html` - Bray et al. paper discussion (~25 min)
4. `live/substitution.html` - Substitution impact discussion (~30 min)
5. `live/beliefs.html` - Beliefs elicitation (~20 min)
6. `live/roi-panel.html` - Animal welfare ROI panel (~30 min)

**Requires:** Google Docs with tabs for each segment (need to create these)

**USER INPUT NEEDED:** Should we create these Google Docs now, or wait until closer to workshop dates?

---

### 2. Create readings.html (HIGH PRIORITY)

**What:** Curated reading list with tiered recommendations

**CM Workshop readings to include:**
- **Essential:** Pasitka et al. (2024), Humbird (2021), Rethink Priorities forecasting
- **Recommended:** Goodwin 2024 scoping review, The Unjournal evaluation
- **Supplementary:** Earlier TEAs, Food Economics research
- **Applied:** ACE research, Open Philanthropy farm animal welfare reports

**PBA Workshop readings to include:**
- **Essential:** Bray et al. (2024), key scanner data studies
- **Recommended:** Choice experiment papers, event studies
- **Supplementary:** Demand estimation methodology papers
- **Applied:** ACE/GFI reports, EA Forum PBA posts

**USER INPUT NEEDED:** Do you have specific paper lists for CM/PBA, or should I compile from existing sources?

---

### 3. Create survey.html (HIGH PRIORITY)

**What:** Post-workshop survey modeled on wellbeing workshop version

**Key sections:**
1. **Impact & Value** - Percentile rating, belief changes, understanding improvements
2. **Sessions & Format** - Per-session ratings, format preferences
3. **Tools & Resources** - Usefulness of Hypothes.is, Google Docs, etc.
4. **Recording & Sharing** - Permission collection
5. **Research & Collaboration** - Suggestions, collaboration matching
6. **About You** - Optional identification, incentive preference

**Incentive structure:** $50 random draw + $50 best feedback (same as wellbeing)

**Can implement immediately** - just adapt wellbeing survey with segment names changed.

---

### 4. Add Hypothes.is Integration (MEDIUM PRIORITY)

**What:** Add annotation banner and embed script to all pages

**Banner text:**
```html
<div style="background: linear-gradient(90deg, #f5f9f5 0%, #f0f4f0 100%); border-bottom: 1px solid #e0e8e0; padding: 10px 20px; font-size: 13px; text-align: center; color: #555;">
  💬 <strong>Annotate this page</strong> — select any text to comment via <a href="https://hypothes.is" target="_blank" rel="noopener" style="color: #5a7a5a; text-decoration: underline;">Hypothes.is</a>
</div>
```

**Script (before </body>):**
```html
<script async src="https://hypothes.is/embed.js"></script>
```

**Can implement immediately** - straightforward addition to all pages.

---

### 5. Create Deep Analysis Pages (MEDIUM PRIORITY)

**What:** Topic-specific briefing documents with interactive elements

**CM Workshop:**
- `tea-comparison.html` - Comparative analysis of TEA assumptions and results
- Could include interactive demo showing how different assumptions affect cost projections

**PBA Workshop:**
- `substitution-evidence.html` - Review of substitution evidence and methodological challenges
- Could include visualization of elasticity estimates across studies

**USER INPUT NEEDED:** How much effort should go into these vs other priorities? These are substantial to create well.

---

### 6. Add Workshop Cross-Links (LOW PRIORITY)

**What:** Add "Other Pivotal Questions Workshops" section at bottom of pages (same as just added to wellbeing workshop)

**Can implement immediately** - copy from wellbeing workshop.

---

### 7. Extend Workshop Duration? (DISCUSSION)

**Observation:** Wellbeing workshop was 3.5 hours with 7 segments. CM is only 2 hours with 4 segments. PBA is 2.5-3 hours with 6 segments.

**Consideration:** The wellbeing workshop survey asks about format preferences including "longer workshop (full day or multi-day)" and "shorter / more condensed". Without actual feedback yet, we don't know which direction participants prefer.

**USER INPUT NEEDED:** Should CM/PBA keep current duration or expand? Wellbeing had more depth but also more scope.

---

## Implementation Order

Based on priorities and dependencies:

1. **Immediate (can do now):**
   - Add Hypothes.is integration to all CM/PBA pages
   - Add workshop cross-links
   - Create survey.html for both workshops (adapt from wellbeing)

2. **Near-term (once decisions made):**
   - Create readings.html with curated lists
   - Create live/ directory structure (after Google Docs created)

3. **Later (more effort):**
   - Deep analysis pages
   - Duration adjustments based on feedback

---

## Questions for User

1. **Google Docs for live segments:** Create now or wait? If now, what Unjournal account should own them?

2. **Reading lists:** Do you have existing paper lists for CM/PBA, or should I compile from The Unjournal evaluations and EA Forum posts?

3. **Deep analysis pages:** Worth the effort for CM/PBA, or focus on simpler structure first?

4. **Workshop duration:** Keep current durations or expand to match wellbeing workshop's depth?

5. **Priority override:** Any changes to the proposed priority ordering?

---

*Last updated: March 18, 2026*
