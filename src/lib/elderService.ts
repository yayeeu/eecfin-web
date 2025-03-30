
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member } from '@/types/database.types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development mode
const mockElders: Member[] = [
  {
    id: '1',
    name: 'Yeteshawork Berhanu',
    phone: '+358 41 522 58 89',
    email: 'yeteshawork@example.com',
    role: 'elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bruke Wolde',
    phone: '+358 45 168 2997',
    email: 'bruke@example.com',
    role: 'elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Hizekiel Daniel',
    phone: '+358 44 986 9685',
    email: 'hizekiel@example.com',
    role: 'elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mekbib Tekle',
    phone: '+358 44 08 22 798',
    email: 'mekbib@example.com',
    role: 'elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tamirat Teshome',
    phone: '+358 44 351 4051',
    email: 'tamirat@example.com',
    role: 'elder',
    role_id: '1',
    created_at: new Date().toISOString()
  }
];

export const getElders = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elders');
    return Promise.resolve(mockElders);
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
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    const elder = mockElders.find(e => e.id === id);
    if (!elder) {
      throw new Error('Elder not found');
    }
    return Promise.resolve(elder);
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
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const newElder: Member = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      ...elder
    };
    mockElders.push(newElder);
    return Promise.resolve(newElder);
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
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const index = mockElders.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Elder not found');
    }
    
    const updatedElder = {
      ...mockElders[index],
      ...elder
    };
    mockElders[index] = updatedElder;
    return Promise.resolve(updatedElder);
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
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const index = mockElders.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Elder not found');
    }
    mockElders.splice(index, 1);
    return Promise.resolve(true);
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
