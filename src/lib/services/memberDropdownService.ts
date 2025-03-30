
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { mockMembers } from '@/lib/mockData/membersMockData';

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
