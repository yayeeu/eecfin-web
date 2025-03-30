
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MinistryCard from './MinistryCard';

const MinistrySection: React.FC = () => {
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
    
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ministries.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>
    );
  }, [ministries]);

  // Memoize the empty state
  const emptyState = useMemo(() => (
    <div className="bg-gray-50 p-10 rounded-lg text-center max-w-3xl mx-auto">
      <Handshake className="h-14 w-14 text-eecfin-navy mx-auto mb-4 opacity-70" />
      <h3 className="text-xl font-semibold mb-2">Ministries Coming Soon</h3>
      <p className="text-gray-600 mb-6">
        We're currently organizing our ministry programs. Check back soon to find ways you can serve and 
        connect with our church community.
      </p>
      <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
        <Link to="/contact">Contact Us For More Information</Link>
      </Button>
    </div>
  ), []);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Our Ministries</h2>
        
        {isLoading ? (
          <div className="text-center p-8">Loading ministries...</div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">Error loading ministries. Please try again later.</div>
        ) : ministries && ministries.length > 0 ? (
          ministryCards
        ) : (
          emptyState
        )}
      </div>
    </section>
  );
};

export default MinistrySection;
