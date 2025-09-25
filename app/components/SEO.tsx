import Head from 'next/head';
import { businessInfo } from '@/app/lib/data/business';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

export default function SEO({
  title,
  description = businessInfo.description,
  keywords = [],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  noindex = false
}: SEOProps) {
  const fullTitle = title ? `${title} | ${businessInfo.name}` : businessInfo.name;
  const baseUrl = 'https://nobleenterprises.com'; // Update with actual domain
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = `${baseUrl}${image}`;

  const defaultKeywords = [
    'noble enterprises',
    'import export services',
    'electrical engineering',
    'civil engineering',
    'mechanical engineering',
    'government contractor',
    'LED signboards',
    'panaflex signboards',
    'neon signboards',
    'offset printing export',
    'rawalpindi contractor',
    'karachi engineering',
    'pakistan engineering services'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={businessInfo.name} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="application-name" content={businessInfo.name} />
      <meta name="apple-mobile-web-app-title" content={businessInfo.name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Business Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": businessInfo.name,
            "description": businessInfo.description,
            "url": baseUrl,
            "telephone": businessInfo.phone,
            "email": businessInfo.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "53, Zain Pipe & Sanitary Store, Chur Chowk, Peshawar Road",
              "addressLocality": "Rawalpindi",
              "addressCountry": "Pakistan"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "33.6844",
              "longitude": "73.0479"
            },
            "openingHours": [
              "Mo-Fr 08:00-18:00",
              "Sa 09:00-16:00"
            ],
            "sameAs": [
              // Add social media URLs when available
            ]
          })
        }}
      />
    </Head>
  );
}