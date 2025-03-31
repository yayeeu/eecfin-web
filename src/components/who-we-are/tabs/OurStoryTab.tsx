
import React from 'react';
import { BookOpen } from 'lucide-react';

const OurStoryTab = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <BookOpen size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-blue-700 mb-2">Our Story</h3>
        <div className="space-y-4">
          <p>
            The Ethiopian Evangelical Church in Finland (EECFIN) was established to serve the spiritual
            needs of Ethiopian Christians living in Finland. What began as a small gathering of believers
            has grown into a vibrant church community.
          </p>
          <p>
            Our church was founded on the principles of providing a spiritual home that preserves Ethiopian
            Christian traditions while helping members integrate into Finnish society. Over the years,
            we have grown in numbers and impact, serving both the Ethiopian community and reaching out to others.
          </p>
          <p>
            Today, EECFIN continues to be a place of worship, fellowship, and community service,
            welcoming all who seek to grow in their faith journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStoryTab;
