import styles from './styles.module.scss';

export default function ProductSkeleton() {
    return (
        <div className={styles.productContainer}>
            <div className={styles.product}>
                <div className={styles.product_image}></div>
                <div className={styles.product_info}>
                    <h1 className={styles.product_info_name}></h1>
                    <div className={styles.product_info_description_container}>
                        <div className={styles.product_info_description} />
                        <div className={styles.product_info_description} />
                    </div>
                    <div className={styles.product_info_price}>
                        <div className={styles.product_info_price_icon} />
                        <span className={styles.product_info_price_value}></span>
                    </div>
                    <div className={styles.product_info_actions}>
                        <div className={styles.product_info_actions_quantity}>
                        </div>
                        <div
                            className={styles.product_info_actions_button}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}