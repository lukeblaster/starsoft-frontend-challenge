import Link from "next/link";
import styles from './styles.module.scss';
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02FreeIcons } from "@hugeicons/core-free-icons";
import { Product } from "@/models";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/utils/format-price";
import ethereumIcon from "@/public/images/ethereum.svg";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const products: Product[] = [
    {
        id: 1,
        name: "Backpack",
        description: "Uma mochila resistente com compartimentos secretos, ideal para aventureiros que precisam carregar uma variedade de itens essenciais em suas jornadas épicas.",
        image: "https://softstar.s3.amazonaws.com/items/backpack.png",
        price: "182.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
    {
        id: 2,
        name: "Boots of Ppeed",
        description: "Botas feitas de couro fino e tecido élfico, imbuidas com encantamentos mágicos que conferem velocidade sobrenatural a quem as usa, permitindo movimentos ágeis e fugas rápidas.",
        image: "https://softstar.s3.amazonaws.com/items/boots-of-speed.png",
        price: "338.00000000",
        createdAt: "2024-07-18T23:55:43.238Z"
    },
]

export default function CheckoutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Link href="/" className={styles.header_backButton}>
                        <HugeiconsIcon icon={ArrowLeft02FreeIcons} className={styles.header_backButton_icon} />
                    </Link>
                </div>
                <h1 className={styles.header_title}>Mochila de Compras</h1>
                <div></div>
            </div>
            <div className={styles.content}>
                <div className={styles.productsContainer}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} useCheckoutLayout />
                    ))}
                </div>
            </div>
            <div className={styles.paymentDetails}>
                <div className={styles.paymentDetails_totalAmount}>
                    <span className={styles.paymentDetails_totalAmount_label}>Total</span>
                    <div className={styles.paymentDetails_totalAmount_amountContainer}>
                        <div className={styles.paymentDetails_totalAmount_amountContainer_iconContainer}>
                            <Image src={ethereumIcon} alt="Ethereum" width={26} height={26} />
                        </div>
                        <span className={styles.paymentDetails_totalAmount_amountContainer_amount}>{formatPrice("182.00000000")}</span>
                    </div>
                </div>
            </div>
            <div className={styles.paymentDetails_paymentButton}>
                <Button className={styles.paymentDetails_paymentButton_button}>Finalizar Compra</Button>
            </div>
        </div>
    )
}