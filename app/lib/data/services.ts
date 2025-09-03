import { Service, ServiceCategory } from '@/app/types';

export const services: Service[] = [
  {
    id: 'custom-signboards',
    title: 'Custom Signboard Design',
    description: 'Professional signboard design and creation tailored to your business needs. From concept to completion, we create eye-catching signs that represent your brand.',
    category: 'signboard',
    icon: 'design',
    features: [
      'Custom design consultation',
      'Brand-aligned design concepts',
      'High-quality materials (aluminum, acrylic, wood)',
      'Weather-resistant finishes',
      'Digital mockups and previews',
      'Professional installation',
      'Maintenance support'
    ]
  },
  {
    id: 'signboard-installation',
    title: 'Signboard Installation',
    description: 'Expert installation services for all types of signboards and displays. Safe, secure, and compliant installations every time.',
    category: 'signboard',
    icon: 'installation',
    features: [
      'Comprehensive site assessment',
      'Permit assistance and compliance',
      'Professional mounting systems',
      'Electrical connections for illuminated signs',
      'Safety compliance and inspections',
      'Post-installation testing',
      'Warranty on installation work'
    ]
  },
  {
    id: 'led-illuminated-signs',
    title: 'LED & Illuminated Signage',
    description: 'Modern LED and illuminated signage solutions for maximum visibility day and night.',
    category: 'signboard',
    icon: 'led',
    features: [
      'Energy-efficient LED technology',
      'Programmable display options',
      'Timer and dimming controls',
      'Weather-sealed electrical components',
      'Low maintenance requirements',
      'Remote monitoring capabilities',
      '5-year warranty on LED components'
    ]
  },
  {
    id: 'commercial-contracting',
    title: 'Commercial Contracting',
    description: 'Comprehensive contracting services for commercial properties and businesses. From small repairs to major renovations.',
    category: 'contracting',
    icon: 'commercial',
    features: [
      'Detailed project planning',
      'Licensed and insured contractors',
      'Quality materials and suppliers',
      'Timely project completion',
      'Building code compliance',
      'Warranty coverage',
      'Project management services'
    ]
  },
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    description: 'Reliable construction and renovation services for residential properties. Quality craftsmanship for your home.',
    category: 'contracting',
    icon: 'residential',
    features: [
      'Home renovations and remodeling',
      'Room additions and extensions',
      'Kitchen and bathroom upgrades',
      'Repair and maintenance services',
      'Quality craftsmanship guarantee',
      'Competitive and transparent pricing',
      'Clean and organized work sites'
    ]
  },
  {
    id: 'storefront-design',
    title: 'Storefront Design & Build',
    description: 'Complete storefront design and construction services to create an attractive and functional business entrance.',
    category: 'both',
    icon: 'storefront',
    features: [
      'Architectural design consultation',
      'Storefront construction',
      'Window and door installation',
      'Integrated signage solutions',
      'ADA compliance',
      'Security considerations',
      'Turnkey project delivery'
    ]
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'signboard',
    name: 'Signboard Services',
    description: 'Professional signboard design, creation, and installation services for businesses of all sizes.',
    services: services.filter(service => service.category === 'signboard')
  },
  {
    id: 'contracting',
    name: 'Contracting Services',
    description: 'Comprehensive construction and contracting solutions for commercial and residential projects.',
    services: services.filter(service => service.category === 'contracting')
  },
  {
    id: 'combined',
    name: 'Combined Services',
    description: 'Integrated signboard and construction services for complete project solutions.',
    services: services.filter(service => service.category === 'both')
  }
];

// Utility functions for service data
export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  if (category === 'all') return services;
  return services.filter(service => service.category === category);
};

export const getFeaturedServices = (): Service[] => {
  // Return the first 4 services as featured
  return services.slice(0, 4);
};