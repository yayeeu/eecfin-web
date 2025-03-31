
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EventPagination: React.FC<EventPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={handlePreviousPage} 
              className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-eecfin-navy hover:text-eecfin-navy/80 hover:bg-eecfin-gold/20`}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                isActive={currentPage === i + 1}
                onClick={() => onPageChange(i + 1)}
                className={currentPage === i + 1 ? 'bg-eecfin-navy text-white hover:bg-eecfin-navy/90' : 'text-eecfin-navy hover:text-eecfin-navy/80 hover:bg-eecfin-gold/20'}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={handleNextPage} 
              className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} text-eecfin-navy hover:text-eecfin-navy/80 hover:bg-eecfin-gold/20`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EventPagination;
