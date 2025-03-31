
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchSlides } from '@/lib/sliderService';
import { SlideImage } from '@/components/SliderManager';
import { Loader2 } from 'lucide-react';

const ImageSlider = () => {
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);
        const data = await fetchSlides();
        setSlides(data);
        setError(null);
      } catch (err) {
        console.error("Error loading slides:", err);
        setError("Failed to load slider images");
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full h-[324px] bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-eecfin-navy animate-spin" />
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="relative w-full h-[324px] bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 mb-2">
            {error || "No slider images available"}
          </h2>
          {!error && <p className="text-gray-400">Please add slides in the admin panel</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-h-[324px] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id || index} className="relative">
              <div className="aspect-[16/9] w-full relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 font-serif tracking-wider">
                      {slide.title || "Welcome"}
                    </h2>
                    <p className="text-xl md:text-2xl text-eecfin-gold font-medium max-w-3xl mx-auto">
                      {slide.subtitle || "to Ethiopian Evangelical Church in Finland"}
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
