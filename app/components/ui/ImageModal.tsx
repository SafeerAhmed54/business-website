"use client";

import { useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
  description,
}: ImageModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors touch-manipulation"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image container */}
        <div className="relative">
          <OptimizedImage
            src={src}
            alt={alt}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 90vw"
            className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
            priority
            loading="eager"
          />
        </div>

        {/* Image info */}
        {(title || description) && (
          <div className="p-4 sm:p-6 bg-white">
            {title && (
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
            )}
            {description && <p className="text-gray-600 text-sm sm:text-base">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
