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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              {businessInfo.name}
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              {businessInfo.tagline}
            </p>
            <p className="text-gray-300 mb-6 max-w-md">
              With {businessInfo.yearsExperience} years of experience in signboard creation and contracting services, 
              we deliver quality workmanship and professional results.
            </p>
            
            {/* Specializations */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Our Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {businessInfo.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2" role="navigation" aria-label="Footer navigation">
              {navigation.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {/* Phone */}
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={`Call us at ${businessInfo.phone}`}
                  >
                    {formatPhoneNumber(businessInfo.phone)}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label={`Email us at ${businessInfo.email}`}
                  >
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <address className="text-gray-300 not-italic">
                    {businessInfo.address}
                  </address>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-300">{businessInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {businessInfo.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}