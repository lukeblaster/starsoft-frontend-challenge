import ProductCardSkeleton from '../ProductCardSkeleton';
import styles from './styles.module.scss';

export default function ProductListSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.productListContainer}>
                {Array.from({ length: 12 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
        </div>
    );
}