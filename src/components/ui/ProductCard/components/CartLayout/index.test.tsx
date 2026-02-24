import { Product } from '@/models';
import cartReducer from '@/store/slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import CartLayout from './index';

const makeStore = (preloadedState?: { cart: { items: Array<{ product: Product; quantity: number }> } }) =>
    configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: '100.00000000',
    description: 'Test Description',
    image: 'test-image.jpg',
};

jest.mock('@/hooks/ui', () => ({
    useHandleChangeText: jest.fn(() => ({
        text: 'Test Product',
        handleChangeText: jest.fn(),
    })),
}));


const wrapper = (store: ReturnType<typeof makeStore>) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

describe('CartLayout', () => {
    it('should display the correct quantity of the item', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 3 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should increment quantity when clicking the plus button', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 1 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        const buttons = screen.getAllByRole('button');
        // The plus button is typically the second button (after minus)
        const incrementButton = buttons[1];

        await user.click(incrementButton);

        const state = store.getState();
        expect(state.cart.items[0].quantity).toBe(2);
    });

    it('should decrement quantity when clicking the minus button', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 3 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        const buttons = screen.getAllByRole('button');
        // The minus button is typically the first button
        const decrementButton = buttons[0];

        await user.click(decrementButton);

        const state = store.getState();
        expect(state.cart.items[0].quantity).toBe(2);
    });

    it('should not decrement below 1', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 1 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        const buttons = screen.getAllByRole('button');
        const decrementButton = buttons[0];

        await user.click(decrementButton);

        const state = store.getState();
        expect(state.cart.items[0].quantity).toBe(1);
    });

    it('should remove item from cart when clicking remove button', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 1 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        const buttons = screen.getAllByRole('button');
        const removeButton = buttons[buttons.length - 1];

        await user.click(removeButton);

        const state = store.getState();
        expect(state.cart.items).toHaveLength(0);
    });

    it('should initialize with quantity from cart item', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct, quantity: 5 }],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should initialize with quantity 1 if item is not in cart', () => {
        const store = makeStore({
            cart: {
                items: [],
            },
        });

        render(<CartLayout product={mockProduct} />, { wrapper: wrapper(store) });

        expect(screen.getByText('1')).toBeInTheDocument();
    });
});
