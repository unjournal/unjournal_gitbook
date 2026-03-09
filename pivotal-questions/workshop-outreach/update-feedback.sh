#!/bin/bash
# Update workshop feedback document
# Run manually: ./update-feedback.sh
# Or add to crontab: 0 9 * * * /path/to/update-feedback.sh

cd /Users/yosemite/githubs/unjournal-gitbook-knowledge-comms

# Run Claude Code with the update prompt
echo "Update the workshop feedback doc at /Users/yosemite/unjournal-private/workshop-tracking/wellbeing-workshop-feedback.md by checking for new Netlify form submissions and email responses about the wellbeing workshop. Search emails for 'wellbeing workshop' from the last 3 days and any new form submissions. Update the tables and add any new responses." | claude --print

echo "Feedback doc updated at $(date)"
