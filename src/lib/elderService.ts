
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
    .eq('role', 'elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elders:', error);
    throw error;
  }
  
  // Type-safe conversion
  return (data || []).map(item => ({
    ...item,
    roles: item.roles ? {
      ...item.roles,
      created_at: item.roles.created_at || new Date().toISOString()
    } : undefined
  })) as Member[];
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
  
  // Type-safe conversion
  const result = {
    ...data,
    roles: data.roles ? {
      ...data.roles,
      created_at: data.roles.created_at || new Date().toISOString()
    } : undefined
  } as Member;
  
  return result;
};

export const createElder = async (elder: Omit<Member, 'id' | 'created_at'>) => {
  if (!isSupabaseConfigured()) {
    console.error('Supabase is not configured.');
    throw new Error('Database connection not available');
  }
  
  // First, get the role ID for 'elder'
  const { data: roleData, error: roleError } = await supabase!
    .from('roles')
    .select('id')
    .eq('name', 'elder')
    .single();
  
  if (roleError) {
    console.error('Error fetching elder role:', roleError);
    throw roleError;
  }
  
  // Convert children_names to number if it's a string
  const normalizedElder = {
    ...elder,
    role: 'elder',
    role_id: roleData.id,
    status: elder.status || 'active',
    children_names: typeof elder.children_names === 'string' 
      ? parseInt(elder.children_names, 10) || 0 
      : elder.children_names || 0
  };
  
  // Remove properties that don't exist in the database schema
  const { ministries, roles, assigned_elder, ministry_assignments, ...dbElder } = normalizedElder;
  
  const { data, error } = await supabase!
    .from('members')
    .insert(dbElder)
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
  
  // If changing role to elder, get the elder role ID
  if (elder.role === 'elder') {
    const { data: roleData, error: roleError } = await supabase!
      .from('roles')
      .select('id')
      .eq('name', 'elder')
      .single();
    
    if (roleError) {
      console.error('Error fetching elder role:', roleError);
      throw roleError;
    }
    
    // Add the role_id to the update data
    elder.role_id = roleData.id;
  }
  
  // Convert children_names to number if it's a string
  const normalizedElder = {
    ...elder,
    children_names: typeof elder.children_names === 'string' 
      ? parseInt(elder.children_names, 10) || 0 
      : elder.children_names
  };
  
  // Remove properties that don't exist in the database schema
  const { ministries, roles, assigned_elder, ministry_assignments, ...dbElder } = normalizedElder;
  
  const { data, error } = await supabase!
    .from('members')
    .update(dbElder)
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

// Function to get mock elders - used when database is not available
export const getMockElders = () => {
  return [
    {
      id: '1',
      name: 'Yeteshawork Berhanu',
      phone: '+358 41 522 58 89',
      email: 'yeteshawork.berhanu@example.com',
      role: 'elder',
      status: 'active'
    },
    {
      id: '2',
      name: 'Bruke Wolde',
      phone: '+358 451682997',
      email: 'bruke.wolde@example.com',
      role: 'elder',
      status: 'active'
    },
    {
      id: '3',
      name: 'Hizekiel Daniel',
      phone: '+358 449869685',
      email: 'hizekiel.daniel@example.com',
      role: 'elder',
      status: 'active'
    },
    {
      id: '4',
      name: 'Mekbib Tekle',
      phone: '+358 44 08 22 798',
      email: 'mekbib.tekle@example.com',
      role: 'elder',
      status: 'active'
    },
    {
      id: '5',
      name: 'Tamirat Teshome',
      phone: '+358 443514051',
      email: 'tamirat.teshome@example.com',
      role: 'elder',
      status: 'active'
    }
  ] as Member[];
};

// Update the getElders function to use mock data when database is not available
export const getAllElders = async () => {
  try {
    if (!isSupabaseConfigured()) {
      console.log('Using mock elder data');
      return getMockElders();
    }
    
    return await getElders();
  } catch (error) {
    console.error('Error in getAllElders, falling back to mock data:', error);
    return getMockElders();
  }
};
