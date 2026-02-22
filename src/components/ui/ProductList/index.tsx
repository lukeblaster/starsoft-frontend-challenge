'use client';

import { useProducts } from '@/hooks/products/queries/useProducts';
import { Product } from '@/models';
import dynamic from 'next/dynamic';
import ProductListError from './error';

const LoadButton = dynamic(() => import('../LoadButton'), { ssr: false });

import { useIsMobile } from '@/hooks/ui';
import Container from '../Container';
import ProductCard from '../ProductCard';
import styles from './styles.module.scss';

export default function ProductList() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts();
  const isMobile = useIsMobile();

  const priority = isMobile ? 4 : 8;

  const products: Product[] = data?.allProducts ?? [];

  if (error) return <ProductListError />;

  return (
    <Container display="flex" direction="column" gap={32} justifyContent="center" alignItems="center">
      <Container display="grid" className={styles.productList}>
        {products?.map((product, index) => (
          <ProductCard key={product.id} product={product} useAddtoCartButton priority={index < priority} />
        ))}
      </Container>
      <LoadButton
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </Container>
  );
}
