import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import React from 'react';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
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
