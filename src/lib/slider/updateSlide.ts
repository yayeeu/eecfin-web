
import { SlideImage } from './types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Update an existing slide in Supabase
 */
export const updateSlide = async (id: string, slide: SlideImage, imageFile: File | null): Promise<SlideImage> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables or Supabase integration.');
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
      // Check if the bucket exists first
      const { data: buckets, error: bucketsError } = await supabase!.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error checking buckets:', bucketsError);
        throw bucketsError;
      }
      
      const bucketExists = buckets.some(bucket => bucket.name === 'sliderImages');
      
      if (!bucketExists) {
        const { error: createError } = await supabase!.storage.createBucket('sliderImages', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        
        if (createError) {
          console.error('Error creating bucket:', createError);
          throw createError;
        }
      }

      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase!.storage
        .from('sliderImages')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw uploadError;
      }

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

    if (error) {
      console.error('Error updating slide data:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating slide:', error);
    throw error;
  }
};
