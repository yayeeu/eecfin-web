
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Ministry } from '@/types/database.types';

// Mock data for development mode
const mockMemberMinistries: Record<string, string[]> = {};

// Get ministries for a member
export const getMemberMinistries = async (memberId: string) => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for member ministries');
    return Promise.resolve(mockMemberMinistries[memberId] || []);
  }
  
  const { data, error } = await supabase!
    .from('member_ministry')
    .select('ministry_id, ministries(id, name, description, status)')
    .eq('member_id', memberId);
  
  if (error) {
    console.error('Error fetching member ministries:', error);
    throw error;
  }
  
  return data.map(item => item.ministries) as Ministry[];
};

// Assign ministry to member
export const assignMinistryToMember = async (memberId: string, ministryId: string) => {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    if (!mockMemberMinistries[memberId]) {
      mockMemberMinistries[memberId] = [];
    }
    
    if (!mockMemberMinistries[memberId].includes(ministryId)) {
      mockMemberMinistries[memberId].push(ministryId);
    }
    
    return Promise.resolve(true);
  }
  
  // Check if the assignment already exists
  const { data: existingAssignment, error: checkError } = await supabase!
    .from('member_ministry')
    .select('id')
    .eq('member_id', memberId)
    .eq('ministry_id', ministryId)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the "no rows returned" error
    console.error('Error checking ministry assignment:', checkError);
    throw checkError;
  }
  
  // If the assignment already exists, return early
  if (existingAssignment) {
    return true;
  }
  
  // Create the assignment
  const { error } = await supabase!
    .from('member_ministry')
    .insert({
      member_id: memberId,
      ministry_id: ministryId
    });
  
  if (error) {
    console.error('Error assigning ministry to member:', error);
    throw error;
  }
  
  return true;
};

// Remove ministry from member
export const removeMinistryFromMember = async (memberId: string, ministryId: string) => {
  // If Supabase is not configured, use mock data
  if (!isSupabaseConfigured()) {
    if (mockMemberMinistries[memberId]) {
      mockMemberMinistries[memberId] = mockMemberMinistries[memberId].filter(id => id !== ministryId);
    }
    
    return Promise.resolve(true);
  }
  
  const { error } = await supabase!
    .from('member_ministry')
    .delete()
    .eq('member_id', memberId)
    .eq('ministry_id', ministryId);
  
  if (error) {
    console.error('Error removing ministry from member:', error);
    throw error;
  }
  
  return true;
};

// Get members for a ministry
export const getMembersByMinistryId = async (ministryId: string) => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for ministry members');
    
    // Create an array of member IDs that have this ministry
    const memberIds = Object.entries(mockMemberMinistries)
      .filter(([_, ministryIds]) => ministryIds.includes(ministryId))
      .map(([memberId, _]) => memberId);
    
    return Promise.resolve(memberIds);
  }
  
  const { data, error } = await supabase!
    .from('member_ministry')
    .select('member_id')
    .eq('ministry_id', ministryId);
  
  if (error) {
    console.error('Error fetching ministry members:', error);
    throw error;
  }
  
  return data.map(item => item.member_id);
};
