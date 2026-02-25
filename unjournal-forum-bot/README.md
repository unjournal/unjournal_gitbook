# Unjournal Forum Bot

**This code has moved to the private `ops-internal` repository.**

The forum bot (EA Forum, Bluesky, and social media integrations) is now maintained at:

```
~/githubs/ops-internal/forum-bot/
```

This directory is kept for historical reference only. For the latest code with all features (EA Forum commenting, Bluesky integration, dlvr.it broadcasting), use the ops-internal version.

## Why the move?

- The bot requires API credentials and tokens that shouldn't be in a public repo
- Consolidates internal tooling in one private repository
- The ops-internal version has the latest improvements (better dedup, etc.)

## Setup in ops-internal

```bash
cd ~/githubs/ops-internal/forum-bot
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp config.example.toml config.toml
# Edit config.toml with your credentials
forum-bot --help
```
