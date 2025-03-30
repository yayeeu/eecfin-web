
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminLink = () => {
  const { user } = useAuth();
  
  return (
    <Button variant="ghost" size="sm" asChild className="text-eecfin-gold hover:text-white">
      <Link to={user ? "/admin" : "/auth"} className="flex items-center gap-1">
        {user ? (
          <>
            <UserCircle className="h-4 w-4" />
            <span>Dashboard</span>
          </>
        ) : (
          <>
            <Settings className="h-4 w-4" />
            <span>Login</span>
          </>
        )}
      </Link>
    </Button>
  );
};

export default AdminLink;
