import Container from '@/components/ui/Container';
import { CartHeader } from './_components/CartHeader';
import { CartPaymentSection } from './_components/CartPaymentSection';
import { CartProductsList } from './_components/CartProductsList';
import styles from './styles.module.scss';

export default function CartPage() {
  return (
    <Container display="flex" direction="column" gap={40} className={styles.cartContainer}>
      <CartHeader />
      <Container display="flex" direction="column" gap={24} className={styles.content}>
        <CartProductsList />
        <CartPaymentSection />
      </Container>
    </Container>
  );
}
