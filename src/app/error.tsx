'use client';

import NotFound from '@/components/ui/NotFound';
import { useEffect } from 'react';
import styles from './error.module.scss';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error:', error);
    }, [error]);

    return (
        <div className={styles.container}>
            <NotFound
                title="Ops! Algo deu errado"
                message="Ocorreu um erro inesperado. Por favor, tente novamente ou volte para a página inicial."
                buttonText="Tentar novamente"
                buttonOnClick={reset}
            />
        </div>
    );
}
