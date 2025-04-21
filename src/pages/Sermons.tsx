
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { toast } from "@/components/ui/use-toast";

const Sermons = () => {
  const [playlistId, setPlaylistId] = useState<string>('PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('get-sermon-playlist-id');
        if (error) throw error;
        if (data?.playlistId) {
          setPlaylistId(data.playlistId);
          console.log("Playlist ID fetched:", data?.playlistId);
        }
      } catch (error) {
        console.error('Error fetching playlist ID:', error);
        setError("Could not load sermon playlist. Using default playlist.");
        toast({
          title: "Connection Error",
          description: "Could not connect to sermon service. Using default playlist.",
          variant: "destructive"
        });
        // Fallback to default playlist ID is already handled by the initial state
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistId();
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Our Sermons</h1>
      
      {error && (
        <Alert variant="warning" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="overflow-hidden">
        <div className="relative pt-[56.25%]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : (
            <YouTubeEmbed playlistId={playlistId} className="absolute top-0 left-0 w-full h-full" />
          )}
        </div>
      </Card>

      <div className="mt-6 text-center">
        <a 
          href={`https://www.youtube.com/playlist?list=${playlistId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View all sermons on YouTube
        </a>
      </div>
    </div>
  );
};

export default Sermons;
