import '@testing-library/jest-dom';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoadButton from '.';

const mockClick = jest.fn();

jest.mock('@/hooks/animations', () => ({
    useProgressAnimation: jest.fn().mockReturnValue({
        scope: { current: null },
        width: '0%',
    }),
}));

jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

describe('LoadButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the button', async () => {
        render(<LoadButton onClick={mockClick} isLoading={false} hasNextPage={true} />);

        await userEvent.click(screen.getByTestId('load-button'));

        expect(mockClick).toHaveBeenCalled();
    });

    it('should not call the onClick function if the button is disabled', async () => {
        render(<LoadButton onClick={mockClick} isLoading={true} hasNextPage={false} />);

        await userEvent.click(screen.getByTestId('load-button'));

        expect(mockClick).not.toHaveBeenCalled();
    });

    it('should show the loading text if the button is loading', async () => {
        render(<LoadButton onClick={mockClick} isLoading={true} hasNextPage={true} />);

        expect(screen.getByTestId('load-button')).toHaveTextContent('Carregando...');
    });

    it('should show the no more products text if the button is disabled', async () => {
        render(<LoadButton onClick={mockClick} isLoading={false} hasNextPage={false} />);

        expect(screen.getByTestId('load-button')).toHaveTextContent('Você já viu tudo');
    });
});