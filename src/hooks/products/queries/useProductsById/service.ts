import { Product } from '@/models';
import { UseProductsByIdProps } from './props';

export async function fetchProductsById({ id }: UseProductsByIdProps): Promise<Product> {
  const baseUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_FRONTEND_URL : '';

  const response = await fetch(`${baseUrl}/api/products/${id}`);

  if (!response.ok) throw new Error('Erro ao buscar produto');

  const data = await response.json();

  if (Array.isArray(data?.products) && data.products.length > 0) {
    return data.products[0] as Product;
  }

  if (data?.product) {
    return data.product as Product;
  }

  throw new Error('Produto nao encontrado');
}
