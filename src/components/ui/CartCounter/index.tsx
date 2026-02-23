'use client';
import { useAppSelector } from '@/store/hooks';
import { ShoppingBag01FreeIcons } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

import Container from '../Container';
import styles from './styles.module.scss';

export default function CartCounter() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Container display="flex" direction="row" alignItems="center" justifyContent="center" gap={6} className={styles.cartCount}>
            <Link href="/cart" aria-label='Ir para o carrinho'>
                <HugeiconsIcon
                    icon={ShoppingBag01FreeIcons}
                    className={styles.cartCount_cartIcon}
                />
            </Link>
            <span className={styles.cartCount_cartCount} data-testid="cart-counter-total-items">{totalItems}</span>
        </Container>
    );
}