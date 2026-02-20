import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </main>
    );
}
