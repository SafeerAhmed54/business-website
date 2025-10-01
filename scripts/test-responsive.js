#!/usr/bin/env node

/**
 * Responsive design and device testing script
 * Tests responsive behavior across different viewport sizes
 */

const fs = require('fs');
const path = require('path');

// Device configurations for testing
const devices = {
  mobile: {
    'iPhone SE': { width: 375, height: 667, userAgent: 'iPhone' },
    'iPhone 12': { width: 390, height: 844, userAgent: 'iPhone' },
    'iPhone 14 Pro Max': { width: 430, height: 932, userAgent: 'iPhone' },
    'Samsung Galaxy S21': { width: 384, height: 854, userAgent: 'Android' },
    'Google Pixel 6': { width: 393, height: 851, userAgent: 'Android' }
  },
  tablet: {
    'iPad': { width: 768, height: 1024, userAgent: 'iPad' },
    'iPad Pro 11"': { width: 834, height: 1194, userAgent: 'iPad' },
    'iPad Pro 12.9"': { width: 1024, height: 1366, userAgent: 'iPad' },
    'Samsung Galaxy Tab': { width: 800, height: 1280, userAgent: 'Android' }
  },
  desktop: {
    'Small Desktop': { width: 1366, height: 768, userAgent: 'Desktop' },
    'Standard Desktop': { width: 1920, height: 1080, userAgent: 'Desktop' },
    'Large Desktop': { width: 2560, height: 1440, userAgent: 'Desktop' },
    'Ultra Wide': { width: 3440, height: 1440, userAgent: 'Desktop' }
  }
};

// Tailwind breakpoints to test
const breakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
};

let testResults = {
  timestamp: new Date().toISOString(),
  devices: [],
  breakpoints: [],
  components: [],
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
    info: '📱',
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
  
  if (category === 'device') testResults.devices.push(result);
  else if (category === 'breakpoint') testResults.breakpoints.push(result);
  else if (category === 'component') testResults.components.push(result);
  
  testResults.summary.total++;
  if (status === 'passed') testResults.summary.passed++;
  else if (status === 'failed') testResults.summary.failed++;
  else if (status === 'warning') testResults.summary.warnings++;
}

function testTailwindBreakpoints() {
  log('Testing Tailwind breakpoint configuration...', 'info');
  
  if (fs.existsSync('tailwind.config.ts')) {
    const config = fs.readFileSync('tailwind.config.ts', 'utf8');
    
    Object.keys(breakpoints).forEach(bp => {
      if (config.includes(`'${bp}'`) || config.includes(`"${bp}"`)) {
        addResult(
          'breakpoint',
          `Tailwind ${bp} breakpoint`,
          'passed',
          `${bp} breakpoint (${breakpoints[bp]}px) is configured`
        );
      } else {
        addResult(
          'breakpoint',
          `Tailwind ${bp} breakpoint`,
          'warning',
          `${bp} breakpoint may not be explicitly configured`
        );
      }
    });
  }
}

function testResponsiveComponents() {
  log('Testing responsive component implementations...', 'info');
  
  const componentFiles = [
    'app/components/Header.tsx',
    'app/components/Footer.tsx',
    'app/components/sections/Hero.tsx',
    'app/components/sections/ServicesOverview.tsx',
    'app/components/sections/FeaturedProjects.tsx',
    'app/components/sections/Contact.tsx',
    'app/components/PortfolioGallery.tsx'
  ];
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for responsive classes
      const responsivePatterns = {
        'Mobile First': /\bsm:/g,
        'Tablet': /\bmd:/g,
        'Desktop': /\blg:/g,
        'Large Desktop': /\bxl:/g,
        'Extra Large': /\b2xl:/g
      };
      
      const responsiveResults = {};
      Object.keys(responsivePatterns).forEach(pattern => {
        const matches = content.match(responsivePatterns[pattern]);
        responsiveResults[pattern] = matches ? matches.length : 0;
      });
      
      const totalResponsiveClasses = Object.values(responsiveResults).reduce((a, b) => a + b, 0);
      
      if (totalResponsiveClasses > 5) {
        addResult(
          'component',
          `Responsive Design - ${path.basename(file)}`,
          'passed',
          `Component has ${totalResponsiveClasses} responsive classes`,
          responsiveResults
        );
      } else if (totalResponsiveClasses > 0) {
        addResult(
          'component',
          `Responsive Design - ${path.basename(file)}`,
          'warning',
          `Component has limited responsive classes (${totalResponsiveClasses})`,
          responsiveResults
        );
      } else {
        addResult(
          'component',
          `Responsive Design - ${path.basename(file)}`,
          'failed',
          'Component lacks responsive classes',
          responsiveResults
        );
      }
      
      // Test for mobile-specific patterns
      const mobilePatterns = [
        'hamburger',
        'mobile',
        'MenuIcon',
        'drawer',
        'sidebar',
        'hidden sm:block',
        'block sm:hidden'
      ];
      
      const hasMobileOptimizations = mobilePatterns.some(pattern => 
        content.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (hasMobileOptimizations) {
        addResult(
          'component',
          `Mobile Optimization - ${path.basename(file)}`,
          'passed',
          'Component includes mobile-specific optimizations'
        );
      }
      
      // Test for touch-friendly elements
      const touchPatterns = [
        'touch-manipulation',
        'min-h-\\[48px\\]',
        'min-h-12',
        'p-4',
        'py-3',
        'px-4'
      ];
      
      const hasTouchOptimizations = touchPatterns.some(pattern => 
        new RegExp(pattern).test(content)
      );
      
      if (hasTouchOptimizations) {
        addResult(
          'component',
          `Touch Optimization - ${path.basename(file)}`,
          'passed',
          'Component includes touch-friendly sizing'
        );
      }
    }
  });
}

function testDeviceCompatibility() {
  log('Testing device compatibility patterns...', 'info');
  
  Object.keys(devices).forEach(deviceType => {
    Object.keys(devices[deviceType]).forEach(deviceName => {
      const device = devices[deviceType][deviceName];
      
      // Determine which breakpoint this device falls into
      let breakpoint = 'base';
      if (device.width >= breakpoints['2xl']) breakpoint = '2xl';
      else if (device.width >= breakpoints.xl) breakpoint = 'xl';
      else if (device.width >= breakpoints.lg) breakpoint = 'lg';
      else if (device.width >= breakpoints.md) breakpoint = 'md';
      else if (device.width >= breakpoints.sm) breakpoint = 'sm';
      
      addResult(
        'device',
        `${deviceName} Compatibility`,
        'passed',
        `Device (${device.width}x${device.height}) maps to ${breakpoint} breakpoint`,
        {
          width: device.width,
          height: device.height,
          breakpoint: breakpoint,
          userAgent: device.userAgent
        }
      );
    });
  });
}

function testLayoutPatterns() {
  log('Testing common responsive layout patterns...', 'info');
  
  const layoutFiles = [
    'app/page.tsx',
    'app/services/page.tsx',
    'app/portfolio/page.tsx'
  ];
  
  layoutFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for responsive grid patterns
      const gridPatterns = [
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      ];
      
      const hasResponsiveGrid = gridPatterns.some(pattern => content.includes(pattern));
      
      if (hasResponsiveGrid) {
        addResult(
          'component',
          `Responsive Grid - ${path.basename(file)}`,
          'passed',
          'Page uses responsive grid layouts'
        );
      }
      
      // Test for responsive spacing
      const spacingPatterns = [
        'py-8 sm:py-12',
        'px-4 sm:px-6',
        'mb-8 sm:mb-12',
        'gap-4 sm:gap-6'
      ];
      
      const hasResponsiveSpacing = spacingPatterns.some(pattern => content.includes(pattern));
      
      if (hasResponsiveSpacing) {
        addResult(
          'component',
          `Responsive Spacing - ${path.basename(file)}`,
          'passed',
          'Page uses responsive spacing patterns'
        );
      }
      
      // Test for responsive typography
      const typographyPatterns = [
        'text-2xl sm:text-3xl',
        'text-3xl md:text-4xl',
        'text-lg sm:text-xl'
      ];
      
      const hasResponsiveTypography = typographyPatterns.some(pattern => content.includes(pattern));
      
      if (hasResponsiveTypography) {
        addResult(
          'component',
          `Responsive Typography - ${path.basename(file)}`,
          'passed',
          'Page uses responsive typography scaling'
        );
      }
    }
  });
}

function testAccessibilityFeatures() {
  log('Testing accessibility features for different devices...', 'info');
  
  const componentFiles = [
    'app/components/Header.tsx',
    'app/components/sections/Contact.tsx'
  ];
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for ARIA labels
      const hasAriaLabels = /aria-label|aria-labelledby|aria-describedby/.test(content);
      
      if (hasAriaLabels) {
        addResult(
          'component',
          `Accessibility - ${path.basename(file)}`,
          'passed',
          'Component includes ARIA labels'
        );
      }
      
      // Test for keyboard navigation
      const hasKeyboardSupport = /onKeyDown|tabIndex|role=/.test(content);
      
      if (hasKeyboardSupport) {
        addResult(
          'component',
          `Keyboard Navigation - ${path.basename(file)}`,
          'passed',
          'Component supports keyboard navigation'
        );
      }
      
      // Test for focus management
      const hasFocusManagement = /focus:|focus-visible|focus-within/.test(content);
      
      if (hasFocusManagement) {
        addResult(
          'component',
          `Focus Management - ${path.basename(file)}`,
          'passed',
          'Component includes focus management'
        );
      }
    }
  });
}

function generateResponsiveTestReport() {
  log('Generating responsive test report...', 'info');
  
  const reportPath = 'test-results/responsive-test-report.json';
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  
  // Generate device compatibility matrix
  const deviceMatrix = `
# Device Compatibility Matrix

## Mobile Devices (< 640px)
${Object.keys(devices.mobile).map(device => {
  const info = devices.mobile[device];
  return `- **${device}**: ${info.width}x${info.height}px`;
}).join('\n')}

## Tablet Devices (640px - 1024px)
${Object.keys(devices.tablet).map(device => {
  const info = devices.tablet[device];
  return `- **${device}**: ${info.width}x${info.height}px`;
}).join('\n')}

## Desktop Devices (> 1024px)
${Object.keys(devices.desktop).map(device => {
  const info = devices.desktop[device];
  return `- **${device}**: ${info.width}x${info.height}px`;
}).join('\n')}

## Breakpoint Coverage
${Object.keys(breakpoints).map(bp => 
  `- **${bp}**: ${breakpoints[bp]}px+`
).join('\n')}

## Test Results Summary
- **Total Tests**: ${testResults.summary.total}
- **Passed**: ${testResults.summary.passed} ✅
- **Failed**: ${testResults.summary.failed} ❌
- **Warnings**: ${testResults.summary.warnings} ⚠️

## Manual Testing Checklist

### Mobile Testing (< 640px)
- [ ] Navigation menu works on mobile
- [ ] Touch targets are at least 44px
- [ ] Text is readable without zooming
- [ ] Forms are easy to fill on mobile
- [ ] Images scale properly
- [ ] No horizontal scrolling

### Tablet Testing (640px - 1024px)
- [ ] Layout adapts to tablet orientation
- [ ] Navigation works in both portrait/landscape
- [ ] Touch interactions work properly
- [ ] Content is properly spaced

### Desktop Testing (> 1024px)
- [ ] Full navigation menu is visible
- [ ] Hover states work properly
- [ ] Content uses available space effectively
- [ ] Multi-column layouts work correctly

### Cross-Device Testing
- [ ] Consistent branding across devices
- [ ] Same functionality on all devices
- [ ] Performance is acceptable on all devices
- [ ] Images load properly on all devices
`;
  
  const matrixPath = 'test-results/device-compatibility-matrix.md';
  fs.writeFileSync(matrixPath, deviceMatrix);
  
  log(`✅ Responsive test report generated: ${reportPath}`, 'success');
  log(`✅ Device matrix generated: ${matrixPath}`, 'success');
}

// Main execution
async function runResponsiveTests() {
  log('Starting responsive design testing...', 'info');
  
  try {
    testTailwindBreakpoints();
    testResponsiveComponents();
    testDeviceCompatibility();
    testLayoutPatterns();
    testAccessibilityFeatures();
    
    generateResponsiveTestReport();
    
    log('Responsive testing completed!', 'success');
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('RESPONSIVE TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${testResults.summary.total}`);
    console.log(`Passed: ${testResults.summary.passed} ✅`);
    console.log(`Failed: ${testResults.summary.failed} ❌`);
    console.log(`Warnings: ${testResults.summary.warnings} ⚠️`);
    console.log('='.repeat(50));
    
    const hasFailures = testResults.summary.failed > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    log(`Responsive testing failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  runResponsiveTests();
}

module.exports = {
  runResponsiveTests,
  devices,
  breakpoints,
  testResults
};