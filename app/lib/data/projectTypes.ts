// Project type options for contact forms and filtering
export const projectTypes = [
  {
    id: 'signboard-design',
    label: 'Custom Signboard Design',
    category: 'signboard',
    description: 'New signboard design and creation'
  },
  {
    id: 'signboard-installation',
    label: 'Signboard Installation',
    category: 'signboard',
    description: 'Installation of existing signboard'
  },
  {
    id: 'led-signage',
    label: 'LED/Illuminated Signage',
    category: 'signboard',
    description: 'LED or illuminated sign solutions'
  },
  {
    id: 'commercial-construction',
    label: 'Commercial Construction',
    category: 'contracting',
    description: 'Commercial building or renovation project'
  },
  {
    id: 'residential-construction',
    label: 'Residential Construction',
    category: 'contracting',
    description: 'Home construction or renovation'
  },
  {
    id: 'storefront-project',
    label: 'Storefront Design & Build',
    category: 'both',
    description: 'Complete storefront construction and signage'
  },
  {
    id: 'maintenance-repair',
    label: 'Maintenance & Repair',
    category: 'both',
    description: 'Maintenance or repair services'
  },
  {
    id: 'consultation',
    label: 'Consultation',
    category: 'both',
    description: 'Project consultation and planning'
  },
  {
    id: 'other',
    label: 'Other',
    category: 'both',
    description: 'Other project type not listed'
  }
];

export const getProjectTypesByCategory = (category: string) => {
  if (category === 'all') return projectTypes;
  return projectTypes.filter(type => type.category === category || type.category === 'both');
};

export const getProjectTypeById = (id: string) => {
  return projectTypes.find(type => type.id === id);
};