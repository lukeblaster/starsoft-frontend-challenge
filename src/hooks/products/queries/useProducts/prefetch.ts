import { getQueryClient } from '@/app/get-query-client';
import { Product } from '@/models';
import { PRODUCTS_QUERY_KEY } from '../../query-keys';
import { fetchProducts } from './service';

export async function prefetchProducts() {
    const queryClient = getQueryClient();

    // Prefetch the first page of products
    await queryClient.prefetchInfiniteQuery({
        queryKey: [PRODUCTS_QUERY_KEY.LIST],
        queryFn: ({ pageParam }) => fetchProducts({ page: pageParam as number }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: { products: Product[] }, allPages: { products: Product[] }[]) => {
            const rows = 8;
            if (!lastPage.products || lastPage.products.length === 0) {
                return undefined;
            }
            if (lastPage.products.length < rows) {
                return undefined;
            }
            return allPages.length + 1;
        },
    });

    return { queryClient };
}
