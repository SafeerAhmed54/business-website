'use client';

import React, { useState } from 'react';
import { Service } from '@/app/types';
import { Button } from '../ui/Button';


interface ServicesOverviewProps {
  services: Service[];
}

// Service icons mapping - expanded for all services
const serviceIcons = {
  'custom-signboards': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
    </svg>
  ),
  'signboard-installation': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'led-illuminated-signs': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'commercial-contracting': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'residential-construction': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'storefront-design': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  )
};



export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* White background */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Modern Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-black mb-6 sm:mb-8 tracking-tight leading-tight">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From custom signboard design to comprehensive contracting services, 
            we deliver quality solutions tailored to your specific needs.
          </p>
        </div>

        {/* Expandable Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0">
          {services.map((service, index) => {
            const isExpanded = expandedCard === service.id;
            
            return (
              <div
                key={service.id}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl border transition-all duration-300 ease-out ${
                  isExpanded 
                    ? 'border-[#2EB62C]/60 shadow-2xl scale-105 bg-white' 
                    : 'border-gray-200/60 hover:border-[#2EB62C]/40 hover:shadow-xl hover:-translate-y-2'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
                }}
              >
                {/* Main Card Content - Always Visible */}
                <div 
                  className="p-4 sm:p-5 cursor-pointer"
                  onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                >
                  {/* Header with Icon & Title */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      {serviceIcons[service.id as keyof typeof serviceIcons] ? (
                        <div className="text-white">
                          {React.cloneElement(serviceIcons[service.id as keyof typeof serviceIcons], {
                            className: "w-4 h-4 sm:w-5 sm:h-5 text-white"
                          })}
                        </div>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-[#2EB62C] transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                        service.category === 'signboard' 
                          ? 'bg-blue-100 text-blue-700'
                          : service.category === 'contracting'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {service.category === 'both' ? 'Combined' : service.category}
                      </span>
                    </div>
                    {/* Expand/Collapse Icon */}
                    <div className={`transform transition-all duration-300 ${
                      isExpanded ? 'rotate-180 bg-[#2EB62C]/10' : 'hover:bg-gray-100'
                    } p-1.5 sm:p-2 rounded-lg touch-manipulation`}>
                      <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isExpanded ? 'text-[#2EB62C]' : 'text-gray-400 group-hover:text-[#2EB62C]'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  
                  {/* Preview Features */}
                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#2EB62C] rounded-full mr-2 flex-shrink-0" />
                        <span className="font-medium truncate">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 2 && !isExpanded && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{service.features.length - 2} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 border-t border-gray-200/50 bg-gradient-to-br from-gray-50/50 to-white/50">
                    {/* Full Features List */}
                    <div className="pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">What&apos;s Included</h4>
                      </div>
                      
                      <div className="grid gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className={`flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-200 hover:scale-[1.02] ${
                              isExpanded ? 'animate-in fade-in-0' : ''
                            }`}
                            style={{ 
                              animationDelay: isExpanded ? `${featureIndex * 0.1}s` : '0s',
                              animationFillMode: 'both'
                            }}
                          >
                            <div className="w-5 h-5 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-800 font-medium text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Action Button */}
                    <div className="pt-6">
                      <div className="relative">
                        <Button 
                          className="w-full bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] hover:from-[#25a023] hover:to-[#43A047] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#2EB62C]/25 text-base"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card collapse
                            const target = document.querySelector('#contact');
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <div className="flex items-center justify-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>Get Free Quote for {service.title}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </Button>
                        
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] rounded-2xl blur-sm opacity-20 -z-10"></div>
                      </div>
                      
                      {/* Additional info */}
                      <p className="text-center text-xs text-gray-500 mt-3">
                        ✓ Free consultation • ✓ No obligation • ✓ Quick response
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2EB62C]/5 to-[#4CAF50]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Service Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-[#2EB62C] mb-1">{services.length}</div>
            <div className="text-sm text-gray-600 font-medium">Services</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-[#2EB62C] mb-1">15+</div>
            <div className="text-sm text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-[#2EB62C] mb-1">500+</div>
            <div className="text-sm text-gray-600 font-medium">Projects</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-[#2EB62C] mb-1">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Support</div>
          </div>
        </div>

        {/* Learn More Services Button */}
        <div className="text-center mb-16">
          <a
            href="/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/25 group"
          >
            <span>View All Services & Details</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Modern Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-3xl p-12 lg:p-16 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to get started on your project?
            </h3>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s discuss your needs and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#2EB62C] hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 group"
                onClick={() => {
                  const target = document.querySelector('#contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Free Quote
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-[#2EB62C] font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300"
                onClick={() => {
                  const target = document.querySelector('#portfolio');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}