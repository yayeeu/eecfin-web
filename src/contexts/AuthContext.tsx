
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Member } from '@/types/database.types';

// Define user roles
export type UserRole = 'admin' | 'it' | 'member' | 'elder';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: Member | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, formData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Member | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Signed in successfully',
            description: 'Welcome back!',
          });
          
          // Fetch user profile on sign in
          fetchUserProfile(newSession?.user?.id);
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

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch user profile for existing session
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const fetchUserProfile = async (userId: string | undefined) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*, roles(id, name)')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setUserProfile(data as Member);
      
      // Determine user role from profile data
      if (data) {
        const roleName = data.roles?.name?.toLowerCase() || data.role?.toLowerCase();
        if (roleName === 'admin') {
          setUserRole('admin');
        } else if (roleName === 'it') {
          setUserRole('it');
        } else if (roleName === 'elder') {
          setUserRole('elder');
        } else {
          setUserRole('member');
        }
      }
    } catch (error) {
      console.error('Error in fetch user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: formData.name,
            role: formData.role || 'member', // Default to member role
          },
        },
      });
      
      if (error) throw error;
      
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
      await supabase.auth.signOut();
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
      
      const { error } = await supabase
        .from('members')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user profile after update
      fetchUserProfile(user.id);
      
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

  // Helper function to check if user has permission based on role
  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!userRole) return false;
    
    // Admin always has permission to everything
    if (userRole === 'admin') return true;
    
    // Check if user's role is in the list of allowed roles
    return allowedRoles.includes(userRole);
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
