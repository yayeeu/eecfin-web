
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const BeliefsTab = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <BookOpen size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-indigo-700 mb-2">Beliefs</h3>
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-700 rounded-full">
              We believe in one God, three persons
            </span>
          </div>
          <p>
            We believe that the 66 books of the Old and New Testaments are the inspired and infallible 
            Word of God, the supreme authority in faith and life. We believe in one God, eternally 
            existing in three persons: Father, Son, and Holy Spirit. We believe in the deity of Jesus 
            Christ, who was born of the Virgin Mary, lived a sinless life, and died for our sins as a 
            substitutionary sacrifice. We believe in His bodily resurrection, ascension into Heaven, 
            and His ongoing role as our High Priest and Advocate.
          </p>
          <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white mt-4">
            <Link to="/our-faith">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeliefsTab;
