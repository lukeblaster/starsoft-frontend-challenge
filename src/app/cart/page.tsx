'use client';

import { Button } from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import ethereumIcon from '@/public/images/ethereum.svg';
import { useAppSelector } from '@/store/hooks';
import { formatPrice } from '@/utils/format-price';
import Image from 'next/image';
import { useMemo } from 'react';
import { BackButton } from './_components/back-button';
import EmptyCart from './_components/EmptyCart';
import styles from './styles.module.scss';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const total = useMemo(() =>
    cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.price);
      return sum + price * item.quantity;
    }, 0),
    [cartItems]);

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <h1 className={styles.header_title}>Mochila de Compras</h1>
        <div></div>
      </div>
      <div className={styles.content}>
        <div className={styles.productsContainer}>
          {cartItems.map((item) => (
            <ProductCard key={item.product.id} product={item.product} useCartLayout />
          ))}
        </div>
        <div className={styles.paymentDetails}>
          <div className={styles.paymentDetails_totalAmount}>
            <span className={styles.paymentDetails_totalAmount_label}>Total</span>
            <div className={styles.paymentDetails_totalAmount_amountContainer}>
              <div className={styles.paymentDetails_totalAmount_amountContainer_iconContainer}>
                <Image src={ethereumIcon} alt="Ethereum" width={26} height={26} />
              </div>
              <span className={styles.paymentDetails_totalAmount_amountContainer_amount}>
                {formatPrice(total.toFixed(8))}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.paymentDetails_paymentButton}>
          <Button className={styles.paymentDetails_paymentButton_button}>Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
}
