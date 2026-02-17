import { PRODUCTS_QUERY_KEY } from '../../query-keys';

export interface UseProductsByIdProps {
  id: number;
}

export type UseProductsByIdKeysProps = [PRODUCTS_QUERY_KEY.LIST, number];
