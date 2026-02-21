'use client';

import { Button } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { useHandleChangeText } from '@/hooks/ui';
import ethereumIcon from '@/public/images/ethereum.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/utils/format-price';
import Image from 'next/image';
import { useMemo } from 'react';
import styles from './styles.module.scss';

export function CartPaymentSection() {
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
    <>
      <Container display="flex" direction="column" className={styles.paymentDetails}>
        <Container display="flex" justifyContent="space-between" alignItems="center" className={styles.paymentDetails_totalAmount}>
          <span className={styles.paymentDetails_totalAmount_label}>Total</span>
          <Container display="flex" direction="row" alignItems="center" gap={8} className={styles.paymentDetails_totalAmount_amountContainer}>
            <Container display="flex" justifyContent="center" alignItems="center" className={styles.paymentDetails_totalAmount_amountContainer_iconContainer}>
              <Image src={ethereumIcon} alt="Ethereum" width={26} height={26} />
            </Container>
            <span className={styles.paymentDetails_totalAmount_amountContainer_amount}>
              {formatPrice(total.toFixed(8))}
            </span>
          </Container>
        </Container>
      </Container>
      <div className={styles.paymentDetails_paymentButton}>
        <Button
          className={styles.paymentDetails_paymentButton_button}
          onClick={handleFinalizePurchase}
          disabled={cartItems.length === 0}
        >
          {text}
        </Button>
      </div>
    </>
  );
}
