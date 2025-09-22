import { BusinessInfo } from "@/app/types";

export const businessInfo: BusinessInfo = {
  image: "/images/logo.png", // We'll add this image later
  name: "NOBLE ENTERPRISES",
  tagline: "Import, Export, Electrical, Civil, Mechanical Engineers",
  phone: "+92-3315666788",
  email: "sarsharrana65@gmail.com",
  secondaryEmail: "sarsharrana@yahoo.com",
  address:
    "53, Zain Pipe & Sanitary Store, Chur Chowk, Peshawar Road, Rawalpindi",
  karachiAddress:
    "Room No. 2, Dilkusha Chamber, Noman Street, Plaza Quarters, Karachi",
  hours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM",
  yearsExperience: 15,
  description:
    "Noble Enterprises is a comprehensive engineering and contracting company specializing in import/export services, electrical systems, civil engineering, and mechanical solutions. We are contractors and general order suppliers for government projects, license holders, and experts in LED signboards, panaflex signboards, neon signboards, and all types of offset printing export services.",
  specializations: [
    "Import & Export Services",
    "Electrical Engineering Solutions",
    "Civil Engineering Projects",
    "Mechanical Engineering Services",
    "Government Contracting",
    "General Order Supply",
    "LED Signboards",
    "Panaflex Signboards",
    "Neon Signboards",
    "Offset Printing Export",
    "License Holders & Permits",
  ],
};

// Additional business configuration data
export const businessHours = {
  monday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  tuesday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  wednesday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  thursday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  friday: { open: "8:00 AM", close: "6:00 PM", isOpen: true },
  saturday: { open: "9:00 AM", close: "4:00 PM", isOpen: true },
  sunday: { open: "", close: "", isOpen: false },
};

export const contactMethods = [
  {
    type: "phone",
    label: "Call Us",
    value: "+92-3315666788",
    href: "tel:+923315666788",
    icon: "phone",
    primary: true,
  },
  {
    type: "email",
    label: "Email Us (Primary)",
    value: "sarsharrana65@gmail.com",
    href: "mailto:sarsharrana65@gmail.com",
    icon: "email",
    primary: true,
  },
  {
    type: "email",
    label: "Email Us (Secondary)",
    value: "sarsharrana@yahoo.com",
    href: "mailto:sarsharrana@yahoo.com",
    icon: "email",
    primary: false,
  },
  {
    type: "address",
    label: "Rawalpindi Office",
    value:
      "53, Zain Pipe & Sanitary Store, Chur Chowk, Peshawar Road, Rawalpindi",
    href: "https://maps.google.com/?q=53+Zain+Pipe+Sanitary+Store+Chur+Chowk+Peshawar+Road+Rawalpindi",
    icon: "location",
    primary: true,
  },
  {
    type: "address",
    label: "Karachi Office",
    value:
      "Room No. 2, Dilkusha Chamber, Noman Street, Plaza Quarters, Karachi",
    href: "https://maps.google.com/?q=Room+2+Dilkusha+Chamber+Noman+Street+Plaza+Quarters+Karachi",
    icon: "location",
    primary: false,
  },
];

export const businessCredentials = [
  "Licensed Government Contractor",
  "Import/Export License Holders",
  "Electrical Engineering Certified",
  "Civil Engineering Licensed",
  "Mechanical Engineering Qualified",
  "General Order Supplier - Government",
  "15+ Years Industry Experience",
  "Signboard Manufacturing Expert",
  "Offset Printing Export Certified",
];

export const responseTimeInfo = {
  phoneResponse: "Same day response during business hours",
  emailResponse: "Within 24 hours",
  quoteResponse: "Free quotes provided within 48 hours",
  emergencyResponse: "Emergency services available",
};

// Company history and timeline
export const companyHistory = [
  {
    year: "2009",
    title: "Company Founded",
    description:
      "Noble Enterprises was established with a vision to provide comprehensive engineering and contracting services across multiple disciplines.",
  },
  {
    year: "2012",
    title: "Import/Export Division",
    description:
      "Expanded into import/export services, becoming a trusted supplier for government and private sector projects.",
  },
  {
    year: "2015",
    title: "Engineering Specialization",
    description:
      "Developed specialized teams for electrical, civil, and mechanical engineering projects, enhancing our technical capabilities.",
  },
  {
    year: "2018",
    title: "Government Contracting",
    description:
      "Became licensed government contractors and general order suppliers, expanding our reach in public sector projects.",
  },
  {
    year: "2021",
    title: "Signage Excellence",
    description:
      "Established ourselves as leaders in LED, panaflex, and neon signboard manufacturing with export capabilities.",
  },
  {
    year: "2024",
    title: "15+ Years of Excellence",
    description:
      "Celebrating over 15 years of successful engineering projects, signage solutions, and import/export services.",
  },
];

// Team information
export const teamInfo = {
  founder: {
    name: "Sarah & Steve Johnson",
    title: "Founders & Lead Contractors",
    experience: "15+ years",
    description:
      "With over 15 years of combined experience in construction and signage, Sarah and Steve founded S&S ENTERPRISES to bring quality craftsmanship and reliable service to every project.",
    specialties: [
      "Project Management",
      "Custom Design",
      "Quality Control",
      "Client Relations",
    ],
  },
  team: [
    {
      name: "Mike Rodriguez",
      title: "Senior Sign Installer",
      experience: "8 years",
      specialties: ["LED Installation", "Electrical Work", "Safety Compliance"],
    },
    {
      name: "Lisa Chen",
      title: "Design Specialist",
      experience: "6 years",
      specialties: ["Custom Design", "Brand Development", "Digital Graphics"],
    },
    {
      name: "David Thompson",
      title: "Construction Foreman",
      experience: "10 years",
      specialties: [
        "Commercial Construction",
        "Project Coordination",
        "Quality Assurance",
      ],
    },
  ],
};

// Business testimonials (legacy - use testimonials.ts instead)
export const businessTestimonials = [
  {
    id: "testimonial-1",
    name: "Jennifer Martinez",
    company: "Downtown Restaurant Group",
    project: "Restaurant Signage Installation",
    content:
      "S&S ENTERPRISES transformed our restaurant's visibility with their custom LED signage. Professional, timely, and the quality exceeded our expectations. Highly recommended!",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: "testimonial-2",
    name: "Robert Kim",
    company: "TechStart Office Complex",
    project: "Office Building Renovation",
    content:
      "The team handled our complete office renovation with expertise and professionalism. They delivered on time and within budget. The attention to detail was outstanding.",
    rating: 5,
    date: "2023-11-20",
  },
  {
    id: "testimonial-3",
    name: "Maria Santos",
    company: "Family Home Addition",
    project: "Residential Construction",
    content:
      "We couldn't be happier with our home addition. The team was respectful, clean, and kept us informed throughout the entire process. Quality workmanship!",
    rating: 5,
    date: "2023-09-30",
  },
];

// Awards and recognition
export const awardsAndRecognition = [
  {
    title: "Best Local Contractor 2023",
    organization: "Local Business Association",
    year: "2023",
  },
  {
    title: "Excellence in Signage Design",
    organization: "Regional Signage Association",
    year: "2022",
  },
  {
    title: "Customer Service Excellence",
    organization: "Better Business Bureau",
    year: "2021",
  },
];

// Professional affiliations
export const professionalAffiliations = [
  {
    name: "National Signage Association",
    description: "Member since 2015",
    logo: "/images/affiliations/nsa-logo.png",
  },
  {
    name: "Local Contractors Guild",
    description: "Active member since 2009",
    logo: "/images/affiliations/lcg-logo.png",
  },
  {
    name: "Better Business Bureau",
    description: "A+ Rating since 2010",
    logo: "/images/affiliations/bbb-logo.png",
  },
];
