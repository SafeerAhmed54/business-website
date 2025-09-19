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

// Company history and timeline
export const companyHistory = [
  {
    year: "2009",
    title: "Company Founded",
    description: "S&S ENTERPRISES was established with a vision to provide quality signboard and contracting services to local businesses."
  },
  {
    year: "2012",
    title: "Expanded Services",
    description: "Added commercial contracting services to complement our signboard expertise, becoming a full-service construction company."
  },
  {
    year: "2015",
    title: "LED Technology Integration",
    description: "Invested in modern LED signage technology and became certified in illuminated sign installation."
  },
  {
    year: "2018",
    title: "Team Growth",
    description: "Expanded our team to include specialized contractors and designers, allowing us to handle larger projects."
  },
  {
    year: "2021",
    title: "Digital Innovation",
    description: "Introduced digital signage solutions and modern project management systems for improved client experience."
  },
  {
    year: "2024",
    title: "15+ Years Strong",
    description: "Celebrating over 15 years of successful projects and continued growth in the signboard and contracting industry."
  }
];

// Team information
export const teamInfo = {
  founder: {
    name: "Sarah & Steve Johnson",
    title: "Founders & Lead Contractors",
    experience: "15+ years",
    description: "With over 15 years of combined experience in construction and signage, Sarah and Steve founded S&S ENTERPRISES to bring quality craftsmanship and reliable service to every project.",
    specialties: ["Project Management", "Custom Design", "Quality Control", "Client Relations"]
  },
  team: [
    {
      name: "Mike Rodriguez",
      title: "Senior Sign Installer",
      experience: "8 years",
      specialties: ["LED Installation", "Electrical Work", "Safety Compliance"]
    },
    {
      name: "Lisa Chen",
      title: "Design Specialist",
      experience: "6 years",
      specialties: ["Custom Design", "Brand Development", "Digital Graphics"]
    },
    {
      name: "David Thompson",
      title: "Construction Foreman",
      experience: "10 years",
      specialties: ["Commercial Construction", "Project Coordination", "Quality Assurance"]
    }
  ]
};

// Business testimonials (legacy - use testimonials.ts instead)
export const businessTestimonials = [
  {
    id: "testimonial-1",
    name: "Jennifer Martinez",
    company: "Downtown Restaurant Group",
    project: "Restaurant Signage Installation",
    content: "S&S ENTERPRISES transformed our restaurant's visibility with their custom LED signage. Professional, timely, and the quality exceeded our expectations. Highly recommended!",
    rating: 5,
    date: "2024-01-15"
  },
  {
    id: "testimonial-2",
    name: "Robert Kim",
    company: "TechStart Office Complex",
    project: "Office Building Renovation",
    content: "The team handled our complete office renovation with expertise and professionalism. They delivered on time and within budget. The attention to detail was outstanding.",
    rating: 5,
    date: "2023-11-20"
  },
  {
    id: "testimonial-3",
    name: "Maria Santos",
    company: "Family Home Addition",
    project: "Residential Construction",
    content: "We couldn't be happier with our home addition. The team was respectful, clean, and kept us informed throughout the entire process. Quality workmanship!",
    rating: 5,
    date: "2023-09-30"
  }
];

// Awards and recognition
export const awardsAndRecognition = [
  {
    title: "Best Local Contractor 2023",
    organization: "Local Business Association",
    year: "2023"
  },
  {
    title: "Excellence in Signage Design",
    organization: "Regional Signage Association",
    year: "2022"
  },
  {
    title: "Customer Service Excellence",
    organization: "Better Business Bureau",
    year: "2021"
  }
];

// Professional affiliations
export const professionalAffiliations = [
  {
    name: "National Signage Association",
    description: "Member since 2015",
    logo: "/images/affiliations/nsa-logo.png"
  },
  {
    name: "Local Contractors Guild",
    description: "Active member since 2009",
    logo: "/images/affiliations/lcg-logo.png"
  },
  {
    name: "Better Business Bureau",
    description: "A+ Rating since 2010",
    logo: "/images/affiliations/bbb-logo.png"
  }
];