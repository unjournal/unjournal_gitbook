# Unjournal Forum Bot

CLI tool that searches EA Forum for posts referencing papers evaluated by The Unjournal, and posts comments linking to the evaluations.

## How it works

1. Loads a CSV of Unjournal-evaluated papers (title, abstract, evaluation URL)
2. Searches EA Forum via Algolia for posts that reference or relate to those papers
3. Classifies matches as **Type A** (direct reference to the paper) or **Type B** (related topic)
4. For Type A matches above a prominence threshold: posts a comment (or dry-runs it)
5. For Type B: reports them for manual review (never auto-posts)

## Safety defaults

- **Dry run by default** -- no comments are posted unless you pass `--no-dry-run`
- **Double deduplication** -- checks existing comments on the post via API, AND local state file
- **Rate limiting** -- configurable requests/minute (default 10)
- **Live mode requires confirmation** -- prompts before posting

## Setup

### 1. Install

```bash
cd unjournal-forum-bot
pip install -e ".[dev]"
```

### 2. Get credentials

You need two things from the EA Forum:

**Auth token:** Log into the forum, open browser DevTools > Application > Cookies, copy the `loginToken` cookie value.

**Algolia search keys:** On the forum, search for something, open DevTools > Network, find a request to `algolia.net`, copy the `X-Algolia-Application-Id` and `X-Algolia-API-Key` headers.

See [scripts/capture_credentials.md](scripts/capture_credentials.md) for detailed step-by-step instructions.

### 3. Configure

```bash
cp config.example.toml config.toml
# Edit config.toml with your credentials and CSV path
```

### 4. Verify

```bash
# Check your auth token works
forum-bot introspect --config config.toml

# Test a search
forum-bot search "GiveWell discount rate" --config config.toml

# List loaded papers
forum-bot list-papers --config config.toml
```

## Usage

### Dry run (default, safe)

```bash
# Scan all papers with eval URLs
forum-bot run --config config.toml

# Scan a single paper
forum-bot run --config config.toml --paper "GiveWell"

# Limit number of papers processed
forum-bot run --config config.toml --limit 5
```

### Live mode (actually posts comments)

```bash
forum-bot run --config config.toml --no-dry-run --paper "GiveWell"
```

### Other commands

```bash
# Raw Algolia search (debugging)
forum-bot search "climate policy welfare" --config config.toml

# View comment history
forum-bot history

# Introspect GraphQL schema
forum-bot introspect --config config.toml
```

## Match types

**Type A (direct reference):** The forum post contains the paper's title (exact or near-exact match) in its title or body. These are candidates for auto-commenting.

**Type B (related):** The post is topically similar (TF-IDF cosine similarity above threshold) but doesn't directly reference the paper. These are reported but never auto-posted.

## Comment template

> By the way, the paper "{PAPER_TITLE}", which seems relevant to this post, was evaluated by The Unjournal -- see {EVAL_URL}. Please let us know if you found our evaluation useful and how we can do better; we're working to measure and boost our impact. You can email us at contact@unjournal.org, and we can schedule a chat. (Semi-automated comment)

## Architecture

```
src/unjournal_forum_bot/
  cli.py              # Click CLI entry point
  runner.py           # Main pipeline orchestrator
  config.py           # TOML config loading
  models.py           # Data models (Paper, ForumPost, MatchResult, etc.)
  papers.py           # CSV loader
  matching.py         # Type A title match + Type B TF-IDF
  dedup.py            # Duplicate comment detection
  comment_template.py # Comment rendering
  algolia.py          # Algolia search client
  graphql.py          # GraphQL request helper
  rate_limiter.py     # Token-bucket rate limiter
  state.py            # Local JSON state store
  forum_client/
    base.py           # ForumClient protocol
    eaforum.py        # EA Forum implementation
    lesswrong.py      # LessWrong stub (not yet implemented)
```

## Running tests

```bash
pip install -e ".[dev]"
pytest
```

## Future work

- LessWrong integration (pending bot account)
- LinkedIn / Bluesky posting
- CSV/Markdown output reports per run
- Full 4-component prominence scoring
- Semantic embeddings as alternative to TF-IDF
