import { Product } from '@/app/models';
import { formatPrice } from '@/app/utils/format-price';
import ethereumIcon from '@/public/images/ethereum.svg';
import Image from 'next/image';
import Button from '../Button';
import styles from './styles.module.scss';

export default function ProductCard({ product }: { product: Product }) {
    return <div className={styles.container}>
        <div className={styles.imageContainer}>
            <Image src={product.image} alt={product.name} width={500} height={500} className={styles.imageContainer_image} />
        </div>
        <div className={styles.contentContainer}>
            <div className={styles.contentContainer_info}>
                <h3 className={styles.contentContainer_name}>{product.name}</h3>
                <span className={styles.contentContainer_description}>{product.description}</span>
            </div>
            <div className={styles.contentContainer_priceContainer}>
                <Image src={ethereumIcon} alt="Ethereum" width={20} height={20} />
                <span className={styles.contentContainer_priceContainer_price}>{formatPrice(product.price)}</span>
            </div>
            <Button>COMPRAR</Button>
        </div>
    </div>;
}