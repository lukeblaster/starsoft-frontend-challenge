import styles from './styles.module.scss';

export default function BreadcrumbSkeleton() {
    return (
        <div className={styles.breadcrumbSkeleton}>
            <div className={styles.breadcrumbSkeleton_item} />
            <div className={styles.breadcrumbSkeleton_item} />
        </div>
    );
}