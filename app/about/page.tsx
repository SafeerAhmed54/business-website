import { Metadata } from 'next';
import { businessInfo, businessCredentials } from '@/app/lib/data/business';
import { mainNavigation } from '@/app/lib/data/navigation';
import { Header, Footer } from '@/app/components';
import StructuredData from '@/app/components/StructuredData';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `About ${businessInfo.name} - Engineering & Contracting Excellence`,
  description: `Learn about ${businessInfo.name}, a leading engineering and contracting company with ${businessInfo.yearsExperience}+ years of experience in import/export, electrical, civil, and mechanical engineering services.`,
  keywords: [
    'about noble enterprises',
    'engineering company history',
    'contracting experience',
    'import export services',
    'electrical engineering',
    'civil engineering',
    'mechanical engineering',
    'government contractor',
    'signboard manufacturing',
    'company credentials'
  ],
  alternates: {
    canonical: 'https://nobleenterprises.com/about',
  },
  openGraph: {
    title: `About ${businessInfo.name} - Engineering & Contracting Excellence`,
    description: `Learn about ${businessInfo.name}, a leading engineering and contracting company with ${businessInfo.yearsExperience}+ years of experience in import/export, electrical, civil, and mechanical engineering services.`,
    type: 'website',
    url: 'https://nobleenterprises.com/about',
    images: [
      {
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: `About ${businessInfo.name} - Our team and facilities`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${businessInfo.name} - Engineering & Contracting Excellence`,
    description: `Learn about ${businessInfo.name}, a leading engineering and contracting company with ${businessInfo.yearsExperience}+ years of experience.`,
    images: ['/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative page-transition scroll-smooth">
      <StructuredData type="organization" pageType="about" />
      {/* Seamless unified background */}
      <div className="fixed inset-0 bg-white -z-10" />
      
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2EB62C] to-[#4CAF50] text-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              About {businessInfo.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-green-100 mb-6 sm:mb-8">
              {businessInfo.tagline}
            </p>
            <p className="text-base sm:text-lg text-green-200 max-w-3xl mx-auto leading-relaxed">
              {businessInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2EB62C] mb-1 sm:mb-2">{businessInfo.yearsExperience}+</div>
              <div className="text-gray-600 text-sm sm:text-base">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2EB62C] mb-1 sm:mb-2">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2EB62C] mb-1 sm:mb-2">100%</div>
              <div className="text-gray-600 text-sm sm:text-base">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2EB62C] mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-600 text-sm sm:text-base">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                  Our Story
                </h2>
                <div className="space-y-4 sm:space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    Founded over {businessInfo.yearsExperience} years ago, {businessInfo.name} began as a small family business 
                    with a simple mission: to provide quality signboard and contracting services that help 
                    businesses and homeowners achieve their vision.
                  </p>
                  <p className="text-sm sm:text-base">
                    What started as a local signboard shop has grown into a comprehensive service provider, 
                    offering everything from custom signage design to complete construction projects. Our 
                    commitment to quality craftsmanship and customer satisfaction has been the foundation 
                    of our success.
                  </p>
                  <p className="text-sm sm:text-base">
                    Today, we&apos;re proud to serve clients across various industries, from small local businesses 
                    to large commercial enterprises, always maintaining the personal touch and attention to 
                    detail that our customers have come to expect.
                  </p>
                </div>
              </div>
              <div className="relative order-first lg:order-last">
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-company.jpg"
                    alt="Our company building and team"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23666'%3EOur Company Building%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Our Mission & Values
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We&apos;re driven by core values that guide every project and client interaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Quality First</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We never compromise on quality. Every project is executed with precision, 
                  using the best materials and proven techniques to ensure lasting results.
                </p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We listen, understand, 
                  and deliver solutions that exceed expectations every time.
                </p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We stay ahead of industry trends and embrace new technologies to provide 
                  cutting-edge solutions that give our clients a competitive advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive services backed by years of experience and industry knowledge
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessInfo.specializations.map((specialization, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{specialization}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Credentials & Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fully licensed, insured, and certified to provide professional services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessCredentials.map((credential, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced professionals dedicated to bringing your vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Project Management Team',
                  role: 'Overseeing every detail',
                  description: 'Our project managers ensure smooth execution from start to finish, keeping you informed every step of the way.'
                },
                {
                  name: 'Design Specialists',
                  role: 'Creative vision & technical expertise',
                  description: 'Our designers combine creativity with technical knowledge to create signage that stands out and performs.'
                },
                {
                  name: 'Installation Experts',
                  role: 'Professional installation',
                  description: 'Our certified installers ensure your project is completed safely, efficiently, and to the highest standards.'
                }
              ].map((member, index) => (
                <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2EB62C] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#2EB62C] font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#2EB62C] to-[#4CAF50]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Work With Us?
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience the difference that {businessInfo.yearsExperience}+ years of expertise makes. 
            Contact us today to discuss your project.
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