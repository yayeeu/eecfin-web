import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Member, Role } from '@/types/database.types';
import { getRoleByName, updateMemberRole } from '@/lib/memberService';

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Signed in successfully',
            description: 'Welcome back!',
          });
          
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
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
        .select('*, roles(*)')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setUserProfile(data as Member);
      
      if (data) {
        let roleName: UserRole | null = null;
        
        if (data.roles?.name) {
          roleName = data.roles.name as UserRole;
        } else if (data.role) {
          roleName = data.role as UserRole;
        } else {
          roleName = 'member';
        }
        
        setUserRole(roleName);
        
        if (roleName && !data.role_id) {
          try {
            await updateMemberRole(userId, roleName);
          } catch (err) {
            console.error('Error updating member role ID:', err);
          }
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
            role: formData.role || 'member',
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
      
      if (data.role && data.role !== userProfile?.role) {
        try {
          await updateMemberRole(user.id, data.role as UserRole);
        } catch (err) {
          console.error('Error updating role:', err);
          throw err;
        }
      } else {
        const { error } = await supabase
          .from('members')
          .update(data)
          .eq('id', user.id);
        
        if (error) throw error;
      }
      
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

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    if (!userRole) return false;
    
    if (userRole === 'admin') return true;
    
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
