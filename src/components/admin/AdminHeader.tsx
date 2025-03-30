
import React from 'react';

const AdminHeader: React.FC = () => {
  return (
    <header className="w-full bg-eecfin-navy py-4 px-4">
      <div className="flex items-center">
        <div className="h-12 w-auto flex-shrink-0">
          <img 
            src="/lovable-uploads/010ebde5-605e-4cfe-b2cc-1caacf7c5734.png" 
            alt="EECFIN Logo" 
            className="h-full object-contain"
          />
        </div>
        <h1 className="text-eecfin-gold text-2xl ml-6 font-bold">Admin Dashboard</h1>
      </div>
    </header>
  );
};

export default AdminHeader;
