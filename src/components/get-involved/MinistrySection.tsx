
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MinistryCard from './MinistryCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MinistrySection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ministriesPerPage = 6; // Display 6 ministries per page
  
  // Optimize data fetching
  const { data: ministries, isLoading, error } = useQuery({
    queryKey: ['ministries', true],
    queryFn: () => getMinistries(true), // Only fetch active ministries
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!ministries) return 1;
    return Math.ceil(ministries.length / ministriesPerPage);
  }, [ministries]);
  
  // Get current ministries for this page
  const currentMinistries = useMemo(() => {
    if (!ministries) return [];
    const startIndex = (currentPage - 1) * ministriesPerPage;
    return ministries.slice(startIndex, startIndex + ministriesPerPage);
  }, [ministries, currentPage]);
  
  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Memoize ministry cards to prevent unnecessary re-renders
  const ministryCards = useMemo(() => {
    if (!currentMinistries || currentMinistries.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentMinistries.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>
    );
  }, [currentMinistries]);

  // Memoize the empty state
  const emptyState = useMemo(() => (
    <div className="bg-gray-50 p-6 rounded-lg text-center">
      <Handshake className="h-10 w-10 text-eecfin-navy mx-auto mb-3 opacity-70" />
      <h3 className="text-lg font-semibold mb-2">Ministries Coming Soon</h3>
      <p className="text-gray-600 mb-4 text-sm">
        We're currently organizing our ministry programs. Check back soon.
      </p>
      <Button asChild size="sm" className="bg-eecfin-navy hover:bg-eecfin-navy/80">
        <Link to="/contact">Contact For Info</Link>
      </Button>
    </div>
  ), []);

  return (
    <section>
      <h2 className="section-title mb-6">Our Ministries</h2>
      
      {isLoading ? (
        <div className="text-center p-4">Loading ministries...</div>
      ) : error ? (
        <div className="text-center p-4 text-red-500">Error loading ministries. Please try again.</div>
      ) : ministries && ministries.length > 0 ? (
        <div className="space-y-6">
          {ministryCards}
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={goToPrevPage} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer text-eecfin-navy"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-eecfin-navy text-white hover:bg-eecfin-navy/90" : "text-eecfin-navy"}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={goToNextPage} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer text-eecfin-navy"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        emptyState
      )}
    </section>
  );
};

export default MinistrySection;
