import { Button } from "@/components/ui/Button";
import { AddToCartButtonProps } from "./props";

import styles from "./styles.module.scss";

export default function AddToCartButton({ onClick, text }: AddToCartButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={`${styles.contentContainer_button}`}
        >
            {text}
        </Button>
    );
}