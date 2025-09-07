"use client";

import React from "react";
import { BusinessInfo } from "@/app/types";
import { Section } from "../ui/Section";

interface AboutProps {
  businessInfo: BusinessInfo;
}

export default function About({ businessInfo }: AboutProps) {
  return (
    <Section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black mb-8 tracking-tight">About {businessInfo.name}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {businessInfo.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {businessInfo.specializations.map((specialization, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#2EB62C] rounded-full" />
                  <span className="text-gray-700">{specialization}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us?</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2EB62C] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{businessInfo.yearsExperience}+</span>
                  </div>
                  <span className="text-gray-700">Years of Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2EB62C] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2EB62C] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2EB62C] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Free Consultations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-team.jpg"
                alt="Our professional team"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23666'%3EOur Professional Team%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}