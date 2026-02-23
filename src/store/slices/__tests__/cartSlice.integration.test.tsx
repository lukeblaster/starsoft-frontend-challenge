import CartCounter from '@/components/ui/CartCounter';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import cartReducer, { addItem, CartState } from '../cartSlice';

const makeStore = (preloadedState?: { cart: CartState }) =>
    configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

const wrapper = (store: ReturnType<typeof makeStore>) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

const product = {
    id: 1,
    name: 'Product 1',
    price: '100.0000',
    description: 'Product 1 description',
    image: 'Product 1 image',
}

describe('CartSlice', () => {
    it('should render the counter with 0 items', () => {
        const store = makeStore();
        render(<CartCounter />, { wrapper: wrapper(store) });

        expect(screen.getByTestId('cart-counter-total-items')).toHaveTextContent('0');
    });

    it('should change items count when add new item', () => {
        const store = makeStore();
        render(<CartCounter />, { wrapper: wrapper(store) });

        expect(screen.getByTestId('cart-counter-total-items')).toHaveTextContent('0');

        act(() => {
            store.dispatch(addItem({ product, quantity: 1 }));
        });

        expect(screen.getByTestId('cart-counter-total-items')).toHaveTextContent('1');
    });

});