import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Image, Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { 
  fetchSlides, 
  addSlide, 
  updateSlide, 
  deleteSlide,
  type SlideImage 
} from '@/lib/sliderService';

const SliderManager = () => {
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideImage | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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
    setImageFile(null);
    setImagePreview('');
    setIsEditing(true);
  };

  const handleEditClick = (slide: SlideImage) => {
    setCurrentSlide(slide);
    setImagePreview(slide.src);
    setImageFile(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentSlide) return;
    setCurrentSlide({
      ...currentSlide,
      [e.target.name]: e.target.value
    });
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
            <Card key={slide.id} className="overflow-hidden">
              <div className="relative aspect-[16/9] bg-gray-100">
                {slide.src ? (
                  <img 
                    src={slide.src} 
                    alt={slide.alt} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-12 w-12 text-gray-300" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{slide.title || 'No Title'}</h3>
                  <p className="text-gray-500 text-sm truncate">{slide.subtitle || 'No Subtitle'}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(slide)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClick(slide.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {slides.length === 0 && !isLoading && (
        <div className="bg-white p-10 rounded-lg shadow text-center">
          <Image className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No slides found</h3>
          <p className="text-gray-500 mb-4">Add your first slide to display on the homepage.</p>
          <Button onClick={handleAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
        </div>
      )}

      <Dialog open={isEditing} onOpenChange={(open) => !isLoading && setIsEditing(open)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentSlide?.id ? 'Edit Slide' : 'Add New Slide'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Slide Image</Label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="relative aspect-[16/9] w-full max-w-[300px] rounded-md overflow-hidden bg-gray-100 border">
                    {imagePreview ? (
                      <>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          type="button"
                          variant="secondary" 
                          size="icon" 
                          className="absolute top-1 right-1 h-7 w-7 rounded-full"
                          onClick={() => {
                            setImagePreview('');
                            setImageFile(null);
                            if (currentSlide) {
                              setCurrentSlide({...currentSlide, src: ''});
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Image className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('imageUpload')?.click()}
                    >
                      Choose Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  name="alt"
                  value={currentSlide?.alt || ''}
                  onChange={handleInputChange}
                  placeholder="Descriptive text for accessibility"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={currentSlide?.title || ''}
                  onChange={handleInputChange}
                  placeholder="Slide title (displayed on image)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  name="subtitle"
                  value={currentSlide?.subtitle || ''}
                  onChange={handleInputChange}
                  placeholder="Slide subtitle (displayed on image)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  min="1"
                  value={currentSlide?.order || 1}
                  onChange={handleInputChange}
                  placeholder="Display order (1, 2, 3...)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentSlide?.id ? 'Update Slide' : 'Add Slide'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SliderManager;
