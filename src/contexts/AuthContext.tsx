
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Member } from '@/types/database.types';
import { AuthContextType, UserRole } from '@/types/auth.types';
import { fetchUserProfile, hasPermission as checkPermission } from '@/utils/authUtils';
import { 
  signInWithEmailAndPassword, 
  signUpWithEmailAndPassword, 
  signOutUser,
  updateUserProfile
} from '@/services/authService';
import { updateMemberRole } from '@/lib/memberService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Member | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Signed in successfully',
            description: 'Welcome back! Redirecting to admin dashboard...',
          });
          
          if (newSession?.user?.id) {
            setTimeout(() => {
              loadUserProfile(newSession.user.id);
            }, 0);
          }
          
          const currentPath = window.location.pathname;
          if (currentPath === '/auth' || currentPath === '/') {
            window.location.href = '/admin';
          }
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setUserRole(null);
          toast({
            title: 'Signed out successfully',
            description: 'You have been logged out.',
          });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const loadUserProfile = async (userId: string) => {
    const { profile, role } = await fetchUserProfile(userId);
    setUserProfile(profile);
    setUserRole(role);
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, formData: any) => {
    try {
      await signUpWithEmailAndPassword(email, password, formData);
      
      toast({
        title: 'Account created successfully',
        description: 'Please check your email for a confirmation link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      if (data.role && data.role !== userProfile?.role) {
        try {
          await updateMemberRole(user.id, data.role as UserRole);
        } catch (err) {
          console.error('Error updating role:', err);
          throw err;
        }
      } else {
        await updateUserProfile(user.id, data);
      }
      
      loadUserProfile(user.id);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    return checkPermission(userRole, allowedRoles);
  };

  const value = {
    user,
    userProfile,
    userRole,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { UserRole };
