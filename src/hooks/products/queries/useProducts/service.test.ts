import { fetchProducts } from './service';

const mockProducts = [
    { id: 1, name: "Product 1", price: "100.0000" },
    { id: 2, name: "Product 2", price: "200.0000" },
];

describe('fetchProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
    });

    it("should call fetch with correct URL and default params", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        await fetchProducts({ page: 1 });

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
        );
    });

    it("should call fetch with custom params", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        await fetchProducts({ page: 2, rows: 20, sortBy: "name", orderBy: "DESC" });

        expect(global.fetch).toHaveBeenCalledWith(
            "http://localhost:3000/api/v1/products?page=2&rows=20&sortBy=name&orderBy=DESC"
        );
    });

    it("should return the data from the response", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({ products: mockProducts }),
        });

        const data = await fetchProducts({ page: 1 });

        expect(data).toEqual({ products: mockProducts });
    });

    it("should throw an error when response is not ok", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

        await expect(fetchProducts({ page: 1 })).rejects.toThrow("Erro ao buscar produtos");
    });
});