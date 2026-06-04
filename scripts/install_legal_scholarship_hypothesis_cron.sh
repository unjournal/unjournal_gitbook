#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/yosemite/githubs/unjournal-gitbook-knowledge-comms"
SCRIPT="$ROOT/scripts/check_legal_scholarship_hypothesis.py"
LOG_DIR="$ROOT/.hypothesis"
MARKER="# legal-scholarship-hypothesis-monitor"
ENTRY="*/30 * * * * cd $ROOT && /usr/bin/python3 $SCRIPT >> $LOG_DIR/legal_scholarship_cron.log 2>&1 $MARKER"

mkdir -p "$LOG_DIR"
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

crontab -l 2>/dev/null | grep -v "$MARKER" > "$tmp" || true
printf '%s\n' "$ENTRY" >> "$tmp"
crontab "$tmp"

echo "Installed Hypothes.is monitor cron:"
echo "$ENTRY"
