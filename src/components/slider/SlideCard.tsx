
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Image } from 'lucide-react';
import { type SlideImage } from '@/lib/sliderService';

interface SlideCardProps {
  slide: SlideImage;
  onEdit: (slide: SlideImage) => void;
  onDelete: (id: string) => void;
}

const SlideCard = ({ slide, onEdit, onDelete }: SlideCardProps) => {
  return (
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
          <Button variant="outline" size="sm" onClick={() => onEdit(slide)}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-500" onClick={() => onDelete(slide.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlideCard;
