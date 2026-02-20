'use client';

import { useHandleChangeText } from '@/hooks/ui';
import ethereumIcon from '@/public/images/ethereum.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/utils/format-price';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo } from 'react';

const ProductCard = dynamic(() => import('@/components/ui/ProductCard'));
const Button = dynamic(() => import('@/components/ui/Button').then((mod) => mod.Button));
const BackButton = dynamic(() => import('./_components/back-button').then((mod) => mod.BackButton));

import styles from './styles.module.scss';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const { text, handleChangeText } = useHandleChangeText({
    primaryText: 'Finalizar Compra',
    secondaryText: 'Compra finalizada!',
    duration: 1500
  });

  const total = useMemo(() =>
    cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.price);
      return sum + price * item.quantity;
    }, 0),
    [cartItems]);

  function handleFinalizePurchase() {
    dispatch(clearCart());
    handleChangeText();
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <h1 className={styles.header_title}>Mochila de Compras</h1>
        <div></div>
      </div>
      <div className={styles.content}>
        {cartItems.length > 0 ? (
          <div className={styles.productsContainer}>
            {cartItems.map((item) => (
              <ProductCard key={item.product.id} product={item.product} useCartLayout />
            ))}
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <p>Seu carrinho está vazio.</p>
          </div>
        )}
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
          <Button
            className={styles.paymentDetails_paymentButton_button}
            onClick={handleFinalizePurchase}
            disabled={cartItems.length === 0}
          >
            {text}
          </Button>
        </div>
      </div>
    </div>
  );
}
