import { Service, ServiceCategory } from '@/app/types';

export const services: Service[] = [
  {
    id: 'custom-signboards',
    title: 'Custom Signboard Design',
    description: 'Professional signboard design and creation tailored to your business needs.',
    category: 'signboard',
    features: [
      'Custom design consultation',
      'High-quality materials',
      'Weather-resistant finishes',
      'Professional installation',
      'Maintenance support'
    ]
  },
  {
    id: 'signboard-installation',
    title: 'Signboard Installation',
    description: 'Expert installation services for all types of signboards and displays.',
    category: 'signboard',
    features: [
      'Site assessment',
      'Permit assistance',
      'Professional mounting',
      'Electrical connections',
      'Safety compliance'
    ]
  },
  {
    id: 'commercial-contracting',
    title: 'Commercial Contracting',
    description: 'Comprehensive contracting services for commercial properties and businesses.',
    category: 'contracting',
    features: [
      'Project planning',
      'Licensed contractors',
      'Quality materials',
      'Timely completion',
      'Warranty coverage'
    ]
  },
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    description: 'Reliable construction and renovation services for residential properties.',
    category: 'contracting',
    features: [
      'Home renovations',
      'Room additions',
      'Repair services',
      'Quality craftsmanship',
      'Competitive pricing'
    ]
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'signboard',
    name: 'Signboard Services',
    description: 'Professional signboard design, creation, and installation services.',
    services: services.filter(service => service.category === 'signboard')
  },
  {
    id: 'contracting',
    name: 'Contracting Services',
    description: 'Comprehensive construction and contracting solutions.',
    services: services.filter(service => service.category === 'contracting')
  }
];