import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { AddToCartButtonProps } from "./props";

import { useHandleChangeText } from "@/hooks/ui";
import { addItem } from "@/store/slices/cartSlice";
import styles from "./styles.module.scss";

export default function AddToCartButton({ product, primaryText, secondaryText }: AddToCartButtonProps) {
    const dispatch = useAppDispatch();
    const { text, handleChangeText } = useHandleChangeText({ primaryText, secondaryText, duration: 1000 });

    function handleAddToCart() {
        dispatch(addItem({ product, quantity: 1 }));
        handleChangeText();
    }

    return (
        <Button
            onClick={handleAddToCart}
            className={`${styles.button}`}
        >
            {text}
        </Button>
    );
}