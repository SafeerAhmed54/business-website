"use client";

// Import our components and data
import { Header, Footer } from "./components";

// Disable static generation for this page
export const dynamic = 'force-dynamic';

import { Hero, ServicesOverview, About, Contact } from "./components/sections";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";


import StructuredData from "./components/StructuredData";
import NoScriptFallback from "./components/ui/NoScriptFallback";
import { businessInfo } from "./lib/data/business";
import { mainNavigation } from "./lib/data/navigation";
import { services } from "./lib/data/services";
import { getFeaturedProjects } from "./lib/data/projects";


import FeaturedProjects from "./components/sections/FeaturedProjects";

// Metadata will be handled in layout.tsx for client components

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
        <Header businessInfo={businessInfo} navigation={mainNavigation} />

        {/* Hero Section - Landing */}
        <section id="hero" className="scroll-mt-20">
          <Hero businessInfo={businessInfo} />
        </section>

        {/* About Section - Company Overview */}
        <section id="about" className="scroll-mt-20">
          <About businessInfo={businessInfo} />
        </section>

        {/* Services Overview Section - What We Offer */}
        <section id="services" className="scroll-mt-20">
          <ServicesOverview services={services} />
        </section>

        {/* Featured Projects Section - Our Work */}
        <section id="portfolio" className="scroll-mt-20">
          <FeaturedProjects projects={featuredProjects} />
        </section>

        {/* Contact Section - Get In Touch */}
        <section id="contact" className="scroll-mt-20">
          <Contact businessInfo={businessInfo} />
        </section>

        {/* Footer - Additional Information */}
        <Footer businessInfo={businessInfo} navigation={mainNavigation} />
        
        {/* Scroll to Top Button */}
        <ScrollToTopButton />
        
      </div>
    </>
  );
}
