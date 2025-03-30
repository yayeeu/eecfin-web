
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import AuthHeader from '@/components/auth/AuthHeader';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (user && !loading) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="container flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-eecfin-navy shadow-lg">
          <AuthHeader />
          
          <CardContent>
            <LoginForm onSubmit={signIn} />
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild className="mt-4">
              <a href="/" className="text-eecfin-navy hover:text-eecfin-gold">
                Back to Homepage
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
