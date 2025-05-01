
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member } from '@/types/database.types';
import { mockMembers } from '@/lib/mockData/membersMockData';

export const getElderMembers = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elder members');
    return Promise.resolve(mockMembers.filter(m => m.role === 'elder'));
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, roles(id, name), ministries!members_ministry_id_fkey(id, name)')
    .eq('roles.name', 'elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elder members:', error);
    throw error;
  }
  
  return data as Member[];
};

// Get elders for dropdown selects (used in ministry form)
export const getEldersForDropdown = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elders dropdown');
    return Promise.resolve(mockMembers
      .filter(m => m.role === 'elder' && m.status === 'active')
      .map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        status: m.status
      }))
    );
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('id, name, email, phone, status')
    .eq('roles.name', 'elder')
    .eq('status', 'active')
    .order('name');
  
  if (error) {
    console.error('Error fetching elders for dropdown:', error);
    throw error;
  }
  
  return data;
};
