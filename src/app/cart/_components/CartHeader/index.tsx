import Container from '@/components/ui/Container';
import { BackButton } from '../back-button';
import styles from './styles.module.scss';

export function CartHeader() {
  return (
    <Container display="flex" justifyContent="space-between" alignItems="center" className={styles.header}>
      <BackButton />
      <h1 className={styles.header_title}>Mochila de Compras</h1>
      <div></div>
    </Container>
  );
}
