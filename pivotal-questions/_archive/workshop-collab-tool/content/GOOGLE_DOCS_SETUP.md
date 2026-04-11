# Google Docs Setup for Workshop

## Option 1: Manual Creation (Quick)

Create Google Docs manually in a shared folder:

### 1. Create a shared folder
1. Go to Google Drive
2. Create folder: "Wellbeing Workshop - Live Notes"
3. Set sharing: "Anyone with link can edit"

### 2. Create docs from templates
For each segment, create a new Google Doc and paste the content from:

| Segment | Template File |
|---------|---------------|
| Stakeholder Problem Statement | `gdocs/01-stakeholder-notes.md` |
| Paper Presentation | `gdocs/02-paper-presentation-notes.md` |
| Evaluator Discussion | `gdocs/03-evaluator-notes.md` |
| WELLBY Reliability | `gdocs/04-wellby-reliability-notes.md` |
| DALY-WELLBY Conversion | `gdocs/05-daly-wellby-notes.md` |
| Practitioner Panel | `gdocs/07-practitioner-panel-notes.md` |

### 3. Share the folder
Copy the shareable link for each doc to embed in Coda.

---

## Option 2: Automated Creation (requires API credentials)

### Prerequisites
1. Google Cloud project with Docs API enabled
2. OAuth credentials with scopes:
   - `https://www.googleapis.com/auth/documents`
   - `https://www.googleapis.com/auth/drive`

### Setup

```bash
# Install dependencies
pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client

# Set credentials path
export GOOGLE_CREDENTIALS_PATH=/path/to/credentials.json
```

### Run the creation script

```bash
python -m src.gdocs.create_docs --config configs/wellbeing-workshop.yaml
```

---

## Option 3: Use Claude in Browser

If you have Claude connected to your browser:

1. Navigate to Google Drive
2. Ask Claude to:
   - Create a new folder "Wellbeing Workshop - Live Notes"
   - Create 6 Google Docs with the template content
   - Set sharing to "Anyone with link can edit"
   - Return the shareable URLs

---

## Embedding in Coda

Once docs are created:

1. Open each Coda segment page
2. Click where you want the doc embedded
3. Type `/embed`
4. Paste the Google Doc URL
5. The doc will appear inline and be editable

---

## Sharing Settings for Workshop

Recommended settings:
- **Folder level**: "Anyone with link can edit"
- **Individual docs**: Inherit from folder
- **After workshop**: Change to "Anyone with link can comment"
