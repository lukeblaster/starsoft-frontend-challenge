import { Button } from '@/components/ui/Button';
import Card from '../Card';
import { NotFoundProps } from './props';
import styles from './styles.module.scss';

export default function NotFound({ title, message, buttonText, buttonOnClick }: NotFoundProps) {

    return (
        <Card display="flex" direction="column" gap={24} alignItems="center" justifyContent="center" className={styles.container}>
            <h2 className={styles.container_title}>{title}</h2>
            <p className={styles.container_message}>{message}</p>
            {buttonText && <Button onClick={buttonOnClick}>{buttonText}</Button>}
        </Card>
    );
}

NotFound.displayName = 'NotFound';