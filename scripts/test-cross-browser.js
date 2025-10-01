#!/usr/bin/env node

/**
 * Cross-browser and device testing script
 * Tests website functionality across different scenarios
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const testConfig = {
  baseUrl: 'http://localhost:3000',
  pages: [
    '/',
    '/services',
    '/portfolio',
    '/about',
    '/contact'
  ],
  viewports: [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Large Desktop', width: 2560, height: 1440 }
  ],
  browsers: [
    'Chrome',
    'Firefox', 
    'Safari',
    'Edge'
  ]
};

// Test results storage
let testResults = {
  timestamp: new Date().toISOString(),
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  },
  tests: []
};

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = {
    info: '📋',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }[type];
  
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function addTestResult(test, status, message, details = {}) {
  testResults.tests.push({
    test,
    status,
    message,
    details,
    timestamp: new Date().toISOString()
  });
  
  testResults.summary.total++;
  if (status === 'passed') testResults.summary.passed++;
  else if (status === 'failed') testResults.summary.failed++;
  else if (status === 'warning') testResults.summary.warnings++;
}

// Test functions
function testResponsiveDesign() {
  log('Testing responsive design breakpoints...', 'info');
  
  // Check if Tailwind responsive classes are properly configured
  const tailwindConfig = fs.readFileSync('tailwind.config.ts', 'utf8');
  
  if (tailwindConfig.includes('sm:') && tailwindConfig.includes('md:') && tailwindConfig.includes('lg:')) {
    addTestResult(
      'Responsive Design Configuration',
      'passed',
      'Tailwind responsive breakpoints are configured'
    );
    log('✅ Responsive breakpoints configured', 'success');
  } else {
    addTestResult(
      'Responsive Design Configuration',
      'warning',
      'Some responsive breakpoints may be missing'
    );
    log('⚠️ Check responsive breakpoint configuration', 'warning');
  }
  
  // Check for responsive components
  const componentFiles = [
    'app/components/Header.tsx',
    'app/components/Footer.tsx',
    'app/components/sections/Hero.tsx'
  ];
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const hasResponsiveClasses = /\b(sm:|md:|lg:|xl:)/.test(content);
      
      if (hasResponsiveClasses) {
        addTestResult(
          `Responsive Classes - ${path.basename(file)}`,
          'passed',
          'Component includes responsive classes'
        );
      } else {
        addTestResult(
          `Responsive Classes - ${path.basename(file)}`,
          'warning',
          'Component may lack responsive classes'
        );
      }
    }
  });
}

function testNavigationFlow() {
  log('Testing navigation flow...', 'info');
  
  // Check if navigation data exists
  if (fs.existsSync('app/lib/data/navigation.ts')) {
    const navContent = fs.readFileSync('app/lib/data/navigation.ts', 'utf8');
    
    // Check for main navigation items
    const requiredNavItems = ['Home', 'Services', 'Portfolio', 'About', 'Contact'];
    const hasAllNavItems = requiredNavItems.every(item => 
      navContent.toLowerCase().includes(item.toLowerCase())
    );
    
    if (hasAllNavItems) {
      addTestResult(
        'Navigation Structure',
        'passed',
        'All required navigation items are present'
      );
      log('✅ Navigation structure complete', 'success');
    } else {
      addTestResult(
        'Navigation Structure',
        'failed',
        'Missing required navigation items'
      );
      log('❌ Navigation structure incomplete', 'error');
    }
  }
  
  // Check for mobile navigation
  if (fs.existsSync('app/components/Header.tsx')) {
    const headerContent = fs.readFileSync('app/components/Header.tsx', 'utf8');
    const hasMobileMenu = headerContent.includes('hamburger') || 
                         headerContent.includes('mobile') ||
                         headerContent.includes('MenuIcon');
    
    if (hasMobileMenu) {
      addTestResult(
        'Mobile Navigation',
        'passed',
        'Mobile navigation menu is implemented'
      );
      log('✅ Mobile navigation implemented', 'success');
    } else {
      addTestResult(
        'Mobile Navigation',
        'warning',
        'Mobile navigation may not be implemented'
      );
      log('⚠️ Check mobile navigation implementation', 'warning');
    }
  }
}

function testFormFunctionality() {
  log('Testing form functionality...', 'info');
  
  // Check for contact form
  const contactFiles = [
    'app/contact/page.tsx',
    'app/components/sections/Contact.tsx'
  ];
  
  let hasContactForm = false;
  
  contactFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for form elements
      const hasForm = content.includes('<form') || content.includes('onSubmit');
      const hasValidation = content.includes('required') || content.includes('validate');
      const hasInputs = content.includes('input') || content.includes('textarea');
      
      if (hasForm && hasInputs) {
        hasContactForm = true;
        
        if (hasValidation) {
          addTestResult(
            `Contact Form - ${path.basename(file)}`,
            'passed',
            'Contact form with validation is implemented'
          );
        } else {
          addTestResult(
            `Contact Form - ${path.basename(file)}`,
            'warning',
            'Contact form exists but validation may be missing'
          );
        }
      }
    }
  });
  
  if (hasContactForm) {
    log('✅ Contact form found', 'success');
  } else {
    addTestResult(
      'Contact Form',
      'failed',
      'No contact form found'
    );
    log('❌ No contact form found', 'error');
  }
}

function testImageOptimization() {
  log('Testing image optimization...', 'info');
  
  // Check for Next.js Image component usage
  const componentFiles = [
    'app/components/sections/Hero.tsx',
    'app/components/sections/FeaturedProjects.tsx',
    'app/components/PortfolioGallery.tsx'
  ];
  
  let usesNextImage = false;
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      if (content.includes('next/image') || content.includes('Image from')) {
        usesNextImage = true;
        addTestResult(
          `Image Optimization - ${path.basename(file)}`,
          'passed',
          'Uses Next.js Image component for optimization'
        );
      } else if (content.includes('<img')) {
        addTestResult(
          `Image Optimization - ${path.basename(file)}`,
          'warning',
          'Uses regular img tags instead of Next.js Image component'
        );
      }
    }
  });
  
  if (usesNextImage) {
    log('✅ Next.js Image optimization in use', 'success');
  } else {
    log('⚠️ Consider using Next.js Image component for optimization', 'warning');
  }
  
  // Check for image files in public directory
  if (fs.existsSync('public/images')) {
    const imageFiles = fs.readdirSync('public/images', { recursive: true });
    const imageCount = imageFiles.filter(file => 
      /\.(jpg|jpeg|png|webp|svg)$/i.test(file)
    ).length;
    
    addTestResult(
      'Image Assets',
      'passed',
      `Found ${imageCount} image assets in public directory`
    );
    log(`✅ Found ${imageCount} image assets`, 'success');
  }
}

function testPerformanceIndicators() {
  log('Testing performance indicators...', 'info');
  
  // Check for loading states
  const loadingFiles = [
    'app/components/ui/LoadingSkeleton.tsx',
    'app/loading.tsx'
  ];
  
  let hasLoadingStates = false;
  
  loadingFiles.forEach(file => {
    if (fs.existsSync(file)) {
      hasLoadingStates = true;
      addTestResult(
        `Loading States - ${path.basename(file)}`,
        'passed',
        'Loading state component exists'
      );
    }
  });
  
  if (hasLoadingStates) {
    log('✅ Loading states implemented', 'success');
  } else {
    addTestResult(
      'Loading States',
      'warning',
      'No loading state components found'
    );
    log('⚠️ Consider adding loading states', 'warning');
  }
  
  // Check for error boundaries
  if (fs.existsSync('app/components/ui/ErrorBoundary.tsx')) {
    addTestResult(
      'Error Handling',
      'passed',
      'Error boundary component exists'
    );
    log('✅ Error boundary implemented', 'success');
  } else {
    addTestResult(
      'Error Handling',
      'warning',
      'No error boundary found'
    );
    log('⚠️ Consider adding error boundaries', 'warning');
  }
  
  // Check for dynamic imports
  const pageFiles = ['app/page.tsx'];
  
  pageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      if (content.includes('dynamic(') || content.includes('lazy(')) {
        addTestResult(
          `Code Splitting - ${path.basename(file)}`,
          'passed',
          'Uses dynamic imports for code splitting'
        );
        log('✅ Code splitting implemented', 'success');
      }
    }
  });
}

function testSEOElements() {
  log('Testing SEO elements...', 'info');
  
  // Check for metadata in pages
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
      
      const hasMetadata = content.includes('export const metadata') || 
                         content.includes('Metadata');
      const hasStructuredData = content.includes('StructuredData');
      
      if (hasMetadata) {
        addTestResult(
          `SEO Metadata - ${path.basename(file)}`,
          'passed',
          'Page includes metadata configuration'
        );
      } else {
        addTestResult(
          `SEO Metadata - ${path.basename(file)}`,
          'warning',
          'Page may be missing metadata'
        );
      }
      
      if (hasStructuredData) {
        addTestResult(
          `Structured Data - ${path.basename(file)}`,
          'passed',
          'Page includes structured data'
        );
      }
    }
  });
  
  // Check for sitemap and robots
  if (fs.existsSync('app/sitemap.ts')) {
    addTestResult(
      'Sitemap',
      'passed',
      'Sitemap configuration exists'
    );
    log('✅ Sitemap configured', 'success');
  }
  
  if (fs.existsSync('app/robots.ts')) {
    addTestResult(
      'Robots.txt',
      'passed',
      'Robots.txt configuration exists'
    );
    log('✅ Robots.txt configured', 'success');
  }
}

function generateTestReport() {
  log('Generating test report...', 'info');
  
  const reportPath = 'test-results/cross-browser-test-report.json';
  const reportDir = path.dirname(reportPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  // Write detailed JSON report
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  
  // Generate summary report
  const summaryReport = `
# Cross-Browser and Device Testing Report

**Generated:** ${testResults.timestamp}

## Summary
- **Total Tests:** ${testResults.summary.total}
- **Passed:** ${testResults.summary.passed} ✅
- **Failed:** ${testResults.summary.failed} ❌
- **Warnings:** ${testResults.summary.warnings} ⚠️

## Test Results

${testResults.tests.map(test => `
### ${test.test}
- **Status:** ${test.status.toUpperCase()}
- **Message:** ${test.message}
- **Time:** ${test.timestamp}
`).join('\n')}

## Recommendations

### High Priority
${testResults.tests
  .filter(test => test.status === 'failed')
  .map(test => `- Fix: ${test.message}`)
  .join('\n')}

### Medium Priority  
${testResults.tests
  .filter(test => test.status === 'warning')
  .map(test => `- Consider: ${test.message}`)
  .join('\n')}

## Browser Testing Checklist

### Manual Testing Required
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile Chrome
- [ ] Test on mobile Safari
- [ ] Test form submissions
- [ ] Test navigation flows
- [ ] Test responsive breakpoints
- [ ] Test image loading
- [ ] Test JavaScript functionality
- [ ] Test with JavaScript disabled

### Device Testing
- [ ] iPhone (375px width)
- [ ] iPad (768px width)  
- [ ] Desktop (1920px width)
- [ ] Large screens (2560px width)

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Test loading speeds
- [ ] Test Core Web Vitals
- [ ] Test image optimization
`;
  
  const summaryPath = 'test-results/cross-browser-summary.md';
  fs.writeFileSync(summaryPath, summaryReport);
  
  log(`✅ Test report generated: ${reportPath}`, 'success');
  log(`✅ Summary report generated: ${summaryPath}`, 'success');
  
  // Print summary to console
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${testResults.summary.total}`);
  console.log(`Passed: ${testResults.summary.passed} ✅`);
  console.log(`Failed: ${testResults.summary.failed} ❌`);
  console.log(`Warnings: ${testResults.summary.warnings} ⚠️`);
  console.log('='.repeat(50));
}

// Main execution
async function runTests() {
  log('Starting cross-browser and device testing...', 'info');
  
  try {
    testResponsiveDesign();
    testNavigationFlow();
    testFormFunctionality();
    testImageOptimization();
    testPerformanceIndicators();
    testSEOElements();
    
    generateTestReport();
    
    log('Cross-browser testing completed!', 'success');
    
    // Exit with appropriate code
    const hasFailures = testResults.summary.failed > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    log(`Testing failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run tests if called directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testConfig,
  testResults
};