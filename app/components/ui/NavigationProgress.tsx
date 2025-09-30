"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  useEffect(() => {
    // Only run effect on homepage
    if (pathname !== '/') {
      return;
    }
    const sections = ['hero', 'about', 'services', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px', // Less restrictive margins
      threshold: 0.1 // Require 10% visibility
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the largest intersection ratio
      let maxRatio = 0;
      let activeEntry = null;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeEntry = entry;
        }
      });
      
      if (activeEntry) {
        setActiveSection(activeEntry.target.id);
      }
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Fallback scroll listener for better reliability
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Only show on homepage
  if (pathname !== '/') {
    return null;
  }

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-30 hidden md:block">
      {/* Background container with glassmorphism */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/20">
        <div className="flex flex-col space-y-4">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`group relative w-4 h-4 rounded-full transition-all duration-500 ease-out transform hover:scale-110 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 scale-125 shadow-lg shadow-indigo-500/30'
                  : 'bg-gray-300/60 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-blue-400 hover:shadow-md'
              }`}
              aria-label={`Navigate to ${section.label} section`}
            >
              {/* Active indicator ring */}
              {activeSection === section.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full opacity-30 animate-pulse"></div>
              )}
              
              {/* Progress line connector */}
              {index < sections.length - 1 && (
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4 transition-all duration-300 ${
                  sections.findIndex(s => s.id === activeSection) > index
                    ? 'bg-gradient-to-b from-indigo-600 to-blue-600'
                    : 'bg-gray-200'
                }`}></div>
              )}
              
              {/* Enhanced tooltip */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl shadow-xl border border-gray-700/50 whitespace-nowrap">
                  <span className="font-medium">{section.label}</span>
                  {/* Tooltip arrow */}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900/90 border-y-4 border-y-transparent"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}