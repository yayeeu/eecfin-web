
# Sidebar Component Documentation

The sidebar component system is a flexible, customizable navigation solution for your application. It supports various layouts, collapsible states, and responsive designs.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Components Overview](#components-overview)
- [SidebarProvider](#sidebarprovider)
- [Sidebar](#sidebar)
- [SidebarComponents](#sidebarcomponents)
- [SidebarMenu](#sidebarmenu)
- [SidebarGroup](#sidebargroup)
- [Advanced Examples](#advanced-examples)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Customization](#customization)

## Installation

The sidebar components are already included in your project. You can import them directly from:

```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
```

## Basic Usage

Here's a basic example of how to set up a sidebar:

```tsx
import React from 'react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter 
} from "@/components/ui/sidebar";

const MyApp = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>My Application</SidebarHeader>
          <SidebarContent>
            {/* Sidebar content goes here */}
          </SidebarContent>
          <SidebarFooter>Version 1.0</SidebarFooter>
        </Sidebar>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MyApp;
```

## Components Overview

The sidebar system consists of multiple components that work together:

| Component | Description |
|-----------|-------------|
| `SidebarProvider` | Context provider that manages sidebar state |
| `Sidebar` | Main container for the sidebar |
| `SidebarHeader` | Header section of the sidebar |
| `SidebarContent` | Main content area of the sidebar |
| `SidebarFooter` | Footer section of the sidebar |
| `SidebarTrigger` | Button to toggle the sidebar |
| `SidebarRail` | Interactive rail for resizing the sidebar |
| `SidebarInput` | Styled input field for the sidebar |
| `SidebarSeparator` | Visual separator for the sidebar |
| `SidebarGroup` | Container for grouping sidebar items |
| `SidebarMenu` | Navigation menu container |
| `SidebarMenuItem` | Individual menu item |
| `SidebarMenuButton` | Interactive button for menu items |

## SidebarProvider

The `SidebarProvider` is required at the root level to manage the sidebar's state.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | boolean | `true` | Initial state of the sidebar |
| `open` | boolean | - | Controlled open state |
| `onOpenChange` | function | - | Callback when open state changes |

### Example

```tsx
<SidebarProvider defaultOpen={true}>
  {/* Your app content */}
</SidebarProvider>
```

## Sidebar

The main sidebar component that serves as a container.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | 'left' \| 'right' | 'left' | Side of the screen to display sidebar |
| `variant` | 'sidebar' \| 'floating' \| 'inset' | 'sidebar' | Visual style of the sidebar |
| `collapsible` | 'offcanvas' \| 'icon' \| 'none' | 'offcanvas' | Collapsing behavior |

### Example

```tsx
<Sidebar side="left" variant="floating" collapsible="icon">
  {/* Sidebar content */}
</Sidebar>
```

## SidebarComponents

These are utility components that help structure the sidebar.

### SidebarHeader

```tsx
<SidebarHeader className="px-4 py-2">
  <h2 className="text-lg font-bold">Dashboard</h2>
</SidebarHeader>
```

### SidebarContent

```tsx
<SidebarContent>
  {/* Main sidebar content */}
</SidebarContent>
```

### SidebarFooter

```tsx
<SidebarFooter className="p-2">
  <button className="w-full">Logout</button>
</SidebarFooter>
```

### SidebarTrigger

```tsx
<SidebarTrigger />
```

### SidebarSeparator

```tsx
<SidebarSeparator className="my-2" />
```

## SidebarMenu

A navigation menu system for the sidebar.

### Example

```tsx
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton asChild tooltip="Dashboard">
      <a href="/dashboard">
        <DashboardIcon />
        <span>Dashboard</span>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
  
  <SidebarMenuItem>
    <SidebarMenuButton isActive={true}>
      <SettingsIcon />
      <span>Settings</span>
    </SidebarMenuButton>
    <SidebarMenuBadge>New</SidebarMenuBadge>
  </SidebarMenuItem>
</SidebarMenu>
```

### SidebarMenuButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `asChild` | boolean | `false` | Render as child component (Link, etc.) |
| `isActive` | boolean | `false` | Whether the menu item is active |
| `tooltip` | string \| object | - | Tooltip to show when sidebar is collapsed |
| `variant` | 'default' \| 'outline' | 'default' | Visual style |
| `size` | 'default' \| 'sm' \| 'lg' | 'default' | Size of the button |

## SidebarGroup

Groups related sidebar elements together.

### Example

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      {/* Menu items */}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
```

## Advanced Examples

### Sidebar with Nested Menu Items

```tsx
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>
      <FolderIcon />
      <span>Projects</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
  
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton isActive={true}>
        <span>Project Alpha</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
    
    <SidebarMenuSubItem>
      <SidebarMenuSubButton>
        <span>Project Beta</span>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenu>
```

### Sidebar with Actions

```tsx
<SidebarGroup>
  <SidebarGroupLabel>Projects</SidebarGroupLabel>
  <SidebarGroupAction>
    <PlusIcon />
  </SidebarGroupAction>
  <SidebarGroupContent>
    {/* Content */}
  </SidebarGroupContent>
</SidebarGroup>
```

### Loading State with Skeletons

```tsx
<SidebarMenu>
  <SidebarMenuSkeleton showIcon={true} />
  <SidebarMenuSkeleton showIcon={true} />
  <SidebarMenuSkeleton showIcon={true} />
</SidebarMenu>
```

## Keyboard Shortcuts

The sidebar includes a built-in keyboard shortcut to toggle its visibility:

- `Ctrl+B` (Windows/Linux) or `Cmd+B` (Mac)

## Customization

The sidebar components use Tailwind CSS classes and can be customized by passing className props to any component. Additionally, the sidebar respects the following CSS variables:

- `--sidebar-width` (default: `16rem`)
- `--sidebar-width-icon` (default: `3rem`)
- `--sidebar-width-mobile` (default: `18rem`)

You can override these in your CSS or inline styles:

```tsx
<SidebarProvider style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
  {/* Your app */}
</SidebarProvider>
```

### Theme Customization

The sidebar uses the following Tailwind CSS colors that you can customize in your `tailwind.config.ts`:

- `bg-sidebar`
- `text-sidebar-foreground`
- `border-sidebar-border`
- `bg-sidebar-accent`
- `text-sidebar-accent-foreground`
- `ring-sidebar-ring`

## Real-World Example: Admin Sidebar

Here's how we implement the admin sidebar in this application:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Home, Settings, BarChart, Image, Users, User, Lock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { UserRole } from '@/types/auth.types';
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarGroup,
  SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarFooter
} from "@/components/ui/sidebar";

const AdminSidebar = ({ 
  userRole, 
  activeSectionState, 
  handleMenuClick, 
  handleSignOut 
}) => {
  // Define menu items based on user role permissions
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, roles: ['admin', 'elder'] },
    { id: 'slider', label: 'Slider Images', icon: Image, roles: ['admin', 'it', 'volunteer'] },
    // ... more items
  ].filter(item => {
    if (userRole === 'admin') return true;
    return item.roles.includes(userRole as UserRole);
  });

  return (
    <Sidebar>
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2 py-4">
          <Settings className="h-6 w-6" />
          <span className="text-xl font-bold">Admin Panel</span>
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
```
