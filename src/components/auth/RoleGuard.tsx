import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth.types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  isPublicRoute?: boolean;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles = [],
  redirectTo = '/',
  isPublicRoute = false,
}) => {
  const { user, loading, hasPermission, userRole } = useAuth();
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

  // For the auth section, redirect to admin if user is logged in
  if (currentPath === '/auth' && user) {
    return <Navigate to="/admin" replace />;
  }

  // Allow public routes to be accessed regardless of auth status
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, if the user is not authenticated, redirect to login
  if (!user) {
    console.log('User not authenticated, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  // Only check role permissions if allowedRoles is not empty
  if (allowedRoles.length > 0) {
    // If there are allowed roles but the user role is null, redirect
    if (!userRole) {
      console.log('User role not found, redirecting');
      return <Navigate to={redirectTo} replace />;
    }

    // If user doesn't have the required role, redirect
    if (!hasPermission(allowedRoles)) {
      console.log('User does not have required role:', allowedRoles, 'Current role:', userRole);
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default RoleGuard;
