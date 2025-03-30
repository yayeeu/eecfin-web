
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Handshake, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MinistryCard from './MinistryCard';

const MinistrySection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Optimize data fetching
  const { data: ministries, isLoading, error } = useQuery({
    queryKey: ['ministries', true],
    queryFn: () => getMinistries(true), // Only fetch active ministries
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
  
  // Memoize ministry cards to prevent unnecessary re-renders
  const ministryCards = useMemo(() => {
    if (!ministries || ministries.length === 0) return null;
    
    // Show only first 8 ministries by default, or all if showAll is true
    const displayMinistries = showAll ? ministries : ministries.slice(0, 8);
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayMinistries.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>
    );
  }, [ministries, showAll]);

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
        <div className="space-y-4">
          {ministryCards}
          
          {ministries.length > 8 && (
            <div className="text-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
                className="text-eecfin-navy"
              >
                {showAll ? 'Show Less' : 'View All Ministries'} 
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        emptyState
      )}
    </section>
  );
};

export default MinistrySection;
