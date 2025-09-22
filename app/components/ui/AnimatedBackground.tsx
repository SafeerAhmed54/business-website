"use client";

import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'footer';
  className?: string;
}

export default function AnimatedBackground({ 
  variant = 'default', 
  className = '' 
}: AnimatedBackgroundProps) {
  const getBackgroundElements = () => {
    switch (variant) {
      case 'hero':
        return (
          <>
            <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-20 rounded-full animate-pulse" />
            <div className="absolute top-32 right-20 w-6 h-6 bg-white opacity-10 rounded-full float-animation" />
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white opacity-30 rounded-full animate-ping" />
            <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-white opacity-15 rounded-full animate-pulse" />
          </>
        );
      case 'footer':
        return (
          <>
            <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-600/30 rounded-full float-animation" style={{ animationDelay: '0s' }} />
            <div className="absolute top-20 right-20 w-1 h-1 bg-blue-600/40 rounded-full float-animation" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-indigo-600/20 rounded-full float-animation" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-blue-600/30 rounded-full float-animation" style={{ animationDelay: '0.5s' }} />
          </>
        );
      default:
        return (
          <>
            <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-600/20 rounded-full float-animation" />
            <div className="absolute top-32 right-20 w-3 h-3 bg-blue-600/15 rounded-full float-animation" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-indigo-600/25 rounded-full float-animation" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-blue-600/20 rounded-full float-animation" style={{ animationDelay: '0.5s' }} />
          </>
        );
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {getBackgroundElements()}
    </div>
  );
}