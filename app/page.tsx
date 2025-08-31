// Import our components and data
import { Header, Footer, AnimatedHero, Card, CardContent, CardHeader, CardTitle } from './components';
import { businessInfo, mainNavigation } from './lib/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      {/* Animated Hero Section */}
      <AnimatedHero businessInfo={businessInfo} />
      
      {/* Additional content sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose {businessInfo.name}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{businessInfo.yearsExperience}+ years of quality service</p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Premium materials and craftsmanship</p>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">On-time delivery and professional service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
    </div>
  );
}