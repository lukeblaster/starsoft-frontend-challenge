import dynamic from 'next/dynamic';
import React from 'react';

import Header from '@/components/ui/Header';
const Footer = dynamic(() => import('@/components/ui/Footer'));

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
