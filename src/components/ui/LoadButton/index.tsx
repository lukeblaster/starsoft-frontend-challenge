import { Button } from "../Button";
import styles from './styles.module.scss';

export default function LoadButton() {
    return (
        <div className={styles.container}>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar}></div>
            </div>
            <Button isSecondary className={styles.button}>Carregar mais</Button>
        </div>
    )
}