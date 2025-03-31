
import { SlideImage } from '@/components/SliderManager';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetch all slides from Supabase
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
