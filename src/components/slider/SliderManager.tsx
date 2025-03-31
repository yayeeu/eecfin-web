
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { 
  fetchSlides, 
  addSlide, 
  updateSlide, 
  deleteSlide,
  type SlideImage 
} from '@/lib/sliderService';

import SlideCard from './SlideCard';
import EmptyState from './EmptyState';
import SlideForm from './SlideForm';

const SliderManager = () => {
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideImage | null>(null);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSlides();
      setSlides(data);
    } catch (error) {
      console.error("Error loading slides:", error);
      toast({
        title: "Error loading slides",
        description: "There was a problem loading the slides. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setCurrentSlide({
      id: '',
      src: '',
      alt: '',
      title: 'Welcome',
      subtitle: 'to Ethiopian Evangelical Church in Finland',
      order: slides.length + 1
    });
    setIsEditing(true);
  };

  const handleEditClick = (slide: SlideImage) => {
    setCurrentSlide(slide);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setIsLoading(true);
      try {
        await deleteSlide(id);
        toast({
          title: "Slide deleted",
          description: "The slide has been removed successfully."
        });
        await loadSlides();
      } catch (error) {
        console.error("Error deleting slide:", error);
        toast({
          title: "Error deleting slide",
          description: "There was a problem deleting the slide. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentSlide) return;
    setCurrentSlide({
      ...currentSlide,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent, imageFile: File | null) => {
    e.preventDefault();
    if (!currentSlide) return;

    setIsLoading(true);
    try {
      if (currentSlide.id) {
        await updateSlide(currentSlide.id, currentSlide, imageFile);
        toast({
          title: "Slide updated",
          description: "The slide has been updated successfully."
        });
      } else {
        if (!imageFile && !currentSlide.src) {
          throw new Error("An image is required");
        }
        await addSlide(currentSlide, imageFile);
        toast({
          title: "Slide added",
          description: "The new slide has been added successfully."
        });
      }
      setIsEditing(false);
      await loadSlides();
    } catch (error) {
      console.error("Error saving slide:", error);
      toast({
        title: "Error saving slide",
        description: `There was a problem saving the slide: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Slider Images</h2>
        <Button onClick={handleAddClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Slide
        </Button>
      </div>

      {isLoading && slides.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <SlideCard 
              key={slide.id}
              slide={slide}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {slides.length === 0 && !isLoading && (
        <EmptyState onAddClick={handleAddClick} />
      )}

      <Dialog open={isEditing} onOpenChange={(open) => !isLoading && setIsEditing(open)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentSlide?.id ? 'Edit Slide' : 'Add New Slide'}</DialogTitle>
          </DialogHeader>
          {currentSlide && (
            <SlideForm
              currentSlide={currentSlide}
              isLoading={isLoading}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditing(false)}
              onInputChange={handleInputChange}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderManager;
