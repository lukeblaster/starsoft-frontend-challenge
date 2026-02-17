import { Button } from '../Button';
import { LoadButtonProps } from './props';
import styles from './styles.module.scss';

export default function LoadButton({
  onClick,
  isLoading = false,
  hasNextPage = false,
}: LoadButtonProps) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.progressContainer}>
                <div className={styles.progressBar}></div>
            </div> */}
      <Button isSecondary className={styles.button} onClick={() => onClick()} disabled={isLoading}>
        {isLoading ? 'Carregando...' : hasNextPage ? 'Carregar mais' : 'Você já viu tudo'}
      </Button>
    </div>
  );
}
