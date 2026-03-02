# Browser Automation Instructions for Coda

Instructions for Claude in the browser to populate the Wellbeing Workshop Coda workspace.

## Workspace URL

https://coda.io/d/_dfhIOpLpFzE

## Page Content Import Process

For each page, follow these steps:

### 1. Navigate to the page
Click on the page in the left sidebar.

### 2. Import markdown content
1. Click in the empty page canvas
2. Type `/import` and select "Markdown" from the dropdown
3. Alternatively, type `/markdown`
4. Paste the content from the corresponding markdown file

### 3. Alternative: Direct paste
1. Copy the markdown content from the file
2. Click in the page canvas
3. Paste (Cmd+V / Ctrl+V) - Coda auto-converts markdown

---

## Page-to-File Mapping

| Coda Page | Markdown File |
|-----------|---------------|
| Workshop Overview | `00-workshop-overview.md` |
| Stakeholder Problem Statement | `01-stakeholder.md` |
| Paper Presentation: Benjamin et al. | `02-paper-presentation.md` |
| Evaluator Responses & Discussion | `03-evaluator-discussion.md` |
| WELLBY Reliability Discussion | `04-wellby-reliability.md` |
| DALY/QALY↔WELLBY Conversion | `05-daly-wellby-conversion.md` |
| Beliefs Elicitation | `06-beliefs-elicitation.md` |
| Practitioner Panel & Open Discussion | `07-practitioner-panel.md` |
| Pivotal Questions | `08-pq-overview.md` |
| PQ: WELLBY Reliability | `09-pq-wellby-reliability.md` |
| PQ: DALY-WELLBY Conversion | `10-pq-daly-conversion.md` |

---

## Creating Tables

For each segment page, create a discussion table:

### 1. Click in the page where you want the table
### 2. Type `/table` and select "Table"
### 3. Name the table (e.g., "Stakeholder Problem Statement - Discussion")
### 4. Add columns:

**Discussion Table Columns:**
| Column | Type |
|--------|------|
| Comment | Text |
| Author | Text |
| Type | Select (Question, Comment, Evidence, Suggestion) |
| Upvotes | Number |
| Response | Text |
| Addressed | Checkbox |

**PQ Notes Table Columns:**
| Column | Type |
|--------|------|
| PQ Code | Select (add relevant codes) |
| Note | Text |
| Author | Text |
| Type | Select (Evidence, Objection, Support, Clarification, Question) |
| Confidence | Scale (1-5) or Number |
| Source URL | Text |

---

## Cross-Doc Tables (for PQs)

To link PQ data from the main Coda database:

1. Go to the PQ page
2. Type `/cross-doc` or `/sync`
3. Select "Sync table from another doc"
4. Choose "Unjournal Public Pages" doc
5. Select the Wellbeing PQ table
6. Configure sync settings (one-way recommended)

Main PQ database: https://coda.io/d/Unjournal-Public-Pages_ddIEzDONWdb/Wellbeing-PQ_suPg8sEH

---

## Embedding Google Docs

After Google Docs are created:

1. Navigate to the segment page
2. Type `/embed`
3. Paste the Google Doc URL
4. The doc will appear embedded and editable

---

## Page Hierarchy (Optional)

To organize pages under sections:

1. In the left sidebar, drag "PQ: WELLBY Reliability" under "Pivotal Questions"
2. Drag "PQ: DALY-WELLBY Conversion" under "Pivotal Questions"
3. This creates a nested structure

---

## Sharing Settings

1. Click "Share" in the top right
2. Set "Anyone with link can edit" for workshop participants
3. Or invite specific emails with edit access

---

## Final Checklist

- [ ] All 11 pages have content imported
- [ ] 7 segment discussion tables created
- [ ] 2 PQ notes tables created
- [ ] Participants table created (top level)
- [ ] [PRIVATE] Availability table created (hidden)
- [ ] Google Docs embedded in each segment page
- [ ] Cross-doc PQ tables linked (if using)
- [ ] Sharing permissions set
- [ ] Page hierarchy organized
