
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Users } from 'lucide-react';

const SideNavigation = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-eecfin-navy mb-4 border-b pb-2">
        About EECFIN
      </h3>
      <nav className="flex flex-col space-y-3">
        <Link 
          to="/our-faith" 
          className="flex items-center text-gray-700 hover:text-eecfin-navy transition-colors py-2"
        >
          <BookOpen size={18} className="mr-2 text-eecfin-gold" />
          Our Statement of Faith
        </Link>
        <Link 
          to="/constitution" 
          className="flex items-center text-gray-700 hover:text-eecfin-navy transition-colors py-2"
        >
          <FileText size={18} className="mr-2 text-eecfin-gold" />
          Our Constitution
        </Link>
        <Link 
          to="/our-leadership" 
          className="flex items-center text-gray-700 hover:text-eecfin-navy transition-colors py-2"
        >
          <Users size={18} className="mr-2 text-eecfin-gold" />
          Our Leadership
        </Link>
      </nav>
    </div>
  );
};

export default SideNavigation;
