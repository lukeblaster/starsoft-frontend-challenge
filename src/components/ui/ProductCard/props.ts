import { Product } from '@/models';

export interface ProductCardProps {
  product: Product;
  useAddtoCartButton?: boolean;
  addToCartText?: string;
  useCartLayout?: boolean;
}
