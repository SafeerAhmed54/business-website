"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    // Show slow loading message after 5 seconds
    const timer = setTimeout(() => {
      setShowSlowMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Enhanced loading spinner */}
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text with animation */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Loading
          <span className="inline-block animate-bounce">.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
        </h2>
        
        <p className="text-gray-600 mb-6">
          Please wait while we prepare your content
        </p>

        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>

        {/* Fallback message for slow connections */}
        {showSlowMessage && (
          <div className="text-sm text-gray-500 animate-fade-in">
            <p>Taking longer than expected?</p>
            <button
              onClick={() => window.location.reload()}
              className="text-indigo-600 hover:text-indigo-800 underline mt-2 transition-colors"
            >
              Try refreshing the page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}