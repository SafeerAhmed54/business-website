'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BusinessInfo, NavigationItem } from '@/app/types';

interface StickySidebarProps {
  businessInfo: BusinessInfo;
  navigationLinks: NavigationItem[];
  ctaButton: {
    text: string;
    href: string;
    onClick?: () => void;
  };
}

export default function StickySidebar({ 
  businessInfo, 
  navigationLinks, 
  ctaButton 
}: StickySidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render on mobile/tablet
  if (isMobile) {
    return null;
  }

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 w-72">
        {/* Company Logo and Name */}
        <div className="mb-6 text-center">
          <div className="mb-3">
            <Image
              src="/images/logo.png"
              alt={`${businessInfo.name} Logo`}
              width={60}
              height={60}
              className="mx-auto rounded-lg"
              onError={(e) => {
                // Fallback to a simple icon if logo doesn't exist
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback icon */}
            <div className="hidden w-15 h-15 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-bold text-gray-900 leading-tight">{businessInfo.name}</h3>
          <p className="text-xs text-gray-600 mt-1">{businessInfo.tagline}</p>
        </div>

        {/* Quick Contact Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Contact</h3>
          
          {/* Phone */}
          <div className="mb-2">
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {businessInfo.phone}
            </a>
          </div>

          {/* Email */}
          <div className="mb-2">
            <a
              href={`mailto:${businessInfo.email}`}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>

          {/* Business Hours */}
          <div className="text-xs text-gray-600">
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {businessInfo.hours}
            </div>
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Navigation</h3>
          <nav className="space-y-1">
            {navigationLinks.map((link) => (
              <div key={link.href}>
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleSmoothScroll(link.href)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Primary CTA Button */}
        <div>
          {ctaButton.onClick ? (
            <button
              onClick={ctaButton.onClick}
              className="w-full bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {ctaButton.text}
            </button>
          ) : (
            <Link
              href={ctaButton.href}
              className="block w-full bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-center"
            >
              {ctaButton.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}