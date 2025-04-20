
import { fetchWithRetry } from './fetchWithRetry.ts';

// Fetch both live streams and regular videos for a channel.
export async function fetchLiveAndUploads(channelId: string, GOOGLE_API_KEY: string) {
  // Check for live streams
  const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`;
  const liveResponse = await fetchWithRetry(liveUrl);
  const liveData = await liveResponse.json();

  // Fetch regular videos
  const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`;
  const response = await fetchWithRetry(videosUrl);
  const data = await response.json();

  return {
    liveStream: liveData.items?.[0],
    videos: data.items || []
  };
}
