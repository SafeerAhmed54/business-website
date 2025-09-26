import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function LoadingSkeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'card':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const getStyle = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...getStyle(),
              width: index === lines - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={getStyle()}
    />
  );
}

// Specific skeleton components for common use cases
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadingSkeleton variant="rectangular" height={200} className="w-full" />
      <div className="p-4">
        <LoadingSkeleton variant="text" className="mb-2" width="80%" />
        <LoadingSkeleton variant="text" lines={2} className="mb-3" />
        <LoadingSkeleton variant="rectangular" height={32} width={100} className="rounded-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <LoadingSkeleton variant="rectangular" height={500} className="w-full rounded-3xl" />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <LoadingSkeleton variant="text" height={60} className="w-full" />
            <LoadingSkeleton variant="text" height={40} className="w-3/4" />
            <LoadingSkeleton variant="text" lines={3} className="w-full" />
            <div className="flex gap-4">
              <LoadingSkeleton variant="rectangular" height={48} width={200} className="rounded-lg" />
              <LoadingSkeleton variant="rectangular" height={48} width={150} className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <LoadingSkeleton variant="circular" width={48} height={48} className="mb-4" />
      <LoadingSkeleton variant="text" className="mb-2" width="70%" />
      <LoadingSkeleton variant="text" lines={3} className="mb-4" />
      <LoadingSkeleton variant="rectangular" height={36} width={120} className="rounded-lg" />
    </div>
  );
}