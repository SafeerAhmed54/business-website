// Import our components and data
import { Header, Footer } from './components';
import { Hero, ServicesOverview, FeaturedProjects, About, Contact } from './components/sections';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import NavigationProgress from './components/ui/NavigationProgress';
import { businessInfo } from './lib/data/business';
import { mainNavigation } from './lib/data/navigation';
import { services } from './lib/data/services';
import { getFeaturedProjects } from './lib/data/projects';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen relative page-transition scroll-smooth">
      {/* Seamless unified background */}
      <div className="fixed inset-0 bg-white -z-10" />
      
      {/* Header with navigation - Fixed for one-page navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
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
      <Footer 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />

      {/* Navigation Progress Indicator */}
      <NavigationProgress />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}