
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/database.types';
import { UserRole } from '@/types/auth.types';
import { updateMemberRole } from '@/lib/memberService';

export const fetchUserProfile = async (userId: string | undefined): Promise<{
  profile: Member | null;
  role: UserRole | null;
}> => {
  if (!userId) return { profile: null, role: null };
  
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*, roles(*)')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return { profile: null, role: null };
    }
    
    const profile = data as Member;
    let roleName: UserRole | null = null;
    
    if (profile) {
      if (profile.roles?.name) {
        roleName = profile.roles.name as UserRole;
      } else if (profile.role) {
        roleName = profile.role as UserRole;
      } else {
        roleName = 'member';
      }
      
      if (roleName && !profile.role_id) {
        try {
          await updateMemberRole(userId, roleName);
        } catch (err) {
          console.error('Error updating member role ID:', err);
        }
      }
    }
    
    return { profile, role: roleName };
  } catch (error) {
    console.error('Error in fetch user profile:', error);
    return { profile: null, role: null };
  }
};

export const hasPermission = (userRole: UserRole | null, allowedRoles: UserRole[]): boolean => {
  if (!userRole) return false;
  
  if (userRole === 'admin') return true;
  
  return allowedRoles.includes(userRole);
};
