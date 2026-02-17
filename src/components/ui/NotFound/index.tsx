import { Button } from '@/components/ui/Button';
import { NotFoundProps } from './props';
import styles from './styles.module.scss';

export default function NotFound({ title, message, buttonText, buttonOnClick }: NotFoundProps) {

    return (
        <div className={styles.container}>
            <h2 className={styles.container_title}>{title}</h2>
            <p className={styles.container_message}>{message}</p>
            {buttonText && <Button onClick={buttonOnClick}>{buttonText}</Button>}
        </div>
    );
}

NotFound.displayName = 'NotFound';