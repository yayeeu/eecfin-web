
import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSidebar } from "./SidebarProvider"

// SidebarMenu
export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

// SidebarMenuItem
export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-item"
      className={cn("relative flex flex-col", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

// SidebarMenuBadge
export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-2 top-1/2 flex h-5 -translate-y-1/2 items-center justify-center rounded-full bg-sidebar-primary px-1.5 py-0.5 text-xs text-sidebar-primary-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuBadge.displayName = "SidebarMenuBadge"

// SidebarMenuButton variants
const sidebarMenuButtonVariants = cva(
  [
    "group flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm font-medium outline-none ring-sidebar-ring transition-colors focus-visible:ring-2",
    "[&>svg]:size-5 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        outline:
          "border border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// SidebarMenuButton
export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
    tooltip?: string | React.ReactNode
  }
>(
  (
    {
      className,
      asChild = false,
      isActive = false,
      variant,
      size,
      tooltip,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { state, open } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size, className }))}
        {...props}
      />
    )

    if (!tooltip || open) {
      return button
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center" sideOffset={8}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// SidebarMenuIcon
export const SidebarMenuIcon = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-icon"
      className={cn(
        "flex size-5 items-center justify-center transition-transform group-data-[active=true]:font-bold",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuIcon.displayName = "SidebarMenuIcon"

// SidebarMenuSub
export const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-sub"
      className={cn("ml-6 mt-1 flex flex-col gap-1", className)}
      {...props}
    />
  )
})
SidebarMenuSub.displayName = "SidebarMenuSub"

// SidebarMenuSubItem
export const SidebarMenuSubItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-sub-item"
      className={cn("relative flex flex-col", className)}
      {...props}
    />
  )
})
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

// SidebarMenuSubButton
export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
  }
>(({ className, asChild = false, isActive = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-active={isActive}
      className={cn(
        "group flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm font-medium outline-none ring-sidebar-ring transition-colors focus-visible:ring-2",
        "bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

// SidebarMenuSkeleton
export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { showIcon?: boolean }
>(({ className, showIcon = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-8 w-full animate-pulse items-center gap-2 px-2",
        className
      )}
      {...props}
    >
      {showIcon && (
        <div className="size-5 shrink-0 rounded bg-sidebar-accent/50" />
      )}
      <div className="h-4 flex-1 rounded bg-sidebar-accent/50" />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"
