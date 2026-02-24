import { formatPrice } from './format-price';

describe('formatPrice', () => {
    it('should format price correctly by removing decimals and adding ETH', () => {
        expect(formatPrice('100.00000000')).toBe('100 ETH');
    });

    it('should handle prices with different decimal lengths', () => {
        expect(formatPrice('50.5')).toBe('50 ETH');
        expect(formatPrice('200.12345678')).toBe('200 ETH');
        expect(formatPrice('999.99999999')).toBe('999 ETH');
    });

    it('should handle prices without decimals', () => {
        expect(formatPrice('100')).toBe('100 ETH');
    });

    it('should handle zero price', () => {
        expect(formatPrice('0.00000000')).toBe('0 ETH');
    });

    it('should handle very large prices', () => {
        expect(formatPrice('1000000.00000000')).toBe('1000000 ETH');
    });

    it('should handle prices with only decimal part', () => {
        expect(formatPrice('0.12345678')).toBe('0 ETH');
    });
});
