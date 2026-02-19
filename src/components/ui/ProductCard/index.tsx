'use client';

import ethereumIcon from '@/public/images/ethereum.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, removeItem, updateQuantity } from '@/store/slices/cartSlice';
import { formatPrice } from '@/utils/format-price';
import { Delete01Icon, MinusSignFreeIcons, PlusSignFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../Button';
import { ProductCardProps } from './props';
import styles from './styles.module.scss';

export default function ProductCard({
    product,
    useAddtoCartButton,
    addToCartText = 'COMPRAR',
    useCartLayout = false,
}: ProductCardProps) {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.product.id === product.id)
    );
    const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

    function increment() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (useCartLayout && cartItem) {
            dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        }
    }

    function decrement() {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        if (useCartLayout && cartItem) {
            dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        }
    }

    function handleAddToCart() {
        dispatch(addItem({ product, quantity }));
    }

    function handleRemoveFromCart() {
        dispatch(removeItem(product.id));
    }

    return (
        <div
            className={`${styles.container} ${useCartLayout ? styles['container--cart'] : ''}`}
        >
            <div
                className={`${styles.imageContainer} ${useCartLayout ? styles['imageContainer--cart'] : ''}`}
            >
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className={`
                        ${styles.imageContainer_image} 
                        ${useCartLayout ? styles['imageContainer_image--cart'] : ''}`}
                    />
                </Link>
            </div>
            <div
                className={`
                ${styles.contentContainer} 
                ${useCartLayout ? styles['contentContainer--cart'] : ''}`}
            >
                <div
                    className={`
                    ${styles.contentContainer_info} 
                    ${useCartLayout ? styles['contentContainer--cart_info'] : ''}`}
                >
                    <Link href={`/products/${product.id}`} className={styles.contentContainer_nameLink}>
                        <h3 className={styles.contentContainer_name}>{product.name}</h3>
                    </Link>
                    <span
                        className={`
                        ${styles.contentContainer_description} 
                        ${useCartLayout ? styles['contentContainer--cart_description'] : ''}`}
                    >
                        {product.description}
                    </span>
                </div>
                <div className={styles.contentContainer_priceContainer}>
                    <Image
                        src={ethereumIcon}
                        alt="Ethereum"
                        className={`
                        ${styles.contentContainer_priceContainer_icon} 
                        ${useCartLayout ? styles['contentContainer--cart_priceContainer_icon'] : ''}`}
                    />
                    <span
                        className={`
                        ${styles.contentContainer_priceContainer_price} 
                        ${useCartLayout ? styles['contentContainer--cart_priceContainer_price'] : ''}`}
                    >
                        {formatPrice(product.price)}
                    </span>
                </div>

                {useAddtoCartButton && <Button onClick={handleAddToCart}>{addToCartText}</Button>}

                {useCartLayout && (
                    <div className={styles['contentContainer--cart_actions']}>
                        <div className={styles['contentContainer--cart_actions_quantity']}>
                            <Button
                                className={styles['contentContainer--cart_actions_quantity_button']}
                                onClick={decrement}
                            >
                                <HugeiconsIcon icon={MinusSignFreeIcons} size={16} />
                            </Button>
                            <span className={styles['contentContainer--cart_actions_quantity_value']}>
                                {quantity}
                            </span>
                            <Button
                                className={styles['contentContainer--cart_actions_quantity_button']}
                                onClick={increment}
                            >
                                <HugeiconsIcon icon={PlusSignFreeIcons} size={16} />
                            </Button>
                        </div>
                        <div>
                            <Button
                                className={styles['contentContainer--cart_actions_removeButton']}
                                onClick={handleRemoveFromCart}
                            >
                                <HugeiconsIcon icon={Delete01Icon} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
