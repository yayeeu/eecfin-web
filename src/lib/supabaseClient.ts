
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { supabase as integrationsSupabase } from "@/integrations/supabase/client";

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// We'll use a development flag to check if we're in development mode
const isDevelopment = import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey);

// If we don't have valid environment variables, use the integrated client
// This allows development without setting up environment variables
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase URL or Anon Key. Using integrated Supabase client.');
  supabase = integrationsSupabase;
} else {
  // Use the environment variables if available
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Export the client
export { supabase };

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey;
};
