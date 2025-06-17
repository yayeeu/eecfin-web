import { supabase } from '@/lib/supabaseClient';
import { Ministry as DBMinistry } from '@/types/database.types';

// Export the Ministry type so it can be imported in other files
export type Ministry = DBMinistry;

export const getMinistries = async (activeOnly = false) => {
  try {
    let query = supabase
      .from('ministries')
      .select('*, contact_elder:members!ministries_contact_person_id_fkey(id, name, email, phone)');
    
    if (activeOnly) {
      query = query.eq('status', 'active');
    }

    query = query.order('name');
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching ministries:', error);
      throw new Error('Unable to load ministries. Please try again later.');
    }
    
    return data as Ministry[];
  } catch (error) {
    console.error('Error in getMinistries:', error);
    throw new Error('Failed to load ministries. Please check your connection and try again.');
  }
};

export const getMinistry = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .select('*, contact_elder:members!ministries_contact_person_id_fkey(id, name, email, phone)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching ministry:', error);
      throw new Error('Unable to load ministry details. Please try again later.');
    }
    
    if (!data) {
      throw new Error('Ministry not found.');
    }
    
    return data as Ministry;
  } catch (error) {
    console.error('Error in getMinistry:', error);
    throw new Error('Failed to load ministry details. Please check your connection and try again.');
  }
};

export const createMinistry = async (ministry: Omit<Ministry, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .insert(ministry)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating ministry:', error);
      throw new Error('Unable to create ministry. Please try again later.');
    }
    
    return data as Ministry;
  } catch (error) {
    console.error('Error in createMinistry:', error);
    throw new Error('Failed to create ministry. Please check your connection and try again.');
  }
};

export const updateMinistry = async (id: string, ministry: Partial<Omit<Ministry, 'id' | 'created_at'>>) => {
  try {
    const { data, error } = await supabase
      .from('ministries')
      .update(ministry)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating ministry:', error);
      throw new Error('Unable to update ministry. Please try again later.');
    }
    
    if (!data) {
      throw new Error('Ministry not found.');
    }
    
    return data as Ministry;
  } catch (error) {
    console.error('Error in updateMinistry:', error);
    throw new Error('Failed to update ministry. Please check your connection and try again.');
  }
};

export const deleteMinistry = async (id: string) => {
  try {
    const { error } = await supabase
      .from('ministries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting ministry:', error);
      throw new Error('Unable to delete ministry. Please try again later.');
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteMinistry:', error);
    throw new Error('Failed to delete ministry. Please check your connection and try again.');
  }
};
