import { Testimonial } from '@/app/types';

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    company: 'Downtown Bistro',
    content: 'S&S Enterprises created an amazing illuminated sign for our restaurant. The quality is outstanding and it has really helped attract more customers. Their team was professional and completed the work on time.',
    rating: 5,
    projectType: 'signboard'
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    company: 'Chen Medical Group',
    content: 'We hired S&S for our office renovation and signage project. They handled everything from construction to the final sign installation. Excellent communication throughout the project.',
    rating: 5,
    projectType: 'both'
  },
  {
    id: 'testimonial-3',
    name: 'Lisa Rodriguez',
    company: 'Rodriguez Family',
    content: 'Our home addition project was completed beautifully. The team was respectful, clean, and delivered exactly what they promised. We couldn\'t be happier with the results.',
    rating: 5,
    projectType: 'contracting'
  },
  {
    id: 'testimonial-4',
    name: 'David Thompson',
    company: 'Thompson Auto Parts',
    content: 'The new storefront signage has transformed our business appearance. Professional installation and great customer service. Highly recommend S&S Enterprises.',
    rating: 5,
    projectType: 'signboard'
  },
  {
    id: 'testimonial-5',
    name: 'Jennifer Park',
    company: 'Park Dental Clinic',
    content: 'From design consultation to final installation, the entire process was smooth and professional. Our new office signage looks fantastic and meets all ADA requirements.',
    rating: 5,
    projectType: 'signboard'
  }
];

// Utility functions for testimonials
export const getTestimonialsByProjectType = (projectType: string): Testimonial[] => {
  if (projectType === 'all') return testimonials;
  return testimonials.filter(testimonial => testimonial.projectType === projectType);
};

export const getFeaturedTestimonials = (limit: number = 3): Testimonial[] => {
  return testimonials.slice(0, limit);
};