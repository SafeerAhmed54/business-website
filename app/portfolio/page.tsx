import { Metadata } from 'next';
import { projects, projectCategories } from '@/app/lib/data/projects';
import PortfolioGallery from '@/app/components/PortfolioGallery';

export const metadata: Metadata = {
  title: 'Portfolio - S&S ENTERPRISES | Our Completed Projects',
  description: 'View our portfolio of completed signboard and contracting projects. Quality craftsmanship in custom signage, construction, and renovation work.',
  keywords: 'portfolio, signboard projects, contracting work, construction projects, custom signs, renovation projects',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Showcasing 15+ years of quality signboard and contracting work
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              From custom signage installations to complete building renovations, 
              explore our diverse portfolio of successful projects across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PortfolioGallery 
            projects={projects} 
            categories={projectCategories} 
          />
        </div>
      </section>
    </main>
  );
}