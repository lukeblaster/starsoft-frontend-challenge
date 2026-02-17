import { PRODUCTS_QUERY_KEY } from '../../query-keys';

export interface UseProductsProps {
  page: number;
  rows?: number;
  sortBy?: string;
  orderBy?: 'ASC' | 'DESC';
}

export type UseProductsKeysProps = [PRODUCTS_QUERY_KEY.LIST];
