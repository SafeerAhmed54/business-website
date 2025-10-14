// Global error handling utilities

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

export class ErrorLogger {
  private static instance: ErrorLogger;
  private errors: ErrorInfo[] = [];

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  logError(error: Error, additionalInfo?: Record<string, unknown>) {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      ...additionalInfo,
    };

    this.errors.push(errorInfo);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }

    // In production, you would send this to an error tracking service
    // this.sendToErrorService(errorInfo);
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  private async sendToErrorService(errorInfo: ErrorInfo) {
    // Example implementation for sending to an error tracking service
    try {
      // In production, uncomment and configure your error tracking service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorInfo),
      // });
      
      // For now, just log that we would send the error
      console.log('Would send error to tracking service:', errorInfo.message);
    } catch (e) {
      console.error('Failed to send error to tracking service:', e);
    }
  }
}

// Global error handlers
export const setupGlobalErrorHandlers = () => {
  if (typeof window === 'undefined') return;

  const errorLogger = ErrorLogger.getInstance();

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    errorLogger.logError(new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: 'javascript',
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    errorLogger.logError(error, {
      type: 'unhandled-promise',
    });
  });

  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target && event.target !== window) {
      const target = event.target as HTMLElement;
      let resourceUrl = '';
      
      // Safely get the resource URL based on element type
      if (target instanceof HTMLImageElement) {
        resourceUrl = target.src;
      } else if (target instanceof HTMLLinkElement) {
        resourceUrl = target.href;
      } else if (target instanceof HTMLScriptElement) {
        resourceUrl = target.src;
      } else if (target instanceof HTMLSourceElement) {
        resourceUrl = target.src;
      }
      
      errorLogger.logError(new Error(`Resource failed to load: ${target.tagName}`), {
        type: 'resource',
        src: resourceUrl,
        tagName: target.tagName,
      });
    }
  }, true);
};

// Retry mechanism for failed operations
export class RetryHandler {
  static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxAttempts) {
          ErrorLogger.getInstance().logError(lastError, {
            type: 'retry-failed',
            attempts: maxAttempts,
          });
          throw lastError;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    throw lastError!;
  }
}

// Network error handling
export const handleNetworkError = (error: Error): string => {
  if (error.message.includes('fetch')) {
    return 'Network connection failed. Please check your internet connection and try again.';
  }
  
  if (error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  if (error.message.includes('404')) {
    return 'The requested resource was not found.';
  }
  
  if (error.message.includes('500')) {
    return 'Server error occurred. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Form validation error handling
export const getFormErrorMessage = (field: string, error: string): string => {
  const errorMessages: Record<string, Record<string, string>> = {
    email: {
      required: 'Email address is required',
      invalid: 'Please enter a valid email address',
    },
    phone: {
      required: 'Phone number is required',
      invalid: 'Please enter a valid phone number',
    },
    name: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters long',
    },
    message: {
      required: 'Message is required',
      minLength: 'Message must be at least 10 characters long',
    },
  };

  return errorMessages[field]?.[error] || `${field} is invalid`;
};

// Image loading error handling
export const getImageFallback = (width?: number, height?: number): string => {
  const svgContent = `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <circle cx="50%" cy="40%" r="20" fill="#d1d5db"/>
    <rect x="30%" y="60%" width="40%" height="8" rx="4" fill="#d1d5db"/>
    <rect x="35%" y="72%" width="30%" height="6" rx="3" fill="#e5e7eb"/>
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af">
      Image not available
    </text>
  </svg>`;
  
  // Use btoa for browser compatibility instead of Buffer
  if (typeof window !== 'undefined') {
    return `data:image/svg+xml;base64,${btoa(svgContent)}`;
  }
  
  // Fallback for server-side rendering
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};