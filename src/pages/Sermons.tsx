
import React from 'react';
import { Card } from "@/components/ui/card";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { MessageSquare, Video, ListVideo } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { VideoLibrary } from "@/components/VideoLibrary";

const Sermons = () => {
  const playlistId = 'PL827hn5fOPy27cTOXAdkdqO70eoUzKNIQ';

  return (
    <div className="container-custom py-8 space-y-12">
      <div className="flex items-start gap-8 flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] max-w-full">
          <Card className="overflow-hidden w-full">
            <div className="w-full">
              <YouTubeEmbed playlistId={playlistId} />
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-[40%] space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-eecfin-navy" />
            <h1 className="text-3xl font-bold text-eecfin-navy">EECFIN Media</h1>
          </div>
          
          <h2 className="text-2xl font-semibold">Access our complete sermon library</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Stay connected with our church through our broadcasts, sermons, and special 
            events. Watch our services live or catch up on past messages.
          </p>

          <a 
            href={`https://www.youtube.com/playlist?list=${playlistId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eecfin-navy text-white rounded-lg hover:bg-eecfin-navy/90 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
            </svg>
            Visit Our YouTube Channel
          </a>
        </div>
      </div>

      <div className="w-full">
        <Tabs defaultValue="sermons">
          <TabsList className="mb-4">
            <TabsTrigger value="sermons" className="gap-2">
              <Video className="h-4 w-4" />
              Sermons
            </TabsTrigger>
            <TabsTrigger value="livestreams" className="gap-2">
              <ListVideo className="h-4 w-4" />
              Live Streams
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sermons" className="mt-0">
            <VideoLibrary type="sermon" />
          </TabsContent>
          
          <TabsContent value="livestreams" className="mt-0">
            <VideoLibrary type="live" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sermons;
