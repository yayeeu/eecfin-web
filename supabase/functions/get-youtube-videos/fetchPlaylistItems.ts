
import { fetchWithRetry } from './fetchWithRetry.ts';

// Fetch playlist items for a given playlist--ASK FOR ONLY MINIMUM FIELDS NEEDED
export async function fetchPlaylistItems(playlistId: string, GOOGLE_API_KEY: string) {
  console.log(`Fetching playlist items for playlist ID: ${playlistId}`);
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&fields=items(snippet(title,publishedAt,resourceId/videoId,thumbnails/medium/url)),nextPageToken&playlistId=${playlistId}&key=${GOOGLE_API_KEY}`;
    const response = await fetchWithRetry(url);
    const data = await response.json();
    if (!data.items) {
      console.warn(`No items found in playlist: ${playlistId}`);
      console.log('YouTube API response:', data);
      return [];
    }
    console.log(`Found ${data.items.length} items in playlist ${playlistId}`);
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching playlist items for playlist ${playlistId}:`, error);
    throw error;
  }
}
