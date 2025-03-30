
import React, { useEffect, useRef, useState } from 'react';
import { Member } from '@/types/database.types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// This is a placeholder component for the map
// In a real implementation, you would use a mapping library like Mapbox or Google Maps
const MembersMap: React.FC<{ members: Member[] }> = ({ members }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  
  useEffect(() => {
    // This would be where you initialize your map library
    if (mapContainerRef.current) {
      // Simulating map initialization
      setTimeout(() => {
        setIsMapInitialized(true);
      }, 500);
    }
  }, []);
  
  // Calculate how many members have addresses
  const membersWithAddress = members.filter(member => !!member.address).length;
  const totalMembers = members.length;
  const percentageWithAddress = totalMembers > 0 
    ? Math.round((membersWithAddress / totalMembers) * 100) 
    : 0;
  
  return (
    <div className="space-y-4">
      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Location Data</AlertTitle>
        <AlertDescription>
          {membersWithAddress} out of {totalMembers} members ({percentageWithAddress}%) have address information.
        </AlertDescription>
      </Alert>
      
      <div 
        ref={mapContainerRef} 
        className="h-[400px] rounded-md bg-gray-100 border flex items-center justify-center"
      >
        {isMapInitialized ? (
          <div className="text-center max-w-md mx-auto p-6">
            <h3 className="text-xl font-medium mb-2">Map Placeholder</h3>
            <p className="text-gray-500">
              In a complete implementation, this would display an interactive map showing the locations of all members 
              with geographic coordinates extracted from their addresses.
            </p>
            <p className="text-gray-500 mt-2">
              To implement this, you could use a mapping library like Mapbox, Leaflet, or Google Maps, along with a 
              geocoding service to convert addresses into coordinates.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="ml-2">Initializing map...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersMap;
