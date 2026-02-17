'use client';
import { Product } from '@/models';
import ProductCard from '../ProductCard';

import { useProducts } from '@/hooks/products/queries/useProducts';
import LoadButton from '../LoadButton';
import ProductListSkeleton from '../ProductListSkeleton';
import ProductListError from './error';
import styles from './styles.module.scss';

export default function ProductList() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts();

  const products: Product[] = data?.allProducts ?? [];

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <ProductListError />;

  return (
    <div className={styles.container}>
      <div className={styles.productListContainer}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} useAddtoCartButton />
        ))}
      </div>
      <LoadButton
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
