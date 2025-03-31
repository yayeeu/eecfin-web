
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image, Loader2, X, Info } from 'lucide-react';
import { type SlideImage } from '@/lib/sliderService';

interface SlideFormProps {
  currentSlide: SlideImage;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent, imageFile: File | null) => void;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SlideForm = ({ 
  currentSlide, 
  isLoading, 
  onSubmit, 
  onCancel, 
  onInputChange 
}: SlideFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(currentSlide.src || '');

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

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, imageFile);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="imageUpload">Slide Image</Label>
          <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground flex items-start mb-2">
            <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>
              Recommended image size: <strong>1920×1080px</strong> (16:9 aspect ratio).
              Use high resolution images (at least 72 DPI) for best results.
              Maximum file size: 10MB.
            </span>
          </div>
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
            onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="Slide title (displayed on image)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={currentSlide?.subtitle || ''}
            onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="Display order (1, 2, 3...)"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {currentSlide?.id ? 'Update Slide' : 'Add Slide'}
        </Button>
      </div>
    </form>
  );
};

export default SlideForm;
