# Workshop Consolidation Proposal
*For review before March 16, 2026 workshop*

## 1. Live Segment Page Consolidation (Proposal)

Currently there are 7 separate live segment pages (280-450 lines each):
- stakeholder.html (300 lines)
- paper.html (340 lines)
- evaluator.html (278 lines)
- wellby.html (381 lines)
- daly.html (443 lines)
- practitioner.html (357 lines)
- results.html (356 lines)

### Option A: Group by Theme (3 pages)
| New Page | Combines | Theme |
|----------|----------|-------|
| `live/opening.html` | stakeholder + paper | Opening: Stakeholder problem + Benjamin et al. presentation |
| `live/discussion.html` | evaluator + wellby + daly | Technical Discussion: Evaluator responses, WELLBY reliability, DALY conversion |
| `live/closing.html` | practitioner + results | Closing: Practitioner panel + Results/Next steps |

### Option B: Keep Separate (Current)
- **Pro:** Each segment has dedicated space, clear navigation
- **Con:** Spread-out attention, many tabs/pages to track

### Option C: Single Long Page with Anchors
Convert all segments into a single `live/session.html` with:
- Sticky navigation bar with segment links
- Anchor-based scrolling
- Collapsed sections for segments not currently active

**Recommendation for tomorrow:** Keep current structure (Option B) since it's working and tested. Consider Option A or C for future workshops.

---

## 2. Google Doc Integration Concerns

### Current State
- **Main doc:** `1NMtWjoKU52tJQwUV99Bf8XXYdLoFLviTQq6AslzKQQU`
- Each live segment embeds a different tab of this doc
- Participants can comment in Google Doc OR use Hypothes.is on the web pages

### Problems
1. **Attention fragmentation:** Discussion may happen in 3+ places (Google Doc tabs, Hypothes.is annotations, Zoom chat)
2. **Unclear guidance:** When should participants use which tool?
3. **Post-workshop consolidation:** How to synthesize insights across channels?

### Recommendations

#### For Tomorrow's Workshop:

1. **Add clear guidance to live/index.html:**
   > **Where to discuss:**
   > - **During live sessions:** Use Zoom chat for quick reactions, Google Doc for substantive notes/questions
   > - **Before/after sessions:** Use Hypothes.is annotations on workshop pages for detailed feedback
   > - **All written contributions will be consolidated post-workshop**

2. **Designate a "scribe" for each segment** who captures key points from Zoom chat → Google Doc

3. **Pre-populate Google Doc tabs** with:
   - Key discussion questions
   - Space for "key insights" summary
   - "Action items / next steps" section

#### For Future Workshops:

1. **Consider single discussion channel:** Either Google Doc OR Hypothes.is, not both
2. **Structured Q&A form** embedded in each segment page (like beliefs.html) rather than free-form doc
3. **Real-time collaborative doc** visible on screen during presentation (Notion, HackMD)

---

## 3. Other Consolidation Notes

### ~40 WELLBYs Figure
This appears in 6 files. If number needs updating again:
- `about.html` (line 77)
- `linear-wellby-analysis.html` (line ~885)
- `readings.html` (search for "40 WELLBYs")
- `live/stakeholder.html` (line ~268)

Consider: Create a single include/partial for figures that may need updates.

### Done Today
- [x] index.html → redirects to about.html
- [x] Focal case callout converted to brief link on live/index.html
- [x] Neutral point estimates table collapsed in linear-wellby-analysis.html

### Deferred
- Linear-wellby-analysis further collapsing (could do more post-workshop)
- Legacy file archival (low priority)
- Additional daly-wellby-conversion simplification
