
export function getMockVideoData() {
  return [
    {
      id: 'mock-video-1',
      title: 'Sunday Service (Most Recent)',
      publishedAt: new Date().toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+Unavailable'
    },
    {
      id: 'mock-video-2',
      title: 'Weekly Prayer Meeting',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/480x360?text=Video+Unavailable'
    }
  ];
}
