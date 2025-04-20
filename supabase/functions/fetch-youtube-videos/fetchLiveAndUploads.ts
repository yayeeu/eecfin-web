
import { fetchWithRetry } from './fetchWithRetry.ts';

// Fetch live streams, past live broadcasts, and regular uploads for a channel.
export async function fetchLiveAndUploads(channelId: string, GOOGLE_API_KEY: string) {
  try {
    // Check for live streams
    const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_API_KEY}`;
    const liveResponse = await fetchWithRetry(liveUrl);
    const liveData = await liveResponse.json();

    // Fetch regular uploads (for fallback only if no live or past live)
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${GOOGLE_API_KEY}`;
    const videosResponse = await fetchWithRetry(videosUrl);
    const videosData = await videosResponse.json();

    // Fetch completed/past live broadcasts
    const pastLivesUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=5&key=${GOOGLE_API_KEY}`;
    const pastLivesResponse = await fetchWithRetry(pastLivesUrl);
    const pastLivesData = await pastLivesResponse.json();

    // Check for API error responses
    if (liveData.error || videosData.error || pastLivesData.error) {
      const errorMessage = liveData.error?.message || videosData.error?.message || pastLivesData.error?.message;
      throw new Error(`YouTube API error: ${errorMessage}`);
    }

    return {
      liveStream: liveData.items?.[0],
      pastLiveVideos: pastLivesData.items || [],
      videos: videosData.items || []
    };
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    // Throw the error up to be handled by the main function
    throw error;
  }
}
