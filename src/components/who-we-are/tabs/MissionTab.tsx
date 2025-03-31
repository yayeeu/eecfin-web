
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const MissionTab = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <Heart size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-green-700 mb-2">Mission</h3>
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
              United in prayer, fellowship, and service
            </span>
          </div>
          <p>
            Our mission is to be a Spirit-filled community, united in prayer, fellowship, and service, 
            focused on evangelizing the lost, making disciples, and spreading hope. Our commitment is 
            to stand firm in our faith, knowing that our Lord and Savior Jesus Christ will return, 
            and we will live with Him forever in His eternal kingdom.
          </p>
          <Button asChild variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 mt-4">
            <Link to="/constitution">Read Our Constitution</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionTab;
