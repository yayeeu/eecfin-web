
import { supabase } from '@/lib/supabaseClient';
import { Ministry } from '@/types/database.types';

export const getMinistries = async (activeOnly = false) => {
  let query = supabase
    .from('ministries')
    .select('*');
  
  if (activeOnly) {
    query = query.eq('status', 'active');
  }

  query = query.order('name');
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching ministries:', error);
    throw error;
  }
  
  return data as Ministry[];
};

export const getMinistry = async (id: string) => {
  const { data, error } = await supabase
    .from('ministries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching ministry:', error);
    throw error;
  }
  
  return data as Ministry;
};

export const createMinistry = async (ministry: Omit<Ministry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('ministries')
    .insert(ministry)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating ministry:', error);
    throw error;
  }
  
  return data as Ministry;
};

export const updateMinistry = async (id: string, ministry: Partial<Omit<Ministry, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase
    .from('ministries')
    .update(ministry)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating ministry:', error);
    throw error;
  }
  
  return data as Ministry;
};

export const deleteMinistry = async (id: string) => {
  const { error } = await supabase
    .from('ministries')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting ministry:', error);
    throw error;
  }
  
  return true;
};
