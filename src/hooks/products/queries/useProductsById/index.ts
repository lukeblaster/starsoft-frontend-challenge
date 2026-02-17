import { useSuspenseQuery } from '@tanstack/react-query';
import { PRODUCTS_QUERY_KEY } from '../../query-keys';
import { UseProductsByIdKeysProps, UseProductsByIdProps } from './props';
import { fetchProductsById } from './service';

export function useProductsById({ id }: UseProductsByIdProps) {
  const queryKey: UseProductsByIdKeysProps = [PRODUCTS_QUERY_KEY.LIST, id];

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey,
    queryFn: () => fetchProductsById({ id }),
  });

  return {
    data,
    isLoading,
    error,
  };
}
