
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
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'John Doe',
    phone: '+358 45 123 4567',
    email: 'john@example.com',
    role: 'Member',
    role_id: '2',
    status: 'active',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Jane Smith',
    phone: '+358 44 765 4321',
    email: 'jane@example.com',
    role: 'Volunteer',
    role_id: '4',
    status: 'inactive',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
];

export const getElderMembers = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elder members');
    return Promise.resolve(mockMembers.filter(m => m.role === 'Elder'));
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, ministries(id, name), roles(id, name)')
    .eq('role', 'Elder')
    .order('name');
  
  if (error) {
    console.error('Error fetching elder members:', error);
    throw error;
  }
  
  return data as Member[];
};

export const getAllMembers = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for all members');
    return Promise.resolve(mockMembers);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('*, roles(id, name)')
    .order('name');
  
  if (error) {
    console.error('Error fetching all members:', error);
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

// Get members for dropdown selects (used in ministry form)
export const getMembersForDropdown = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for members dropdown');
    return Promise.resolve(mockMembers
      .filter(m => m.status === 'active')
      .map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        status: m.status // Make sure to include status in the returned data
      }))
    );
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select('id, name, email, status') // Include status in the select query
    .eq('status', 'active')
    .order('name');
  
  if (error) {
    console.error('Error fetching members for dropdown:', error);
    throw error;
  }
  
  return data;
};
