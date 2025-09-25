import { Metadata } from 'next';
import { businessInfo, contactMethods, businessHours } from '@/app/lib/data/business';
import { mainNavigation } from '@/app/lib/data/navigation';
import { Header, Footer } from '@/app/components';
import StructuredData from '@/app/components/StructuredData';
import { Contact } from '@/app/components/sections';

export const metadata: Metadata = {
  title: `Contact ${businessInfo.name} | Get in Touch for Engineering & Contracting Services`,
  description: `Contact ${businessInfo.name} for engineering and contracting services. Located in Rawalpindi and Karachi. Call ${businessInfo.phone} or email ${businessInfo.email} for quotes and consultations.`,
  keywords: [
    'contact noble enterprises',
    'engineering services contact',
    'contracting services contact',
    'rawalpindi contractor',
    'karachi engineering',
    'import export contact',
    'LED signboard quote',
    'electrical engineering contact',
    'civil engineering contact',
    'mechanical engineering contact',
    'government contractor contact',
    'signboard installation quote',
    'get quote',
    'consultation'
  ],
  alternates: {
    canonical: 'https://nobleenterprises.com/contact',
  },
  openGraph: {
    title: `Contact ${businessInfo.name} | Get in Touch for Engineering & Contracting Services`,
    description: `Contact ${businessInfo.name} for engineering and contracting services. Located in Rawalpindi and Karachi. Call ${businessInfo.phone} for quotes and consultations.`,
    type: 'website',
    url: 'https://nobleenterprises.com/contact',
    images: [
      {
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: `Contact ${businessInfo.name} - Engineering and Contracting Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${businessInfo.name}`,
    description: `Contact ${businessInfo.name} for engineering and contracting services. Located in Rawalpindi and Karachi.`,
    images: ['/images/contact-og.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative page-transition scroll-smooth">
      <StructuredData type="localBusiness" pageType="contact" />
      {/* Seamless unified background */}
      <div className="fixed inset-0 bg-white -z-10" />
      
      {/* Header with navigation */}
      <Header 
        businessInfo={businessInfo} 
        navigation={mainNavigation} 
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8">
                Get in touch for your engineering and contracting needs
              </p>
              <p className="text-base sm:text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Ready to start your project? Contact our team for professional consultation, 
                free quotes, and expert advice on all your engineering and contracting requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Get In Touch
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Multiple ways to reach us for your convenience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {/* Phone Contact */}
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak directly with our team</p>
                  <a
                    href={`tel:${businessInfo.phone.replace(/[^+\d]/g, '')}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                  >
                    {businessInfo.phone}
                  </a>
                </div>

                {/* Email Contact */}
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                  <p className="text-gray-600 mb-4">Send us your requirements</p>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-green-600 hover:text-green-700 font-semibold break-all"
                  >
                    {businessInfo.email}
                  </a>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                  <p className="text-gray-600 mb-4">We're here when you need us</p>
                  <p className="text-orange-600 font-semibold text-sm">
                    {businessInfo.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Our Locations
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Visit us at our offices in Rawalpindi and Karachi
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rawalpindi Office */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Rawalpindi Office</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {businessInfo.address}
                  </p>
                  <a
                    href="https://maps.google.com/?q=53+Zain+Pipe+Sanitary+Store+Chur+Chowk+Peshawar+Road+Rawalpindi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    View on Map
                  </a>
                </div>

                {/* Karachi Office */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Karachi Office</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {businessInfo.karachiAddress}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Room+2+Dilkusha+Chamber+Noman+Street+Plaza+Quarters+Karachi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <Contact businessInfo={businessInfo} />
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