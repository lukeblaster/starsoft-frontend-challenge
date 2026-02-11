import styles from './styles.module.scss';

interface ProductCardSkeletonProps {
    useCheckoutLayout?: boolean;
}

export default function ProductCardSkeleton({ useCheckoutLayout = false }: ProductCardSkeletonProps) {
    return (
        <div className={`${styles.container} ${useCheckoutLayout ? styles['container--checkout'] : ''}`}>
            <div className={`${styles.imageContainer} ${useCheckoutLayout ? styles['imageContainer--checkout'] : ''}`}>
                <div className={styles.skeletonImage} />
            </div>
            <div className={`${styles.contentContainer} ${useCheckoutLayout ? styles['contentContainer--checkout'] : ''}`}>
                <div className={`${styles.info} ${useCheckoutLayout ? styles['info--checkout'] : ''}`}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonDescription} />
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.skeletonIcon} />
                    <div className={styles.skeletonPrice} />
                </div>
                {!useCheckoutLayout && (
                    <div className={styles.skeletonButton} />
                )}
                {useCheckoutLayout && (
                    <div className={styles.actions}>
                        <div className={styles.skeletonQuantity} />
                        <div className={styles.skeletonRemoveButton} />
                    </div>
                )}
            </div>
        </div>
    );
}
