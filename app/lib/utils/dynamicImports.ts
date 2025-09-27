import { lazy } from 'react';

// Dynamic imports for components that are not immediately needed
export const DynamicPortfolioGallery = lazy(() => 
  import('@/app/components/PortfolioGallery').then(module => ({
    default: module.default
  }))
);

export const DynamicImageModal = lazy(() => 
  import('@/app/components/ui/ImageModal').then(module => ({
    default: module.default
  }))
);

export const DynamicProjectModal = lazy(() => 
  import('@/app/components/ProjectModal').then(module => ({
    default: module.default
  }))
);

// ContactForm component will be implemented later
// export const DynamicContactForm = lazy(() => 
//   import('@/app/components/ContactForm').then(module => ({
//     default: module.default
//   }))
// );

// Utility function for preloading components
export const preloadComponent = (importFn: () => Promise<unknown>) => {
  const componentImport = importFn();
  return componentImport;
};

// Preload critical components on user interaction
export const preloadCriticalComponents = () => {
  // Preload portfolio gallery when user hovers over portfolio link
  const portfolioLinks = document.querySelectorAll('[href*="portfolio"], [data-scroll-to="portfolio"]');
  portfolioLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      preloadComponent(() => import('@/app/components/PortfolioGallery'));
    }, { once: true });
  });

  // Contact form preloading will be implemented later
  // const contactLinks = document.querySelectorAll('[href*="contact"], [data-scroll-to="contact"]');
  // contactLinks.forEach(link => {
  //   link.addEventListener('mouseenter', () => {
  //     preloadComponent(() => import('@/app/components/ContactForm'));
  //   }, { once: true });
  // });
};

// Resource hints for better performance
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;

  // DNS prefetch for external resources
  const dnsPrefetchLinks = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  dnsPrefetchLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  });

  // Preconnect to critical resources
  const preconnectLinks = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') return fn();
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }).catch(() => {
    // Silently fail if web-vitals is not available
  });
};