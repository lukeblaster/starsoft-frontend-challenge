import BreadcrumbSkeleton from "../BreadcrumbSkeleton";
import ProductSkeleton from "../ProductSkeleton";
import styles from './styles.module.scss';

export default function ProductDetailsSkeleton() {
    return (
        <div className={styles.container}>
            <BreadcrumbSkeleton />
            <ProductSkeleton />
        </div>
    )
}