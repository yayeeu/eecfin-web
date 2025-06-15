
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
    .select('*, roles!inner(id, name)')
    .eq('roles.name', 'elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elder members:', error);
    throw error;
  }
  
  // Transform the data to match our Member type
  return (data || []).map(item => ({
    ...item,
    status: (item.status === 'active' || item.status === 'inactive') ? item.status : 'active',
    roles: item.roles ? {
      id: item.roles.id,
      name: item.roles.name as 'admin' | 'it' | 'member' | 'elder' | 'volunteer',
      created_at: new Date().toISOString() // Provide default created_at
    } : undefined
  })) as Member[];
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
        status: (m.status === 'active' || m.status === 'inactive') ? m.status : 'active'
      }))
    );
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('id, name, email, phone, status, roles!inner(name)')
    .eq('roles.name', 'elder')
    .eq('status', 'active')
    .order('name');
  
  if (error) {
    console.error('Error fetching elders for dropdown:', error);
    throw error;
  }
  
  // Transform the data to ensure proper typing
  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    status: (item.status === 'active' || item.status === 'inactive') ? item.status : 'active'
  }));
};
