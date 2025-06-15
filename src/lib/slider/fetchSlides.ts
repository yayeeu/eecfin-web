
import { SlideImage } from './types';
import { supabase } from '@/lib/supabaseClient';

/**
 * Fetch all slides from Supabase
 */
export const fetchSlides = async (): Promise<SlideImage[]> => {
  try {
    console.log('Fetching slides from Supabase...');

    // Fetch slides from Supabase, ordered by the order field
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching slides:', error);
      // Don't throw error, return empty array to allow app to continue
      return [];
    }
    
    console.log(`Successfully fetched ${data?.length || 0} slides`);
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching slides:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};
