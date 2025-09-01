"use client";

import React from "react";
import Link from "next/link";
import { BusinessInfo, NavigationItem } from "@/app/types";
import { formatPhoneNumber } from "@/app/lib/utils";

interface FooterProps {
  businessInfo: BusinessInfo;
  navigation: NavigationItem[];
}

export default function Footer({ businessInfo, navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-gray-900 overflow-hidden border-t border-gray-200">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,182,44,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(203,211,148,0.03),transparent_50%)]" />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#2EB62C]/30 rounded-full float-animation" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-20 w-1 h-1 bg-[#cbd394]/40 rounded-full float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#2EB62C]/20 rounded-full float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-[#cbd394]/30 rounded-full float-animation" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 animated-line-double">
              {businessInfo.name}
            </h3>
            <p className="text-gray-600 mb-4 max-w-md text-lg">
              {businessInfo.tagline}
            </p>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              With {businessInfo.yearsExperience} years of experience in signboard creation and contracting services, 
              we deliver quality workmanship and professional results.
            </p>
            
            {/* Specializations */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-900">Our Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {businessInfo.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-[#2EB62C]/10 backdrop-blur-sm text-[#2EB62C] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#2EB62C]/20 transition-all duration-300 hover:scale-105 cursor-default border border-[#2EB62C]/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
            <nav className="space-y-3" role="navigation" aria-label="Footer navigation">
              {navigation.map((item, index) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center text-gray-300 hover:text-[#2EB62C] transition-all duration-300 hover:translate-x-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#2EB62C] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.label}
                    <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center text-gray-300 hover:text-[#2EB62C] transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-1.5 h-1.5 bg-[#2EB62C] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Info</h4>
            <div className="space-y-4">
              {/* Phone */}
              <div className="group flex items-start hover:translate-x-1 transition-transform duration-300">
                <svg className="h-6 w-6 text-[#2EB62C] mr-4 mt-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Call Us</div>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-gray-700 hover:text-[#2EB62C] transition-colors font-medium"
                    aria-label={`Call us at ${businessInfo.phone}`}
                  >
                    {formatPhoneNumber(businessInfo.phone)}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start hover:translate-x-1 transition-transform duration-300">
                <svg className="h-6 w-6 text-[#2EB62C] mr-4 mt-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email Us</div>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-gray-700 hover:text-[#2EB62C] transition-colors font-medium"
                    aria-label={`Email us at ${businessInfo.email}`}
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="group flex items-start hover:translate-x-1 transition-transform duration-300">
                <svg className="h-6 w-6 text-[#2EB62C] mr-4 mt-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Visit Us</div>
                  <address className="text-gray-700 not-italic font-medium">
                    {businessInfo.address}
                  </address>
                </div>
              </div>

              {/* Business Hours */}
              <div className="group flex items-start hover:translate-x-1 transition-transform duration-300">
                <svg className="h-6 w-6 text-[#2EB62C] mr-4 mt-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Hours</div>
                  <p className="text-gray-700 font-medium">{businessInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Call to Action */}
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] hover:from-[#27A844] hover:to-[#43A047] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#2EB62C]/25"
              >
                Get Free Quote
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent mt-12 pt-8 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-[#2EB62C] to-[#cbd394]" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0 flex items-center">
              <div className="w-2 h-2 bg-[#2EB62C] rounded-full mr-3 animate-pulse" />
              © {currentYear} {businessInfo.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-[#2EB62C] transition-all duration-300 hover:translate-y-[-1px]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#2EB62C] transition-all duration-300 hover:translate-y-[-1px]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}