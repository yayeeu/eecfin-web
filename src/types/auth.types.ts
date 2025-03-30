
export type UserRole = 'admin' | 'it' | 'member' | 'elder' | 'volunteer';

export interface AuthContextType {
  user: any;
  userProfile: any;
  userRole: UserRole | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, formData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  hasPermission: (allowedRoles: UserRole[]) => boolean;
}
