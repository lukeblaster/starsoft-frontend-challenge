import { useRouter } from "next/navigation";
import NotFound from "../NotFound";

export default function ProductListError() {
    const router = useRouter();

    return (
        <NotFound
            title="Erro ao carregar produtos"
            message="Ocorreu um erro ao carregar os produtos. Por favor, tente novamente."
            buttonText="Atualizar a página"
            buttonOnClick={() => router.refresh()}
        />
    );
}