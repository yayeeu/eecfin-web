
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  isPublicRoute?: boolean;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
  isPublicRoute = false,
}) => {
  const { user, loading, hasPermission } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // If we're still loading the auth state, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // For the auth section, we don't need to check if user is authenticated
  if (currentPath === '/auth') {
    return <>{children}</>;
  }

  // Allow public routes to be accessed regardless of auth status
  if (isPublicRoute) {
    // If user is logged in and visiting the home page, redirect to admin
    if (user && currentPath === '/') {
      return <Navigate to="/admin" replace />;
    }
    return <>{children}</>;
  }

  // For protected routes, if the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user doesn't have the required role, redirect
  if (!hasPermission(allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default RoleGuard;
