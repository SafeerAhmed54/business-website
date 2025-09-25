import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { businessInfo } from "@/app/lib/data";
import StructuredData from "@/app/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
    "noble enterprises",
    "import export services",
    "electrical engineering",
    "civil engineering", 
    "mechanical engineering",
    "government contractor",
    "LED signboards",
    "panaflex signboards",
    "neon signboards",
    "offset printing export",
    "rawalpindi contractor",
    "karachi engineering",
    "pakistan engineering services",
    "general order supplier",
    "license holders"
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  category: 'business',
  classification: 'Engineering and Contracting Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nobleenterprises.com'), // Update with actual domain
  alternates: {
    canonical: 'https://nobleenterprises.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nobleenterprises.com',
    siteName: businessInfo.name,
    title: businessInfo.name,
    description: businessInfo.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Engineering and Contracting Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: businessInfo.name,
    description: businessInfo.description,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add actual verification code
    yandex: 'yandex-verification-code', // Add actual verification code
    yahoo: 'yahoo-site-verification-code', // Add actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
