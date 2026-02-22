import ethereumIcon from '@/public/images/ethereum.svg';
import { formatPrice } from '@/utils/format-price';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Card from '../Card';

const AddToCartButton = dynamic(() => import('./components/AddToCartButton'));
const CartLayout = dynamic(() => import('./components/CartLayout'));

import Container from '../Container';
import { ProductCardProps } from './props';
import styles from './styles.module.scss';

export default function ProductCard({
    product,
    useAddtoCartButton,
    primaryText = 'Comprar',
    secondaryText = 'Adicionado ao carrinho',
    useCartLayout = false,
    priority = false,
}: ProductCardProps) {
    return (
        <Card
            className={`${styles.container} ${useCartLayout ? styles['container--cart'] : ''}`}
        >
            <div
                className={`${styles.imageContainer} ${useCartLayout ? styles['imageContainer--cart'] : ''}`}
            >
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                        quality={75}
                        loading={priority ? 'eager' : 'lazy'}
                        priority={priority}
                        fetchPriority={priority ? 'high' : 'auto'}
                        // sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className={`
                        ${styles.imageContainer_image} 
                        ${useCartLayout ? styles['imageContainer_image--cart'] : ''}`}
                    />
                </Link>
            </div>
            <Container
                display="flex"
                direction="column"
                gap={12}
                className={`
                ${styles.content} 
                ${useCartLayout ? styles['content--cart'] : ''}`}
            >
                <Container
                    gap={useCartLayout ? 0 : 4}
                    display="flex"
                    direction="column"
                    className={`
                    ${styles.content_information} 
                    ${useCartLayout ? styles['content--cart_information'] : ''}`}
                >
                    <Link href={`/products/${product.id}`} className={styles.content_nameLink}>
                        <h3 className={styles.content_name}>{product.name}</h3>
                    </Link>
                    <span
                        className={`
                        ${styles.content_description} 
                        ${useCartLayout ? styles['content--cart_description'] : ''}`}
                    >
                        {product.description}
                    </span>
                </Container>
                <Container display='flex' direction='row' alignItems='center' gap={8} className={styles.content_amount}>
                    <Image
                        src={ethereumIcon}
                        alt="Ethereum"
                        priority
                        className={`
                        ${styles.content_amount_icon} 
                        ${useCartLayout ? styles['content--cart_amount_icon'] : ''}`}
                    />
                    <span
                        className={`
                        ${styles.content_amount_number} 
                        ${useCartLayout ? styles['content--cart_amount_number'] : ''}`}
                    >
                        {formatPrice(product.price)}
                    </span>
                </Container>

                {useAddtoCartButton && <AddToCartButton product={product} primaryText={primaryText} secondaryText={secondaryText} />}

                {useCartLayout && <CartLayout product={product} />}
            </Container>
        </Card>
    );
}
