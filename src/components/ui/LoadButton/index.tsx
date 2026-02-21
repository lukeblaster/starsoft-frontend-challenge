import { useProgressAnimation } from '@/hooks/animations';
import { motion } from 'motion/react';
import { Button } from '../Button';
import Container from '../Container';
import { LoadButtonProps } from './props';
import styles from './styles.module.scss';

export default function LoadButton({
  onClick,
  isLoading = false,
  hasNextPage = false,
}: LoadButtonProps) {
  const { scope, width } = useProgressAnimation({ isLoading });

  return (
    <Container display="flex" direction="column" gap={10} className={styles.container}>
      {isLoading && (
        <motion.div
          className={styles.progressContainer}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.progressBar}
            ref={scope}
            style={{ width }}
          />
        </motion.div>
      )}
      <Button
        className={styles.button}
        onClick={() => onClick()}
        disabled={isLoading || !hasNextPage}
        isloading={isLoading}
        isSecondary
      >
        {isLoading ? 'Carregando...' : hasNextPage ? 'Carregar mais' : 'Você já viu tudo'}
      </Button>
    </Container>
  );
}
