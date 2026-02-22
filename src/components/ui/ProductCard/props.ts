import { Product } from '@/models';

export interface ProductCardProps {
  product: Product;
  useAddtoCartButton?: boolean;
  primaryText?: string;
  secondaryText?: string;
  useCartLayout?: boolean;
  priority?: boolean;
}
