import { Product } from "@/models";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const productId = Number(id);

    if (!Number.isFinite(productId)) {
        return NextResponse.json(
            { error: "ID do produto invalido" },
            { status: 400 }
        );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        return NextResponse.json(
            { error: "API base URL nao configurada" },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? 1;
    const rows = searchParams.get("rows") ?? 50;
    const sortBy = searchParams.get("sortBy") ?? "id";
    const orderBy = searchParams.get("orderBy") ?? "ASC";

    const response = await fetch(
        `${apiUrl}/api/v1/products?page=${page}&rows=${rows}&sortBy=${sortBy}&orderBy=${orderBy}`,
        { next: { revalidate: 0 } }
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "Erro ao buscar produtos" },
            { status: response.status }
        );
    }

    const data = await response.json();
    const products: Product[] = Array.isArray(data?.products) ? data.products : [];
    const filtered = products.filter(
        (product) => Number(product?.id) === productId
    );

    if (filtered.length === 0) {
        return NextResponse.json(
            { error: "Produto nao encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        ...data,
        products: filtered,
    });
}
