import { Project, ProjectCategory } from '@/app/types';

export const projects: Project[] = [
  {
    id: 'restaurant-signboard',
    title: 'Downtown Restaurant Signboard',
    description: 'Custom illuminated signboard for a popular downtown restaurant featuring weather-resistant materials and LED lighting.',
    category: 'signboard',
    images: ['/images/portfolio/restaurant-sign-1.jpg'],
    completedDate: '2024-01-15',
    featured: true,
    location: 'Downtown District',
    clientType: 'Restaurant'
  },
  {
    id: 'office-renovation',
    title: 'Office Building Renovation',
    description: 'Complete renovation of a 3-story office building including interior updates and exterior improvements.',
    category: 'contracting',
    images: ['/images/portfolio/office-renovation-1.jpg'],
    completedDate: '2023-11-20',
    featured: true,
    location: 'Business District',
    clientType: 'Commercial'
  },
  {
    id: 'retail-storefront',
    title: 'Retail Storefront Signage',
    description: 'Modern storefront signage system with integrated lighting and brand elements for a retail chain.',
    category: 'signboard',
    images: ['/images/portfolio/retail-storefront-1.jpg'],
    completedDate: '2024-02-10',
    featured: true,
    location: 'Shopping Center',
    clientType: 'Retail'
  },
  {
    id: 'residential-addition',
    title: 'Home Addition Project',
    description: 'Two-story home addition including new kitchen, family room, and master bedroom suite.',
    category: 'contracting',
    images: ['/images/portfolio/home-addition-1.jpg'],
    completedDate: '2023-09-30',
    featured: false,
    location: 'Residential Area',
    clientType: 'Residential'
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

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};