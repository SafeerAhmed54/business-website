// Import our components and data
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Header, Footer } from './components';
import { Hero, ServicesOverview, About, Contact } from './components/sections';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import NavigationProgress from './components/ui/NavigationProgress';
import StructuredData from './components/StructuredData';
import ErrorBoundary from './components/ui/ErrorBoundary';
import NoScriptFallback from './components/ui/NoScriptFallback';
import { businessInfo } from './lib/data/business';
import { mainNavigation } from './lib/data/navigation';
import { services } from './lib/data/services';
import { getFeaturedProjects } from './lib/data/projects';
import { ProjectCardSkeleton } from './components/ui/LoadingSkeleton';

// Dynamic import for heavy components
import dynamic from 'next/dynamic';

const FeaturedProjects = dynamic(
  () => import('./components/sections/FeaturedProjects'),
  {
    loading: () => (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export const metadata: Metadata = {
  title: `${businessInfo.name} - ${businessInfo.tagline}`,
  description: businessInfo.description,
  keywords: [
    'noble enterprises',
    'import export services',
    'electrical engineering',
    'civil engineering',
    'mechanical engineering',
    'government contractor',
    'LED signboards',
    'panaflex signboards',
    'neon signboards',
    'offset printing',
    'rawalpindi contractor',
    'karachi engineering',
    'pakistan import export'
  ],
  alternates: {
    canonical: 'https://nobleenterprises.com',
  },
  openGraph: {
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: businessInfo.description,
    type: 'website',
    url: 'https://nobleenterprises.com',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Engineering and Contracting Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: businessInfo.description,
    images: ['/images/home-og.jpg'],
  },
};

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* No-script fallback */}
      <NoScriptFallback />
      
      <div className="min-h-screen relative page-transition scroll-smooth">
        <StructuredData type="localBusiness" pageType="homepage" />
        {/* Seamless unified background */}
        <div className="fixed inset-0 bg-white -z-10" />
        
        {/* Header with navigation - Fixed for one-page navigation */}
        <ErrorBoundary>
          <Header 
            businessInfo={businessInfo} 
            navigation={mainNavigation} 
          />
        </ErrorBoundary>
        
        {/* Hero Section - Landing */}
        <section id="hero" className="scroll-mt-20">
          <ErrorBoundary>
            <Hero businessInfo={businessInfo} />
          </ErrorBoundary>
        </section>

        {/* About Section - Company Overview */}
        <section id="about" className="scroll-mt-20">
          <ErrorBoundary>
            <About businessInfo={businessInfo} />
          </ErrorBoundary>
        </section>
        
        {/* Services Overview Section - What We Offer */}
        <section id="services" className="scroll-mt-20">
          <ErrorBoundary>
            <ServicesOverview services={services} />
          </ErrorBoundary>
        </section>
        
        {/* Featured Projects Section - Our Work */}
        <section id="portfolio" className="scroll-mt-20">
          <ErrorBoundary>
            <FeaturedProjects projects={featuredProjects} />
          </ErrorBoundary>
        </section>

        {/* Contact Section - Get In Touch */}
        <section id="contact" className="scroll-mt-20">
          <ErrorBoundary>
            <Contact businessInfo={businessInfo} />
          </ErrorBoundary>
        </section>
        
        {/* Footer - Additional Information */}
        <ErrorBoundary>
          <Footer 
            businessInfo={businessInfo} 
            navigation={mainNavigation} 
          />
        </ErrorBoundary>

        {/* Navigation Progress Indicator */}
        <ErrorBoundary>
          <NavigationProgress />
        </ErrorBoundary>
        
        {/* Scroll to Top Button */}
        <ErrorBoundary>
          <ScrollToTopButton />
        </ErrorBoundary>
      </div>
    </>
  );
}