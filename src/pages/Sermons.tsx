
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Define the interface for a YouTube video
interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
}

const Sermons = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const videosPerPage = 8;

  const channelId = 'UCzNxhbLVerz_Su5yhI0n8LQ'; // Example channel ID, replace with your actual channel ID

  useEffect(() => {
    // In a real implementation, we would fetch the videos from the YouTube API
    // For now, we'll simulate this with mock data
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Simulated data - in a real implementation, this would come from the YouTube API
        const mockVideos: YouTubeVideo[] = Array.from({ length: 20 }, (_, i) => ({
          id: `video-${i + 1}`,
          title: `Sunday Sermon ${i + 1}: The Power of Faith`,
          publishedAt: new Date(2023, 11 - (i % 12), 10 - (i % 7)).toISOString(),
          thumbnailUrl: 'https://via.placeholder.com/320x180'
        }));

        setVideos(mockVideos);
        
        // Set the most recent video as the selected video
        if (mockVideos.length > 0) {
          setSelectedVideo(mockVideos[0].id);
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load videos");
        setLoading(false);
        console.error("Error fetching YouTube videos:", err);
      }
    };

    fetchVideos();
  }, [channelId]);

  // Filter videos based on search term
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  // Group videos by month and year for date-based navigation
  const videosByDate = videos.reduce((acc, video) => {
    const date = new Date(video.publishedAt);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(video);
    return acc;
  }, {} as Record<string, YouTubeVideo[]>);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="animate-pulse text-eecfin-navy text-xl">Loading sermons...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="page-title">Sermons</h1>
      
      {/* Featured Video */}
      <section className="mb-12">
        <h2 className="section-title mb-6">Latest Sermon</h2>
        {selectedVideo && (
          <div className="w-full aspect-video">
            <YouTubeEmbed videoId={selectedVideo} className="w-full h-full" />
          </div>
        )}
      </section>

      {/* Video Library */}
      <section>
        <h2 className="section-title mb-6">Sermon Library</h2>
        
        {/* Search and Filter */}
        <div className="mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search sermons..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eecfin-navy"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="grid" className="mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="date">Date View</TabsTrigger>
          </TabsList>
          
          {/* Grid View */}
          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {currentVideos.map((video) => (
                <Card 
                  key={video.id} 
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${selectedVideo === video.id ? 'ring-2 ring-eecfin-navy' : ''}`}
                  onClick={() => handleVideoSelect(video.id)}
                >
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-2 h-12">{video.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(video.publishedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
          
          {/* Date View */}
          <TabsContent value="date">
            <div className="space-y-8">
              {Object.entries(videosByDate).map(([monthYear, monthVideos]) => (
                <div key={monthYear} className="space-y-4">
                  <h3 className="text-xl font-semibold text-eecfin-navy">{monthYear}</h3>
                  <div className="space-y-2">
                    {monthVideos.map((video) => (
                      <div 
                        key={video.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${selectedVideo === video.id ? 'bg-gray-50 border-eecfin-navy' : ''}`}
                        onClick={() => handleVideoSelect(video.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-24 h-16 flex-shrink-0 mr-4">
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{video.title}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(video.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Sermons;
