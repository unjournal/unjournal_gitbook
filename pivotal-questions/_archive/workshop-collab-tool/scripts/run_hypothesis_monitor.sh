#!/bin/bash
# Hypothesis Auto-Implementation Cron Job
# Monitors for #implement annotations from daaronr and applies changes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
LOG_DIR="$SCRIPT_DIR/logs"

# Create log directory
mkdir -p "$LOG_DIR"

# Log file with date
LOG_FILE="$LOG_DIR/hypothesis_$(date +%Y%m%d).log"

echo "========================================" >> "$LOG_FILE"
echo "Run started: $(date)" >> "$LOG_FILE"

# Load environment
if [ -f "$SCRIPT_DIR/../.env" ]; then
    source "$SCRIPT_DIR/../.env"
fi

# Run the monitor for Wellbeing Workshop
# --use-llm enables Claude to interpret suggestions without explicit replacements
python3 "$SCRIPT_DIR/hypothesis_auto_implement.py" \
    --urls \
        "https://uj-wellbeing-workshop.netlify.app/" \
        "https://uj-wellbeing-workshop.netlify.app/about.html" \
        "https://uj-wellbeing-workshop.netlify.app/interest.html" \
        "https://uj-wellbeing-workshop.netlify.app/beliefs.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/" \
        "https://uj-wellbeing-workshop.netlify.app/live/stakeholder.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/paper.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/evaluator.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/wellby.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/daly.html" \
        "https://uj-wellbeing-workshop.netlify.app/live/practitioner.html" \
    --local-root "$PROJECT_ROOT/wellbeing-workshop" \
    --use-llm \
    --deploy \
    --site-id "37a0205b-5cee-42c2-9388-fe0c17b5e5c6" \
    >> "$LOG_FILE" 2>&1

echo "Run completed: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
