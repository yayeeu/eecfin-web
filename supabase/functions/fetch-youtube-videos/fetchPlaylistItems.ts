
import { fetchWithRetry } from './fetchWithRetry.ts';

// Fetch playlist items for given playlist
export async function fetchPlaylistItems(playlistId: string, GOOGLE_API_KEY: string) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${GOOGLE_API_KEY}`;
  const response = await fetchWithRetry(url);
  const data = await response.json();
  return data.items || [];
}
