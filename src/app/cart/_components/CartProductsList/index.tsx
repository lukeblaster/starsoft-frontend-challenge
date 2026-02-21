'use client';

import ProductCard from '@/components/ui/ProductCard';
import { useAppSelector } from '@/store/hooks';
import styles from './styles.module.scss';

export function CartProductsList() {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <div className={styles.productsContainer}>
      {cartItems.length > 0 ? cartItems.map((item) => (
        <ProductCard key={item.product.id} product={item.product} useCartLayout />
      )) : <div className={styles.emptyCart}>
        <p>Seu carrinho está vazio.</p>
      </div>}
    </div>
  );
}
