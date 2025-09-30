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
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 text-white py-20 sm:py-28 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
            }}></div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/20">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Portfolio Showcase</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
                  Our Portfolio
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 mb-8 sm:mb-10 font-medium">
                Showcasing {businessInfo.yearsExperience}+ years of engineering excellence
              </p>
              
              <p className="text-lg sm:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed mb-12">
                Explore our completed projects across engineering disciplines, signboard manufacturing, 
                and contracting services that demonstrate our commitment to quality and innovation.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{projects.length}+</div>
                  <div className="text-blue-200 text-sm">Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{businessInfo.yearsExperience}+</div>
                  <div className="text-blue-200 text-sm">Years</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{categories.length}</div>
                  <div className="text-blue-200 text-sm">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-blue-200 text-sm">Quality</div>
                </div>
              </div>
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