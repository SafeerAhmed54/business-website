# Design Document

## Overview

The signboard and contractor business website will be built using Next.js 15 with App Router, TypeScript, and Tailwind CSS v4. The design follows modern web standards with a focus on professional presentation, mobile-first responsive design, and optimal performance. The site will use a clean, trustworthy aesthetic that reflects the quality and reliability expected from a contracting business.

## Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router for optimal performance and SEO
- **Language**: TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS v4 for utility-first responsive design
- **Images**: Next.js Image component for automatic optimization
- **Fonts**: Google Fonts (Geist family) for professional typography
- **Deployment**: Vercel (recommended) for seamless Next.js hosting

### Site Structure
```
/                    - Homepage with hero, services overview, CTA
/services           - Detailed services page
/portfolio          - Project gallery and case studies
/about             - Company history, team, credentials
/contact           - Contact form, business info, location
```

### Performance Strategy
- Static generation where possible using Next.js App Router
- Image optimization with Next.js Image component
- Lazy loading for portfolio images
- Minimal JavaScript bundle with server-side rendering
- Tailwind CSS purging for minimal CSS bundle

## Components and Interfaces

### Core Components

#### 1. Layout Components
- **Header/Navigation**: Responsive navigation with mobile hamburger menu
- **Footer**: Contact info, business hours, social links
- **Layout**: Consistent page wrapper with metadata

#### 2. Homepage Components
- **Hero Section**: Business name, tagline, primary CTA
- **Services Overview**: Grid of main service categories
- **Featured Projects**: Showcase of 3-4 best portfolio pieces
- **Trust Indicators**: Years of experience, certifications, testimonials
- **Contact CTA**: Prominent contact section

#### 3. Portfolio Components
- **Project Gallery**: Masonry or grid layout for project images
- **Project Card**: Individual project with image, title, description
- **Image Modal**: Lightbox for enlarged project views
- **Filter System**: Category filtering (signboards, contracting, etc.)

#### 4. Contact Components
- **Contact Form**: Name, email, phone, project type, message
- **Business Info Card**: Address, phone, email, hours
- **Map Integration**: Embedded map showing business location

#### 5. Shared Components
- **Button**: Consistent CTA styling
- **Card**: Reusable content containers
- **Section**: Page section wrapper with consistent spacing
- **Loading States**: Skeleton loaders for better UX

### Component Interface Design

```typescript
// Core interfaces
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'signboard' | 'contracting' | 'both';
  images: string[];
  completedDate: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  yearsExperience: number;
}
```

## Data Models

### Static Content Structure
Since this is a business website, most content will be static or semi-static:

#### 1. Business Information
- Company details, contact info, hours
- Stored in configuration files or environment variables

#### 2. Services Data
- Service categories, descriptions, features
- Stored as TypeScript constants or JSON files

#### 3. Portfolio Projects
- Project information, images, categories
- Stored as JSON data with images in public folder
- Future: Could be moved to CMS for easier updates

#### 4. Content Management
- Initial implementation: Static JSON files
- Future consideration: Headless CMS (Sanity, Contentful) for client updates

### File Organization
```
/app
  /components
    /ui           - Reusable UI components
    /sections     - Page-specific sections
  /lib
    /data         - Static data files
    /utils        - Utility functions
  /types          - TypeScript type definitions
/public
  /images
    /portfolio    - Project images
    /services     - Service-related images
```

## Error Handling

### Client-Side Error Handling
- Form validation with clear error messages
- Image loading fallbacks
- Network error handling for contact form submission
- 404 page for invalid routes

### Performance Error Handling
- Image optimization fallbacks
- Graceful degradation for JavaScript-disabled browsers
- Loading states for slower connections

### Contact Form Error Handling
- Field validation (required fields, email format, phone format)
- Server-side validation
- Success/error feedback to users
- Fallback to email link if form fails

## Testing Strategy

### Component Testing
- Unit tests for individual components using Jest and React Testing Library
- Test form validation logic
- Test responsive behavior
- Test accessibility features

### Integration Testing
- Test page navigation and routing
- Test contact form submission flow
- Test portfolio filtering and image loading

### Performance Testing
- Lighthouse audits for performance, accessibility, SEO
- Core Web Vitals monitoring
- Image optimization verification
- Mobile performance testing

### User Experience Testing
- Cross-browser compatibility testing
- Mobile device testing on various screen sizes
- Accessibility testing with screen readers
- Load testing for contact form

### SEO and Metadata Testing
- Meta tags verification
- Open Graph tags for social sharing
- Structured data for business information
- Sitemap generation and validation

## Design System

### Color Palette
- Primary: Professional blue (#1e40af) for trust and reliability
- Secondary: Warm orange (#f97316) for construction/energy
- Neutral: Grays for text and backgrounds
- Success: Green for form confirmations
- Error: Red for validation errors

### Typography
- Headings: Geist Sans (clean, modern)
- Body: Geist Sans for consistency
- Monospace: Geist Mono for technical details

### Spacing and Layout
- Consistent spacing scale using Tailwind's spacing system
- Mobile-first responsive breakpoints
- Maximum content width for readability
- Generous whitespace for professional appearance

### Interactive Elements
- Hover states for all clickable elements
- Focus states for keyboard navigation
- Smooth transitions for better UX
- Loading states for form submissions

This design provides a solid foundation for a professional business website that will effectively showcase your father's signboard and contracting services while providing an excellent user experience across all devices.