
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { Link } from 'react-router-dom';

interface MissionSlide {
  language: string;
  title: string;
  content: string;
}

const missionSlides: MissionSlide[] = [
  {
    language: "English",
    title: "Our Mission",
    content: "We are a vibrant Ethiopian Christian community dedicated to spreading the Gospel, nurturing spiritual growth, and providing a place of belonging for Ethiopians and friends in Finland. Our church serves as a bridge between Ethiopian Christian heritage and life in Finland."
  },
  {
    language: "Amharic",
    title: "ተልዕኮአችን",
    content: "የኢትዮጵያ ወንጌላዊ ቤተክርስቲያን በፊንላንድ ወንጌልን ለማሰራጨት፣ መንፈሳዊ እድገትን ለማዳበርና በፊንላንድ ለሚኖሩ ኢትዮጵያውያንና ወዳጆቻቸው መቀመጫ ለመሆን የተሰጠው ተልዕኮ ነው፡፡ ቤተክርስቲያናችን በኢትዮጵያ የክርስትና ቅርስና በፊንላንድ ሕይወት መካከል ድልድይ ሆኖ ያገለግላል፡፡"
  },
  {
    language: "Finnish",
    title: "Tehtävämme",
    content: "Olemme eloisa etiopialainen kristillinen yhteisö, joka on omistautunut evankeliumin levittämiseen, hengellisen kasvun edistämiseen ja tarjoamaan yhteenkuuluvuuden paikan etiopialaisille ja ystäville Suomessa. Kirkkomme toimii siltana etiopialaisen kristillisen perinnön ja Suomen elämän välillä."
  }
];

const MissionSlider: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {missionSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-full">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col h-full border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="section-title mb-0">{slide.title}</h2>
                  <span className="text-sm font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-full">{slide.language}</span>
                </div>
                <p className="text-lg mb-8 flex-grow">
                  {slide.content}
                </p>
                <div className="mt-auto flex justify-center">
                  <Button asChild className="bg-eecfin-navy hover:bg-eecfin-navy/80">
                    <Link to="/who-we-are">About Our Church</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Controls removed as requested */}
      </Carousel>
    </div>
  );
};

export default MissionSlider;
