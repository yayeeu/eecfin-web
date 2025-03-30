
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// We'll use a development flag to check if we're in development mode
const isDevelopment = import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey);

if (isDevelopment) {
  console.warn('Running in development mode with mock data. Connect to Supabase for production data.');
} else if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Make sure to set the environment variables.');
}

export const supabase = isDevelopment 
  ? null // Return null in development mode when credentials are missing
  : createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};
