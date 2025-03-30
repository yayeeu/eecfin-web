
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminLink = () => {
  const { user } = useAuth();
  
  const targetRoute = user ? "/admin" : "/auth";
  
  return (
    <Button variant="ghost" size="sm" asChild className="text-eecfin-gold hover:text-white">
      <Link to={targetRoute} className="flex items-center gap-1">
        <Settings className="h-4 w-4" />
        <span>Admin</span>
      </Link>
    </Button>
  );
};

export default AdminLink;
