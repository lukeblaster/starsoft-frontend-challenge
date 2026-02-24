import { Product } from '@/models';
import cartReducer, { addItem } from '@/store/slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { act } from 'react';
import { Provider } from 'react-redux';
import { CartPaymentSection } from './index';

// Mock Next.js Image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

jest.mock('@/hooks/ui', () => ({
    useHandleChangeText: jest.fn(({ primaryText }) => ({
        text: primaryText,
        handleChangeText: jest.fn(),
    })),
}));

jest.mock('@/public/images/ethereum.svg', () => ({
    __esModule: true,
    default: '/mocked-ethereum.svg',
}));

const makeStore = (preloadedState?: { cart: { items: Array<{ product: Product; quantity: number }> } }) =>
    configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

const mockProduct1: Product = {
    id: 1,
    name: 'Product 1',
    price: '100.00000000',
    description: 'Description 1',
    image: 'image1.jpg',
};

const mockProduct2: Product = {
    id: 2,
    name: 'Product 2',
    price: '200.00000000',
    description: 'Description 2',
    image: 'image2.jpg',
};

const wrapper = (store: ReturnType<typeof makeStore>) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

describe('CartPaymentSection', () => {
    it('should calculate total correctly for single item', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        expect(screen.getByText('100 ETH')).toBeInTheDocument();
    });

    it('should calculate total correctly for multiple items', () => {
        const store = makeStore({
            cart: {
                items: [
                    { product: mockProduct1, quantity: 2 },
                    { product: mockProduct2, quantity: 1 },
                ],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        // Total: (100 * 2) + (200 * 1) = 400
        expect(screen.getByText('400 ETH')).toBeInTheDocument();
    });

    it('should calculate total correctly with different quantities', () => {
        const store = makeStore({
            cart: {
                items: [
                    { product: mockProduct1, quantity: 3 },
                    { product: mockProduct2, quantity: 2 },
                ],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        // Total: (100 * 3) + (200 * 2) = 700
        expect(screen.getByText('700 ETH')).toBeInTheDocument();
    });

    it('should format total correctly', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        const totalElement = screen.getByText('100 ETH');
        expect(totalElement).toBeInTheDocument();
    });

    it('should disable button when cart is empty', () => {
        const store = makeStore({
            cart: {
                items: [],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        const button = screen.getByText('Finalizar Compra');
        expect(button).toBeDisabled();
    });

    it('should enable button when cart has items', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        const button = screen.getByText('Finalizar Compra');
        expect(button).not.toBeDisabled();
    });

    it('should clear cart when finalizing purchase', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        const button = screen.getByText('Finalizar Compra');
        await user.click(button);

        const state = store.getState();
        expect(state.cart.items).toHaveLength(0);
    });

    it('should call handleChangeText when finalizing purchase', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        const mockHandleChangeText = jest.fn();
        const { useHandleChangeText } = jest.requireMock('@/hooks/ui');

        useHandleChangeText.mockReturnValue({
            text: 'Finalizar Compra',
            handleChangeText: mockHandleChangeText,
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        const button = screen.getByText('Finalizar Compra');
        await user.click(button);

        expect(mockHandleChangeText).toHaveBeenCalled();
    });

    it('should display zero total when cart is empty', () => {
        const store = makeStore({
            cart: {
                items: [],
            },
        });

        render(<CartPaymentSection />, { wrapper: wrapper(store) });

        expect(screen.getByText('0 ETH')).toBeInTheDocument();
    });

    it('should update total when cart items change', () => {
        const store = makeStore({
            cart: {
                items: [{ product: mockProduct1, quantity: 1 }],
            },
        });

        const { rerender } = render(<CartPaymentSection />, { wrapper: wrapper(store) });

        expect(screen.getByText('100 ETH')).toBeInTheDocument();

        act(() => {
            store.dispatch(addItem({ product: mockProduct1, quantity: 1 }));
        });

        rerender(<CartPaymentSection />);

        expect(screen.getByText('200 ETH')).toBeInTheDocument();
    });
});
