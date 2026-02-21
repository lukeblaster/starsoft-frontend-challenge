import ProductList from '@/components/ui/ProductList';
import { prefetchProducts } from '@/hooks/products/queries/useProducts/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Page() {
    const { queryClient } = await prefetchProducts();

    return (
        <div className={'pageContainer'}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductList />
            </HydrationBoundary>
        </div>
    );
}
