'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/app/types';

interface ProjectCardProps {
  project: Project;
  onImageClick?: (project: Project, imageIndex: number) => void;
}

export default function ProjectCard({ project, onImageClick }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'signboard':
        return 'Signboard';
      case 'contracting':
        return 'Contracting';
      case 'both':
        return 'Combined Project';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'signboard':
        return 'bg-blue-100 text-blue-800';
      case 'contracting':
        return 'bg-orange-100 text-orange-800';
      case 'both':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(project, 0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Project Image */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {!imageError ? (
          <>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
              onClick={handleImageClick}
            />
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Image Count Badge */}
        {project.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm">
            +{project.images.length - 1} more
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
            {getCategoryLabel(project.category)}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Project Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Completed: {formatDate(project.completedDate)}
          </div>
          
          {project.location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </div>
          )}

          {project.clientType && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {project.clientType}
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-6">
          <button
            onClick={handleImageClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            View Project Details
          </button>
        </div>
      </div>
    </div>
  );
}