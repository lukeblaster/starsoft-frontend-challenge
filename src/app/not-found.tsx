'use client';

import NotFound from '@/components/ui/NotFound';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.scss';

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <NotFound
                title="Página não encontrada"
                message="A página que você está procurando não existe ou foi movida."
                buttonText="Voltar para a página inicial"
                buttonOnClick={() => router.push('/')}
            />
        </div>
    );
}
