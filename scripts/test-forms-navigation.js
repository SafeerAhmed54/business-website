#!/usr/bin/env node

/**
 * Form submission and navigation flow testing script
 * Tests form functionality and navigation patterns
 */

const fs = require('fs');
const path = require('path');

let testResults = {
  timestamp: new Date().toISOString(),
  forms: [],
  navigation: [],
  interactions: [],
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
    info: '📝',
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
  
  if (category === 'form') testResults.forms.push(result);
  else if (category === 'navigation') testResults.navigation.push(result);
  else if (category === 'interaction') testResults.interactions.push(result);
  
  testResults.summary.total++;
  if (status === 'passed') testResults.summary.passed++;
  else if (status === 'failed') testResults.summary.failed++;
  else if (status === 'warning') testResults.summary.warnings++;
}

function testContactForm() {
  log('Testing contact form implementation...', 'info');
  
  const contactFiles = [
    'app/contact/page.tsx',
    'app/components/sections/Contact.tsx'
  ];
  
  contactFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for form structure
      const hasForm = /<form|onSubmit/.test(content);
      const hasInputs = /input|textarea|select/.test(content);
      const hasSubmitButton = /type="submit"|button.*submit/i.test(content);
      
      if (hasForm && hasInputs && hasSubmitButton) {
        addResult(
          'form',
          `Contact Form Structure - ${path.basename(file)}`,
          'passed',
          'Contact form has proper structure with inputs and submit button'
        );
      } else {
        addResult(
          'form',
          `Contact Form Structure - ${path.basename(file)}`,
          'failed',
          'Contact form is missing required elements'
        );
      }
      
      // Test for form validation
      const validationPatterns = [
        'required',
        'validate',
        'error',
        'isValid',
        'formState',
        'yup',
        'zod',
        'joi'
      ];
      
      const hasValidation = validationPatterns.some(pattern => 
        new RegExp(pattern, 'i').test(content)
      );
      
      if (hasValidation) {
        addResult(
          'form',
          `Form Validation - ${path.basename(file)}`,
          'passed',
          'Form includes validation logic'
        );
      } else {
        addResult(
          'form',
          `Form Validation - ${path.basename(file)}`,
          'warning',
          'Form may lack validation'
        );
      }
      
      // Test for required fields
      const requiredFields = [
        'name',
        'email',
        'message'
      ];
      
      const fieldResults = requiredFields.map(field => ({
        field,
        present: new RegExp(field, 'i').test(content)
      }));
      
      const missingFields = fieldResults.filter(f => !f.present);
      
      if (missingFields.length === 0) {
        addResult(
          'form',
          `Required Fields - ${path.basename(file)}`,
          'passed',
          'All required form fields are present'
        );
      } else {
        addResult(
          'form',
          `Required Fields - ${path.basename(file)}`,
          'warning',
          `Missing fields: ${missingFields.map(f => f.field).join(', ')}`
        );
      }
      
      // Test for form accessibility
      const accessibilityPatterns = [
        'aria-label',
        'aria-describedby',
        'htmlFor',
        'id=',
        'label'
      ];
      
      const hasAccessibility = accessibilityPatterns.some(pattern => 
        new RegExp(pattern, 'i').test(content)
      );
      
      if (hasAccessibility) {
        addResult(
          'form',
          `Form Accessibility - ${path.basename(file)}`,
          'passed',
          'Form includes accessibility features'
        );
      } else {
        addResult(
          'form',
          `Form Accessibility - ${path.basename(file)}`,
          'warning',
          'Form may lack accessibility features'
        );
      }
      
      // Test for loading states
      const hasLoadingStates = /loading|isSubmitting|disabled/.test(content);
      
      if (hasLoadingStates) {
        addResult(
          'form',
          `Loading States - ${path.basename(file)}`,
          'passed',
          'Form includes loading/disabled states'
        );
      } else {
        addResult(
          'form',
          `Loading States - ${path.basename(file)}`,
          'warning',
          'Form may lack loading states'
        );
      }
      
      // Test for success/error feedback
      const hasFeedback = /success|error|toast|alert|notification/.test(content);
      
      if (hasFeedback) {
        addResult(
          'form',
          `User Feedback - ${path.basename(file)}`,
          'passed',
          'Form includes success/error feedback'
        );
      } else {
        addResult(
          'form',
          `User Feedback - ${path.basename(file)}`,
          'warning',
          'Form may lack user feedback'
        );
      }
    }
  });
}

function testNavigationFlow() {
  log('Testing navigation flow and structure...', 'info');
  
  // Test navigation data
  if (fs.existsSync('app/lib/data/navigation.ts')) {
    const navContent = fs.readFileSync('app/lib/data/navigation.ts', 'utf8');
    
    // Test for main navigation items
    const requiredNavItems = [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ];
    
    requiredNavItems.forEach(item => {
      const hasItem = new RegExp(item.name, 'i').test(navContent);
      const hasPath = navContent.includes(item.path);
      
      if (hasItem && hasPath) {
        addResult(
          'navigation',
          `Navigation Item - ${item.name}`,
          'passed',
          `${item.name} navigation item is properly configured`
        );
      } else {
        addResult(
          'navigation',
          `Navigation Item - ${item.name}`,
          'failed',
          `${item.name} navigation item is missing or misconfigured`
        );
      }
    });
  }
  
  // Test header navigation
  if (fs.existsSync('app/components/Header.tsx')) {
    const headerContent = fs.readFileSync('app/components/Header.tsx', 'utf8');
    
    // Test for responsive navigation
    const hasMobileMenu = /hamburger|mobile|MenuIcon|drawer/.test(headerContent);
    
    if (hasMobileMenu) {
      addResult(
        'navigation',
        'Mobile Navigation Menu',
        'passed',
        'Mobile navigation menu is implemented'
      );
    } else {
      addResult(
        'navigation',
        'Mobile Navigation Menu',
        'failed',
        'Mobile navigation menu is missing'
      );
    }
    
    // Test for navigation state management
    const hasStateManagement = /useState|isOpen|toggle|active/.test(headerContent);
    
    if (hasStateManagement) {
      addResult(
        'navigation',
        'Navigation State Management',
        'passed',
        'Navigation includes state management'
      );
    } else {
      addResult(
        'navigation',
        'Navigation State Management',
        'warning',
        'Navigation may lack state management'
      );
    }
    
    // Test for active link highlighting
    const hasActiveStates = /active|current|pathname|router/.test(headerContent);
    
    if (hasActiveStates) {
      addResult(
        'navigation',
        'Active Link States',
        'passed',
        'Navigation includes active link highlighting'
      );
    } else {
      addResult(
        'navigation',
        'Active Link States',
        'warning',
        'Navigation may lack active link highlighting'
      );
    }
  }
  
  // Test for page routing
  const pageFiles = [
    'app/page.tsx',
    'app/services/page.tsx',
    'app/portfolio/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx'
  ];
  
  pageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      addResult(
        'navigation',
        `Page Route - ${path.basename(path.dirname(file)) || 'home'}`,
        'passed',
        `${file} exists and is accessible`
      );
    } else {
      addResult(
        'navigation',
        `Page Route - ${path.basename(path.dirname(file)) || 'home'}`,
        'failed',
        `${file} is missing`
      );
    }
  });
}

function testInteractiveElements() {
  log('Testing interactive elements and user flows...', 'info');
  
  const componentFiles = [
    'app/components/sections/Hero.tsx',
    'app/components/sections/ServicesOverview.tsx',
    'app/components/sections/FeaturedProjects.tsx',
    'app/components/PortfolioGallery.tsx'
  ];
  
  componentFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Test for call-to-action buttons
      const hasButtons = /<button|<a.*href|onClick/.test(content);
      
      if (hasButtons) {
        addResult(
          'interaction',
          `Interactive Elements - ${path.basename(file)}`,
          'passed',
          'Component includes interactive elements'
        );
      } else {
        addResult(
          'interaction',
          `Interactive Elements - ${path.basename(file)}`,
          'warning',
          'Component may lack interactive elements'
        );
      }
      
      // Test for hover states
      const hasHoverStates = /hover:|group-hover:|peer-hover:/.test(content);
      
      if (hasHoverStates) {
        addResult(
          'interaction',
          `Hover States - ${path.basename(file)}`,
          'passed',
          'Component includes hover states'
        );
      } else {
        addResult(
          'interaction',
          `Hover States - ${path.basename(file)}`,
          'warning',
          'Component may lack hover states'
        );
      }
      
      // Test for focus states
      const hasFocusStates = /focus:|focus-visible:|focus-within:/.test(content);
      
      if (hasFocusStates) {
        addResult(
          'interaction',
          `Focus States - ${path.basename(file)}`,
          'passed',
          'Component includes focus states'
        );
      } else {
        addResult(
          'interaction',
          `Focus States - ${path.basename(file)}`,
          'warning',
          'Component may lack focus states'
        );
      }
      
      // Test for transitions
      const hasTransitions = /transition|duration|ease|animate/.test(content);
      
      if (hasTransitions) {
        addResult(
          'interaction',
          `Transitions - ${path.basename(file)}`,
          'passed',
          'Component includes smooth transitions'
        );
      } else {
        addResult(
          'interaction',
          `Transitions - ${path.basename(file)}`,
          'warning',
          'Component may lack smooth transitions'
        );
      }
    }
  });
  
  // Test for modal/overlay functionality
  if (fs.existsSync('app/components/ui/ImageModal.tsx')) {
    const modalContent = fs.readFileSync('app/components/ui/ImageModal.tsx', 'utf8');
    
    const hasModalFeatures = [
      { feature: 'Close functionality', pattern: /close|onClose|dismiss/ },
      { feature: 'Escape key handling', pattern: /escape|keydown|key.*escape/i },
      { feature: 'Backdrop click', pattern: /backdrop|overlay|outside/ },
      { feature: 'Focus management', pattern: /focus|tabindex|trap/ }
    ];
    
    hasModalFeatures.forEach(({ feature, pattern }) => {
      if (pattern.test(modalContent)) {
        addResult(
          'interaction',
          `Modal ${feature}`,
          'passed',
          `Modal includes ${feature.toLowerCase()}`
        );
      } else {
        addResult(
          'interaction',
          `Modal ${feature}`,
          'warning',
          `Modal may lack ${feature.toLowerCase()}`
        );
      }
    });
  }
}

function testFormSubmissionFlow() {
  log('Testing form submission flow patterns...', 'info');
  
  // Test for form handling utilities
  const utilFiles = [
    'app/lib/utils/validation.ts',
    'app/lib/utils/forms.ts',
    'app/lib/api/contact.ts'
  ];
  
  utilFiles.forEach(file => {
    if (fs.existsSync(file)) {
      addResult(
        'form',
        `Form Utilities - ${path.basename(file)}`,
        'passed',
        `Form utility file exists: ${file}`
      );
    }
  });
  
  // Test for API routes
  const apiRoutes = [
    'app/api/contact/route.ts',
    'app/api/contact/route.js'
  ];
  
  let hasApiRoute = false;
  apiRoutes.forEach(route => {
    if (fs.existsSync(route)) {
      hasApiRoute = true;
      const content = fs.readFileSync(route, 'utf8');
      
      // Test for HTTP methods
      const hasPOST = /export.*POST|async.*POST/.test(content);
      
      if (hasPOST) {
        addResult(
          'form',
          'Contact API Route',
          'passed',
          'Contact API route with POST method exists'
        );
      } else {
        addResult(
          'form',
          'Contact API Route',
          'warning',
          'Contact API route exists but may lack POST method'
        );
      }
      
      // Test for error handling
      const hasErrorHandling = /try.*catch|error|status.*400|status.*500/.test(content);
      
      if (hasErrorHandling) {
        addResult(
          'form',
          'API Error Handling',
          'passed',
          'API route includes error handling'
        );
      } else {
        addResult(
          'form',
          'API Error Handling',
          'warning',
          'API route may lack error handling'
        );
      }
    }
  });
  
  if (!hasApiRoute) {
    addResult(
      'form',
      'Contact API Route',
      'warning',
      'No contact API route found - form may use external service'
    );
  }
}

function generateFormNavigationReport() {
  log('Generating form and navigation test report...', 'info');
  
  const reportPath = 'test-results/forms-navigation-report.json';
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  
  // Generate testing checklist
  const checklist = `
# Form and Navigation Testing Checklist

## Manual Testing Required

### Contact Form Testing
- [ ] Form loads without errors
- [ ] All required fields are marked as required
- [ ] Email validation works correctly
- [ ] Phone number validation (if applicable)
- [ ] Form submission shows loading state
- [ ] Success message appears after submission
- [ ] Error messages appear for invalid data
- [ ] Form resets after successful submission
- [ ] Form works on mobile devices
- [ ] Form is accessible via keyboard navigation
- [ ] Screen readers can navigate the form

### Navigation Flow Testing
- [ ] All navigation links work correctly
- [ ] Mobile hamburger menu opens/closes
- [ ] Active page is highlighted in navigation
- [ ] Navigation works on all device sizes
- [ ] Back button works correctly
- [ ] Deep links work correctly
- [ ] 404 page appears for invalid URLs
- [ ] Navigation is accessible via keyboard
- [ ] Navigation works with screen readers

### Interactive Elements Testing
- [ ] All buttons respond to clicks
- [ ] Hover states work on desktop
- [ ] Focus states are visible
- [ ] Touch targets are large enough (44px minimum)
- [ ] Animations and transitions are smooth
- [ ] Modal/overlay functionality works
- [ ] Image gallery navigation works
- [ ] Call-to-action buttons lead to correct pages

### Cross-Browser Testing
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Device Testing
- [ ] iPhone (various sizes)
- [ ] Android phones (various sizes)
- [ ] iPad (portrait and landscape)
- [ ] Android tablets
- [ ] Desktop (1920x1080)
- [ ] Large desktop (2560x1440)

## Test Results Summary
- **Total Tests**: ${testResults.summary.total}
- **Passed**: ${testResults.summary.passed} ✅
- **Failed**: ${testResults.summary.failed} ❌
- **Warnings**: ${testResults.summary.warnings} ⚠️

## Issues to Address

### High Priority (Failed Tests)
${testResults.forms.concat(testResults.navigation, testResults.interactions)
  .filter(test => test.status === 'failed')
  .map(test => `- **${test.test}**: ${test.message}`)
  .join('\n')}

### Medium Priority (Warnings)
${testResults.forms.concat(testResults.navigation, testResults.interactions)
  .filter(test => test.status === 'warning')
  .map(test => `- **${test.test}**: ${test.message}`)
  .join('\n')}
`;
  
  const checklistPath = 'test-results/manual-testing-checklist.md';
  fs.writeFileSync(checklistPath, checklist);
  
  log(`✅ Form/navigation report generated: ${reportPath}`, 'success');
  log(`✅ Manual testing checklist generated: ${checklistPath}`, 'success');
}

// Main execution
async function runFormNavigationTests() {
  log('Starting form and navigation testing...', 'info');
  
  try {
    testContactForm();
    testNavigationFlow();
    testInteractiveElements();
    testFormSubmissionFlow();
    
    generateFormNavigationReport();
    
    log('Form and navigation testing completed!', 'success');
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('FORM & NAVIGATION TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${testResults.summary.total}`);
    console.log(`Passed: ${testResults.summary.passed} ✅`);
    console.log(`Failed: ${testResults.summary.failed} ❌`);
    console.log(`Warnings: ${testResults.summary.warnings} ⚠️`);
    console.log('='.repeat(50));
    
    const hasFailures = testResults.summary.failed > 0;
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    log(`Form/navigation testing failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

if (require.main === module) {
  runFormNavigationTests();
}

module.exports = {
  runFormNavigationTests,
  testResults
};