// Core business data interfaces
export interface BusinessInfo {
  image?: string;
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  yearsExperience: number;
  description: string;
  specializations: string[];
}

// Project and portfolio interfaces
export interface Project {
  id: string;
  title: string;
  description: string;
  category: "signboard" | "contracting" | "both";
  images: string[];
  completedDate: string;
  featured: boolean;
  location?: string;
  clientType?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
}

// Contact form interfaces
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

// Service interfaces
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  category: "signboard" | "contracting";
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

// Navigation and UI interfaces
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// Testimonial interface for future use
export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating?: number;
  projectType?: string;
}

// Form submission response interface
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
}
