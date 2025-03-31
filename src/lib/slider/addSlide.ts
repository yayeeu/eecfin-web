
import { SlideImage } from './types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Ensure the sliderImages bucket exists
 */
const ensureStorageBucket = async () => {
  try {
    // Check if the bucket exists
    const { data: buckets, error } = await supabase!.storage.listBuckets();
    
    if (error) {
      console.error('Error checking buckets:', error);
      throw error;
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'sliderImages');
    
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase!.storage.createBucket('sliderImages', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        throw createError;
      }
      
      console.log('Created sliderImages bucket');
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
    throw error;
  }
};

/**
 * Add a new slide to Supabase
 */
export const addSlide = async (slide: SlideImage, imageFile: File | null): Promise<SlideImage> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please check your environment variables or Supabase integration.');
  }

  if (!imageFile) {
    throw new Error('Image file is required');
  }

  try {
    // Ensure the storage bucket exists
    await ensureStorageBucket();
    
    // Upload image to Supabase Storage
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

    if (error) {
      console.error('Error inserting slide data:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error adding slide:', error);
    throw error;
  }
};
