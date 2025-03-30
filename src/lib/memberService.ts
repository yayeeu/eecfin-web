
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member } from '@/types/database.types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development mode
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Yeteshawork Berhanu',
    phone: '+358 41 522 58 89',
    email: 'yeteshawork@example.com',
    role: 'Elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bruke Wolde',
    phone: '+358 45 168 2997',
    email: 'bruke@example.com',
    role: 'Elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Hizekiel Daniel',
    phone: '+358 44 986 9685',
    email: 'hizekiel@example.com',
    role: 'Elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mekbib Tekle',
    phone: '+358 44 08 22 798',
    email: 'mekbib@example.com',
    role: 'Elder',
    role_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tamirat Teshome',
    phone: '+358 44 351 4051',
    email: 'tamirat@example.com',
    role: 'Elder',
    role_id: '1',
    created_at: new Date().toISOString()
  }
];

export const getElderMembers = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elder members');
    return Promise.resolve(mockMembers);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, ministries(id, name), roles(id, name)')
    .eq('roles.name', 'Elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elder members:', error);
    throw error;
  }
  
  return data as Member[];
};

export const getMember = async (id: string) => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    const member = mockMembers.find(m => m.id === id);
    if (!member) {
      throw new Error('Member not found');
    }
    return Promise.resolve(member);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, ministries(id, name), roles(id, name)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching member:', error);
    throw error;
  }
  
  return data as Member;
};

export const createMember = async (member: Omit<Member, 'id' | 'created_at'>) => {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const newMember: Member = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      ...member
    };
    mockMembers.push(newMember);
    return Promise.resolve(newMember);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .insert(member)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating member:', error);
    throw error;
  }
  
  return data as Member;
};

export const updateMember = async (id: string, member: Partial<Omit<Member, 'id' | 'created_at'>>) => {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const index = mockMembers.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    const updatedMember = {
      ...mockMembers[index],
      ...member
    };
    mockMembers[index] = updatedMember;
    return Promise.resolve(updatedMember);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .update(member)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating member:', error);
    throw error;
  }
  
  return data as Member;
};

export const deleteMember = async (id: string) => {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    const index = mockMembers.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Member not found');
    }
    mockMembers.splice(index, 1);
    return Promise.resolve(true);
  }
  
  const { error } = await supabase!
    .from('members')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
  
  return true;
};
