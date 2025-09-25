import { businessInfo, contactMethods } from '@/app/lib/data/business';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'website';
  pageType?: 'homepage' | 'about' | 'services' | 'portfolio' | 'contact';
}

export default function StructuredData({ type = 'organization', pageType = 'homepage' }: StructuredDataProps) {
  const baseUrl = 'https://nobleenterprises.com'; // Update with actual domain
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": businessInfo.name,
    "description": businessInfo.description,
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "image": `${baseUrl}/images/logo.png`,
    "telephone": businessInfo.phone,
    "email": businessInfo.email,
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "53, Zain Pipe & Sanitary Store, Chur Chowk, Peshawar Road",
        "addressLocality": "Rawalpindi",
        "addressCountry": "Pakistan",
        "name": "Rawalpindi Office"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Room No. 2, Dilkusha Chamber, Noman Street, Plaza Quarters",
        "addressLocality": "Karachi",
        "addressCountry": "Pakistan",
        "name": "Karachi Office"
      }
    ],
    "foundingDate": "2009",
    "numberOfEmployees": "10-50",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Pakistan"
      }
    ],
    "serviceArea": [
      {
        "@type": "City",
        "name": "Rawalpindi"
      },
      {
        "@type": "City", 
        "name": "Karachi"
      },
      {
        "@type": "City",
        "name": "Islamabad"
      },
      {
        "@type": "City",
        "name": "Lahore"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering and Contracting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Import & Export Services",
            "description": "Professional import and export services for various industries"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrical Engineering",
            "description": "Comprehensive electrical engineering solutions and installations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Civil Engineering",
            "description": "Professional civil engineering and construction services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mechanical Engineering",
            "description": "Expert mechanical engineering solutions and maintenance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LED Signboards",
            "description": "Custom LED signboard design, manufacturing, and installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Government Contracting",
            "description": "Licensed government contractor and general order supplier"
          }
        }
      ]
    },
    "sameAs": [
      // Add social media URLs when available
    ]
  };

  const localBusinessData = {
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
    "priceRange": "$$",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "PKR"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": businessInfo.name,
    "url": baseUrl,
    "description": businessInfo.description,
    "publisher": {
      "@type": "Organization",
      "name": businessInfo.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      ...(pageType === 'about' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${baseUrl}/about`
      }] : []),
      ...(pageType === 'services' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/services`
      }] : []),
      ...(pageType === 'portfolio' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": `${baseUrl}/portfolio`
      }] : []),
      ...(pageType === 'contact' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${baseUrl}/contact`
      }] : [])
    ]
  };

  let structuredData;
  switch (type) {
    case 'localBusiness':
      structuredData = localBusinessData;
      break;
    case 'website':
      structuredData = websiteData;
      break;
    default:
      structuredData = organizationData;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {pageType !== 'homepage' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      )}
    </>
  );
}