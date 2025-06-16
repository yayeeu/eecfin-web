import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchSlides, type SlideImage } from '@/lib/sliderService';

export default function ImageSlider() {
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const loadedSlides = await fetchSlides();
        setSlides(loadedSlides);
      } catch (error) {
        console.error('Error loading slides:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSlides();
  }, []);

  // Initialize autoplay plugin
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  if (isLoading) {
    return (
      <div className="relative w-full h-[500px] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[500px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No slides available
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Carousel
        plugins={[autoplayPlugin.current]}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-[500px]">
              <div className="relative w-full h-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                {slide.overlay && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center px-4 max-w-5xl">
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#fdfbca] mb-6 font-serif tracking-wide drop-shadow-lg">
                        {slide.overlay.title}
                      </h2>
                      <p className="text-2xl md:text-3xl text-[#fdfbca]/90 font-semibold tracking-wide drop-shadow-md">
                        {slide.overlay.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white z-10" />
      </Carousel>
    </div>
  );
}
