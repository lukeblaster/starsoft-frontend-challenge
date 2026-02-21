import Container from "../Container";
import { CardProps } from "./props";

import styles from './styles.module.scss';

export default function Card({ children, className, ...props }: CardProps) {
    return <Container display="flex" direction="column" gap={20} {...props} className={`${styles.card} ${className}`}>{children}</Container>;
}