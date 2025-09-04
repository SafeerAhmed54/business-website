'use client';

import React, { useState } from 'react';
import { Header, Footer } from '@/app/components';
import { businessInfo, mainNavigation } from '@/app/lib/data';
import { services } from '@/app/lib/data/services';
import { Service } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

// Service Detail Modal
const ServiceModal = ({ service, isOpen, onClose }: { 
  service: Service | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Included:</h3>
            <div className="grid gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Your Free Quote</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              />
              <textarea 
                placeholder="Tell us about your project... *" 
                rows={4} 
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all" 
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 transition-all hover:scale-105">
                Send Quote Request
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              * Required fields. We&apos;ll respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, isExpanded, onToggle, onViewDetails }: { 
  service: Service; 
  isExpanded: boolean; 
  onToggle: () => void;
  onViewDetails: () => void;
}) => {
  const getServiceIcon = (serviceId: string) => {
    const icons = {
      'custom-signboards': '🎨',
      'signboard-installation': '🔧', 
      'led-illuminated-signs': '💡',
      'vehicle-graphics': '🚐',
      'digital-displays': '📱',
      'commercial-contracting': '🏢',
      'residential-construction': '🏠',
      'maintenance-repairs': '🛠️',
      'concrete-masonry': '🧱',
      'storefront-design': '🏪',
      'business-development': '🏗️'
    };
    return icons[serviceId as keyof typeof icons] || '⚡';
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
      isExpanded ? 'border-blue-500 shadow-xl bg-blue-50/30' : 'border-transparent hover:border-blue-200'
    }`}>
      <div onClick={onToggle}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              {getServiceIcon(service.id)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                {service.description}
              </CardDescription>
            </div>
            <div className={`transform transition-all duration-300 ${
              isExpanded ? 'rotate-180 text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </CardHeader>
      </div>
      
      <div className={`overflow-hidden transition-all duration-500 ease-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <CardContent className="pt-0">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
            <div className="grid gap-2 mb-6">
              {service.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
              {service.features.length > 4 && (
                <div className="text-sm text-blue-600 font-medium mt-2">
                  + {service.features.length - 4} more features
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Free Quote
              </Button>
              <Button 
                variant="outline" 
                onClick={(e) => e.stopPropagation()}
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [modalService, setModalService] = useState<Service | null>(null);

  const handleServiceToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleViewDetails = (service: Service) => {
    setModalService(service);
  };

  // Group services by category
  const signboardServices = services.filter(s => s.category === 'signboard');
  const contractingServices = services.filter(s => s.category === 'contracting');
  const combinedServices = services.filter(s => s.category === 'both');

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header businessInfo={businessInfo} navigation={mainNavigation} />
        
        <main className="min-h-screen">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100">
                  Professional signboard design, installation, and contracting services with over {businessInfo.yearsExperience} years of experience
                </p>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  Click on any service below to explore details and get a free quote
                </p>
              </div>
            </div>
          </section>

          {/* Signboard Services */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Signboard & Visual Solutions</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Complete signage solutions from design to installation. Custom signboards, LED displays, and digital signage.
                </p>
              </div>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {signboardServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isExpanded={expandedService === service.id}
                    onToggle={() => handleServiceToggle(service.id)}
                    onViewDetails={() => handleViewDetails(service)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Contracting Services */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Construction & Contracting</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Professional construction services for commercial and residential projects with quality craftsmanship.
                </p>
              </div>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {contractingServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isExpanded={expandedService === service.id}
                    onToggle={() => handleServiceToggle(service.id)}
                    onViewDetails={() => handleViewDetails(service)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Combined Services */}
          {combinedServices.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integrated Solutions</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Complete project solutions combining signage expertise with construction capabilities.
                  </p>
                </div>
                <div className="grid gap-6 max-w-4xl mx-auto">
                  {combinedServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isExpanded={expandedService === service.id}
                      onToggle={() => handleServiceToggle(service.id)}
                      onViewDetails={() => handleViewDetails(service)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Why Choose Us Section */}
          <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose {businessInfo.name}?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  With {businessInfo.yearsExperience}+ years of experience, we deliver exceptional results that exceed expectations.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                {[
                  { 
                    icon: '🏆', 
                    title: 'Quality Craftsmanship', 
                    desc: 'Professional standards with attention to detail and superior materials',
                    stat: `${businessInfo.yearsExperience}+ Years`
                  },
                  { 
                    icon: '⚡', 
                    title: 'Fast Turnaround', 
                    desc: 'Efficient processes and on-time delivery without compromising quality',
                    stat: '48hr Quotes'
                  },
                  { 
                    icon: '🛡️', 
                    title: 'Licensed & Insured', 
                    desc: 'Fully licensed with comprehensive coverage for your peace of mind',
                    stat: '100% Covered'
                  },
                ].map((benefit, index) => (
                  <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-4">{benefit.desc}</p>
                    <div className="text-2xl font-bold text-blue-600">{benefit.stat}</div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
                <p className="text-xl text-blue-100 mb-8">Get a free consultation and quote. We&apos;re here to bring your vision to life.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 hover:scale-105 transition-all">
                    Get Free Quote
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 hover:scale-105 transition-all">
                    Call {businessInfo.phone}
                  </Button>
                </div>
                <p className="text-blue-200 mt-6 text-sm">
                  Free quotes • Licensed & Insured • {businessInfo.yearsExperience}+ Years Experience
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer businessInfo={businessInfo} navigation={mainNavigation} />
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={modalService}
        isOpen={!!modalService}
        onClose={() => setModalService(null)}
      />
    </>
  );
}