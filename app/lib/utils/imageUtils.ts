// Image utility functions for optimization and handling

export interface ImageConfig {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  blur?: boolean;
}

// Generate optimized image URL with Next.js Image optimization
export function getOptimizedImageUrl(
  src: string, 
  width: number, 
  height?: number, 
  config: ImageConfig = {}
): string {
  const { quality = 85, format = 'webp' } = config;
  
  // For external images or when using Next.js Image component,
  // the optimization is handled automatically
  return src;
}

// Generate blur data URL for placeholder
export function generateBlurDataUrl(width: number = 10, height: number = 10): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Fallback for SSR
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rq5TaUVZLDe2eRvPi';
  }
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient blur effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Check if image exists and is accessible
export async function checkImageExists(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Get responsive image sizes for different breakpoints
export function getResponsiveSizes(
  mobile: number = 100,
  tablet: number = 50,
  desktop: number = 33
): string {
  return `(max-width: 768px) ${mobile}vw, (max-width: 1200px) ${tablet}vw, ${desktop}vw`;
}

// Portfolio specific image configurations
export const portfolioImageConfig = {
  thumbnail: {
    width: 400,
    height: 300,
    quality: 80,
    sizes: getResponsiveSizes(100, 50, 33)
  },
  modal: {
    width: 1200,
    height: 900,
    quality: 90,
    sizes: '90vw'
  },
  hero: {
    width: 1920,
    height: 1080,
    quality: 85,
    sizes: '100vw'
  }
};

// Error handling for images
export const imageErrorHandler = {
  onError: (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src !== '/images/placeholder-project.jpg') {
      img.src = '/images/placeholder-project.jpg';
    }
  },
  
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    img.style.opacity = '1';
  }
};

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export async function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}