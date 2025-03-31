
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import SermonGridView from './SermonGridView';
import SermonDateView from './SermonDateView';
import { YouTubeVideo } from '@/types/sermon.types';

interface SermonLibraryProps {
  videos: YouTubeVideo[];
  currentVideos: YouTubeVideo[];
  videosByDate: Record<string, YouTubeVideo[]>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onVideoClick: (videoId: string) => void;
}

const SermonLibrary: React.FC<SermonLibraryProps> = ({ 
  currentVideos, 
  videosByDate, 
  currentPage, 
  totalPages, 
  onPageChange, 
  onVideoClick 
}) => {
  return (
    <section>
      <h2 className="section-title mb-6">Sermon Library</h2>
      
      <Tabs defaultValue="grid" className="mb-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="date">Date View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid">
          <SermonGridView videos={currentVideos} onVideoClick={onVideoClick} />
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </TabsContent>
        
        <TabsContent value="date">
          <SermonDateView videosByDate={videosByDate} onVideoClick={onVideoClick} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default React.memo(SermonLibrary);
