import React from 'react';
import Layout from '@/components/Layout';
import Home from './Home';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();
  
  // If user is logged in, redirect to admin dashboard
  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }
  
  // Otherwise render the home page
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Index;
