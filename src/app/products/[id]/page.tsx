import { prefetchProductsById } from '@/hooks/products/queries/useProductsById/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import ProductDetailsSkeleton from './_components/ProductDetailsSkeleton';
import Product from './product';

import Container from '@/components/ui/Container';
import styles from './styles.module.scss';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);

  const { queryClient } = await prefetchProductsById({ id: productId });

  return (
    <Container display="flex" direction="column" gap={16} className={styles.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <Product />
        </Suspense>
      </HydrationBoundary>
    </Container>
  );
}
