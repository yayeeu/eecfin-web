
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Role } from '@/types/database.types';
import { UserRole } from '@/types/auth.types';

// Mock data for development mode
const mockRoles: Role[] = [
  { id: '1', created_at: new Date().toISOString(), name: 'admin' },
  { id: '2', created_at: new Date().toISOString(), name: 'it' },
  { id: '3', created_at: new Date().toISOString(), name: 'elder' },
  { id: '4', created_at: new Date().toISOString(), name: 'member' },
  { id: '5', created_at: new Date().toISOString(), name: 'volunteer' },
];

// Get all roles
export const getAllRoles = async (): Promise<Role[]> => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log('Using mock data for roles');
    return Promise.resolve(mockRoles);
  }
  
  const { data, error } = await supabase!
    .from('roles')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
  
  return data as Role[];
};

// Get role by name
export const getRoleByName = async (name: string): Promise<Role | null> => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log(`Using mock data for role: ${name}`);
    const role = mockRoles.find(r => r.name === name);
    return Promise.resolve(role || null);
  }
  
  const { data, error } = await supabase!
    .from('roles')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error(`Error fetching role by name ${name}:`, error);
    throw error;
  }
  
  return data as Role;
};

// Get role by ID
export const getRoleById = async (id: string): Promise<Role | null> => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log(`Using mock data for role ID: ${id}`);
    const role = mockRoles.find(r => r.id === id);
    return Promise.resolve(role || null);
  }
  
  const { data, error } = await supabase!
    .from('roles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error(`Error fetching role by ID ${id}:`, error);
    throw error;
  }
  
  return data as Role;
};

// Update member's role
export const updateMemberRole = async (memberId: string, roleName: UserRole): Promise<boolean> => {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.log(`Using mock data to update member ${memberId} with role ${roleName}`);
    return Promise.resolve(true);
  }
  
  // First, get the role ID
  const { data: roleData, error: roleError } = await supabase!
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .single();
  
  if (roleError) {
    console.error(`Error fetching role ID for ${roleName}:`, roleError);
    throw roleError;
  }
  
  // Update the member with the role ID
  const { error } = await supabase!
    .from('members')
    .update({ 
      role: roleName,
      role_id: roleData.id 
    })
    .eq('id', memberId);
  
  if (error) {
    console.error(`Error updating member ${memberId} with role ${roleName}:`, error);
    throw error;
  }
  
  return true;
};
