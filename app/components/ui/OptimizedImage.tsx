"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from './LazyWrapper';
import LoadingSkeleton from './LoadingSkeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  fill?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes,
  fill = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Use intersection observer for lazy loading (unless priority is true)
  const { hasIntersected } = useIntersectionObserver(imageRef, {
    threshold: 0.1,
    rootMargin: '100px',
  });

  const shouldLoad = priority || hasIntersected;

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      // Try a generic placeholder as last resort
      const genericPlaceholder = `data:image/svg+xml;base64,${Buffer.from(
        `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af">
            Image not available
          </text>
        </svg>`
      ).toString('base64')}`;
      
      if (currentSrc !== genericPlaceholder) {
        setCurrentSrc(genericPlaceholder);
        setHasError(false);
        setIsLoading(true);
      } else {
        onError?.();
      }
    }
  };

  // Generate a simple blur placeholder if none provided
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
      </svg>`
    ).toString('base64')}`;
  };

  const imageProps = {
    src: currentSrc,
    alt,
    className: `transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    } ${className}`,
    onLoad: handleLoad,
    onError: handleError,
    quality,
    ...(width && { width }),
    ...(height && { height }),
    ...(fill && { fill: true }),
    ...(sizes && { sizes }),
    ...(priority && { priority: true }),
    ...(loading && !priority && { loading }),
    ...(placeholder === 'blur' && {
      placeholder: 'blur' as const,
      blurDataURL: blurDataURL || generateBlurDataURL(width, height),
    }),
  };

  return (
    <div ref={imageRef} className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading skeleton */}
      {isLoading && shouldLoad && (
        <div className="absolute inset-0 z-10">
          <LoadingSkeleton
            variant="rectangular"
            className="w-full h-full"
            width={width}
            height={height}
          />
        </div>
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="flex items-center justify-center bg-gray-100 text-gray-400 w-full h-full min-h-[200px]">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {shouldLoad && !hasError && (
        <Image {...imageProps} />
      )}
    </div>
  );
}