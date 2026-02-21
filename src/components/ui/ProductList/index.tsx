'use client';

import { useProducts } from '@/hooks/products/queries/useProducts';
import { Product } from '@/models';

import LoadButton from '../LoadButton';
import ProductListError from './error';

import Container from '../Container';
import ProductCard from '../ProductCard';
import styles from './styles.module.scss';

export default function ProductList() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts();

  const products: Product[] = data?.allProducts ?? [];

  if (error) return <ProductListError />;

  return (
    <Container display="flex" direction="column" gap={32} justifyContent="center" alignItems="center">
      <Container display="grid" className={styles.productList}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} useAddtoCartButton />
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
