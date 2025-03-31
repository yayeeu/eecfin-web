
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@/types/database.types';
import { getElderMembers } from '@/lib/memberService';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const EldersList = () => {
  const { data: elders, isLoading, isError } = useQuery({
    queryKey: ['elders'],
    queryFn: getElderMembers
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading elders...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Error loading elders. Please try again later.</p>
      </div>
    );
  }

  // Filter to show only active elders
  const activeElders = elders ? elders.filter(elder => elder.status === 'active') : [];

  if (!activeElders || activeElders.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No elders found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {activeElders.map((elder) => (
        <div key={elder.id} className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-3">
            {elder.image ? (
              <AvatarImage
                src={elder.image}
                alt={elder.name}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-400 text-2xl">
                👨‍⚖️
              </AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-base font-semibold">{elder.name}</h3>
          <p className="text-sm text-eecfin-navy font-medium">Elder</p>
          
          {elder.phone && (
            <p className="mt-1 text-sm text-gray-600">
              <a href={`tel:${elder.phone.replace(/\s+/g, '')}`} className="hover:text-eecfin-gold transition-colors">
                {elder.phone}
              </a>
            </p>
          )}
          
          {elder.email && (
            <p className="mt-1 text-xs text-gray-600">
              <a href={`mailto:${elder.email}`} className="hover:text-eecfin-gold transition-colors">
                {elder.email}
              </a>
            </p>
          )}
          
          {elder.ministries && (
            <div className="mt-1">
              <span className="inline-block px-2 py-1 text-xs bg-eecfin-gold/10 text-eecfin-navy rounded-full">
                {elder.ministries.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EldersList;
