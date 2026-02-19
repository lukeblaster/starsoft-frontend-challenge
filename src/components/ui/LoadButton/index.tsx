import { useProgressAnimation } from '@/hooks/animations';
import { motion } from 'motion/react';
import { Button } from '../Button';
import { LoadButtonProps } from './props';
import styles from './styles.module.scss';

export default function LoadButton({
  onClick,
  isLoading = false,
  hasNextPage = false,
}: LoadButtonProps) {
  const { scope, width } = useProgressAnimation({ isLoading });

  return (
    <div className={styles.container}>
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
      <Button isSecondary className={styles.button} onClick={() => onClick()} disabled={isLoading}>
        {isLoading ? 'Carregando...' : hasNextPage ? 'Carregar mais' : 'Você já viu tudo'}
      </Button>
    </div>
  );
}
