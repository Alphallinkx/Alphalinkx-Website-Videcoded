import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';
import '../index.css';
import { ClientLayout } from '@/components/layout/ClientLayout';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alphalinkx — Digital Agency & Technology Studio',
  description:
    'Alphalinkx transforms ambitious ideas into measurable digital growth through high-performance web development, intelligent AI solutions, technical SEO, and immersive digital experiences.',
  keywords: [
    'digital agency',
    'web development',
    'three.js',
    'React',
    'AI solutions',
    'digital marketing',
    'SEO agency',
    'technical architecture',
    'app development',
  ],
  authors: [{ name: 'Alphalinkx' }],
  metadataBase: new URL('https://alphalinkx.com'),
  alternates: {
    canonical: 'https://alphalinkx.com',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    url: 'https://alphalinkx.com/',
    title: 'Alphalinkx — Digital Agency & Technology Studio',
    description:
      'We build digital experiences that move businesses forward. From high-performance websites to intelligent AI solutions and data-driven marketing.',
    images: [{ url: '/assets/alphalinkx-full-logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alphalinkx — Digital Agency & Technology Studio',
    description:
      'We build digital experiences that move businesses forward. Custom web development, AI automation, and digital marketing.',
    images: ['/assets/alphalinkx-full-logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#060709',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${bricolageGrotesque.variable} ${jetbrainsMono.variable} ${schibstedGrotesk.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600;700&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060709] text-[#F8FAFC] antialiased selection:bg-[#FC6603] selection:text-white min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
