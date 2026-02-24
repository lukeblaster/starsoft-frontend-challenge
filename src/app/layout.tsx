import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import '../styles/global.scss';
import Providers from './providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-primary',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Starsoft Frontend Challenge',
    template: '%s | Starsoft',
  },
  description: 'Explore e compre produtos na plataforma Starsoft.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Starsoft Frontend Challenge',
    title: 'Starsoft Frontend Challenge',
    description: 'Explore e compre produtos na plataforma Starsoft.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <Head>
        <link rel="preconnect" href="https://softstar.s3.amazonaws.com" />
        <link rel="dns-prefetch" href="https://softstar.s3.amazonaws.com" />
      </Head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
