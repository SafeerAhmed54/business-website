/**
 * Image optimization utilities for better mobile performance
 */

export interface ImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const defaultImageSizes: ImageSizes = {
  mobile: '100vw',
  tablet: '50vw',
  desktop: '33vw'
};

/**
 * Generate responsive image sizes string
 */
export function generateImageSizes(sizes?: Partial<ImageSizes>): string {
  const finalSizes = { ...defaultImageSizes, ...sizes };
  
  return [
    `(max-width: 640px) ${finalSizes.mobile}`,
    `(max-width: 1024px) ${finalSizes.tablet}`,
    finalSizes.desktop
  ].join(', ');
}

/**
 * Generate optimized image quality based on device capabilities
 */
export function getOptimizedQuality(): number {
  if (typeof window === 'undefined') return 85;
  
  // Check for slow connection
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 60;
    }
    if (connection.effectiveType === '3g') {
      return 75;
    }
  }
  
  // Check for data saver mode
  if (connection?.saveData) {
    return 60;
  }
  
  // Default quality
  return 85;
}

/**
 * Generate blur placeholder for images
 */
export function generateBlurPlaceholder(
  width: number = 400,
  height: number = 300,
  color: string = '#f3f4f6'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#grain)" opacity="0.3"/>
      <defs>
        <filter id="noise">
          <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100">
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4"/>
        </pattern>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Check if device supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalImageFormat(originalSrc: string): Promise<string> {
  // If already optimized or external URL, return as-is
  if (originalSrc.includes('webp') || originalSrc.startsWith('http')) {
    return originalSrc;
  }
  
  const isWebPSupported = await supportsWebP();
  
  if (isWebPSupported && originalSrc.startsWith('/')) {
    // Convert to WebP if supported and it's a local image
    const extension = originalSrc.split('.').pop();
    if (extension && ['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
  }
  
  return originalSrc;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, priority: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = priority ? 'preload' : 'prefetch';
    link.as = 'image';
    link.href = src;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    
    document.head.appendChild(link);
  });
}

/**
 * Calculate optimal image dimensions for responsive display
 */
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = Math.min(originalWidth, maxWidth);
  let height = width / aspectRatio;
  
  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

/**
 * Image loading priorities for different sections
 */
export const ImagePriorities = {
  HERO: 'high',
  ABOVE_FOLD: 'high',
  VISIBLE: 'normal',
  BELOW_FOLD: 'low'
} as const;

export type ImagePriority = typeof ImagePriorities[keyof typeof ImagePriorities];