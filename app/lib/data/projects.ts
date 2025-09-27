import { Project, ProjectCategory } from '@/app/types';

export const projects: Project[] = [
  {
    id: 'restaurant-signboard',
    title: 'Downtown Restaurant Signboard',
    description: 'Custom illuminated signboard for a popular downtown restaurant featuring weather-resistant materials and LED lighting. The design incorporates the restaurant\'s brand colors and includes programmable LED elements for special promotions.',
    category: 'signboard',
    images: [
      '/images/portfolio/restaurant-sign-1.jpg',
      '/images/portfolio/restaurant-sign-2.jpg',
      '/images/portfolio/restaurant-sign-3.jpg'
    ],
    completedDate: '2024-01-15',
    featured: true,
    location: 'Downtown District',
    clientType: 'Restaurant'
  },
  {
    id: 'office-renovation',
    title: 'Office Building Renovation',
    description: 'Complete renovation of a 3-story office building including interior updates, exterior improvements, and modern signage installation. Project included structural updates, new HVAC systems, and contemporary office spaces.',
    category: 'contracting',
    images: [
      '/images/portfolio/office-renovation-1.jpg',
      '/images/portfolio/office-renovation-2.jpg',
      '/images/portfolio/office-renovation-3.jpg'
    ],
    completedDate: '2023-11-20',
    featured: true,
    location: 'Business District',
    clientType: 'Commercial'
  },
  {
    id: 'retail-storefront',
    title: 'Retail Storefront Signage',
    description: 'Modern storefront signage system with integrated lighting and brand elements for a retail chain. Features include backlit channel letters, window graphics, and directional signage.',
    category: 'signboard',
    images: [
      '/images/portfolio/retail-storefront-1.jpg',
      '/images/portfolio/retail-storefront-2.jpg'
    ],
    completedDate: '2024-02-10',
    featured: true,
    location: 'Shopping Center',
    clientType: 'Retail'
  },
  {
    id: 'residential-addition',
    title: 'Home Addition Project',
    description: 'Two-story home addition including new kitchen, family room, and master bedroom suite. Project featured custom millwork, hardwood flooring, and energy-efficient windows.',
    category: 'contracting',
    images: [
      '/images/portfolio/home-addition-1.jpg',
      '/images/portfolio/home-addition-2.jpg'
    ],
    completedDate: '2023-09-30',
    featured: false,
    location: 'Residential Area',
    clientType: 'Residential'
  },
  {
    id: 'medical-office-signage',
    title: 'Medical Office Complex Signage',
    description: 'Comprehensive wayfinding and identification signage system for a multi-tenant medical office complex. Includes ADA-compliant room identification, directory signs, and exterior monument signage.',
    category: 'signboard',
    images: [
      '/images/portfolio/medical-office-1.jpg',
      '/images/portfolio/medical-office-2.jpg'
    ],
    completedDate: '2023-12-05',
    featured: true,
    location: 'Medical District',
    clientType: 'Healthcare'
  },
  {
    id: 'warehouse-renovation',
    title: 'Industrial Warehouse Renovation',
    description: 'Complete renovation of a 15,000 sq ft warehouse facility including new loading docks, office spaces, and industrial signage. Project completed on schedule with minimal disruption to operations.',
    category: 'contracting',
    images: [
      '/images/portfolio/warehouse-1.jpg',
      '/images/portfolio/warehouse-2.jpg'
    ],
    completedDate: '2023-08-15',
    featured: false,
    location: 'Industrial Park',
    clientType: 'Industrial'
  },
  {
    id: 'school-signage-project',
    title: 'Elementary School Signage System',
    description: 'Complete signage system for a newly constructed elementary school including exterior identification, interior wayfinding, classroom signs, and safety signage. All signs meet educational facility standards.',
    category: 'signboard',
    images: [
      '/images/portfolio/school-signage-1.jpg',
      '/images/portfolio/school-signage-2.jpg'
    ],
    completedDate: '2024-03-20',
    featured: false,
    location: 'Education District',
    clientType: 'Educational'
  },
  {
    id: 'hotel-renovation',
    title: 'Boutique Hotel Renovation',
    description: 'Luxury boutique hotel renovation including lobby redesign, room updates, and comprehensive signage package. Combined construction and signage services for a complete transformation.',
    category: 'both',
    images: [
      '/images/portfolio/hotel-renovation-1.jpg',
      '/images/portfolio/hotel-renovation-2.jpg',
      '/images/portfolio/hotel-renovation-3.jpg'
    ],
    completedDate: '2023-10-10',
    featured: true,
    location: 'Historic District',
    clientType: 'Hospitality'
  }
];

export const projectCategories: ProjectCategory[] = [
  {
    id: 'signboard',
    name: 'Signboard Projects',
    description: 'Custom signboard design and installation projects'
  },
  {
    id: 'contracting',
    name: 'Contracting Projects',
    description: 'Construction and renovation projects'
  },
  {
    id: 'both',
    name: 'Combined Projects',
    description: 'Projects involving both signboard and contracting services'
  }
];

// Utility functions for project data
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getRecentProjects = (limit: number = 6): Project[] => {
  return projects
    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
    .slice(0, limit);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByClientType = (clientType: string): Project[] => {
  return projects.filter(project => project.clientType === clientType);
};

export const getAllProjects = (): Project[] => {
  return projects;
};