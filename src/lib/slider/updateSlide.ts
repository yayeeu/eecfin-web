
import { SlideImage } from './types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Update an existing slide in Supabase
 */
export const updateSlide = async (id: string, slide: SlideImage, imageFile: File | null): Promise<SlideImage> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  try {
    let slideData: any = {
      alt: slide.alt,
      title: slide.title,
      subtitle: slide.subtitle,
      order: slide.order
    };

    // If there's a new image, upload it and update the src
    if (imageFile) {
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

      slideData.src = publicUrl;
    }

    // Update slide record in Supabase
    const { data, error } = await supabase!
      .from('slides')
      .update(slideData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating slide:', error);
    throw error;
  }
};
