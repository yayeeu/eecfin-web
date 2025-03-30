
import { User, Session } from '@supabase/supabase-js';
import { Member } from './database.types';

// Define user roles
export type UserRole = 'admin' | 'it' | 'member' | 'elder' | 'volunteer';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: Member | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, formData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
}
