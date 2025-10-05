import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  type: 'sermon' | 'live';
  source: 'playlist' | 'channel' | 'fallback';
}

// Simple cache to avoid refetching same data frequently
const csvCache = new Map<string, { videos: YouTubeVideo[], timestamp: number }>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export const useYouTubeVideosFromCSV = (type: 'sermon' | 'live') => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideosFromCSV = async () => {
      // Check cache first
      const cacheKey = `csv-${type}`;
      const cached = csvCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`📦 Using cached CSV ${type} videos`);
        setVideos(cached.videos);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`📄 Loading ${type} videos from CSV...`);
        
        // Fetch the CSV file from the public directory
        const response = await fetch('/data/youtube-videos.csv');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        if (headers.length < 6) {
          throw new Error('Invalid CSV format: missing required columns');
        }

        const parsedVideos: YouTubeVideo[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line.trim()) continue;
          
          // Parse CSV line (handle quoted fields)
          const values = parseCSVLine(line);
          
          if (values.length >= 6) {
            const video: YouTubeVideo = {
              id: values[0],
              title: values[1],
              thumbnailUrl: values[2],
              publishedAt: values[3],
              type: values[4] as 'sermon' | 'live',
              source: values[5] as 'playlist' | 'channel' | 'fallback'
            };
            
            // Filter by requested type
            if (video.type === type && video.id && video.title) {
              parsedVideos.push(video);
            }
          }
        }

        // Sort by most recent first
        const sortedVideos = parsedVideos.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        setVideos(sortedVideos);
        
        // Cache the results
        csvCache.set(cacheKey, {
          videos: sortedVideos,
          timestamp: Date.now()
        });

        console.log(`✅ Loaded ${sortedVideos.length} ${type} videos from CSV`);

      } catch (err) {
        console.error(`❌ Failed to load ${type} videos from CSV:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load videos from CSV');
        
        // Fallback data
        const fallbackVideo: YouTubeVideo = {
          id: 'izfVnlQCi-U',
          title: `Sample ${type === 'sermon' ? 'Sermon & Teaching' : 'Live Stream'} - Check CSV file`,
          thumbnailUrl: 'https://img.youtube.com/vi/izfVnlQCi-U/mqdefault.jpg',
          publishedAt: new Date().toISOString(),
          type: type,
          source: 'fallback'
        };
        
        setVideos([fallbackVideo]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosFromCSV();
  }, [type]);

  return { videos, loading, error };
};

/**
 * Parse a CSV line handling quoted fields properly
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i - 1] === ',')) {
      // Starting quote
      inQuotes = true;
    } else if (char === '"' && inQuotes && (i === line.length - 1 || line[i + 1] === ',')) {
      // Ending quote
      inQuotes = false;
    } else if (char === '"' && inQuotes && line[i + 1] === '"') {
      // Escaped quote
      current += '"';
      i++; // Skip next quote
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    
    i++;
  }
  
  // Add the last field
  result.push(current.trim());
  
  return result;
}

