import { Metadata } from 'next';
import { businessInfo } from '@/app/lib/data/business';
import { mainNavigation } from '@/app/lib/data/navigation';
import { Header, Footer } from '@/app/components';
import StructuredData from '@/app/components/StructuredData';
import PortfolioGallery from '@/app/components/PortfolioGallery';
import { getAllProjects, projectCategories } from '@/app/lib/data/projects';

export const metadata: Metadata = {
  title: `Portfolio - ${businessInfo.name} | Our Engineering & Contracting Projects`,
  description: `View our portfolio of completed engineering and contracting projects including LED signboards, electrical systems, civil engineering, mechanical solutions, and import/export services across Pakistan.`,
  keywords: [
    'portfolio projects',
    'engineering projects',
    'contracting portfolio',
    'LED signboard projects',
    'electrical engineering projects',
    'civil engineering portfolio',
    'mechanical engineering work',
    'import export projects',
    'government contracts',
    'signboard gallery',
    'construction projects',
    'panaflex signboards',
    'neon signboards',
    'offset printing work'
  ],
  alternates: {
    canonical: 'https://nobleenterprises.com/portfolio',
  },
  openGraph: {
    title: `Portfolio - ${businessInfo.name} | Our Engineering & Contracting Projects`,
    description: `View our portfolio of completed engineering and contracting projects including LED signboards, electrical systems, civil engineering, mechanical solutions, and import/export services.`,
    type: 'website',
    url: 'https://nobleenterprises.com/portfolio',
    images: [
      {
        url: '/images/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} Portfolio - Engineering and Contracting Projects`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Portfolio - ${businessInfo.name}`,
    description: `View our portfolio of completed engineering and contracting projects with ${businessInfo.yearsExperience}+ years of experience.`,
    images: ['/images/portfolio-og.jpg'],
  },
};

export default function PortfolioPage() {
  const projects = getAllProjects();
  const categories = projectCategories;

  return (
    <div className="min-h-screen relative page-transition scroll-smooth">
      <StructuredData type="organization" pageType="portfolio" />
      {/* Seamless unified background */}
      <div className="fixed inset-0 bg-white -z-10" />
      
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Our Portfolio
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 mb-6 sm:mb-8">
                Showcasing {businessInfo.yearsExperience}+ years of engineering excellence
              </p>
              <p className="text-base sm:text-lg text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                Explore our completed projects across engineering disciplines, signboard manufacturing, 
                and contracting services that demonstrate our commitment to quality and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <PortfolioGallery projects={projects} categories={categories} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#2EB62C] to-[#4CAF50]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Let us bring your vision to life with our expertise in engineering and contracting services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a
                href="tel:+923315666788"
                className="bg-white text-[#2EB62C] hover:bg-gray-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-3 min-h-[48px] touch-manipulation"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden sm:inline">Call: {businessInfo.phone}</span>
                <span className="sm:hidden">Call Us</span>
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-[#2EB62C] font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 min-h-[48px] touch-manipulation"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                View Our Services
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
    </div>
  );
}