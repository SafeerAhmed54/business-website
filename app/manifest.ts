import { MetadataRoute } from 'next';
import { businessInfo } from '@/app/lib/data/business';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: businessInfo.name,
    short_name: 'Noble Enterprises',
    description: businessInfo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'engineering', 'construction'],
    lang: 'en',
    orientation: 'portrait-primary',
  };
}