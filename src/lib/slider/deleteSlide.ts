
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * Delete a slide from Supabase
 */
export const deleteSlide = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  try {
    // Get the slide to find the image path
    const { data: slide, error: fetchError } = await supabase!
      .from('slides')
      .select('src')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the slide record
    const { error: deleteError } = await supabase!
      .from('slides')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // If there's an image in storage, delete it too
    if (slide && slide.src) {
      // Extract the filename from the URL
      const urlParts = slide.src.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        const { error: storageError } = await supabase!.storage
          .from('sliderImages')
          .remove([fileName]);

        if (storageError) console.error('Error deleting image file:', storageError);
      }
    }
  } catch (error) {
    console.error('Error deleting slide:', error);
    throw error;
  }
};
