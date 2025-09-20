'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { generateImageSizes, getOptimizedQuality, generateBlurPlaceholder } from '@/app/lib/utils/imageOptimization';
import { useLazyLoading } from '@/app/lib/hooks/useLazyLoading';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
  lazyLoad?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  sizes,
  quality,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  unoptimized = false,
  lazyLoad = true
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [optimizedQuality, setOptimizedQuality] = useState(quality || 85);
  
  const { elementRef, isIntersecting } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  useEffect(() => {
    if (!quality) {
      setOptimizedQuality(getOptimizedQuality());
    }
  }, [quality]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const finalSizes = sizes || generateImageSizes();
  const finalBlurDataURL = blurDataURL || generateBlurPlaceholder(width, height);
  
  // Don't render image until it's in viewport (if lazy loading is enabled)
  const shouldRender = !lazyLoad || priority || isIntersecting;

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400 p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {shouldRender ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={finalSizes}
          quality={optimizedQuality}
          placeholder={placeholder}
          blurDataURL={finalBlurDataURL}
          loading={priority ? 'eager' : loading}
          unoptimized={unoptimized}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } object-cover`}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        // Placeholder while waiting for intersection
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      
      {/* Loading skeleton */}
      {isLoading && shouldRender && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}