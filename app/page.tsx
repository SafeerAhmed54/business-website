// Import our components and data
import { Header, Footer } from './components';
import { Hero, ServicesOverview, FeaturedProjects } from './components/sections';
import { businessInfo, mainNavigation } from './lib/data';
import { services } from './lib/data/services';
import { getFeaturedProjects } from './lib/data/projects';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen relative page-transition">
      {/* Seamless unified background */}
      <div className="fixed inset-0 bg-white -z-10" />
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      {/* Hero Section */}
      <Hero businessInfo={businessInfo} />
      
      {/* Services Overview Section */}
      <ServicesOverview services={services} />
      
      {/* Featured Projects Section */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Footer */}
      <Footer 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
    </div>
  );
}