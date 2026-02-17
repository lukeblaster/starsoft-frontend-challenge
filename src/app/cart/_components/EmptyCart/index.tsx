import styles from '../../styles.module.scss';
import { BackButton } from '../back-button';

export default function EmptyCart() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <BackButton />
                <h1 className={styles.header_title}>Mochila de Compras</h1>
                <div></div>
            </div>
            <div className={styles.content}>
                <div className={styles.emptyCart}>
                    <p>Seu carrinho está vazio</p>
                </div>
            </div>
        </div>
    );
}