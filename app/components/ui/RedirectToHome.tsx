'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectToHomeProps {
  section: string;
}

export default function RedirectToHome({ section }: RedirectToHomeProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage with the appropriate section
    router.replace(`/#${section}`);
  }, [router, section]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2EB62C] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to {section} section...</p>
      </div>
    </div>
  );
}