
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
      case 'settings': return 'Settings';
      default: return '';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'slider': 
        return 'Add, edit, or delete slider images displayed on the homepage.';
      case 'ministries': 
        return 'Add, edit, or delete ministry information displayed on the Get Involved page.';
      case 'settings': 
        return 'Configure website settings.';
      default: 
        return '';
    }
  };

  return (
    <div className="flex-1 p-6">
      {activeSection !== 'register' && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-eecfin-navy">
            {getSectionTitle()}
          </h1>
          <p className="text-gray-500 mt-2">
            {getSectionDescription()}
          </p>
        </div>
      )}
      
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
      {activeSection === 'settings' && (
        <RoleGuard allowedRoles={['admin']}>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
            <p>Settings management will be implemented in a future update.</p>
          </div>
        </RoleGuard>
      )}
      {activeSection === 'register' && (
        <RoleGuard allowedRoles={['admin']}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-eecfin-navy">Add New Member</h1>
            <p className="text-gray-500 mt-2">Register a new member account with appropriate role.</p>
          </div>
          <div className="max-w-md mx-auto">
            <SignupForm onSubmit={signUp} />
          </div>
        </RoleGuard>
      )}
    </div>
  );
};

export default AdminContent;
