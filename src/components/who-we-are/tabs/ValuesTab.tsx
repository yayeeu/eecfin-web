
import React from 'react';
import { Users } from 'lucide-react';

const ValuesTab = () => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <Users size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-amber-700 mb-2">Values</h3>
        <div className="space-y-4">
          <div className="mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-700 rounded-full">
              Faith, Community, Service
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-amber-700">Faith in the Word of God</h4>
              <p>We uphold the Bible as the inspired and infallible authority in all areas of faith and life, guiding us in our walk with God.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700">Community and Discipleship</h4>
              <p>We value unity, fellowship, and mutual growth, fostering an environment where believers can grow in faith, love, and service.</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700">Mission and Service</h4>
              <p>We are committed to sharing the Gospel, serving others, and living out our faith through the power of the Holy Spirit, with a hopeful anticipation of Christ's return.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesTab;
