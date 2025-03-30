
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuthHeader = () => {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto mb-4">
        <img 
          src="/lovable-uploads/010ebde5-605e-4cfe-b2cc-1caacf7c5734.png" 
          alt="EECFIN Logo" 
          className="h-16 object-contain mx-auto"
        />
      </div>
      <CardTitle className="text-2xl text-eecfin-navy">Welcome to EECFIN</CardTitle>
      <CardDescription>Sign in or create an account to access the admin dashboard</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
