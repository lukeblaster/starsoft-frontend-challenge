'use client';
import { useAppSelector } from '@/app/store/hooks';
import { ShoppingBag01FreeIcons } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

import styles from './styles.module.scss';

export default function CartCounter() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className={styles.cartContainer}>
            <Link href="/cart" aria-label='Ir para o carrinho'>
                <HugeiconsIcon
                    icon={ShoppingBag01FreeIcons}
                    className={styles.cartContainer_cartIcon}
                />
            </Link>
            <div>
                <span className={styles.cartContainer_cartCount}>{totalItems}</span>
            </div>
        </div>
    );
}