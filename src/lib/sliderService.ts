
import { SlideImage } from '@/components/SliderManager';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Mock data for initial development
const mockSlides: SlideImage[] = [
  {
    id: '1',
    src: "/lovable-uploads/54e6cd73-6658-4990-b0c6-d369f39e1cb9.png",
    alt: "Ethiopian Evangelical Church worship service",
    title: "Welcome",
    subtitle: "to Ethiopian Evangelical Church in Finland",
    order: 1
  },
  {
    id: '2',
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    alt: "Serene mountain landscape",
    title: "Our Community",
    subtitle: "Join us in worship and fellowship",
    order: 2
  },
  {
    id: '3',
    src: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    alt: "Warm lights in forest",
    title: "Faith & Hope",
    subtitle: "Growing together in Christ",
    order: 3
  }
];

// Initialize Supabase client
// These will be replaced with actual values when Supabase is connected
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';

// Function to initialize Supabase client
const getSupabaseClient = () => {
  // This is a placeholder. In production, use environment variables or Supabase integration
  if (typeof window !== 'undefined') {
    try {
      return createClient(supabaseUrl, supabaseKey);
    } catch (error) {
      console.error('Error initializing Supabase client:', error);
      return null;
    }
  }
  return null;
};

/**
 * Fetch all slides from Supabase
 */
export const fetchSlides = async (): Promise<SlideImage[]> => {
  const supabase = getSupabaseClient();
  
  // If Supabase is not initialized, return mock data
  if (!supabase) {
    console.log('Using mock data for slides');
    return Promise.resolve([...mockSlides]);
  }

  try {
    // Fetch slides from Supabase, ordered by the order field
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching slides:', error);
    // Fallback to mock data in case of error
    return [...mockSlides];
  }
};

/**
 * Add a new slide to Supabase
 */
export const addSlide = async (slide: SlideImage, imageFile: File | null): Promise<SlideImage> => {
  const supabase = getSupabaseClient();
  
  // If Supabase is not initialized, simulate with mock data
  if (!supabase || !imageFile) {
    console.log('Using mock data for adding slide');
    const newSlide = {
      ...slide,
      id: uuidv4(),
      src: slide.src || URL.createObjectURL(imageFile as Blob),
    };
    mockSlides.push(newSlide);
    return Promise.resolve(newSlide);
  }

  try {
    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `slides/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    // Insert new slide record in Supabase
    const { data, error } = await supabase
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
  const supabase = getSupabaseClient();
  
  // If Supabase is not initialized, simulate with mock data
  if (!supabase) {
    console.log('Using mock data for updating slide');
    const index = mockSlides.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Slide not found');
    
    const updatedSlide = {
      ...mockSlides[index],
      ...slide,
      src: imageFile ? URL.createObjectURL(imageFile) : slide.src
    };
    mockSlides[index] = updatedSlide;
    return Promise.resolve(updatedSlide);
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
      const filePath = `slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      slideData.src = publicUrl;
    }

    // Update slide record in Supabase
    const { data, error } = await supabase
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
  const supabase = getSupabaseClient();
  
  // If Supabase is not initialized, simulate with mock data
  if (!supabase) {
    console.log('Using mock data for deleting slide');
    const index = mockSlides.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Slide not found');
    mockSlides.splice(index, 1);
    return Promise.resolve();
  }

  try {
    // Get the slide to find the image path
    const { data: slide, error: fetchError } = await supabase
      .from('slides')
      .select('src')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete the slide record
    const { error: deleteError } = await supabase
      .from('slides')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // If there's an image in storage, delete it too
    if (slide && slide.src) {
      // Extract the path from the URL
      const imagePath = slide.src.split('/').pop();
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove([`slides/${imagePath}`]);

        if (storageError) console.error('Error deleting image file:', storageError);
      }
    }
  } catch (error) {
    console.error('Error deleting slide:', error);
    throw error;
  }
};
