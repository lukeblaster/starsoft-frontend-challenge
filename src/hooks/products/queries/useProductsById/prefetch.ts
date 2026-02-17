import { PRODUCTS_QUERY_KEY } from '../../query-keys';
import { fetchProductsById } from './service';
import { getQueryClient } from '@/app/get-query-client';

export async function prefetchProductsById({ id }: { id: number }) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [PRODUCTS_QUERY_KEY.LIST, id],
    queryFn: () => fetchProductsById({ id }),
  });

  return { queryClient };
}
