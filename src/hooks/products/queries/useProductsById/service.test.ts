import { NextResponse } from 'next/server';
import { GET } from '../../../../app/api/products/[id]/route';

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((body, init) => ({ body, init })),
    },
}));

const mockedNextResponse = NextResponse as jest.Mocked<typeof NextResponse>;

// context helper
const makeContext = (id: string) => ({
    params: Promise.resolve({ id }),
});

// request helper
const makeRequest = (url: string) => ({ url }) as Request;

const mockProducts = [
    { id: 1, name: "Product 1", price: "100.0000" },
    { id: 2, name: "Product 2", price: "200.0000" },
];

describe("GET /api/products/[id]", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
    });

    it("should return 400 if id is invalid", async () => {
        await GET(makeRequest("http://localhost/api/products/abc"), makeContext("abc"));

        expect(mockedNextResponse.json).toHaveBeenCalledWith(
            { error: "ID do produto invalido" },
            { status: 400 }
        );
    });

    it("should return 500 if API URL is not configured", async () => {
        delete process.env.NEXT_PUBLIC_API_URL;

        await GET(makeRequest("http://localhost/api/products/1"), makeContext("1"));

        expect(mockedNextResponse.json).toHaveBeenCalledWith(
            { error: "API base URL nao configurada" },
            { status: 500 }
        );
    });

    it("should return 502 if fetch fails", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 502 });

        await GET(makeRequest("http://localhost/api/products/1"), makeContext("1"));

        expect(mockedNextResponse.json).toHaveBeenCalledWith(
            { error: "Erro ao buscar produtos" },
            { status: 502 }
        );
    });

    it("should return 404 if product is not found", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        await GET(makeRequest("http://localhost/api/products/99"), makeContext("99"));

        expect(mockedNextResponse.json).toHaveBeenCalledWith(
            { error: "Produto nao encontrado" },
            { status: 404 }
        );
    });

    it("should return the filtered product", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        await GET(makeRequest("http://localhost/api/products/1"), makeContext("1"));

        expect(mockedNextResponse.json).toHaveBeenCalledWith({
            products: [mockProducts[0]],
        });
    });

    it("should call fetch with correct query params", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        await GET(
            makeRequest("http://localhost/api/products/1?page=2&rows=10&sortBy=name&orderBy=DESC"),
            makeContext("1")
        );

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/v1/products?page=2&rows=10&sortBy=name&orderBy=DESC",
            { next: { revalidate: 0 } }
        );
    });
});