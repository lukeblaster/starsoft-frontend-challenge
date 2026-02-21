import Container from '../Container';
import ProductCardSkeleton from '../ProductCardSkeleton';
import styles from './styles.module.scss';

export default function ProductListSkeleton() {
    return (
        <Container display="flex" direction="column" gap={32} justifyContent="center" alignItems="center">
            <Container display="grid" className={styles.productList}>
                {Array.from({ length: 12 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            </Container>
        </Container>
    );
}