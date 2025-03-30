
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Member, MemberUnderElder } from '@/types/database.types';
import { v4 as uuidv4 } from 'uuid';
import { mockMembers, mockElderAssignments } from '@/lib/mockData/membersMockData';

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

// Get members assigned to a specific elder
export const getMembersByElderId = async (elderId: string) => {
  if (!isSupabaseConfigured()) {
    // Return mock data filtered by elder ID
    const assignedMemberIds = mockElderAssignments
      .filter(a => a.elder_id === elderId)
      .map(a => a.member_id);
    
    return mockMembers.filter(m => assignedMemberIds.includes(m.id));
  }
  
  const { data, error } = await supabase!
    .from('member_under_elder')
    .select(`
      member_id,
      member:members!member_under_elder_member_id_fkey(
        id, name, email, phone, role, status, image, 
        created_at, address, gender, marital_status
      )
    `)
    .eq('elder_id', elderId);
  
  if (error) {
    console.error('Error fetching members assigned to elder:', error);
    throw error;
  }
  
  // Transform the data structure to return just the member objects
  return data.map(item => item.member) as unknown as Member[];
};
