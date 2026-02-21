import { ContainerProps } from './props';
import styles from './styles.module.scss';

export default function Container({
    children,
    display,
    direction,
    gap,
    justifyContent,
    alignItems,
    className,
    ...props
}: ContainerProps) {
    return <div
        className={`
            ${styles.container} 
            ${className ? className : ''}
            ${display === 'flex' ? styles['container--flex'] : styles['container--grid']}
            ${direction === 'column' ? styles['container--flex--column'] : styles['container--flex--row']}
        `}
        {...props}
        style={{
            gap,
            justifyContent,
            alignItems,
        }}
    >{children}</div>;
}