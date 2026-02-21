import { getQueryClient } from '@/app/get-query-client';
import { PRODUCTS_QUERY_KEY } from '../../query-keys';
import { fetchProducts } from './service';

export async function prefetchProducts() {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [PRODUCTS_QUERY_KEY.LIST],
        queryFn: ({ pageParam }) => fetchProducts({ page: pageParam }),
        initialPageParam: 1,
    });

    return { queryClient };
}
