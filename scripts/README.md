# YouTube Video Fetching System

This system fetches YouTube videos from RSS feeds and serves them via CSV files for optimal performance.

## Overview

Instead of making live API calls during user browsing, we:
1. **Pre-fetch** video data every hour using a Node.js script
2. **Save** the data to a CSV file 
3. **Serve** the data instantly from the CSV file

## Files

### Scripts
- `fetch-youtube-videos.js` - Main fetching script
- `setup-cronjob.sh` - Cronjob installation script

### Data
- `public/data/youtube-videos.csv` - Generated video data
- `logs/youtube-fetch.log` - Fetch operation logs

### Hooks
- `src/hooks/useYouTubeVideosFromCSV.ts` - React hook to read CSV data
- `src/hooks/useYouTubeVideos.ts` - Legacy hook (kept for reference)

## Configuration

Edit `fetch-youtube-videos.js` to update:
```javascript
const PLAYLIST_ID = 'PL827hn5fOPy0ds95bHKNDLcXCWgOO_DuO'; // Sermons playlist
const CHANNEL_ID = 'UCDiDav6xEZdYfDzpjCAgiHg';             // EECFIN channel
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd /home/yareda/Dev/eecfin/eecfin-web
npm install xmldom --legacy-peer-deps
```

### 2. Test the Script
```bash
node scripts/fetch-youtube-videos.js
```

### 3. Setup Cronjob (runs every hour)
```bash
./scripts/setup-cronjob.sh
```

### 4. Verify Cronjob
```bash
crontab -l
```

## CSV Format

```csv
id,title,thumbnailUrl,publishedAt,type,source
QZDZpzfR6rs,"Weekly Bible Study Series: 1 Peter (Day 4)",https://i2.ytimg.com/vi/QZDZpzfR6rs/hqdefault.jpg,2025-09-03T08:49:18+00:00,sermon,playlist
YnkmoBCsytY,"EECFIN -- Aug 31, 2025 Sunday Service Live",https://i2.ytimg.com/vi/YnkmoBCsytY/hqdefault.jpg,2025-09-01T04:11:34+00:00,live,channel
```

## Performance Benefits

- ⚡ **Instant loading** - No API calls during browsing
- 🔄 **Reliable data** - No dependency on CORS proxies
- 📊 **Fresh content** - Updates every hour automatically
- 🗄️ **Efficient caching** - 2-minute browser cache for CSV data

## Monitoring

### Check Logs
```bash
tail -f /home/yareda/Dev/eecfin/eecfin-web/logs/youtube-fetch.log
```

### Manual Run
```bash
cd /home/yareda/Dev/eecfin/eecfin-web
node scripts/fetch-youtube-videos.js
```

### Remove Cronjob
```bash
crontab -l | grep -v 'fetch-youtube-videos.js' | crontab -
```

## Troubleshooting

### Script Fails
- Check YouTube RSS URLs are accessible
- Verify playlist/channel IDs are correct
- Check Node.js version compatibility

### CSV Not Loading
- Verify `/public/data/youtube-videos.csv` exists
- Check file permissions
- Ensure web server serves static files from `/public`

### No Videos Showing
- Check CSV file has valid data
- Verify console logs in browser developer tools
- Run script manually to test fetching

## Fallback Behavior

If CSV loading fails, the system shows:
- Sample video with ID: `izfVnlQCi-U`
- Error message indicating the issue
- Retry functionality for users

## Advanced Configuration

### Change Update Frequency
Edit the cronjob schedule in `setup-cronjob.sh`:
```bash
# Every 30 minutes
"*/30 * * * * cd /home/yareda/Dev/eecfin/eecfin-web && node scripts/fetch-youtube-videos.js"

# Every 2 hours  
"0 */2 * * * cd /home/yareda/Dev/eecfin/eecfin-web && node scripts/fetch-youtube-videos.js"
```

### Cache Duration
Modify cache duration in `useYouTubeVideosFromCSV.ts`:
```typescript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```
