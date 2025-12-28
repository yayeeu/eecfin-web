
import { SlideImage } from './types';
// TODO: Migrate to API endpoint instead of direct Supabase calls
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * Fetch all slides from Supabase
 * NOTE: This should be migrated to use the API instead
 */
export const fetchSlides = async (): Promise<SlideImage[]> => {
  try {
    if (!isSupabaseConfigured()) {
      console.log('Supabase is not configured for slides');
      return [];
    }

    // Fetch slides from Supabase, ordered by the order field
    const { data, error } = await supabase!
      .from('slides')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching slides:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching slides:', error);
    return [];
  }
};
