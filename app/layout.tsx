import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { businessInfo } from "@/app/lib/data";
import StructuredData from "@/app/components/StructuredData";
import NavigationSlider from "@/app/components/ui/NavigationSlider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload if actually used
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: {
    default: businessInfo.name,
    template: `%s | ${businessInfo.name}`
  },
  description: businessInfo.description,
  keywords: [
    "noble enterprises",
    "import export services",
    "electrical engineering",
    "civil engineering", 
    "mechanical engineering",
    "government contractor",
    "LED signboards",
    "panaflex signboards",
    "neon signboards",
    "offset printing export",
    "rawalpindi contractor",
    "karachi engineering",
    "pakistan engineering services",
    "general order supplier",
    "license holders"
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  category: 'business',
  classification: 'Engineering and Contracting Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nobleenterprises.com'), // Update with actual domain
  alternates: {
    canonical: 'https://nobleenterprises.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nobleenterprises.com',
    siteName: businessInfo.name,
    title: businessInfo.name,
    description: businessInfo.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Engineering and Contracting Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: businessInfo.name,
    description: businessInfo.description,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add actual verification code
    yandex: 'yandex-verification-code', // Add actual verification code
    yahoo: 'yahoo-site-verification-code', // Add actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Preload critical CSS */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Global Navigation Slider */}
        <NavigationSlider
          sections={[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'services', label: 'Services' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'contact', label: 'Contact' }
          ]}
        />
        
        {/* No-script fallback */}
        <noscript>
          <div className="fixed inset-0 bg-yellow-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
              <div className="text-yellow-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">JavaScript Required</h2>
              <p className="text-gray-600 mb-4">
                This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </noscript>
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                  }, 0);
                });
              }
              
              // Error tracking
              window.addEventListener('error', function(e) {
                console.error('Global error:', e.error);
                // You can send this to an error tracking service
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
                // You can send this to an error tracking service
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
