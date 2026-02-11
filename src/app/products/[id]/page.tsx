'use client';

import Breadcrumb from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import { useProductsById } from '@/hooks/products';
import ethereumIcon from '@/public/images/ethereum.svg';
import { formatPrice } from '@/utils/format-price';
import { MinusSignFreeIcons, PlusSignFreeIcons, ShoppingCart01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function ProductDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const id = Number(params?.id);
    const isValidId = Number.isFinite(id) && id > 0;

    const { data: product, isLoading, error } = useProductsById({ id });

    const [quantity, setQuantity] = useState(1);

    function increment() {
        setQuantity(prev => prev + 1);
    }

    function decrement() {
        setQuantity(prev => Math.max(1, prev - 1));
    }

    if (!isValidId) {
        return (
            <div className={styles.container}>
                <p>ID do produto invalido.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Carregando...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={styles.container}>
                <p>Produto nao encontrado.</p>
                <button className={styles.backButton} onClick={() => router.back()}>
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Header />
            <Breadcrumb
                items={[
                    { label: 'Produtos', href: '/' },
                    { label: product.name }
                ]}
            />
            <div className={styles.productContainer}>
                <div className={styles.product}>
                    <Image src={product.image} alt={product.name} width={500} height={500} loading='eager' className={styles.product_image} />
                    <div className={styles.product_info}>
                        <h1 className={styles.product_info_name}>{product.name}</h1>
                        <p className={styles.product_info_description}>{product.description}</p>
                        <div className={styles.product_info_price}>
                            <Image src={ethereumIcon} alt="Ethereum" className={styles.product_info_price_icon} />
                            <span>{formatPrice(product.price)}</span>
                        </div>
                        <div className={styles.product_info_actions}>
                            <div className={styles.product_info_actions_quantity}>
                                <Button
                                    className={styles.product_info_actions_quantity_button}
                                    onClick={decrement}
                                >
                                    <HugeiconsIcon icon={MinusSignFreeIcons} size={16} />
                                </Button>
                                <span
                                    className={styles.product_info_actions_quantity_value}
                                >
                                    {quantity}
                                </span>
                                <Button
                                    className={styles.product_info_actions_quantity_button}
                                    onClick={increment}>
                                    <HugeiconsIcon icon={PlusSignFreeIcons} size={16} />
                                </Button>
                            </div>
                            <Button className={styles.product_info_actions_button}>
                                <HugeiconsIcon icon={ShoppingCart01Icon} />
                                COMPRAR
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
