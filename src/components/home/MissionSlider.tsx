
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
    title: "Welcome",
    content: "Welcome to the Ethiopian Evangelical Church in Finland website!"
  },
  {
    language: "Amharic",
    title: "እንኳን ደና መጡ ",
    content: "በፊንላንድ ወደምትገኘው የኢትዮጵያ ወንጌላዊት ቤተ ክርስቲያን ድረገጽ እንኳን ደህና መጣችሁ!፡"
  },
  {
    language: "Finnish",
    title: "Tervetuloa",
    content: "Tervetuloa Etiopian evankelisen kirkon sivuille Suomessa!"
  }
];

const MissionSlider: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );

  return (
    <div className="w-full h-full">
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
            <CarouselItem key={index} className="h-full flex">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col h-full w-full border border-gray-200">
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
      </Carousel>
    </div>
  );
};

export default MissionSlider;
