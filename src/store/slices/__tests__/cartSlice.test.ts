import cartSlice, { addItem, CartState, clearCart, removeItem, updateQuantity } from "../cartSlice";

const product = { id: 1, name: 'Product 1', price: '100.00000000', description: 'Product 1 description', image: 'Product 1 image' };
const anotherProduct = { id: 2, name: 'Product 2', price: '200.00000000', description: 'Product 2 description', image: 'Product 2 image' };

const emptyState = { items: [] };
const stateWithOneItem = { items: [{ product, quantity: 1 }] };
const stateWithTwoItems: CartState = { items: [{ product, quantity: 1 }, { product: anotherProduct, quantity: 1 }] };


describe('Cart Slice', () => {
    it('should add an item to the cart', () => {
        const action = addItem({ product, quantity: 1 });
        const state = cartSlice(emptyState, action);
        expect(state.items).toEqual([{ product, quantity: 1 }]);
    });

    it('should add an item to the cart with the same product id', () => {
        const action = addItem({ product, quantity: 1 });
        const state = cartSlice(stateWithOneItem, action);
        expect(state.items).toEqual([{ product, quantity: 2 }]);
    });

    it('should remove an item from the cart', () => {
        const action = removeItem(product.id);
        const state = cartSlice(stateWithOneItem, action);
        expect(state.items).toEqual([]);
    });

    it('should update the quantity of an item in the cart', () => {
        const action = updateQuantity({ productId: product.id, quantity: 2 });
        const state = cartSlice(stateWithOneItem, action);
        expect(state.items).toEqual([{ product, quantity: 2 }]);
    });

    it('should clear the cart', () => {
        const action = clearCart();
        const state = cartSlice(stateWithTwoItems, action);
        expect(state.items).toEqual([]);
    });
})