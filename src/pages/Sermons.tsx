
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

const Sermons = () => {
  const [playlistId, setPlaylistId] = useState<string>('PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-sermon-playlist-id');
        if (error) throw error;
        if (data?.playlistId) {
          setPlaylistId(data.playlistId);
        }
        console.log("Playlist ID fetched:", data?.playlistId);
      } catch (error) {
        console.error('Error fetching playlist ID:', error);
        setError("Could not load playlist ID. Using default.");
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
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
          {error}
        </div>
      )}
      
      <Card className="overflow-hidden">
        <div className="relative pt-[56.25%]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="EECFIN Sermons"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Sermons;
