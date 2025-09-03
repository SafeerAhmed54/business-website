'use client';

import { useState } from 'react';
import PortfolioImage from './PortfolioImage';
import ImageModal from './ImageModal';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({
  images,
  className = '',
  columns = 3
}: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
        {images.map((image, index) => (
          <div key={index} className="aspect-[4/3] relative">
            <PortfolioImage
              src={image.src}
              alt={image.alt}
              title={image.title}
              onClick={() => openModal(index)}
              priority={index < 6} // Prioritize first 6 images
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Modal with navigation */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={closeModal}
          />
          
          {/* Modal content with navigation */}
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            {/* Navigation arrows */}
            {selectedImageIndex > 0 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <ImageModal
              isOpen={true}
              onClose={closeModal}
              src={images[selectedImageIndex].src}
              alt={images[selectedImageIndex].alt}
              title={images[selectedImageIndex].title}
              description={images[selectedImageIndex].description}
            />
          </div>
        </div>
      )}
    </>
  );
}