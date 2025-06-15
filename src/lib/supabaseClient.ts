
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
  console.log('Using integrated Supabase client because env variables are missing');
  supabase = integrationsSupabase;
} else {
  // Use the environment variables if available
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Export the client
export { supabase };

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  if (!supabase) {
    console.error('Supabase client is not defined');
    return false;
  }
  return true;
};

// Helper function to ensure a storage bucket exists
export const ensureStorageBucket = async (bucketName: string) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables or Supabase integration.');
  }

  try {
    // Check if the bucket exists
    const { data: buckets, error } = await supabase!.storage.listBuckets();
    
    if (error) {
      console.error(`Error checking buckets: ${error.message}`);
      throw error;
    }

    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase!.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (createError) {
        // If bucket creation fails, it might be due to RLS or the bucket already exists
        console.warn(`Warning creating bucket ${bucketName}: ${createError.message}`);
        // Continue execution anyway since the bucket might actually exist
      } else {
        console.log(`Created ${bucketName} bucket`);
      }
    }

    return true;
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName} exists:`, error);
    throw error;
  }
};
