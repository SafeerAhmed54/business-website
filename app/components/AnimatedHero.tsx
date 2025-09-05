"use client";

import React from "react";
import Link from "next/link";
import { BusinessInfo } from "@/app/types";

interface AnimatedHeroProps {
  businessInfo: BusinessInfo;
}

export default function AnimatedHero({ businessInfo }: AnimatedHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background with radial gradient - the original one you wanted */}
      <div></div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white opacity-30 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-white opacity-15 rounded-full animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Company Name with animation */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          {businessInfo.name}
        </h1>

        {/* Tagline with delayed animation */}
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up-delay">
          {businessInfo.tagline}
        </p>

        {/* Description */}
        <p className="text-lg mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in-up-delay-2">
          {businessInfo.description}
        </p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
          <button
            onClick={() => {
              const target = document.querySelector('#contact');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Free Quote
          </button>
          <button
            onClick={() => {
              const target = document.querySelector('#portfolio');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
