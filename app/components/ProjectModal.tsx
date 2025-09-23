'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/app/types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projects?: Project[];
  currentProjectIndex?: number;
  onNavigateProject?: (direction: 'prev' | 'next') => void;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  projects,
  currentProjectIndex,
  onNavigateProject
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError({});
    setIsLoading({});
  }, [project]);

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'ArrowLeft' && onNavigateProject) {
        onNavigateProject('prev');
      }
      if (e.key === 'ArrowRight' && onNavigateProject) {
        onNavigateProject('next');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNavigateProject]);

  if (!isOpen || !project) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'signboard':
        return 'Signboard Project';
      case 'contracting':
        return 'Contracting Project';
      case 'both':
        return 'Combined Project';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'signboard':
        return 'bg-indigo-100 text-indigo-800';
      case 'contracting':
        return 'bg-orange-100 text-orange-800';
      case 'both':
        return 'bg-violet-100 text-violet-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  const canNavigateProjects = projects && projects.length > 1 && onNavigateProject;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-90 transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-6xl max-h-[95vh] mx-4 bg-white rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
        {/* Header with close button */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex justify-between items-start">
            <div className="text-white">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)} bg-opacity-90`}>
                {getCategoryLabel(project.category)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Image Section */}
          <div className="relative flex-1 bg-gray-900 flex items-center justify-center">
            {/* Main Image */}
            <div className="relative w-full h-96 lg:h-full flex items-center justify-center">
              {!imageError[currentImageIndex] ? (
                <>
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      isLoading[currentImageIndex] ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => handleImageLoad(currentImageIndex)}
                    onError={() => handleImageError(currentImageIndex)}
                    priority
                  />
                  {isLoading[currentImageIndex] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Image not available</p>
                </div>
              )}
            </div>

            {/* Image Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors z-10"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
          </div>

          {/* Project Details Section */}
          <div className="w-full lg:w-96 bg-white overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Project Title */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium">
                    Featured Project
                  </span>
                )}
              </div>

              {/* Project Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500">Completed:</span>
                    <span className="ml-2 font-medium text-gray-900">{formatDate(project.completedDate)}</span>
                  </div>

                  {project.location && (
                    <div className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-500">Location:</span>
                      <span className="ml-2 font-medium text-gray-900">{project.location}</span>
                    </div>
                  )}

                  {project.clientType && (
                    <div className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-gray-500">Client Type:</span>
                      <span className="ml-2 font-medium text-gray-900">{project.clientType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImageIndex === index
                            ? 'border-indigo-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100px, 120px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        {canNavigateProjects && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-4 py-2">
            <button
              onClick={() => onNavigateProject!('prev')}
              className="text-white hover:text-indigo-300 transition-colors"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-white text-sm">
              {(currentProjectIndex || 0) + 1} / {projects!.length}
            </span>
            <button
              onClick={() => onNavigateProject!('next')}
              className="text-white hover:text-indigo-300 transition-colors"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}