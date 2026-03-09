# Claude Code Task: Build & Deploy Workshop Scheduling Form

## Context

You're working in the folder:
`/Users/yosemite/githubs/unjournal-gitbook-knowledge-comms/pivotal-questions/`

This is inside an existing Git repo. Create a new subdirectory here called `workshop-form/` for the form app. When done, deploy to Netlify and give me the live URL.

## What this is

A scheduling/interest-gathering form for an online academic workshop on wellbeing measurement (WELLBY/DALY). ~20-40 invitees (academics, funders, evaluators) fill it out. I need to:
1. Get email notifications when someone submits
2. Be able to view and export all responses
3. Have data persist reliably (not just browser storage)

## Data & Notifications — IMPORTANT

Choose ONE of these approaches (recommend Option A for simplicity):

### Option A: Netlify Forms (simplest)
- Add `data-netlify="true"` to the form element
- Netlify automatically stores submissions, provides CSV export, and sends email notifications
- I'll configure the notification email in the Netlify dashboard after deployment
- For the admin dashboard: either (a) use Netlify's built-in form submissions UI, or (b) build a simple admin page that fetches from Netlify Forms API
- Pros: Zero backend, zero database, free tier handles our volume easily
- Cons: Admin analytics dashboard would need extra work to pull from API

### Option B: Netlify Forms + Supabase (if you want the full admin dashboard)
- Use Netlify Forms for submission handling and notifications
- Also write submissions to a Supabase free-tier Postgres database via their JS client
- Build the admin dashboard reading from Supabase
- Supabase URL and anon key can be set as Netlify environment variables
- Pros: Full admin dashboard with analytics, proper database
- Cons: More moving parts

Either way, tell me which you chose and give me any credentials/URLs I need to configure.

## Form Specification

### Required fields
- Name
- Email

### All other fields are optional — mark them clearly with "(optional)" labels

### Section 1: About You
- Name *
- Email *
- Affiliation (optional)
- Role dropdown (optional): Author (Benjamin et al.), Evaluator, Stakeholder/Funder, Academic Researcher, Practitioner/Policy, Unjournal Team, Other

### Section 2: When Could You Join?
Section subtitle: "All fields in this section are optional — use whichever is easiest. Even a rough sense of your availability helps."

- **Free-text availability** (FIRST, prominent, with a subtle border/highlight): textarea where people describe when they're free in March in their own words. Header: "Tell us your availability in your own words." Note: "This is the easiest option — just describe when you're free in March. We'll use AI to find the best overlap across everyone. Include your time zone if it's not obvious."
- **When2meet-style availability grid** (optional, below free-text):
  - Rows = weekdays from Mar 2 to Apr 3, 2026, grouped by week
  - Columns = 2-hour blocks: 9–11 AM ET (2–4 PM UK / 3–5 PM CET), 11 AM–1 PM ET (4–6 PM UK / 5–7 PM CET), 1–3 PM ET (6–8 PM UK / 7–9 PM CET), 3–5 PM ET (8–10 PM UK / 9–11 PM CET)
  - Click cells to toggle availability. Click a date label to select the whole row.
  - Note: "Tip: You don't need to fill in the grid if you've described your availability above — either or both is fine."

### Section 3: Which Segments Interest You?
Section subtitle: "All fields in this section are optional. You don't need to attend the full session — for each segment, let us know if you'd like to join and/or if you'd be interested in presenting or actively contributing."

For EACH segment, show TWO checkboxes side by side: "Join / Listen" and "Present / Discuss"

Segments:
- Stakeholder Problem Statement — "How funders currently navigate WELLBY vs DALY" (~15 min)
- Paper Presentation: Benjamin et al. — "Scale-use heterogeneity findings & implications" (~25 min)
- Evaluator Responses & Discussion — "Key critiques, suggestions, author reaction" (~25 min)
- WELLBY Reliability: Discussion — "Is the linear WELLBY reliable enough for cross-intervention comparison?" (~25 min)
- DALY↔WELLBY Conversion: Discussion — "Approaches to interconvertibility — what works, what's missing?" (~25 min)
- Beliefs Elicitation — "We'll guide you through a short form to state your priors on operationalized pivotal questions" (~15 min)
- Practitioner Panel & Open Discussion — "How should funders navigate this now? What research would change minds?" (~30 min)

Below the segment grid:
- "Brief notes on what you'd like to present or discuss" (textarea, optional)
- "Suggest a topic or segment we should add" (textarea, optional)

### Section 4: Recording & Publication
Subtitle: "We plan to record the workshop and make it publicly available by default. We also plan to make the transcript available for AI-assisted queries (e.g., so researchers and funders can ask questions about the discussion). Your preferences:"

Single-select radio:
- Comfortable with full public recording, publication, and AI-queryable transcript
- Comfortable with the above except for specific segments (text field appears)
- Prefer recording shared only with participants (not publicly)
- Prefer my segments not be recorded (text field appears)

### Section 5: Async Discussion & Suggestions
Section subtitle: "All fields in this section are optional."

- Checkbox: "I would participate in the async discussion space" — desc: "A shared document for structured comments and contributions before, during, and after the workshop"
- "Suggestions for the discussion space" (textarea, optional)
- "Suggestions for other invitees" (textarea, optional)
- "Anything else?" (textarea, optional)

### After submission
Thank-you page with:
- "Thank you, [first name]!"
- "Your availability and preferences have been recorded. We'll be in touch soon with a confirmed date and detailed agenda."
- Links to:
  - Evaluation package: https://unjournal.pubpub.org/pub/evalsumheterogenity/
  - Pivotal Questions: https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH

## Design

Warm, professional academic aesthetic — NOT generic SaaS or generic AI-generated look.

- Background: off-white (#f8f6f1)
- Fonts: Source Serif 4 for headings, DM Sans for body/UI (load from Google Fonts)
- Accent colors: muted sage green (#5a7a5a) for selections, warm brown (#8b5e3c) for links, dark (#1a1a1a) for headers
- Date/cell buttons should feel tactile — clear selected/unselected states
- Mobile-responsive (some invitees will fill this out on phones)

### Header content
- Top line: "The Unjournal · Pivotal Questions Initiative" (small, uppercase, letterspaced)
- Title: "Wellbeing Measures: Research & Policy Discussion"
- Subtitle: "An Unjournal Online Workshop on WELLBY Measurement, Scale-Use Heterogeneity, and DALY–WELLBY Interconvertibility"
- Context line: "Target: March 2026 · Online · ~3.5 hours total. Scheduled segments — join for only the ones you're interested in"

### Context bar below header
Text: 'Following our evaluation of Benjamin et al.'s "Adjusting for Scale-Use Heterogeneity in Self-Reported Well-Being," this workshop explores implications for the WELLBY measure and DALY–WELLBY interconvertibility — questions raised by Founders Pledge that affect how we compare interventions across health, mental health, and consumption.'

With "evaluation of Benjamin et al.'s" linked to https://unjournal.pubpub.org/pub/evalsumheterogenity/

Below the text, a row of pill-style links:
- Pivotal Questions Initiative → https://globalimpact.gitbook.io/the-unjournal-project-and-communication-space/pivotal-questions
- Wellbeing PQ Formulations → https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH
- EA Forum Post → https://forum.effectivealtruism.org/posts/kftzYdmZf4nj2ExN7/the-unjournal-s-pivotal-questions-initiative
- Benjamin et al. Evaluation → https://unjournal.pubpub.org/pub/evalsumheterogenity/

## Admin Dashboard

If using Option B (Supabase), build an admin page at /admin (password-protected) showing:
- Total response count
- **Best date+time combos**: Ranked by number of respondents available, shown as horizontal bars
- **Best dates overall**: Ranked by respondents with any availability that day
- **Time block popularity**: Aggregated across all dates
- **Free-text availability section**: All free-text responses listed (for human/AI interpretation)
- **Segment interest**: Two columns per segment — "Join" count and "Present/Discuss" count
- All individual responses in expandable cards
- JSON and CSV export buttons

If using Option A (Netlify Forms only), skip building a custom admin — I'll use the Netlify dashboard for viewing responses and can analyze exports separately.

## Deployment

1. Build everything in `workshop-form/` subdirectory
2. Deploy to Netlify as a separate Netlify site (`netlify deploy --prod` from the subdirectory, or `netlify init` first if needed)
3. Give me the live URL when done
4. Tell me how to configure email notifications (probably: go to Netlify dashboard → Forms → Notifications → Add notification → Email)

## Tech stack

Use whatever's simplest. For a static form with Netlify Forms, plain HTML/CSS/JS is honestly fine — no need for React or a build step. But if you think a framework would be cleaner, that's fine too. Optimize for: I can deploy today, it works reliably, and I don't need to maintain infrastructure.

## Reference

There's a React prototype at `workshop-form.jsx` in this project directory that has the full UI implemented (including the when2meet grid, dual segment checkboxes, etc.). You can use it as a reference for design language and interaction patterns. It uses `window.storage` which won't work in production — replace with Netlify Forms / Supabase submissions.

## Git

After building, commit to the repo with a clear commit message. Don't modify any existing files outside the `workshop-form/` directory.
