#!/bin/bash

# Setup cronjob for YouTube video fetching
# Runs every hour at minute 0

SCRIPT_PATH="/home/yareda/Dev/eecfin/eecfin-web/scripts/fetch-youtube-videos.js"
LOG_PATH="/home/yareda/Dev/eecfin/eecfin-web/logs/youtube-fetch.log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_PATH")"

# Add cronjob entry
CRON_ENTRY="0 * * * * cd /home/yareda/Dev/eecfin/eecfin-web && node $SCRIPT_PATH >> $LOG_PATH 2>&1"

# Check if cronjob already exists
if crontab -l 2>/dev/null | grep -q "fetch-youtube-videos.js"; then
    echo "⚠️  Cronjob already exists. Removing old entry..."
    crontab -l | grep -v "fetch-youtube-videos.js" | crontab -
fi

# Add new cronjob
(crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

echo "✅ Cronjob added successfully!"
echo "📋 Cronjob schedule: Every hour at minute 0"
echo "📄 Script: $SCRIPT_PATH"
echo "📝 Logs: $LOG_PATH"
echo ""
echo "To verify the cronjob was added, run: crontab -l"
echo "To remove the cronjob, run: crontab -l | grep -v 'fetch-youtube-videos.js' | crontab -"

