#!/bin/bash
# Hypothes.is Annotation Monitor for Wellbeing Workshop
# Runs daily to check for new annotations from daaronr and apply edits
#
# Setup: Add to crontab with `crontab -e`:
#   0 9 * * * /Users/yosemite/githubs/unjournal-gitbook-knowledge-comms/pivotal-questions/workshop-collab-tool/scripts/hypothesis_monitor.sh >> /tmp/hypothesis_monitor.log 2>&1

set -e

WORKSHOP_DIR="/Users/yosemite/githubs/unjournal-gitbook-knowledge-comms/pivotal-questions/wellbeing-workshop"
SCRIPT_DIR="$(dirname "$0")"
LOG_FILE="/tmp/hypothesis_monitor.log"
NETLIFY_SITE_ID="37a0205b-5cee-42c2-9388-fe0c17b5e5c6"
USER_FILTER="daaronr"

# URLs to check (both with and without trailing slash for /live/)
URLS=(
    "https://uj-wellbeing-workshop.netlify.app/about.html"
    "https://uj-wellbeing-workshop.netlify.app/beliefs.html"
    "https://uj-wellbeing-workshop.netlify.app/index.html"
    "https://uj-wellbeing-workshop.netlify.app/live/"
    "https://uj-wellbeing-workshop.netlify.app/live/index.html"
    "https://uj-wellbeing-workshop.netlify.app/live/stakeholder.html"
    "https://uj-wellbeing-workshop.netlify.app/live/paper.html"
    "https://uj-wellbeing-workshop.netlify.app/live/evaluator.html"
    "https://uj-wellbeing-workshop.netlify.app/live/wellby.html"
    "https://uj-wellbeing-workshop.netlify.app/live/daly.html"
    "https://uj-wellbeing-workshop.netlify.app/live/practitioner.html"
)

echo "=== Hypothes.is Monitor Run: $(date) ==="

# Track if we found any annotations
ANNOTATIONS_FOUND=0

# Check each URL
for url in "${URLS[@]}"; do
    echo "Checking: $url"

    # Fetch annotations from daaronr only
    response=$(curl -s "https://api.hypothes.is/api/search?user=acct:${USER_FILTER}@hypothes.is&uri=${url}")

    # Count annotations
    count=$(echo "$response" | python3 -c "import sys, json; print(json.load(sys.stdin).get('total', 0))" 2>/dev/null || echo "0")

    if [ "$count" -gt 0 ]; then
        echo "  Found $count annotations"
        ANNOTATIONS_FOUND=$((ANNOTATIONS_FOUND + count))

        # Save annotations to temp file for processing
        echo "$response" >> /tmp/hypothesis_annotations.json
    fi
done

echo "Total annotations found: $ANNOTATIONS_FOUND"

if [ "$ANNOTATIONS_FOUND" -gt 0 ]; then
    echo "Annotations require manual review or Claude Code processing."
    echo "Run 'claude' in the workshop directory and ask to check Hypothes.is annotations."

    # Optional: Send notification (uncomment if desired)
    # osascript -e 'display notification "Found '$ANNOTATIONS_FOUND' Hypothes.is annotations to review" with title "Workshop Monitor"'
fi

echo "=== Monitor Complete ==="
