
import React from 'react';
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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="section-title">Video Library</h2>
        
        <div className="flex gap-4">
          <div className="text-sm text-gray-500">
            {currentVideos.length > 0 && (
              <span>Showing {currentVideos.length} videos</span>
            )}
          </div>
        </div>
      </div>
      
      <SermonGridView videos={currentVideos} onVideoClick={onVideoClick} />
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // If there are more than 5 pages, show ellipsis
              if (totalPages > 5) {
                if (currentPage <= 3) {
                  // Show first 5 pages
                  return i + 1;
                } else if (currentPage >= totalPages - 2) {
                  // Show last 5 pages
                  return totalPages - 4 + i;
                } else {
                  // Show 2 pages before and after current page
                  return currentPage - 2 + i;
                }
              }
              return i + 1;
            }).map((page) => (
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
    </section>
  );
};

export default React.memo(SermonLibrary);
