import { useInfiniteQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "../../query-keys";
import { UseProductsKeysProps } from "./props";
import { fetchProducts } from "./service";

export function useProducts() {
    const queryKey: UseProductsKeysProps = [PRODUCTS_QUERY_KEY.LIST];

    const rows = 8;

    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isLoading,
        error,
        ...result
    } = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => fetchProducts({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {

            // Se não houver produtos na última página, não há próxima página
            if (!lastPage.products || lastPage.products.length === 0) {
                return undefined;
            }
            // Se o número de produtos retornados for menor que o esperado (rows),
            // significa que é a última página
            if (lastPage.products.length < rows) {
                return undefined;
            }

            // Incrementa o número da página se houver produtos suficientes
            return allPages.length + 1;
        },
    })

    // Concatena todos os produtos de todas as páginas
    const allProducts = data?.pages.flatMap((page) => page.products || []) ?? [];

    return {
        data: {
            ...data,
            allProducts,
        },
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isLoading,
        error,
        ...result
    }
}