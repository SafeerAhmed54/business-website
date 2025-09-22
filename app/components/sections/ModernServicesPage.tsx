'use client';

import React, { useState, useEffect } from 'react';
import { serviceCategories } from '@/app/lib/data/services';
import { businessInfo } from '@/app/lib/data/business';
import { Service, ServiceCategory } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

// Service Quote Modal Component
const ServiceQuoteModal = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: Service | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Included:</h3>
            <div className="grid gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Your Free Quote</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Send Quote Request
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Or call us directly at{' '}
              <a href={`tel:${businessInfo.phone}`} className="text-blue-600 font-medium hover:underline">
                {businessInfo.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Icon Component
const ServiceIcon = ({ icon }: { icon?: string }) => {
  const iconMap: Record<string, string> = {
    design: '🎨', installation: '🔧', led: '💡', vehicle: '🚐', digital: '📱',
    commercial: '🏢', residential: '🏠', maintenance: '🛠️', concrete: '🧱',
    storefront: '🏪', development: '🏗️',
  };
  
  return (
    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
      {icon && iconMap[icon] ? iconMap[icon] : '⚡'}
    </div>
  );
};

// Enhanced Service Card with Modern Interactions
const ServiceCard = ({ 
  service, 
  isExpanded, 
  onToggle, 
  onQuoteClick 
}: { 
  service: Service; 
  isExpanded: boolean; 
  onToggle: () => void;
  onQuoteClick: () => void;
}) => (
  <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
    isExpanded 
      ? 'border-blue-500 shadow-xl bg-blue-50/30' 
      : 'border-transparent hover:border-blue-200'
  }`}>
    {/* Main Card Content - Clickable */}
    <div onClick={onToggle}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <ServiceIcon icon={service.icon} />
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
    
    {/* Expandable Content */}
    <div className={`overflow-hidden transition-all duration-500 ease-out ${
      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <CardContent className="pt-0">
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Key Features & Benefits:</h4>
          <div className="grid gap-2 mb-6">
            {service.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2.5 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
            {service.features.length > 4 && (
              <div className="text-sm text-blue-600 font-medium mt-2">
                + {service.features.length - 4} more features included
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onQuoteClick();
              }}
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

// Service Slider Component
const ServiceSlider = ({ 
  category, 
  expandedService, 
  onServiceToggle, 
  onQuoteClick 
}: {
  category: ServiceCategory;
  expandedService: string | null;
  onServiceToggle: (serviceId: string) => void;
  onQuoteClick: (service: Service) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % category.services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, category.services.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % category.services.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + category.services.length) % category.services.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id={category.id} className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Slider Container */}
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {category.services.map((service) => (
              <div key={service.id} className="w-full flex-shrink-0 px-4">
                <ServiceCard
                  service={service}
                  isExpanded={expandedService === service.id}
                  onToggle={() => onServiceToggle(service.id)}
                  onQuoteClick={() => onQuoteClick(service)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {category.services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Service Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} of {category.services.length} services
          </span>
        </div>
      </div>
    </section>
  );
};

// Multi-Card Slider for Desktop
const MultiCardSlider = ({ 
  category, 
  expandedService, 
  onServiceToggle, 
  onQuoteClick 
}: {
  category: ServiceCategory;
  expandedService: string | null;
  onServiceToggle: (serviceId: string) => void;
  onQuoteClick: (service: Service) => void;
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerView = 2; // Show 2 cards at once on desktop
  const maxIndex = Math.max(0, category.services.length - cardsPerView);

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id={category.id} className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Multi-Card View */}
        <div className="hidden md:block">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${startIndex * (100 / cardsPerView)}%)` }}
            >
              {category.services.map((service) => (
                <div key={service.id} className="w-1/2 flex-shrink-0">
                  <ServiceCard
                    service={service}
                    isExpanded={expandedService === service.id}
                    onToggle={() => onServiceToggle(service.id)}
                    onQuoteClick={() => onQuoteClick(service)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation for Desktop */}
          {category.services.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={startIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                disabled={startIndex >= maxIndex}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Single Card View */}
        <div className="md:hidden">
          <ServiceSlider
            category={category}
            expandedService={expandedService}
            onServiceToggle={onServiceToggle}
            onQuoteClick={onQuoteClick}
          />
        </div>

        {/* Progress Indicator for Desktop */}
        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === startIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Grid View Component
const GridView = ({ 
  category, 
  expandedService, 
  onServiceToggle, 
  onQuoteClick 
}: {
  category: ServiceCategory;
  expandedService: string | null;
  onServiceToggle: (serviceId: string) => void;
  onQuoteClick: (service: Service) => void;
}) => (
  <section id={category.id} className="py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {category.name}
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {category.description}
      </p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
      {category.services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedService === service.id}
          onToggle={() => onServiceToggle(service.id)}
          onQuoteClick={() => onQuoteClick(service)}
        />
      ))}
    </div>
  </section>
);

// Main Component
export default function ModernServicesPage() {
  const [activeCategory, setActiveCategory] = useState('signboard');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [quoteModalService, setQuoteModalService] = useState<Service | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  const handleServiceToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const handleQuoteClick = (service: Service) => {
    setQuoteModalService(service);
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = serviceCategories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(serviceCategories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Professional signboard design, installation, and contracting services with over {businessInfo.yearsExperience} years of experience
              </p>
              <p className="text-lg mb-10 text-blue-200 max-w-3xl mx-auto leading-relaxed">
                From custom signboard creation to comprehensive contracting solutions, we deliver quality craftsmanship and reliable service for businesses and residential clients.
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Navigation */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
              {/* Category Navigation */}
              <nav className="flex justify-center">
                <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                    >
                      {category.name.replace(' & Visual Solutions', '').replace(' & Contracting', '').replace(' Project Solutions', '')}
                    </button>
                  ))}
                </div>
              </nav>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('slider')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'slider'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Content */}
        <div className="container mx-auto px-4">
          {serviceCategories.map((category) => (
            viewMode === 'slider' ? (
              <MultiCardSlider
                key={category.id}
                category={category}
                expandedService={expandedService}
                onServiceToggle={handleServiceToggle}
                onQuoteClick={handleQuoteClick}
              />
            ) : (
              <GridView
                key={category.id}
                category={category}
                expandedService={expandedService}
                onServiceToggle={handleServiceToggle}
                onQuoteClick={handleQuoteClick}
              />
            )
          ))}
        </div>

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
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { 
                  icon: '🏆', 
                  title: 'Quality Craftsmanship', 
                  desc: 'Professional standards with attention to detail and superior materials',
                  stat: '15+ Years'
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get a free consultation and quote. We&apos;re here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                >
                  Get Free Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                >
                  Call {businessInfo.phone}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quote Modal */}
      <ServiceQuoteModal
        service={quoteModalService}
        isOpen={!!quoteModalService}
        onClose={() => setQuoteModalService(null)}
      />
    </>
  );
}