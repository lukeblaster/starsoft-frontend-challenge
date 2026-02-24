import { act, renderHook } from '@testing-library/react';
import { useHandleChangeText } from './index';

describe('useHandleChangeText', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(async () => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('should return initial text as primaryText', () => {
        const { result } = renderHook(() =>
            useHandleChangeText({
                primaryText: 'Comprar',
                secondaryText: 'Adicionado',
                duration: 1000,
            })
        );

        expect(result.current.text).toBe('Comprar');
    });

    it('should change to secondaryText when handleChangeText is called', () => {
        const { result } = renderHook(() =>
            useHandleChangeText({
                primaryText: 'Comprar',
                secondaryText: 'Adicionado',
                duration: 1000,
            })
        );

        act(() => {
            result.current.handleChangeText();
        });

        expect(result.current.text).toBe('Adicionado');
    });

    it('should return to primaryText after duration', () => {
        const { result } = renderHook(() =>
            useHandleChangeText({
                primaryText: 'Comprar',
                secondaryText: 'Adicionado',
                duration: 1000,
            })
        );

        act(() => {
            result.current.handleChangeText();
        });

        expect(result.current.text).toBe('Adicionado');

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(result.current.text).toBe('Comprar');
    });

    it('should handle multiple calls correctly', () => {
        const { result } = renderHook(() =>
            useHandleChangeText({
                primaryText: 'Comprar',
                secondaryText: 'Adicionado',
                duration: 1000,
            })
        );

        act(() => {
            result.current.handleChangeText();
        });
        expect(result.current.text).toBe('Adicionado');

        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(result.current.text).toBe('Adicionado');

        act(() => {
            result.current.handleChangeText();
        });
        expect(result.current.text).toBe('Adicionado');

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(result.current.text).toBe('Comprar');
    });

    it('should work with different durations', () => {
        const { result } = renderHook(() =>
            useHandleChangeText({
                primaryText: 'Primary',
                secondaryText: 'Secondary',
                duration: 500,
            })
        );

        act(() => {
            result.current.handleChangeText();
        });
        expect(result.current.text).toBe('Secondary');

        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(result.current.text).toBe('Primary');
    });
});
