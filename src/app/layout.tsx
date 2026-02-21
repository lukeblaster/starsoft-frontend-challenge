import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import '../styles/global.scss';
import Providers from './providers';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Starsoft Frontend Challenge',
  description: 'Starsoft Frontend Challenge',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Starsoft Frontend Challenge',
    description: 'Starsoft Frontend Challenge',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {apiUrl && <link rel="dns-prefetch" href={apiUrl} />}
        <link rel="dns-prefetch" href="https://softstar.s3.amazonaws.com" />
        <link rel="preconnect" href="https://softstar.s3.amazonaws.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
