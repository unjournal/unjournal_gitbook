# Claude Code Task: Build & Deploy Workshop Scheduling Form

## What this is

A scheduling/interest-gathering form for an online academic and practitioner workshop on wellbeing measurement (WELLBY/DALY). It will be sent to ~20-40 invitees (academics, funders, evaluators) who need to indicate their availability, segment interest, and recording preferences. Responses need to be collected and viewable by the organizer (me).

## Requirements

### Core functionality
1. **Public form** at a shareable URL where invitees fill in:
   - Name, email, affiliation, role (dropdown: Author, Evaluator, Stakeholder/Funder, Academic Researcher, Practitioner/Policy, Unjournal Team, Other)
   - **Free-text availability** (FIRST, prominent): A textarea where people describe when they're free in March in their own words. This is the primary/easiest option. Include note: "This is the easiest option — just describe when you're free in March. We'll use AI to find the best overlap across everyone. Include your time zone if it's not obvious."
   - **When2meet-style availability grid** (optional, below free-text): 
     - Rows = weekdays from Mar 2 to Apr 3, 2026, grouped by week
     - Columns = 2-hour blocks: 9–11 AM ET (2–4 PM UK / 3–5 PM CET), 11 AM–1 PM ET (4–6 PM UK / 5–7 PM CET), 1–3 PM ET (6–8 PM UK / 7–9 PM CET), 3–5 PM ET (8–10 PM UK / 9–11 PM CET)
     - Click cells to toggle availability for that time block on that date. Click a date label to select the whole row.
     - People should mark any blocks they could join for **any part** of the session — they don't need to attend the full 3.5 hours.
     - Include note: "Tip: You don't need to fill in the grid if you've described your availability above — either or both is fine."
   - Date availability: clickable grid of weekdays from Mar 2 – Apr 3, 2026, grouped by week
   - Segment interest — for EACH segment, TWO checkboxes side by side: "Join / Listen" and "Present / Discuss"
     - Stakeholder Problem Statement (~15 min)
     - Paper Presentation: Benjamin et al. (~25 min)
     - Evaluator Responses & Discussion (~25 min)
     - WELLBY Reliability: Discussion (~25 min)
     - DALY↔WELLBY Conversion: Discussion (~25 min)
     - Beliefs Elicitation — "We'll guide you through a short form to state your priors on operationalized pivotal questions" (~15 min)
     - Practitioner Panel & Open Discussion (~30 min)
   - **Suggest a topic/segment** textarea: Let people propose additional segments or topics
   - **Brief notes on what you'd like to present or discuss** textarea: For people who checked "Present / Discuss"
   - All fields except Name and Email should be clearly marked as optional — add "(optional)" labels and section-level notes like "All fields in this section are optional"
   - Recording preference (single select):
     - Comfortable with full public recording, publication, and AI-queryable transcript
     - Comfortable with the above except for specific segments (text field appears)
     - Prefer recording shared only with participants (not publicly)
     - Prefer my segments not be recorded (text field appears)
   - Note above recording options: "We plan to record the workshop and make it publicly available by default. We also plan to make the transcript available for AI-assisted queries (e.g., so researchers and funders can ask questions about the discussion)."
   - Async discussion interest (checkbox): "I would participate in the async discussion space" with description "A shared document for structured comments and contributions before, during, and after the workshop"
   - Suggestions for the discussion space (textarea, optional)
   - Suggestions for other invitees (textarea, optional)
   - Anything else (textarea, optional)

2. **Admin dashboard** at /admin (password-protected, password: whatever simple thing you choose, tell me what it is) showing:
   - Total response count
   - **Best date+time combos**: Ranked list of date+block combinations by number of respondents available, shown as horizontal bars
   - **Best dates overall**: Ranked by number of respondents with any availability that day
   - **Time block popularity**: Aggregated across all dates — which 2-hour blocks are most popular overall
   - **Free-text availability section**: All free-text responses listed together (these need human/AI interpretation)
   - Segment interest counts — show two columns: "Join" count and "Present/Discuss" count per segment
   - All individual responses in expandable cards
   - JSON export button
   - CSV export button

3. **Optimal date finder** in admin view:
   - Compute the date+time combination maximizing weighted attendance using both grid selections and AI-parsed free-text responses
   - Weight by role: Authors=3, Evaluators=2, Stakeholders=2, Others=1
   - Show top 3 recommended date/time combos with expected attendee lists
   - Bonus scoring for having representation from multiple tiers
   - For free-text responses, use Claude API to parse availability into structured date+time data, then merge with grid data

### Design
- Warm, professional academic aesthetic — NOT generic SaaS
- Background: off-white (#f8f6f1)
- Fonts: Source Serif 4 for headings, DM Sans for body/UI (load from Google Fonts)
- Accent colors: muted sage green (#5a7a5a) for selections, warm brown (#8b5e3c) for links, dark (#1a1a1a) for headers
- Date buttons should feel tactile — clear selected/unselected states
- Checkbox cards with subtle border + background change on selection
- Mobile-responsive (some invitees will fill this out on phones)

### Header content
- Top line: "The Unjournal · Pivotal Questions Initiative" (small, uppercase, letterspaced)
- Title: "Wellbeing Measures: Research & Policy Discussion"
- Subtitle: "An Unjournal Online Workshop on WELLBY Measurement, Scale-Use Heterogeneity, and DALY–WELLBY Interconvertibility"
- Context line: "Target: March 2026 · Online · ~3.5 hours total. Scheduled segments — join for only the ones you're interested in"
- Below header, a context bar: 'Following our evaluation of Benjamin et al.'s "Adjusting for Scale-Use Heterogeneity in Self-Reported Well-Being," this workshop explores implications for the WELLBY measure and DALY–WELLBY interconvertibility — questions raised by Founders Pledge that affect how we compare interventions across health, mental health, and consumption.'
- Below the context bar, a row of pill-style links to:
  - Pivotal Questions Initiative: https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/pivotal-questions
  - Wellbeing PQ Formulations: https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH
  - EA Forum Post: https://forum.effectivealtruism.org/posts/kftzYdmZf4nj2ExN7/the-unjournal-s-pivotal-questions
  - Benjamin et al. Evaluation: https://unjournal.pubpub.org/pub/evalsumheterogenity/

### After submission
Show a thank-you page with:
- "Thank you, [first name]!"
- "Your availability and preferences have been recorded. We'll be in touch soon with a confirmed date and detailed agenda."
- Links to the evaluation package (https://unjournal.pubpub.org/pub/evalsumheterogenity) and Pivotal Questions page (https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH)

## Tech stack suggestions

Use whatever you think is simplest to deploy and maintain. Some options:
- **Static HTML/JS + Netlify Forms** — simplest, no backend needed, responses go to Netlify dashboard + email notifications
- **Next.js or plain React + Supabase** — if you want a real database for the admin dashboard
- **Static HTML + Google Sheets API** — write responses to a Google Sheet
- **Static HTML + a simple JSON file store** (like JSONBin or similar)

I don't have strong preferences — optimize for: (a) I can deploy it today, (b) it actually works reliably for ~30 responses, (c) admin view is functional. This doesn't need to scale.

## Deployment

Deploy to a live URL I can share. Options:
- Netlify (I have it connected)
- Vercel
- GitHub Pages (if static)
- Cloudflare Pages

Give me the URL when done.

## Reference

There's an existing React prototype in this project at `workshop-form.jsx` that has the full UI implemented (but uses window.storage which only works in Claude artifacts). You can use it as a reference for the design language and data model, or start fresh — whatever's cleaner.

## File structure

Put everything in a new directory called `workshop-form/` in the current project root.
