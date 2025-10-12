"use client";

import React from "react";
import { BusinessInfo } from "@/app/types";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

interface ContactProps {
  businessInfo: BusinessInfo;
}

export default function Contact({ businessInfo }: ContactProps) {

  return (
    <Section id="contact" className="py-20 bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-tight">Get In Touch</h2>
          <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-0">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Contact Information</h3>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base">Call Us</p>
                  <a href={`tel:${businessInfo.phone}`} className="text-base sm:text-lg hover:underline break-all">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base">Email Us</p>
                  <a href={`mailto:${businessInfo.email}`} className="text-base sm:text-lg hover:underline break-all">
                    {businessInfo.email}
                  </a>
                  {businessInfo.secondaryEmail && (
                    <a href={`mailto:${businessInfo.secondaryEmail}`} className="block text-sm sm:text-base hover:underline break-all opacity-90">
                      {businessInfo.secondaryEmail}
                    </a>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base">Visit Us</p>
                  <p className="text-base sm:text-lg leading-relaxed">{businessInfo.address}</p>
                  {businessInfo.karachiAddress && (
                    <p className="text-sm sm:text-base leading-relaxed opacity-90 mt-2">
                      <span className="font-medium">Karachi Office:</span> {businessInfo.karachiAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base">Business Hours</p>
                  <p className="text-base sm:text-lg">{businessInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h4 className="text-base sm:text-lg font-semibold mb-3">Quick Response Times</h4>
              <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                <li>• Phone calls answered during business hours</li>
                <li>• Email responses within 24 hours</li>
                <li>• Free quotes provided within 48 hours</li>
                <li>• Emergency services available</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Us a Message</h3>
            
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] text-base"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] text-base"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] text-base"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] text-base"
                >
                  <option value="">Select a service</option>
                  <option value="custom-signboards" className="text-blue-900 font-bold">Custom Signboard Design</option>
                  <option value="signboard-installation" className="text-blue-900 font-bold">Signboard Installation</option>
                  <option value="led-illuminated-signs" className="text-blue-900 font-bold">LED & Illuminated Signage</option>
                  <option value="commercial-contracting" className="text-blue-900 font-bold">Commercial Contracting</option>
                  <option value="residential-construction" className="text-blue-900 font-bold">Residential Construction</option>
                  <option value="storefront-design" className="text-blue-900 font-bold">Storefront Design & Build</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-vertical text-base"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 sm:py-4 text-base sm:text-lg min-h-[48px] touch-manipulation"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}