
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Settings, Home, LogOut, Users, User, BarChart, Image 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import SliderManager from '@/components/SliderManager';
import MinistryManager from '@/components/MinistryManager';
import ElderManager from '@/components/ElderManager';
import MemberManager from '@/components/MemberManager';
import Dashboard from '@/components/Dashboard';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import RoleGuard from '@/components/auth/RoleGuard';
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarFooter
} from "@/components/ui/sidebar";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const navigate = useNavigate();
  const { userRole, signOut } = useAuth();

  // Define which roles can access which sections
  const sectionAccess: Record<string, UserRole[]> = {
    dashboard: ['admin', 'member', 'elder', 'it'],
    slider: ['admin', 'it'],
    ministries: ['admin'],
    members: ['admin', 'elder'],
    settings: ['admin'],
  };

  // Filter menu items based on user role
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, roles: ['admin', 'member', 'elder', 'it'] },
    { id: 'slider', label: 'Slider Images', icon: Image, roles: ['admin', 'it'] },
    { id: 'ministries', label: 'Ministries', icon: Users, roles: ['admin'] },
    { id: 'members', label: 'All Members', icon: User, roles: ['admin', 'elder'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ].filter(item => {
    // Admin can see everything, others only see what they have permission for
    if (userRole === 'admin') return true;
    return item.roles.includes(userRole as UserRole);
  });

  const handleMenuClick = (id: string) => {
    // Check if user has access to this section
    if (userRole && (userRole === 'admin' || sectionAccess[id]?.includes(userRole))) {
      setActiveSection(id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <RoleGuard allowedRoles={['admin', 'member', 'elder', 'it']} redirectTo="/">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="px-2">
              <div className="flex items-center gap-2 py-4">
                <Settings className="h-6 w-6 text-eecfin-navy" />
                <span className="text-xl font-bold text-eecfin-navy">Admin Panel</span>
              </div>
              <Separator />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          isActive={activeSection === item.id}
                          onClick={() => handleMenuClick(item.id)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/">
                          <Home className="h-5 w-5" />
                          <span>Back to Website</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
              <SidebarMenuButton className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
                <span>Exit Admin</span>
              </SidebarMenuButton>
            </SidebarFooter>
          </Sidebar>

          {/* Main content area with header and content */}
          <div className="flex flex-col flex-1">
            {/* Church Logo Header */}
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

            {/* Content area */}
            <div className="flex-1 p-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-eecfin-navy">
                  {activeSection === 'dashboard' ? 'Church Dashboard' :
                   activeSection === 'slider' ? 'Manage Slider Images' : 
                   activeSection === 'ministries' ? 'Manage Ministries' :
                   activeSection === 'members' ? 'All Church Members' :
                   'Settings'}
                </h1>
                <p className="text-gray-500 mt-2">
                  {activeSection === 'dashboard'
                    ? 'Overview of church metrics, member statistics, and ministry activity.'
                    : activeSection === 'slider' 
                    ? 'Add, edit, or delete slider images displayed on the homepage.' 
                    : activeSection === 'ministries'
                    ? 'Add, edit, or delete ministry information displayed on the Get Involved page.'
                    : activeSection === 'members'
                    ? 'View all church members and their assigned roles.'
                    : 'Configure website settings.'}
                </p>
              </div>
              
              {activeSection === 'dashboard' && <Dashboard />}
              {activeSection === 'slider' && (
                <RoleGuard allowedRoles={['admin', 'it']} redirectTo="/admin">
                  <SliderManager />
                </RoleGuard>
              )}
              {activeSection === 'ministries' && (
                <RoleGuard allowedRoles={['admin']} redirectTo="/admin">
                  <MinistryManager />
                </RoleGuard>
              )}
              {activeSection === 'members' && (
                <RoleGuard allowedRoles={['admin', 'elder']} redirectTo="/admin">
                  <MemberManager />
                </RoleGuard>
              )}
              {activeSection === 'settings' && (
                <RoleGuard allowedRoles={['admin']} redirectTo="/admin">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
                    <p>Settings management will be implemented in a future update.</p>
                  </div>
                </RoleGuard>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </RoleGuard>
  );
};

export default Admin;
