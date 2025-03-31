
import React from 'react';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

interface SubscribeSectionProps {
  onSubscribe: () => void;
}

const SubscribeSection: React.FC<SubscribeSectionProps> = ({ onSubscribe }) => {
  return (
    <section className="flex flex-col justify-center items-center bg-gray-50 p-6 rounded-lg h-full">
      <h2 className="section-title mb-4">Subscribe to Our Channel</h2>
      <p className="text-center mb-6">
        Stay updated with our latest sermons, worship services, and church events by subscribing to our YouTube channel.
      </p>
      <Button 
        onClick={onSubscribe}
        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-2"
      >
        <Youtube size={20} />
        Subscribe on YouTube
      </Button>
    </section>
  );
};

export default React.memo(SubscribeSection);
