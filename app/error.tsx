'use client';

import { useEffect } from 'react';
import { businessInfo } from '@/app/lib/data/business';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
    
    // You can also send to error tracking service like Sentry
    // Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-6xl font-bold text-white/20 mb-4">⚠️</div>
            <div className="absolute inset-0 flex items-center justify-center pt-4">
              <svg
                className="w-16 h-16 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-lg text-white/80 mb-6">
            We&apos;re sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
          </p>
          
          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-4 bg-white/10 rounded-lg text-left">
              <summary className="cursor-pointer font-semibold mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-white/70 whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && (
                  <>
                    <br />
                    <br />
                    Stack trace:
                    <br />
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm border border-white/20"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm mb-4">
            If the problem persists, please contact us:
          </p>
          <div className="space-y-2 text-sm">
            <a
              href={`tel:${businessInfo.phone}`}
              className="text-white/80 hover:text-white transition-colors"
            >
              📞 {businessInfo.phone}
            </a>
            <br />
            <a
              href={`mailto:${businessInfo.email}`}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✉️ {businessInfo.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}