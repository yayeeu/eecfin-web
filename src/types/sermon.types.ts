
// Define the interface for a YouTube video
export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  type?: 'sermon' | 'broadcast';
}
