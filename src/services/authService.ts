
import { supabase } from '@/integrations/supabase/client';

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return true;
};

export const signUpWithEmailAndPassword = async (email: string, password: string, userData: any) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        role: userData.role || 'member',
      },
    },
  });
  
  if (error) throw error;
  return true;
};

export const signOutUser = async () => {
  await supabase.auth.signOut();
};

export const updateUserProfile = async (userId: string, data: any) => {
  const { error } = await supabase
    .from('members')
    .update(data)
    .eq('id', userId);
  
  if (error) throw error;
  return true;
};
