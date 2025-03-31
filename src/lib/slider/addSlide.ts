
import { SlideImage } from './types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Add a new slide to Supabase
 */
export const addSlide = async (slide: SlideImage, imageFile: File | null): Promise<SlideImage> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  if (!imageFile) {
    throw new Error('Image file is required');
  }

  try {
    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase!.storage
      .from('sliderImages')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded image
    const { data: { publicUrl } } = supabase!.storage
      .from('sliderImages')
      .getPublicUrl(filePath);

    // Insert new slide record in Supabase
    const { data, error } = await supabase!
      .from('slides')
      .insert([
        { 
          src: publicUrl,
          alt: slide.alt,
          title: slide.title,
          subtitle: slide.subtitle,
          order: slide.order 
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding slide:', error);
    throw error;
  }
};
