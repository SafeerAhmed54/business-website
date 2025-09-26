import { businessInfo } from '@/app/lib/data/business';

export default function NoScriptFallback() {
  return (
    <noscript>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="text-center mb-12 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {businessInfo.name}
            </h1>
            <p className="text-xl text-gray-600">
              {businessInfo.tagline}
            </p>
          </header>

          {/* JavaScript disabled notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  JavaScript is disabled
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    For the best experience, please enable JavaScript in your browser. 
                    This website works without JavaScript, but some features may be limited.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic content */}
          <div className="space-y-12">
            {/* About section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  With over {businessInfo.yearsExperience} years of experience, {businessInfo.name} 
                  provides professional signboard creation, installation, and general contracting services.
                </p>
                <p>
                  We specialize in LED signboards, panaflex signboards, neon signboards, and various 
                  engineering services including electrical, civil, and mechanical engineering.
                </p>
              </div>
            </section>

            {/* Services section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Signboard Services</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• LED Signboards</li>
                    <li>• Panaflex Signboards</li>
                    <li>• Neon Signboards</li>
                    <li>• Custom Design & Installation</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Engineering Services</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Electrical Engineering</li>
                    <li>• Civil Engineering</li>
                    <li>• Mechanical Engineering</li>
                    <li>• General Contracting</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Phone:</span>
                        <a href={`tel:${businessInfo.phone}`} className="text-indigo-600 hover:text-indigo-800">
                          {businessInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Email:</span>
                        <a href={`mailto:${businessInfo.email}`} className="text-indigo-600 hover:text-indigo-800">
                          {businessInfo.email}
                        </a>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium text-gray-700 w-20">Address:</span>
                        <span className="text-gray-600">{businessInfo.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                    <p className="text-gray-600">{businessInfo.hours}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Simple contact form fallback */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <form action={`mailto:${businessInfo.email}`} method="get" encType="text/plain">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="body"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Send Message (Opens Email Client)
                  </button>
                </form>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              © 2024 {businessInfo.name}. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </noscript>
  );
}