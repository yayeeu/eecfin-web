import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
}) => {
  const { user, loading, userRole, hasPermission } = useAuth();

  // If we're still loading the auth state, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to login
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
