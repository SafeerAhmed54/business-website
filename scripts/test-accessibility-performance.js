#!/usr/bin/env node

/**
 * Accessibility and Performance Audit Script
 * Tests accessibility compliance and performance optimizations
 */

const fs = require('fs');
const path = require('path');

let testResults = {
  timestamp: new Date().toISOString(),
  accessibility: [],
  performance: [],
  seo: [],
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: '🔍',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }[type];
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function addResult(category, test, status, message, details = {}) {
  const result = {
    category,
    test,
    status,
    message,
    details,
    timestamp: new Date().toISOString()
  };
  
  if (category === 'accessibility') testResults.accessibility.push(result);
  else if (category === 'performance') testResults.performance.push(result);
  else if (category === 'seo') testResults.seo.push(result);
  
  testResults.summary.total++;
  if (status === 'passed') testResults.summary.passed++;
  else if (status === 'failed') testResults.summary.failed++;
  else if (status === 'warning') testResults.summary.warnings++;
}

function testAccessibilityCompliance() {
  log('Testing accessibility compliance...', 'info');
  
  const componentFiles = [
    'app/components/Header.tsx',
    'app/components/Footer.tsx',
    'app/components/sections/Hero.tsx',
    'app/components/sections/Contact.tsx',
    'app/components/PortfolioGallery.tsx',
    'app/components/ui/ImageModal.tsx'
  ];
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for ARIA labels and roles
      const ariaPatterns = [
        { name: 'ARIA Labels', pattern: /aria-label=|aria-labelledby=|aria-describedby=/ },
        { name: 'ARIA Roles', pattern: /role=/ },
        { name: 'ARIA States', pattern: /aria-expanded=|aria-hidden=|aria-current=/ }
      ];
      
      ariaPatterns.forEach(({ name, pattern }) => {
        if (pattern.test(content)) {
          addResult(
            'accessibility',
            `${name} - ${path.basename(file)}`,
            'passed',
            `Component includes ${name.toLowerCase()}`
          );
        } else {
          addResult(
            'accessibility',
            `${name} - ${path.basename(file)}`,
            'warning',
            `Component may lack ${name.toLowerCase()}`
          );
        }
      });
      
      // Test for semantic HTML
      const semanticElements = [
        'header', 'nav', 'main', 'section', 'article', 'aside', 'footer',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      ];
      
      const hasSemanticHTML = semanticElements.some(element => 
        new RegExp(`<${element}|</${element}>`, 'i').test(content)
      );
      
      if (hasSemanticHTML) {
        addResult(
          'accessibility',
          `Semantic HTML - ${path.basename(file)}`,
          'passed',
          'Component uses semantic HTML elements'
        );
      } else {
        addResult(
          'accessibility',
          `Semantic HTML - ${path.basename(file)}`,
          'warning',
          'Component may lack semantic HTML elements'
        );
      }
      
      // Test for keyboard navigation support
      const keyboardPatterns = [
        'onKeyDown', 'onKeyUp', 'onKeyPress', 'tabIndex', 'autoFocus'
      ];
      
      const hasKeyboardSupport = keyboardPatterns.some(pattern => 
        new RegExp(pattern, 'i').test(content)
      );
      
      if (hasKeyboardSupport) {
        addResult(
          'accessibility',
          `Keyboard Navigation - ${path.basename(file)}`,
          'passed',
          'Component supports keyboard navigation'
        );
      } else {
        addResult(
          'accessibility',
          `Keyboard Navigation - ${path.basename(file)}`,
          'warning',
          'Component may lack keyboard navigation support'
        );
      }
      
      // Test for focus management
      const focusPatterns = [
        'focus:', 'focus-visible:', 'focus-within:', 'outline-', 'ring-'
      ];
      
      const hasFocusManagement = focusPatterns.some(pattern => 
        content.includes(pattern)
      );
      
      if (hasFocusManagement) {
        addResult(
          'accessibility',
          `Focus Management - ${path.basename(file)}`,
          'passed',
          'Component includes focus management styles'
        );
      } else {
        addResult(
          'accessibility',
          `Focus Management - ${path.basename(file)}`,
          'warning',
          'Component may lack focus management styles'
        );
      }
      
      // Test for alt text on images
      if (content.includes('<img') || content.includes('Image from')) {
        const hasAltText = /alt=|alt\s*:/i.test(content);
        
        if (hasAltText) {
          addResult(
            'accessibility',
            `Image Alt Text - ${path.basename(file)}`,
            'passed',
            'Images include alt text'
          );
        } else {
          addResult(
            'accessibility',
            `Image Alt Text - ${path.basename(file)}`,
            'failed',
            'Images may be missing alt text'
          );
        }
      }
      
      // Test for form labels
      if (content.includes('<input') || content.includes('<textarea')) {
        const hasLabels = /htmlFor=|<label|aria-label=/i.test(content);
        
        if (hasLabels) {
          addResult(
            'accessibility',
            `Form Labels - ${path.basename(file)}`,
            'passed',
            'Form inputs have proper labels'
          );
        } else {
          addResult(
            'accessibility',
            `Form Labels - ${path.basename(file)}`,
            'failed',
            'Form inputs may be missing labels'
          );
        }
      }
    }
  });
}

function testColorContrast() {
  log('Testing color contrast and visual accessibility...', 'info');
  
  // Check Tailwind CSS configuration for color usage
  if (fs.existsSync('app/globals.css')) {
    const cssContent = fs.readFileSync('app/globals.css', 'utf8');
    
    // Test for custom color definitions
    const hasCustomColors = /:root|--color|@apply/.test(cssContent);
    
    if (hasCustomColors) {
      addResult(
        'accessibility',
        'Custom Color System',
        'passed',
        'Custom color system is defined'
      );
    }
    
    // Test for dark mode support
    const hasDarkMode = /dark:|@media.*prefers-color-scheme/.test(cssContent);
    
    if (hasDarkMode) {
      addResult(
        'accessibility',
        'Dark Mode Support',
        'passed',
        'Dark mode styles are implemented'
      );
    } else {
      addResult(
        'accessibility',
        'Dark Mode Support',
        'warning',
        'Dark mode support may be missing'
      );
    }
  }
  
  // Check for high contrast color combinations in components
  const colorFiles = [
    'app/components/sections/Hero.tsx',
    'app/components/Header.tsx'
  ];
  
  colorFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for potentially problematic color combinations
      const lowContrastPatterns = [
        'text-gray-400.*bg-gray-300',
        'text-yellow-300.*bg-yellow-200',
        'text-blue-300.*bg-blue-200'
      ];
      
      const hasLowContrast = lowContrastPatterns.some(pattern => 
        new RegExp(pattern).test(content)
      );
      
      if (!hasLowContrast) {
        addResult(
          'accessibility',
          `Color Contrast - ${path.basename(file)}`,
          'passed',
          'No obvious low-contrast color combinations found'
        );
      } else {
        addResult(
          'accessibility',
          `Color Contrast - ${path.basename(file)}`,
          'warning',
          'Potential low-contrast color combinations detected'
        );
      }
    }
  });
}

function testPerformanceOptimizations() {
  log('Testing performance optimizations...', 'info');
  
  // Test for Next.js Image optimization
  const imageFiles = [
    'app/components/sections/Hero.tsx',
    'app/components/sections/FeaturedProjects.tsx',
    'app/components/PortfolioGallery.tsx'
  ];
  
  imageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      if (content.includes('next/image') || content.includes('Image from')) {
        addResult(
          'performance',
          `Image Optimization - ${path.basename(file)}`,
          'passed',
          'Uses Next.js Image component for optimization'
        );
      } else if (content.includes('<img')) {
        addResult(
          'performance',
          `Image Optimization - ${path.basename(file)}`,
          'warning',
          'Uses regular img tags instead of optimized Image component'
        );
      }
    }
  });
  
  // Test for lazy loading
  const lazyLoadingFiles = [
    'app/page.tsx',
    'app/components/sections/FeaturedProjects.tsx'
  ];
  
  lazyLoadingFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      if (content.includes('dynamic(') || content.includes('lazy(')) {
        addResult(
          'performance',
          `Lazy Loading - ${path.basename(file)}`,
          'passed',
          'Implements lazy loading for components'
        );
      }
      
      if (content.includes('loading=') || content.includes('priority=')) {
        addResult(
          'performance',
          `Image Loading Strategy - ${path.basename(file)}`,
          'passed',
          'Implements image loading strategies'
        );
      }
    }
  });
  
  // Test for code splitting
  if (fs.existsSync('app/page.tsx')) {
    const content = fs.readFileSync('app/page.tsx', 'utf8');
    
    if (content.includes('dynamic(')) {
      addResult(
        'performance',
        'Code Splitting',
        'passed',
        'Implements dynamic imports for code splitting'
      );
    } else {
      addResult(
        'performance',
        'Code Splitting',
        'warning',
        'May benefit from code splitting with dynamic imports'
      );
    }
  }
  
  // Test for loading states
  const loadingFiles = [
    'app/loading.tsx',
    'app/components/ui/LoadingSkeleton.tsx'
  ];
  
  loadingFiles.forEach(file => {
    if (fs.existsSync(file)) {
      addResult(
        'performance',
        `Loading States - ${path.basename(file)}`,
        'passed',
        'Loading state component exists'
      );
    }
  });
  
  // Test for error boundaries
  if (fs.existsSync('app/components/ui/ErrorBoundary.tsx')) {
    addResult(
      'performance',
      'Error Boundaries',
      'passed',
      'Error boundary component exists for better UX'
    );
  } else {
    addResult(
      'performance',
      'Error Boundaries',
      'warning',
      'Consider adding error boundaries for better error handling'
    );
  }
  
  // Test for font optimization
  if (fs.existsSync('app/layout.tsx')) {
    const content = fs.readFileSync('app/layout.tsx', 'utf8');
    
    if (content.includes('next/font')) {
      addResult(
        'performance',
        'Font Optimization',
        'passed',
        'Uses Next.js font optimization'
      );
    }
    
    if (content.includes('preload') || content.includes('display: "swap"')) {
      addResult(
        'performance',
        'Font Loading Strategy',
        'passed',
        'Implements font loading optimizations'
      );
    }
  }
  
  // Test for bundle optimization
  if (fs.existsSync('next.config.ts') || fs.existsSync('next.config.js')) {
    const configFile = fs.existsSync('next.config.ts') ? 'next.config.ts' : 'next.config.js';
    const content = fs.readFileSync(configFile, 'utf8');
    
    if (content.includes('compress') || content.includes('gzip')) {
      addResult(
        'performance',
        'Compression',
        'passed',
        'Compression is configured'
      );
    }
    
    if (content.includes('images')) {
      addResult(
        'performance',
        'Image Configuration',
        'passed',
        'Image optimization is configured'
      );
    }
  }
}

function testSEOOptimizations() {
  log('Testing SEO optimizations...', 'info');
  
  const pageFiles = [
    'app/page.tsx',
    'app/services/page.tsx',
    'app/portfolio/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx'
  ];
  
  pageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for metadata
      if (content.includes('export const metadata') || content.includes('Metadata')) {
        addResult(
          'seo',
          `Metadata - ${path.basename(file)}`,
          'passed',
          'Page includes metadata configuration'
        );
      } else {
        addResult(
          'seo',
          `Metadata - ${path.basename(file)}`,
          'failed',
          'Page is missing metadata configuration'
        );
      }
      
      // Test for structured data
      if (content.includes('StructuredData')) {
        addResult(
          'seo',
          `Structured Data - ${path.basename(file)}`,
          'passed',
          'Page includes structured data'
        );
      } else {
        addResult(
          'seo',
          `Structured Data - ${path.basename(file)}`,
          'warning',
          'Page may benefit from structured data'
        );
      }
      
      // Test for Open Graph tags
      if (content.includes('openGraph')) {
        addResult(
          'seo',
          `Open Graph - ${path.basename(file)}`,
          'passed',
          'Page includes Open Graph metadata'
        );
      } else {
        addResult(
          'seo',
          `Open Graph - ${path.basename(file)}`,
          'warning',
          'Page may be missing Open Graph metadata'
        );
      }
      
      // Test for Twitter Card tags
      if (content.includes('twitter')) {
        addResult(
          'seo',
          `Twitter Cards - ${path.basename(file)}`,
          'passed',
          'Page includes Twitter Card metadata'
        );
      } else {
        addResult(
          'seo',
          `Twitter Cards - ${path.basename(file)}`,
          'warning',
          'Page may be missing Twitter Card metadata'
        );
      }
    }
  });
  
  // Test for sitemap
  if (fs.existsSync('app/sitemap.ts')) {
    addResult(
      'seo',
      'Sitemap',
      'passed',
      'Sitemap configuration exists'
    );
  } else {
    addResult(
      'seo',
      'Sitemap',
      'warning',
      'Sitemap configuration is missing'
    );
  }
  
  // Test for robots.txt
  if (fs.existsSync('app/robots.ts')) {
    addResult(
      'seo',
      'Robots.txt',
      'passed',
      'Robots.txt configuration exists'
    );
  } else {
    addResult(
      'seo',
      'Robots.txt',
      'warning',
      'Robots.txt configuration is missing'
    );
  }
  
  // Test for canonical URLs
  const layoutContent = fs.existsSync('app/layout.tsx') ? 
    fs.readFileSync('app/layout.tsx', 'utf8') : '';
  
  if (layoutContent.includes('canonical')) {
    addResult(
      'seo',
      'Canonical URLs',
      'passed',
      'Canonical URLs are configured'
    );
  } else {
    addResult(
      'seo',
      'Canonical URLs',
      'warning',
      'Canonical URLs may be missing'
    );
  }
}

function testKeyboardNavigation() {
  log('Testing keyboard navigation compliance...', 'info');
  
  const interactiveFiles = [
    'app/components/Header.tsx',
    'app/components/sections/Contact.tsx',
    'app/components/ui/ImageModal.tsx'
  ];
  
  interactiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for tab index management
      const hasTabIndex = /tabIndex|tabindex/.test(content);
      
      if (hasTabIndex) {
        addResult(
          'accessibility',
          `Tab Index - ${path.basename(file)}`,
          'passed',
          'Component manages tab index'
        );
      } else {
        addResult(
          'accessibility',
          `Tab Index - ${path.basename(file)}`,
          'warning',
          'Component may need tab index management'
        );
      }
      
      // Test for keyboard event handlers
      const keyboardEvents = [
        'onKeyDown', 'onKeyUp', 'onKeyPress', 'handleKeyDown'
      ];
      
      const hasKeyboardEvents = keyboardEvents.some(event => 
        content.includes(event)
      );
      
      if (hasKeyboardEvents) {
        addResult(
          'accessibility',
          `Keyboard Events - ${path.basename(file)}`,
          'passed',
          'Component handles keyboard events'
        );
      } else {
        addResult(
          'accessibility',
          `Keyboard Events - ${path.basename(file)}`,
          'warning',
          'Component may need keyboard event handling'
        );
      }
      
      // Test for escape key handling (for modals)
      if (file.includes('Modal') || content.includes('modal')) {
        const hasEscapeHandling = /escape|Escape|key.*27|keyCode.*27/.test(content);
        
        if (hasEscapeHandling) {
          addResult(
            'accessibility',
            `Escape Key Handling - ${path.basename(file)}`,
            'passed',
            'Modal handles escape key'
          );
        } else {
          addResult(
            'accessibility',
            `Escape Key Handling - ${path.basename(file)}`,
            'warning',
            'Modal may need escape key handling'
          );
        }
      }
    }
  });
}

function generateAccessibilityPerformanceReport() {
  log('Generating accessibility and performance audit report...', 'info');
  
  const reportPath = 'test-results/accessibility-performance-audit.json';
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  
  // Generate comprehensive audit report
  const auditReport = `
# Accessibility and Performance Audit Report

**Generated:** ${testResults.timestamp}

## Executive Summary
- **Total Tests**: ${testResults.summary.total}
- **Passed**: ${testResults.summary.passed} ✅
- **Failed**: ${testResults.summary.failed} ❌
- **Warnings**: ${testResults.summary.warnings} ⚠️

## Accessibility Compliance

### WCAG 2.1 Guidelines Checklist
- [ ] **Perceivable**: Information and UI components must be presentable to users in ways they can perceive
- [ ] **Operable**: UI components and navigation must be operable
- [ ] **Understandable**: Information and the operation of UI must be understandable
- [ ] **Robust**: Content must be robust enough to be interpreted by a wide variety of user agents

### Accessibility Test Results
${testResults.accessibility.map(test => `
#### ${test.test}
- **Status**: ${test.status.toUpperCase()}
- **Message**: ${test.message}
`).join('')}

## Performance Optimization

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

### Performance Test Results
${testResults.performance.map(test => `
#### ${test.test}
- **Status**: ${test.status.toUpperCase()}
- **Message**: ${test.message}
`).join('')}

## SEO Optimization

### SEO Test Results
${testResults.seo.map(test => `
#### ${test.test}
- **Status**: ${test.status.toUpperCase()}
- **Message**: ${test.message}
`).join('')}

## Recommended Actions

### High Priority (Failed Tests)
${testResults.accessibility.concat(testResults.performance, testResults.seo)
  .filter(test => test.status === 'failed')
  .map(test => `- **${test.test}**: ${test.message}`)
  .join('\n')}

### Medium Priority (Warnings)
${testResults.accessibility.concat(testResults.performance, testResults.seo)
  .filter(test => test.status === 'warning')
  .map(test => `- **${test.test}**: ${test.message}`)
  .join('\n')}

## Manual Testing Required

### Accessibility Testing
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test keyboard-only navigation
- [ ] Test with high contrast mode
- [ ] Test with browser zoom at 200%
- [ ] Test color contrast ratios
- [ ] Test focus indicators visibility
- [ ] Test form error announcements
- [ ] Test skip links functionality

### Performance Testing
- [ ] Run Lighthouse audit on all pages
- [ ] Test loading speed on 3G connection
- [ ] Test Core Web Vitals in production
- [ ] Test image loading performance
- [ ] Test JavaScript bundle size
- [ ] Test CSS bundle size
- [ ] Test caching effectiveness

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Tools for Further Testing

### Accessibility Tools
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built-in Chrome accessibility audit
- **Color Contrast Analyzers**: For testing color combinations

### Performance Tools
- **Lighthouse**: Performance, accessibility, and SEO audits
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Performance monitoring
- **Chrome DevTools**: Network and performance profiling

### SEO Tools
- **Google Search Console**: Search performance monitoring
- **Screaming Frog**: Technical SEO crawler
- **Schema Markup Validator**: Structured data testing
`;
  
  const auditPath = 'test-results/accessibility-performance-audit-report.md';
  fs.writeFileSync(auditPath, auditReport);
  
  log(`✅ Audit report generated: ${reportPath}`, 'success');
  log(`✅ Detailed audit report generated: ${auditPath}`, 'success');
}

// Main execution
async function runAccessibilityPerformanceAudit() {
  log('Starting accessibility and performance audit...', 'info');
  
  try {
    testAccessibilityCompliance();
    testColorContrast();
    testKeyboardNavigation();
    testPerformanceOptimizations();
    testSEOOptimizations();
    
    generateAccessibilityPerformanceReport();
    
    log('Accessibility and performance audit completed!', 'success');
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('ACCESSIBILITY & PERFORMANCE AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testResults.summary.total}`);
    console.log(`Passed: ${testResults.summary.passed} ✅`);
    console.log(`Failed: ${testResults.summary.failed} ❌`);
    console.log(`Warnings: ${testResults.summary.warnings} ⚠️`);
    console.log('='.repeat(60));
    
    const hasFailures = testResults.summary.failed > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    log(`Accessibility/performance audit failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  runAccessibilityPerformanceAudit();
}

module.exports = {
  runAccessibilityPerformanceAudit,
  testResults
};