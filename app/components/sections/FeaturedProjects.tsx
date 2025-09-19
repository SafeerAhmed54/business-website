"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/app/types';
import { Button } from '../ui/Button';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3); // Limit to 3 for stacking
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating, currentIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsAnimating(false);
      setIsAutoPlaying(true);
    }, 800);
  };

  // Calculate positions and rotations for each card
  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + featuredProjects.length) % featuredProjects.length;
    
    switch (position) {
      case 0: // Front card
        return {
          transform: 'translateX(0%) translateY(0%) rotateY(0deg) scale(1)',
          zIndex: 30,
          opacity: 1,
        };
      case 1: // Second card (behind and to the right)
        return {
          transform: 'translateX(15%) translateY(8%) rotateY(-15deg) scale(0.95)',
          zIndex: 20,
          opacity: 0.8,
        };
      case 2: // Third card (furthest back)
        return {
          transform: 'translateX(30%) translateY(16%) rotateY(-30deg) scale(0.9)',
          zIndex: 10,
          opacity: 0.6,
        };
      default:
        return {
          transform: 'translateX(45%) translateY(24%) rotateY(-45deg) scale(0.85)',
          zIndex: 0,
          opacity: 0.4,
        };
    }
  };

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* White background */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Modern Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black mb-8 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover how we transform ideas into reality through innovative design 
            and exceptional craftsmanship.
          </p>
        </div>

        {/* 3D Stacked Cards Container */}
        <div className="relative h-[700px] mb-16 perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center">
            {featuredProjects.map((project, index) => {
              const cardStyle = getCardStyle(index);
              const isActive = (index - currentIndex + featuredProjects.length) % featuredProjects.length === 0;
              
              return (
                <div
                  key={project.id}
                  className="absolute w-full max-w-4xl h-[600px] cursor-pointer transition-all duration-700 ease-out preserve-3d"
                  style={cardStyle}
                  onClick={() => !isActive && goToSlide(index)}
                >
                  {/* Card Container */}
                  <div className="w-full h-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden group hover:shadow-3xl transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                      {/* Project Image */}
                      <div className="lg:col-span-3 relative overflow-hidden">
                        <Image
                          src={project.images[0] || '/images/placeholder-project.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority={index === 0}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-8 left-8">
                          <div className={`px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-md border border-white/20 ${
                            project.category === 'signboard' 
                              ? 'bg-[#2EB62C]/80' 
                              : project.category === 'contracting'
                              ? 'bg-[#4CAF50]/80'
                              : 'bg-[#cbd394]/80'
                          }`}>
                            {project.category === 'signboard' ? 'Signboard Design' : 
                             project.category === 'contracting' ? 'Construction' : 'Full Service'}
                          </div>
                        </div>

                        {/* Project Stats Overlay */}
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                            <div className="grid grid-cols-2 gap-4 text-white text-sm">
                              <div>
                                <div className="font-medium opacity-80">Completed</div>
                                <div className="font-semibold">
                                  {new Date(project.completedDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    year: 'numeric' 
                                  })}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium opacity-80">Type</div>
                                <div className="font-semibold">{project.clientType}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/50">
                        {/* Project Number */}
                        <div className="text-6xl font-bold text-gray-100 mb-4 leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        
                        {/* Location Info */}
                        {project.location && (
                          <div className="flex items-center text-gray-500 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#2EB62C]/10 to-[#4CAF50]/10 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-[#2EB62C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">Location</div>
                              <div className="text-sm">{project.location}</div>
                            </div>
                          </div>
                        )}

                        {/* CTA Buttons - Only show on active card */}
                        {isActive && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] hover:from-[#27A844] hover:to-[#43A047] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                              onClick={() => {
                                const target = document.querySelector('#contact');
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              Get Quote
                              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-[#2EB62C] text-[#2EB62C] hover:bg-[#2EB62C] hover:text-white"
                              onClick={() => {
                                const target = document.querySelector('#about');
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              Learn More
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20 group disabled:opacity-50 disabled:cursor-not-allowed z-40"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5 mx-auto group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20 group disabled:opacity-50 disabled:cursor-not-allowed z-40"
            aria-label="Next project"
          >
            <svg className="w-5 h-5 mx-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Card Indicators */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          {featuredProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className="group relative disabled:cursor-not-allowed"
              aria-label={`Go to ${project.title}`}
            >
              <div className={`w-12 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-[#2EB62C] to-[#cbd394] scale-110' 
                  : 'bg-gray-200 group-hover:bg-gray-300'
              }`} />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {project.title.split(' ').slice(0, 2).join(' ')}
              </div>
            </button>
          ))}
        </div>

        {/* View More Projects Button */}
        {!showAllProjects && (
          <div className="text-center mb-16">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#2EB62C] text-[#2EB62C] hover:bg-[#2EB62C] hover:text-white font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300"
              onClick={() => setShowAllProjects(true)}
            >
              View More Projects ({projects.length - featuredProjects.length} more)
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        )}

        {/* Expanded Projects Grid */}
        {showAllProjects && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">All Our Projects</h3>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['all', 'signboard', 'contracting', 'both'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#2EB62C] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : 
                     category === 'both' ? 'Combined' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter(project => selectedCategory === 'all' || project.category === selectedCategory)
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%23666'%3E" + project.title + "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          project.category === 'signboard' 
                            ? 'bg-blue-500 text-white'
                            : project.category === 'contracting'
                            ? 'bg-orange-500 text-white'
                            : 'bg-purple-500 text-white'
                        }`}>
                          {project.category === 'both' ? 'Combined' : project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2EB62C] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Project Details */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{project.location}</span>
                        <span>{new Date(project.completedDate).getFullYear()}</span>
                      </div>

                      {/* CTA Button */}
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] hover:from-[#27A844] hover:to-[#43A047] text-white border-0"
                        onClick={() => {
                          const target = document.querySelector('#contact');
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Start Similar Project
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Collapse Button */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300"
                onClick={() => setShowAllProjects(false)}
              >
                Show Less
                <svg className="w-5 h-5 ml-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </div>
        )}

        {/* View Complete Portfolio Button */}
        <div className="text-center mb-16">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/25 group"
          >
            <span>View Complete Portfolio</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Green CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-3xl p-12 lg:p-16 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to bring your vision to life?
            </h3>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore our complete portfolio and discover how we can help transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#2EB62C] hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 group"
                onClick={() => {
                  const target = document.querySelector('#about');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn About Us
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#2EB62C] font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300"
                onClick={() => {
                  const target = document.querySelector('#contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}