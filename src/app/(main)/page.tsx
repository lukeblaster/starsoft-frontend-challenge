import Container from '@/components/ui/Container';
import ProductList from '@/components/ui/ProductList';
import { prefetchProducts } from '@/hooks/products/queries/useProducts/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Page() {
    const { queryClient } = await prefetchProducts();

    return (
        <Container display="flex" direction="column" gap={0}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<Loading />}>
                    <ProductList />
                </Suspense>
            </HydrationBoundary>
        </Container>
    );
}
