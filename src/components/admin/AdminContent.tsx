
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RoleGuard from '@/components/auth/RoleGuard';
import SignupForm from '@/components/auth/SignupForm';
import SliderManager from '@/components/slider/SliderManager';
import MinistryManager from '@/components/MinistryManager';
import { UserRole } from '@/types/auth.types';

interface AdminContentProps {
  activeSection: string;
  signUp: (email: string, password: string, formData: any) => Promise<void>;
}

const AdminContent: React.FC<AdminContentProps> = ({ activeSection, signUp }) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'slider': return 'Manage Slider Images';
      case 'ministries': return 'Manage Ministries';
      default: return '';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'slider': 
        return 'Add, edit, or delete slider images displayed on the homepage.';
      case 'ministries': 
        return 'Add, edit, or delete ministry information displayed on the Get Involved page.';
      default: 
        return '';
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-eecfin-navy">
          {getSectionTitle()}
        </h1>
        <p className="text-gray-500 mt-2">
          {getSectionDescription()}
        </p>
      </div>
      
      {activeSection === 'slider' && (
        <RoleGuard allowedRoles={['admin', 'it', 'volunteer']}>
          <SliderManager />
        </RoleGuard>
      )}
      {activeSection === 'ministries' && (
        <RoleGuard allowedRoles={['admin']}>
          <MinistryManager />
        </RoleGuard>
      )}
    </div>
  );
};

export default AdminContent;
