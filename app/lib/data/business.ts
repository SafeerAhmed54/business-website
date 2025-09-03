import { BusinessInfo } from '@/app/types';

export const businessInfo: BusinessInfo = {
  image: "/images/logo.png", // We'll add this image later
  name: "S&S ENTERPRISES",
  tagline: "Quality Signs & Reliable Construction Services",
  phone: "+92-3315666788",
  email: "info@signboardcontractor.com",
  address: "123 Business Street, Your City, State 12345",
  hours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM",
  yearsExperience: 15,
  description: "With over 15 years of experience in signboard creation and contracting services, we deliver quality craftsmanship and reliable solutions for businesses and residential clients. Our team combines traditional craftsmanship with modern techniques to create durable, attractive signage and complete construction projects on time and within budget.",
  specializations: [
    "Custom Signboard Design & Installation",
    "Commercial Contracting",
    "Residential Construction",
    "Maintenance & Repairs",
    "Project Management",
    "LED & Illuminated Signage",
    "Storefront Design",
    "Building Renovations"
  ]
};

// Additional business configuration data
export const businessHours = {
  monday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  tuesday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  wednesday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  thursday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  friday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  saturday: { open: "9:00 AM", close: "4:00 PM", isOpen: true },
  sunday: { open: "", close: "", isOpen: false }
};

export const contactMethods = [
  {
    type: "phone",
    label: "Call Us",
    value: "+92-3315666788",
    href: "tel:+923315666788",
    icon: "phone",
    primary: true
  },
  {
    type: "email",
    label: "Email Us",
    value: "info@signboardcontractor.com",
    href: "mailto:info@signboardcontractor.com",
    icon: "email",
    primary: true
  },
  {
    type: "address",
    label: "Visit Us",
    value: "123 Business Street, Your City, State 12345",
    href: "https://maps.google.com/?q=123+Business+Street,+Your+City,+State+12345",
    icon: "location",
    primary: false
  }
];

export const businessCredentials = [
  "Licensed General Contractor",
  "Certified Sign Installation Professional",
  "15+ Years Industry Experience",
  "Fully Insured & Bonded",
  "Local Business Association Member"
];

export const responseTimeInfo = {
  phoneResponse: "Same day response during business hours",
  emailResponse: "Within 24 hours",
  quoteResponse: "Free quotes provided within 48 hours",
  emergencyResponse: "Emergency services available"
};