import { prefetchProductsById } from '@/hooks/products/queries/useProductsById/prefetch';
import { fetchProductsById } from '@/hooks/products/queries/useProductsById/service';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductDetailsSkeleton from './_components/ProductDetailsSkeleton';
import Product from './product';

import Container from '@/components/ui/Container';
import styles from './styles.module.scss';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductsById({ id: Number(id) });
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.image, width: 500, height: 500, alt: product.name }],
      },
    };
  } catch {
    return { title: 'Produto não encontrado' };
  }
}

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
