import { UseProductsProps } from './props';

export async function fetchProducts({
  page,
  rows = 8,
  sortBy = 'id',
  orderBy = 'ASC',
}: UseProductsProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?page=${page}&rows=${rows}&sortBy=${sortBy}&orderBy=${orderBy}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
}
