'use client';
import { Product } from '@/models';
import ProductCard from "../ProductCard";

import { useProducts } from '@/hooks/products/queries/useProducts';
import LoadButton from '../LoadButton';
import styles from './styles.module.scss';

export default function ProductList() {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useProducts();

    const products: Product[] = data?.allProducts ?? [];

    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar produtos</div>;

    return (
        <div className={styles.container}>
            <div className={styles.productListContainer}>
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        useAddtoCartButton
                    />
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