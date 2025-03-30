
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface SlideImage {
  src: string;
  alt: string;
}

const ImageSlider = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const images: SlideImage[] = [
    {
      src: "/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png",
      alt: "Ethiopian Evangelical Church worship service"
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      alt: "Serene mountain landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      alt: "Warm lights in forest"
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Beautiful lake surrounded by trees"
    },
    {
      src: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
      alt: "Modern architecture against blue sky"
    }
  ];

  return (
    <div className="relative w-full max-h-[400px] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <div className="aspect-[16/9] w-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 font-serif tracking-wider">
                      Welcome
                    </h2>
                    <p className="text-xl md:text-2xl text-eecfin-gold font-medium max-w-3xl mx-auto">
                      to Ethiopian Evangelical Church in Finland
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white z-10" />
      </Carousel>
    </div>
  );
};

export default ImageSlider;
