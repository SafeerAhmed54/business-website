"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NavigationItem, BusinessInfo } from "@/app/types";
import { Button } from "@/app/components/ui";

interface HeaderProps {
  businessInfo: BusinessInfo;
  navigation: NavigationItem[];
}

export default function Header({ businessInfo, navigation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Company Name/Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {businessInfo.name}
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                  onClick={(e) => {
                    e.preventDefault();
                    // If we're not on the home page, navigate to home first
                    if (window.location.pathname !== '/') {
                      window.location.href = '/' + item.href;
                    } else {
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${businessInfo.phone}`}
              className="text-gray-700 font-semibold hover:text-indigo-600 transition-colors"
              aria-label={`Call us at ${businessInfo.phone}`}
            >
              {businessInfo.phone}
            </a>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0"
              onClick={() => {
                const target = document.querySelector('#contact');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger Icon */}
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-indigo-200">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    // If we're not on the home page, navigate to home first
                    if (window.location.pathname !== '/') {
                      window.location.href = '/' + item.href;
                    } else {
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            
            {/* Mobile Contact Info */}
            <div className="border-t border-indigo-200 pt-4 pb-3">
              <div className="px-3 space-y-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center text-gray-700 hover:text-indigo-600 font-medium"
                  aria-label={`Call us at ${businessInfo.phone}`}
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {businessInfo.phone}
                </a>
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const target = document.querySelector('#contact');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
