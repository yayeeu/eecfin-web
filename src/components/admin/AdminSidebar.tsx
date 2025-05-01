
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Image, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { UserRole } from '@/types/auth.types';
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarGroup,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarFooter
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  userRole: UserRole | null;
  activeSectionState: string;
  handleMenuClick: (id: string) => void;
  handleSignOut: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  userRole,
  activeSectionState,
  handleMenuClick,
  handleSignOut
}) => {
  // Define which roles can access which sections based on requirements
  const sectionAccess: Record<string, UserRole[]> = {
    slider: ['admin', 'it', 'volunteer'],
    ministries: ['admin'],
    auth: ['admin', 'member', 'elder', 'it', 'volunteer'],
  };

  // Filter menu items based on user role - removed 'settings' and 'register' items
  const menuItems = [
    { id: 'slider', label: 'Slider Images', icon: Image, roles: ['admin', 'it', 'volunteer'] },
    { id: 'ministries', label: 'Ministries', icon: Users, roles: ['admin'] },
  ].filter(item => {
    // Admin can see everything, others only see what they have permission for
    if (userRole === 'admin') return true;
    return item.roles.includes(userRole as UserRole);
  });

  return (
    <Sidebar>
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2 py-4">
          <Image className="h-6 w-6 text-eecfin-navy" />
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
                    isActive={activeSectionState === item.id}
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
  );
};

export default AdminSidebar;
