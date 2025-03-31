
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <div className="bg-white p-10 rounded-lg shadow text-center">
      <Image className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No slides found</h3>
      <p className="text-gray-500 mb-4">Add your first slide to display on the homepage.</p>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add Slide
      </Button>
    </div>
  );
};

export default EmptyState;
