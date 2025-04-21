
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

const Sermons = () => {
  const [playlistId, setPlaylistId] = useState<string>('eecfin');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-sermon-playlist-id');
        if (error) throw error;
        if (data?.playlistId) {
          setPlaylistId(data.playlistId);
        }
      } catch (error) {
        console.error('Error fetching playlist ID:', error);
        // Fallback to default playlist ID
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylistId();
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Our Sermons</h1>
      <Card className="overflow-hidden">
        <div className="relative pt-[56.25%]">
          {!isLoading && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed?listType=user_uploads&list=${playlistId}`}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title="EECFIN Sermons"
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Sermons;
