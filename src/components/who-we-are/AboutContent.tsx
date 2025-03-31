
import React from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the tab content components
import OurStoryTab from './tabs/OurStoryTab';
import MissionTab from './tabs/MissionTab';
import ValuesTab from './tabs/ValuesTab';
import BeliefsTab from './tabs/BeliefsTab';

// Tab configuration
const sections = [
  {
    id: "our-story",
    title: "Our Story",
    icon: <BookOpen size={20} />,
    color: "blue",
    component: <OurStoryTab />
  },
  {
    id: "mission",
    title: "Mission",
    icon: <Heart size={20} />,
    color: "green",
    component: <MissionTab />
  },
  {
    id: "values",
    title: "Values",
    icon: <Users size={20} />,
    color: "amber",
    component: <ValuesTab />
  },
  {
    id: "beliefs",
    title: "Beliefs",
    icon: <BookOpen size={20} />,
    color: "indigo",
    component: <BeliefsTab />
  }
];

const AboutContent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Tabs defaultValue="our-story">
        <TabsList className="w-full flex justify-center mb-6">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full bg-${section.color}-100 flex items-center justify-center text-${section.color}-600`}>
                {section.icon}
              </span>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="p-4 bg-gray-50 rounded-md">
            {section.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AboutContent;
