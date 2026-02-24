import { Product } from '@/models';
import cartReducer from '@/store/slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import AddToCartButton from './index';

jest.mock('@/hooks/ui', () => ({
    useHandleChangeText: jest.fn(({ primaryText }) => ({
        text: primaryText,
        handleChangeText: jest.fn(),
    })),
}));

const makeStore = () =>
    configureStore({
        reducer: { cart: cartReducer },
    });

const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: '100.00000000',
    description: 'Test Description',
    image: 'test-image.jpg',
};

const wrapper = (store: ReturnType<typeof makeStore>) =>
    ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

describe('AddToCartButton', () => {
    it('should render the button with primary text', () => {
        const store = makeStore();
        render(
            <AddToCartButton
                product={mockProduct}
                primaryText="Comprar"
                secondaryText="Adicionado ao carrinho"
            />,
            { wrapper: wrapper(store) }
        );

        expect(screen.getByText('Comprar')).toBeInTheDocument();
    });

    it('should dispatch addItem action when clicked', async () => {
        const user = userEvent.setup();
        const store = makeStore();
        const dispatchSpy = jest.spyOn(store, 'dispatch');

        render(
            <AddToCartButton
                product={mockProduct}
                primaryText="Comprar"
                secondaryText="Adicionado ao carrinho"
            />,
            { wrapper: wrapper(store) }
        );

        const button = screen.getByText('Comprar');
        await user.click(button);

        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'cart/addItem',
                payload: { product: mockProduct, quantity: 1 },
            })
        );
    });

    it('should call handleChangeText when clicked', async () => {
        const user = userEvent.setup();
        const store = makeStore();
        const mockHandleChangeText = jest.fn();
        const { useHandleChangeText } = jest.requireMock('@/hooks/ui');

        useHandleChangeText.mockReturnValue({
            text: 'Comprar',
            handleChangeText: mockHandleChangeText,
        });

        render(
            <AddToCartButton
                product={mockProduct}
                primaryText="Comprar"
                secondaryText="Adicionado ao carrinho"
            />,
            { wrapper: wrapper(store) }
        );

        const button = screen.getByText('Comprar');
        await user.click(button);

        expect(mockHandleChangeText).toHaveBeenCalled();
    });

    it('should add item to cart state when clicked', async () => {
        const user = userEvent.setup();
        const store = makeStore();

        render(
            <AddToCartButton
                product={mockProduct}
                primaryText="Comprar"
                secondaryText="Adicionado ao carrinho"
            />,
            { wrapper: wrapper(store) }
        );

        const button = screen.getByText('Comprar');
        await user.click(button);

        const state = store.getState();
        expect(state.cart.items).toHaveLength(1);
        expect(state.cart.items[0].product).toEqual(mockProduct);
        expect(state.cart.items[0].quantity).toBe(1);
    });

    it('should increment quantity when adding same product twice', async () => {
        const user = userEvent.setup();
        const store = makeStore();

        render(
            <AddToCartButton
                product={mockProduct}
                primaryText="Comprar"
                secondaryText="Adicionado ao carrinho"
            />,
            { wrapper: wrapper(store) }
        );

        const button = screen.getByText('Comprar');
        await user.click(button);
        await user.click(button);

        const state = store.getState();
        expect(state.cart.items).toHaveLength(1);
        expect(state.cart.items[0].quantity).toBe(2);
    });
});
