import { forwardRef, PropsWithChildren } from 'react';
import { ButtonProps } from './props';
import styles from './styles.module.scss';

export const Button = forwardRef<
    HTMLButtonElement,
    PropsWithChildren<ButtonProps>
>(
    (
        {
            children,
            disabled,
            isloading,
            isSecondary,
            className = '',
            style,
            ...props
        },
        ref,
    ) => {
        // Render main button with all styling variations
        return (
            <button
                {...props}
                ref={ref}
                className={`${styles.button} ${isSecondary ? styles['button--secondary'] : ''} ${className ? className : ''}`}
                disabled={isloading || disabled}
                style={style}
            >
                {children}
            </button>
        );
    },
);