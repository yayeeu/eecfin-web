/**
 * Main slider service file that re-exports all slider-related functionality
 */
export interface SlideImage {
  id: string;
  src: string;
  alt: string;
  overlay?: {
    title: string;
    subtitle: string;
  };
  order: number;
}

// Function to format filename into a readable string
const formatFileName = (fileName: string): string => {
  // Remove file extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  // Replace underscores and hyphens with spaces
  const withSpaces = nameWithoutExt.replace(/[_-]/g, " ");
  // Capitalize first letter of each word
  return withSpaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const fetchSlides = async (): Promise<SlideImage[]> => {
  try {
    // Since we can't directly read the directory in the browser,
    // we'll use a predefined list of images from the public folder
    const slides = [
      {
        fileName: 'focus_on_jesus.png',
        overlay: {
          title: "Focus on Jesus 2025",
          subtitle: " @ Ethiopian Evangelical Church in Finland"
        }
      },
      {
        fileName: 'slide1.jpg',
        overlay: {
          title: "እንኳን ደና መጡ  | Welcome  | Tervetuloa,",
          subtitle: "የኢትዮጲያ ወንጌላዊት ቤተክርስቲያን በፊንላንድ  | Ethiopian Evangelical Church in Finland"
        }
      },
      {
        fileName: 'YouthCover.jpg',
        overlay: {
          title: "በጸሎት ጽኑ",
          subtitle: " - ሮሜ 12:12"
        }
      },
      {
        fileName: 'slide2.jpg',
        overlay: {
          title: "በፍቅሬ ኑሩ !",
          subtitle: "- ዩሐንስ 15:9"
        }
      },
      {
        fileName: 'churchfamily.png',
        overlay: {
          title: "በፍቅሬ ኑሩ !",
          subtitle: "- ዩሐንስ 15:9"
        }
      }
    ];

    return slides.map((slide, index) => ({
      id: `slide-${index + 1}`,
      src: `/slide_images/${slide.fileName}`,
      alt: formatFileName(slide.fileName),
      overlay: slide.overlay,
      order: index + 1
    }));
  } catch (error) {
    console.error('Error fetching slides:', error);
    // Fallback to a default slide if there's an error
    return [{
      id: 'default',
      src: '/slide_images/placeholder.jpg',
      alt: 'Welcome to EECFIN',
      overlay: {
        title: 'Welcome',
        subtitle: 'to Ethiopian Evangelical Church in Finland'
      },
      order: 1
    }];
  }
};

export { addSlide } from './slider/addSlide';
export { updateSlide } from './slider/updateSlide';
export { deleteSlide } from './slider/deleteSlide';
