import { Product } from "@/models";
import { UseProductsByIdProps } from "./props";

export async function fetchProductsById({ id }: UseProductsByIdProps): Promise<Product> {
    const response = await fetch(`/api/products/${id}`);

    if (!response.ok) throw new Error('Erro ao buscar produto');

    const data = await response.json();

    if (Array.isArray(data?.products) && data.products.length > 0) {
        return data.products[0] as Product;
    }

    if (data?.product) {
        return data.product as Product;
    }

    throw new Error('Produto nao encontrado');
}
