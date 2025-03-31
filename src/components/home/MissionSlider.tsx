
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );
  const carouselRef = React.useRef<any>(null);

  const handleSlideChange = (value: number[]) => {
    if (carouselRef.current && carouselRef.current.scrollTo) {
      carouselRef.current.scrollTo(value[0]);
    }
  };

  const handleCarouselChange = () => {
    if (carouselRef.current && carouselRef.current.selectedScrollSnap) {
      setCurrentSlide(carouselRef.current.selectedScrollSnap());
    }
  };

  React.useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.on('select', handleCarouselChange);
      return () => {
        carousel.off('select', handleCarouselChange);
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Carousel
        plugins={[plugin.current]}
        className="w-full flex-grow"
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={(api) => {
          carouselRef.current = api;
        }}
      >
        <CarouselContent className="h-full">
          {missionSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-full">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="section-title mb-0">{slide.title}</h2>
                  <span className="text-sm font-medium text-gray-500">{slide.language}</span>
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
        <div className="flex items-center justify-between mt-4">
          <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-eecfin-navy/10 hover:bg-eecfin-navy/20 border-none text-eecfin-navy">
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          
          <Slider
            value={[currentSlide]}
            max={missionSlides.length - 1}
            step={1}
            className="w-[60%] mx-4"
            onValueChange={handleSlideChange}
          />
          
          <CarouselNext className="relative right-0 top-0 translate-y-0 bg-eecfin-navy/10 hover:bg-eecfin-navy/20 border-none text-eecfin-navy">
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export default MissionSlider;
