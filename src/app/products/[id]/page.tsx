import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Product from './product';

import styles from './styles.module.scss';
import { prefetchProductsById } from '@/hooks/products/queries/useProductsById/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = Number(id);

    const { queryClient } = await prefetchProductsById({ id: productId });

    return (
        <div className={styles.container}>
            <Header />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Product />
            </HydrationBoundary>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
