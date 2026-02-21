'use client';

import Breadcrumb from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { useProductsById } from '@/hooks/products/queries';
import { useHandleChangeText } from '@/hooks/ui';
import ethereumIcon from '@/public/images/ethereum.svg';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/slices/cartSlice';
import { formatPrice } from '@/utils/format-price';
import { MinusSignFreeIcons, PlusSignFreeIcons, ShoppingCart01Icon } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.scss';

const ErrorComponent = dynamic(() => import('./error').then((mod) => mod.default), {
    ssr: false,
});

export default function Product() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const productId = Number(id);

    const { data: product, error } = useProductsById({ id: productId });

    const dispatch = useAppDispatch();
    const { text, handleChangeText } = useHandleChangeText({
        primaryText: 'Comprar',
        secondaryText: 'Adicionado ao carrinho',
        duration: 1000
    });

    function increment() {
        setQuantity((prev) => prev + 1);
    }

    function decrement() {
        setQuantity((prev) => Math.max(1, prev - 1));
    }

    function handleAddToCart() {
        if (product) {
            dispatch(addItem({ product, quantity }));
            handleChangeText();
        }
    }

    if (error) return <ErrorComponent />;

    return (
        <>
            <Breadcrumb items={[{ label: 'Produtos', href: '/' }, { label: product.name }]} />
            <div className={styles.productContainer}>
                <div className={styles.product}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        loading="eager"
                        className={styles.product_image}
                    />
                    <div className={styles.product_info}>
                        <h1 className={styles.product_info_name}>{product.name}</h1>
                        <p className={styles.product_info_description}>{product.description}</p>
                        <div className={styles.product_info_price}>
                            <Image src={ethereumIcon} alt="Ethereum" className={styles.product_info_price_icon} />
                            <span>{formatPrice(product.price)}</span>
                        </div>
                        <div className={styles.product_info_actions}>
                            <div className={styles.product_info_actions_quantity}>
                                <Button className={styles.product_info_actions_quantity_button} onClick={decrement}>
                                    <HugeiconsIcon icon={MinusSignFreeIcons} size={16} />
                                </Button>
                                <span className={styles.product_info_actions_quantity_value}>{quantity}</span>
                                <Button className={styles.product_info_actions_quantity_button} onClick={increment}>
                                    <HugeiconsIcon icon={PlusSignFreeIcons} size={16} />
                                </Button>
                            </div>
                            <Button className={styles.product_info_actions_button} onClick={handleAddToCart}>
                                <HugeiconsIcon icon={ShoppingCart01Icon} />
                                {text}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
