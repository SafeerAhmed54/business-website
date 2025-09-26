import Link from 'next/link';
import { Metadata } from 'next';
import { businessInfo } from '@/app/lib/data/business';

export const metadata: Metadata = {
  title: 'Page Not Found | ' + businessInfo.name,
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold text-white/20 mb-4">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div className="text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-white/80 mb-6">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
          </Link>

          <button
            onClick={() => window.history.back()}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

        {/* Contact info */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm mb-4">
            Need help? Contact us:
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