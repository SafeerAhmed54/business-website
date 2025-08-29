import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { businessInfo } from "@/app/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: businessInfo.name,
    template: `%s | ${businessInfo.name}`
  },
  description: businessInfo.description,
  keywords: [
    "signboard",
    "contractor",
    "construction",
    "custom signs",
    "commercial contracting",
    "residential construction",
    "sign installation",
    "building services"
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://signboardcontractor.com'), // Update with actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://signboardcontractor.com', // Update with actual domain
    siteName: businessInfo.name,
    title: businessInfo.name,
    description: businessInfo.description,
    images: [
      {
        url: '/images/og-image.jpg', // Add this image later
        width: 1200,
        height: 630,
        alt: businessInfo.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: businessInfo.name,
    description: businessInfo.description,
    images: ['/images/og-image.jpg'], // Add this image later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
