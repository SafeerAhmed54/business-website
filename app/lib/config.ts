// Site configuration constants
export const siteConfig = {
  name: "Professional Signboard & Contracting",
  url: "https://signboardcontractor.com", // Update with actual domain
  ogImage: "/images/og-image.jpg",
  description: "Quality Signs & Reliable Construction Services with over 15 years of experience",
  links: {
    twitter: "https://twitter.com/signboardcontractor", // Update with actual social links
    facebook: "https://facebook.com/signboardcontractor",
    linkedin: "https://linkedin.com/company/signboardcontractor",
  },
  contact: {
    phone: "(555) 123-4567",
    email: "info@signboardcontractor.com",
    address: "123 Business Street, Your City, State 12345",
  }
};

// Form configuration
export const formConfig = {
  projectTypes: [
    "Custom Signboard",
    "Sign Installation", 
    "Commercial Contracting",
    "Residential Construction",
    "Maintenance & Repairs",
    "Consultation",
    "Other"
  ],
  maxMessageLength: 1000,
  requiredFields: ['name', 'email', 'projectType', 'message']
};

// Image configuration
export const imageConfig = {
  portfolioImageSizes: {
    thumbnail: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 }
  },
  heroImageSizes: {
    mobile: { width: 768, height: 400 },
    desktop: { width: 1920, height: 600 }
  }
};