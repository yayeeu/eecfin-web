
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth.types';
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContent from '@/components/admin/AdminContent';

interface AdminProps {
  activeSection?: string;
}

const Admin: React.FC<AdminProps> = ({ activeSection = 'slider' }) => {
  const [activeSectionState, setActiveSection] = useState<string>(activeSection);
  const navigate = useNavigate();
  const { userRole, signOut } = useAuth();

  // Helper function to handle menu clicks
  const handleMenuClick = (id: string) => {
    // Check if user has access to this section
    if (userRole && (userRole === 'admin' || sectionAccess[id]?.includes(userRole))) {
      setActiveSection(id);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Define which roles can access which sections based on requirements
  // Removed 'settings' and 'register' entries
  const sectionAccess: Record<string, UserRole[]> = {
    slider: ['admin', 'it', 'volunteer'],
    ministries: ['admin'],
    auth: ['admin', 'member', 'elder', 'it', 'volunteer'],
  };

  return (
    <div className="min-h-screen w-full">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar Component */}
          <AdminSidebar 
            userRole={userRole}
            activeSectionState={activeSectionState}
            handleMenuClick={handleMenuClick}
            handleSignOut={handleSignOut}
          />

          {/* Main content area with header and content */}
          <div className="flex flex-col flex-1">
            {/* Header Component */}
            <AdminHeader />

            {/* Content Component */}
            <AdminContent 
              activeSection={activeSectionState} 
              signUp={signOut} // Using signOut function
            />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
