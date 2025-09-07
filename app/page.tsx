// Import our components and data
import { Header, Footer } from './components';
import { Hero, ServicesOverview, FeaturedProjects, About, Contact } from './components/sections';
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
      
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero businessInfo={businessInfo} />
      </section>

      {/* About Section */}
      <section id="about">
        <About businessInfo={businessInfo} />
      </section>
      
      {/* Services Overview Section */}
      <section id="services">
        <ServicesOverview services={services} />
      </section>
      
      {/* Featured Projects Section */}
      <section id="portfolio">
        <FeaturedProjects projects={featuredProjects} />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact businessInfo={businessInfo} />
      </section>

      {/* Footer */}
      <Footer 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
    </div>
  );
}