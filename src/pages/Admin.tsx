
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, 
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, 
  SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Image, Settings, Home, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import SliderManager from '@/components/SliderManager';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>('slider');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'slider', label: 'Slider Images', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
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
            <SidebarMenuButton className="w-full justify-start" onClick={() => navigate('/')}>
              <LogOut className="h-5 w-5" />
              <span>Exit Admin</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-eecfin-navy">
              {activeSection === 'slider' ? 'Manage Slider Images' : 'Settings'}
            </h1>
            <p className="text-gray-500 mt-2">
              {activeSection === 'slider' 
                ? 'Add, edit, or delete slider images displayed on the homepage.' 
                : 'Configure website settings.'}
            </p>
          </div>
          
          {activeSection === 'slider' && <SliderManager />}
          {activeSection === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
              <p>Settings management will be implemented in a future update.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
