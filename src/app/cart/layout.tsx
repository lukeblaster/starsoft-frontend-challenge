import Footer from '@/components/ui/Footer';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Starsoft Frontend Challenge',
    description: 'Starsoft Frontend Challenge',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    );
}
