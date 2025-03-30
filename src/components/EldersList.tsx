
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Elder } from '@/types/database.types';
import { getElders } from '@/lib/elderService';
import { Loader2 } from 'lucide-react';

const EldersList = () => {
  const { data: elders, isLoading, isError } = useQuery({
    queryKey: ['elders'],
    queryFn: getElders
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading elders...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Error loading elders. Please try again later.</p>
      </div>
    );
  }

  if (!elders || elders.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No elders found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {elders.map((elder) => (
        <div key={elder.id} className="text-center">
          <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {elder.image ? (
              <img 
                src={elder.image} 
                alt={elder.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                  (e.target as HTMLImageElement).classList.add('p-4');
                }} 
              />
            ) : (
              <span className="text-gray-400 text-5xl">👨‍⚖️</span>
            )}
          </div>
          <h3 className="text-xl font-semibold">{elder.name}</h3>
          <p className="text-eecfin-navy font-medium">{elder.role}</p>
          
          {elder.phone && (
            <p className="mt-2 text-gray-600">
              <a href={`tel:${elder.phone.replace(/\s+/g, '')}`} className="hover:text-eecfin-gold transition-colors">
                {elder.phone}
              </a>
            </p>
          )}
          
          {elder.email && (
            <p className="mt-1 text-gray-600">
              <a href={`mailto:${elder.email}`} className="hover:text-eecfin-gold transition-colors">
                {elder.email}
              </a>
            </p>
          )}
          
          {elder.ministries && (
            <p className="mt-1 text-gray-600 text-sm">
              <span className="inline-block px-3 py-1 bg-eecfin-gold/10 text-eecfin-navy rounded-full">
                {elder.ministries.name}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EldersList;
