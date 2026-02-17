import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import Product from './product';

import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import ProductDetailsSkeleton from './_components/ProductDetailsSkeleton';

import { prefetchProductsById } from '@/hooks/products/queries/useProductsById/prefetch';

import styles from './styles.module.scss';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);

  const { queryClient } = await prefetchProductsById({ id: productId });

  return (
    <div className={styles.container}>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <Product />
        </Suspense>
      </HydrationBoundary>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
