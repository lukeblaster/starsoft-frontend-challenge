'use client';

import NotFound from "@/components/ui/NotFound";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function ErrorComponent() {
    const router = useRouter();

    return (
        <div className={styles.productContainer}>
            <NotFound
                title="Produto não encontrado"
                message="O produto que você está procurando não existe ou foi removido."
                buttonText="Voltar para a página inicial"
                buttonOnClick={() => router.push('/')}
            />
        </div>
    );
}