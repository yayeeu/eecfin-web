
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SliderManager from '@/components/slider/SliderManager';
import { Button } from "@/components/ui/button";
import { LogOut, User } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Admin = () => {
  const { user, profile, loading, signOut, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !hasRole('it'))) {
      toast({
        title: "Access denied",
        description: "You need IT role access to view this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [user, profile, loading, hasRole, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eecfin-navy"></div>
      </div>
    );
  }

  if (!user || !hasRole('it')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-eecfin-navy">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{profile?.name}</span>
                <span className="bg-eecfin-gold text-eecfin-navy px-2 py-1 rounded-full text-xs font-semibold">
                  {profile?.role?.toUpperCase()}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Slide Management
          </h2>
          <p className="text-gray-600">
            Manage the homepage slider images and content.
          </p>
        </div>
        
        <SliderManager />
      </main>
    </div>
  );
};

export default Admin;
