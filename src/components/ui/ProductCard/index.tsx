"use client";

import ethereumIcon from '@/public/images/ethereum.svg';
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
    useCheckoutLayout = false
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);

    function increment() {
        setQuantity(prev => prev + 1);
    }

    function decrement() {
        setQuantity(prev => Math.max(1, prev - 1));
    }

    return (
        <div className={`${styles.container} ${useCheckoutLayout ? styles['container--checkout'] : ''}`}>
            <div className={`${styles.imageContainer} ${useCheckoutLayout ? styles['imageContainer--checkout'] : ''}`}>
                <>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500} height={500}
                        className={`
                        ${styles.imageContainer_image} 
                        ${useCheckoutLayout ? styles['imageContainer_image--checkout'] : ''}`
                        }
                    />
                </>
            </div>
            <div className={`
                ${styles.contentContainer} 
                ${useCheckoutLayout ? styles['contentContainer--checkout'] : ''}`
            }>
                <div className={`
                    ${styles.contentContainer_info} 
                    ${useCheckoutLayout ? styles['contentContainer--checkout_info'] : ''}`}
                >
                    <Link href={`/products/${product.id}`}>
                        <h3 className={styles.contentContainer_name}>{product.name}</h3>
                    </Link>
                    <span className={`
                        ${styles.contentContainer_description} 
                        ${useCheckoutLayout ? styles['contentContainer--checkout_description'] : ''}`
                    }>
                        {product.description}
                    </span>
                </div>
                <div className={styles.contentContainer_priceContainer}>
                    <Image src={ethereumIcon} alt="Ethereum" className={`
                        ${styles.contentContainer_priceContainer_icon} 
                        ${useCheckoutLayout ? styles['contentContainer--checkout_priceContainer_icon'] : ''}`
                    } />
                    <span className={`
                        ${styles.contentContainer_priceContainer_price} 
                        ${useCheckoutLayout ? styles['contentContainer--checkout_priceContainer_price'] : ''}`
                    }>{formatPrice(product.price)}</span>
                </div>

                {useAddtoCartButton && <Button>{addToCartText}</Button>}

                {useCheckoutLayout && (
                    <div className={styles['contentContainer--checkout_actions']}>
                        <div className={styles['contentContainer--checkout_actions_quantity']}>
                            <Button
                                className={styles['contentContainer--checkout_actions_quantity_button']}
                                onClick={decrement}
                            >
                                <HugeiconsIcon icon={MinusSignFreeIcons} size={16} />
                            </Button>
                            <span
                                className={styles['contentContainer--checkout_actions_quantity_button']}
                            >
                                {quantity}
                            </span>
                            <Button
                                className={styles['contentContainer--checkout_actions_quantity_button']}
                                onClick={increment}>
                                <HugeiconsIcon icon={PlusSignFreeIcons} size={16} />
                            </Button>
                        </div>
                        <div>
                            <Button className={styles['contentContainer--checkout_actions_removeButton']}>
                                <HugeiconsIcon icon={Delete01Icon} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}