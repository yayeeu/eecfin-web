
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member } from '@/types/database.types';

export const getElders = async () => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, ministries(id, name), roles(id, name)')
    .eq('roles.name', 'Elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elders:', error);
    throw error;
  }
  
  return data as Member[];
};

export const getElder = async (id: string) => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, ministries(id, name), roles(id, name)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching elder:', error);
    throw error;
  }
  
  return data as Member;
};

export const createElder = async (elder: Omit<Member, 'id' | 'created_at'>) => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  const { data, error } = await supabase!
    .from('members')
    .insert(elder)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating elder:', error);
    throw error;
  }
  
  return data as Member;
};

export const updateElder = async (id: string, elder: Partial<Omit<Member, 'id' | 'created_at'>>) => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  const { data, error } = await supabase!
    .from('members')
    .update(elder)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating elder:', error);
    throw error;
  }
  
  return data as Member;
};

export const deleteElder = async (id: string) => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  const { error } = await supabase!
    .from('members')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting elder:', error);
    throw error;
  }
  
  return true;
};
