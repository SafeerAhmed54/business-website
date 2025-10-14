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
export const measurePerformance = (name: string, fn: () => unknown) => {
  if (typeof window === 'undefined') return fn();
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Web Vitals tracking - using native Performance API
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Use native Performance Observer API instead of web-vitals package
  try {
    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Type assertion for PerformanceEventTiming which has processingStart
        const eventEntry = entry as PerformanceEntry & { processingStart?: number };
        if (eventEntry.processingStart) {
          console.log('FID:', eventEntry.processingStart - entry.startTime);
        }
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
        if (!entry.hadRecentInput && entry.value) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    // Silently fail if Performance Observer is not supported
    console.warn('Performance monitoring not supported in this browser', error);
  }
};