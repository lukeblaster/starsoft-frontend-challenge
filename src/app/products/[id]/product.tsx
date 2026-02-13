"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProductsById } from "@/hooks/products/queries";
import styles from './styles.module.scss';
import { addItem } from "@/store/slices/cartSlice";
import Image from "next/image";
import ethereumIcon from '@/public/images/ethereum.svg';
import { formatPrice } from "@/utils/format-price";
import { Button } from "@/components/ui/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusSignFreeIcons, PlusSignFreeIcons, ShoppingCart01Icon } from "@hugeicons/core-free-icons";

export default function Product() {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const productId = Number(id);

    const { data: product, isLoading, error } = useProductsById({ id: productId });

    const router = useRouter();
    const dispatch = useAppDispatch();

    function increment() {
        setQuantity(prev => prev + 1);
    }

    function decrement() {
        setQuantity(prev => Math.max(1, prev - 1));
    }

    function handleAddToCart() {
        if (product) {
            dispatch(addItem({ product, quantity }));
        }
    }

    // Como fizemos prefetch no servidor, isLoading será false na primeira renderização
    // Mas ainda precisamos tratar o caso de erro ou produto não encontrado
    if (error) {
        return (
            <div className={styles.productContainer}>
                <div className={styles.errorContainer}>
                    <h2>Produto não encontrado</h2>
                    <p>O produto que você está procurando não existe ou foi removido.</p>
                    <Button onClick={() => router.push('/')}>
                        Voltar para a página inicial
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading || !product) {
        return <div className={styles.productContainer}>Carregando...</div>;
    }

    return (
        <>
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
                            <Button
                                className={styles.product_info_actions_button}
                                onClick={handleAddToCart}
                            >
                                <HugeiconsIcon icon={ShoppingCart01Icon} />
                                COMPRAR
                            </Button>
                        </div>
                    </div>

                </div>
            </div></>
    )
}