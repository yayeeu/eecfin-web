
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member, MemberUnderElder } from '@/types/database.types';
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
    name: 'Bruke Wolde',
    phone: '+358 451682997',
    email: 'bruke@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Hizekiel Daniel',
    phone: '+358 449869685',
    email: 'hizekiel@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mekbib Tekle',
    phone: '+358 44 08 22 798',
    email: 'mekbib@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tamirat Teshome',
    phone: '+358 443514051',
    email: 'tamirat@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'John Doe',
    phone: '+358 45 123 4567',
    email: 'john@example.com',
    role: 'Member',
    role_id: '2',
    status: 'active',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    name: 'Jane Smith',
    phone: '+358 44 765 4321',
    email: 'jane@example.com',
    role: 'Volunteer',
    role_id: '4',
    status: 'inactive',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
];

// Mock data for elder assignments
const mockElderAssignments: MemberUnderElder[] = [
  {
    id: '1',
    member_id: '6',
    elder_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    member_id: '7',
    elder_id: '2',
    created_at: new Date().toISOString()
  }
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
    // Add assigned_elder property to mock members
    const membersWithElders = mockMembers.map(member => {
      const assignment = mockElderAssignments.find(a => a.member_id === member.id);
      if (assignment) {
        const elder = mockMembers.find(m => m.id === assignment.elder_id);
        return {
          ...member,
          assigned_elder: {
            ...assignment,
            elder
          }
        };
      }
      return member;
    });
    return Promise.resolve(membersWithElders);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select(`
      *, 
      roles(id, name),
      assigned_elder:member_under_elder!member_id(
        id,
        elder_id,
        elder:members!member_under_elder_elder_id_fkey(id, name)
      )
    `)
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
    
    // Add assigned elder information if available
    const assignment = mockElderAssignments.find(a => a.member_id === id);
    if (assignment) {
      const elder = mockMembers.find(m => m.id === assignment.elder_id);
      return Promise.resolve({
        ...member,
        assigned_elder: {
          ...assignment,
          elder
        }
      });
    }
    
    return Promise.resolve(member);
  }
  
  const { data, error } = await supabase!
    .from('members')
    .select(`
      *, 
      ministries(id, name), 
      roles(id, name),
      assigned_elder:member_under_elder!member_id(
        id,
        elder_id,
        elder:members!member_under_elder_elder_id_fkey(id, name)
      )
    `)
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

// Get elders for dropdown selects (used in ministry form)
export const getEldersForDropdown = async () => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for elders dropdown');
    return Promise.resolve(mockMembers
      .filter(m => m.role === 'Elder' && m.status === 'active')
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
    .eq('role', 'Elder')
    .eq('status', 'active')
    .order('name');
  
  if (error) {
    console.error('Error fetching elders for dropdown:', error);
    throw error;
  }
  
  return data;
};

// Functions for managing elder assignments

export const assignElderToMember = async (memberId: string, elderId: string) => {
  if (!isSupabaseConfigured()) {
    // First, check if there's an existing assignment
    const existingIndex = mockElderAssignments.findIndex(a => a.member_id === memberId);
    
    if (existingIndex !== -1) {
      // Update existing assignment
      mockElderAssignments[existingIndex].elder_id = elderId;
      return Promise.resolve(mockElderAssignments[existingIndex]);
    } else {
      // Create new assignment
      const newAssignment: MemberUnderElder = {
        id: uuidv4(),
        member_id: memberId,
        elder_id: elderId,
        created_at: new Date().toISOString()
      };
      mockElderAssignments.push(newAssignment);
      return Promise.resolve(newAssignment);
    }
  }
  
  // First check if an assignment already exists
  const { data: existingAssignment } = await supabase!
    .from('member_under_elder')
    .select('*')
    .eq('member_id', memberId)
    .maybeSingle();
  
  if (existingAssignment) {
    // Update existing assignment
    const { data, error } = await supabase!
      .from('member_under_elder')
      .update({ elder_id: elderId })
      .eq('member_id', memberId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating elder assignment:', error);
      throw error;
    }
    
    return data;
  } else {
    // Create new assignment
    const { data, error } = await supabase!
      .from('member_under_elder')
      .insert({
        member_id: memberId,
        elder_id: elderId
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating elder assignment:', error);
      throw error;
    }
    
    return data;
  }
};

export const removeElderAssignment = async (memberId: string) => {
  if (!isSupabaseConfigured()) {
    const index = mockElderAssignments.findIndex(a => a.member_id === memberId);
    if (index !== -1) {
      mockElderAssignments.splice(index, 1);
    }
    return Promise.resolve(true);
  }
  
  const { error } = await supabase!
    .from('member_under_elder')
    .delete()
    .eq('member_id', memberId);
  
  if (error) {
    console.error('Error removing elder assignment:', error);
    throw error;
  }
  
  return true;
};

export const getElderAssignment = async (memberId: string) => {
  if (!isSupabaseConfigured()) {
    const assignment = mockElderAssignments.find(a => a.member_id === memberId);
    if (!assignment) return Promise.resolve(null);
    
    const elder = mockMembers.find(m => m.id === assignment.elder_id);
    return Promise.resolve({
      ...assignment,
      elder
    });
  }
  
  const { data, error } = await supabase!
    .from('member_under_elder')
    .select(`
      *,
      elder:members!member_under_elder_elder_id_fkey(id, name, email, phone)
    `)
    .eq('member_id', memberId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching elder assignment:', error);
    throw error;
  }
  
  return data;
};
