
import React, { useEffect, useRef, useState } from 'react';
import { Member } from '@/types/database.types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, MapPin, Loader2 } from 'lucide-react';
import { updateMember } from '@/lib/memberService';
import { updateMemberCoordinates } from '@/lib/geocodingService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const MembersMap: React.FC<{ members: Member[] }> = ({ members }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isUpdatingCoordinates, setIsUpdatingCoordinates] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Calculate stats about member addresses
  const membersWithAddress = members.filter(member => !!member.address).length;
  const membersWithCoordinates = members.filter(member => !!member.latitude && !!member.longitude).length;
  const totalMembers = members.length;
  const percentageWithAddress = totalMembers > 0 
    ? Math.round((membersWithAddress / totalMembers) * 100) 
    : 0;
  const percentageWithCoordinates = totalMembers > 0
    ? Math.round((membersWithCoordinates / totalMembers) * 100)
    : 0;
  
  // Mutation for updating member coordinates
  const updateCoordinatesMutation = useMutation({
    mutationFn: async (member: Member) => {
      if (!member.address || !member.id) return false;
      return updateMemberCoordinates(
        member.id, 
        member.address, 
        (id, coords) => updateMember(id, coords)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    }
  });
  
  // Update coordinates for all members that have addresses but no coordinates
  const updateAllCoordinates = async () => {
    setIsUpdatingCoordinates(true);
    
    try {
      const membersToUpdate = members.filter(
        m => m.address && (!m.latitude || !m.longitude)
      );
      
      let updatedCount = 0;
      for (const member of membersToUpdate) {
        const success = await updateCoordinatesMutation.mutateAsync(member);
        if (success) updatedCount++;
      }
      
      toast({
        title: "Coordinates updated",
        description: `Successfully updated coordinates for ${updatedCount} member${updatedCount !== 1 ? 's' : ''}.`,
      });
    } catch (error) {
      console.error('Error updating coordinates:', error);
      toast({
        title: "Error",
        description: "There was an error updating member coordinates.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingCoordinates(false);
    }
  };
  
  useEffect(() => {
    // This would be where you initialize your map library
    if (mapContainerRef.current) {
      // Simulating map initialization
      setTimeout(() => {
        setIsMapInitialized(true);
      }, 500);
    }
  }, []);
  
  // Render member pins on the map (placeholder for real map implementation)
  const renderMemberPins = () => {
    const membersWithPins = members.filter(m => m.latitude && m.longitude);
    
    if (membersWithPins.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4">
          <p>No member locations available to display.</p>
          <p className="text-sm">Add addresses to members and generate coordinates to see them on the map.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {membersWithPins.map((member) => (
          <div key={member.id} className="flex items-center p-2 bg-gray-50 rounded-md">
            <MapPin className="h-4 w-4 text-eecfin-navy mr-2 flex-shrink-0" />
            <div className="text-sm truncate">
              <span className="font-medium">{member.name}</span>
              <span className="block text-xs text-gray-500 truncate">{member.address}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <Alert variant="default" className="bg-blue-50 border-blue-200 md:flex-1">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Location Data</AlertTitle>
          <AlertDescription>
            {membersWithAddress} out of {totalMembers} members ({percentageWithAddress}%) have address information.
            <br />
            {membersWithCoordinates} members ({percentageWithCoordinates}%) have geographic coordinates.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center md:justify-end">
          <button
            onClick={updateAllCoordinates}
            disabled={isUpdatingCoordinates || membersWithAddress === 0 || membersWithAddress === membersWithCoordinates}
            className={`px-4 py-2 rounded-md text-white flex items-center 
              ${isUpdatingCoordinates || membersWithAddress === 0 || membersWithAddress === membersWithCoordinates
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-eecfin-navy hover:bg-eecfin-navy/80'
              }`}
          >
            {isUpdatingCoordinates && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Update Member Coordinates
          </button>
        </div>
      </div>
      
      <div 
        ref={mapContainerRef} 
        className="h-[400px] rounded-md bg-gray-100 border flex flex-col"
      >
        {isMapInitialized ? (
          <div className="p-4 flex flex-col h-full">
            <h3 className="text-xl font-medium mb-2">Member Locations</h3>
            <p className="text-gray-500 mb-4">
              This map shows the locations of church members based on their address information.
            </p>
            
            <div className="bg-white rounded-md border p-3 flex-1 overflow-y-auto">
              {renderMemberPins()}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="h-8 w-8 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="ml-2">Initializing map...</span>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
        <p className="font-medium mb-1">Implementation Note:</p>
        <p>
          This is a simplified map placeholder. In a production implementation, you would use a mapping 
          library like Mapbox, Google Maps, or Leaflet to display an interactive map with member locations.
        </p>
        <p className="mt-2">
          You would also use a real geocoding service instead of the mock implementation that generates 
          random coordinates for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default MembersMap;
