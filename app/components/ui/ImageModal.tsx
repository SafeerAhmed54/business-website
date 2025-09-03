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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative max-w-4xl max-h-[90vh] mx-4 bg-white rounded-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
        >
          <svg
            className="w-4 h-4"
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
            className="w-full h-auto max-h-[70vh] object-contain"
            priority
          />
        </div>

        {/* Image info */}
        {(title || description) && (
          <div className="p-6 bg-white">
            {title && (
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h3>
            )}
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
