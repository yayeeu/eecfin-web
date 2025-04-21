
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionSlider from './MissionSlider';

const MediaSection = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Our Mission with language slider */}
          <div className="w-full flex flex-col">
            <div className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                <h2 className="section-title mb-0">Our Mission</h2>
              </div>
              <div className="flex-1">
                <MissionSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
