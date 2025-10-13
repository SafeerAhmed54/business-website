"use client";

import React from "react";
import Image from "next/image";
import { BusinessInfo } from "@/app/types";
import { Button } from "../ui/Button";

interface HeroProps {
  businessInfo: BusinessInfo;
}

export default function Hero({ businessInfo }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Static Background with green gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(46,182,44,0.2),transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(203,211,148,0.2),transparent_50%)] -z-10" />

      {/* Static background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-4 h-4 bg-white opacity-20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-6 h-6 bg-white opacity-10 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white opacity-30 rounded-full animate-ping" />
        <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-white opacity-15 rounded-full animate-pulse" />
      </div>

      {/* Main content with split layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left side - Picture Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main hero image - Full size */}
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-3xl z-10" />
                <Image
                  src="/MainPageImage.png"
                  alt="Professional signboard installation"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23666'%3EProfessional Signboard Work%3C/text%3E%3C/svg%3E";
                  }}
                />

                {/* Floating elements with better contrast */}
                <div className="absolute top-6 left-6 bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" />
                    <span className="text-white font-semibold text-sm drop-shadow-sm">
                      Live Project
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg z-20">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold drop-shadow-sm">
                      {businessInfo.yearsExperience}+
                    </div>
                    <div className="text-xs font-medium drop-shadow-sm">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full opacity-15 animate-bounce" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            {/* Business Name with custom font - Enhanced visibility */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {businessInfo.name}
            </h1>

            {/* Tagline with better contrast */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8">
              <span className="text-blue-100 font-medium drop-shadow-md">
                {businessInfo.tagline}
              </span>
            </p>

            {/* Description with better readability */}
            <p className="text-base sm:text-lg md:text-xl mb-10 text-white/90 leading-relaxed drop-shadow-sm">
              With over {businessInfo.yearsExperience} years of experience, we
              deliver quality craftsmanship and reliable solutions for all your
              signboard and contracting needs.
            </p>

            {/* Modern CTA buttons with new green theme */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                onClick={() => {
                  const target = document.querySelector("#contact");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get Free Quote Today
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg transition-all duration-300"
                onClick={() => {
                  const target = document.querySelector("#portfolio");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Our Work
              </Button>
            </div>

            {/* Modern trust indicators with better visibility */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <span className="font-medium text-white drop-shadow-sm">
                  {businessInfo.yearsExperience}+ Years Experience
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                <span className="font-medium text-white drop-shadow-sm">
                  Licensed & Insured
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <span className="font-medium text-white drop-shadow-sm">
                  Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
