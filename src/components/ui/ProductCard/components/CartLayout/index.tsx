import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, updateQuantity } from "@/store/slices/cartSlice";
import { Delete01Icon, MinusSignFreeIcons, PlusSignFreeIcons } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { CartLayoutProps } from './props';
import styles from './styles.module.scss';

export default function CartLayout({ product }: CartLayoutProps) {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.product.id === product.id)
    );
    const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

    function increment() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (cartItem) {
            dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        }
    }

    function decrement() {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        if (cartItem) {
            dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        }
    }

    function handleRemoveFromCart() {
        dispatch(removeItem(product.id));
    }

    return (
        <Container
            display="flex"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={styles.actions}
        >
            <Card
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={0}
                className={styles['actions_quantity']}
            >
                <Button
                    className={styles['actions_quantity_button']}
                    onClick={decrement}
                >
                    <HugeiconsIcon icon={MinusSignFreeIcons} size={16} />
                </Button>
                <span className={styles['actions_quantity_value']}>
                    {quantity}
                </span>
                <Button
                    className={styles['actions_quantity_button']}
                    onClick={increment}
                >
                    <HugeiconsIcon icon={PlusSignFreeIcons} size={16} />
                </Button>
            </Card>
            <div>
                <Button
                    className={styles['actions_removeButton']}
                    onClick={handleRemoveFromCart}
                >
                    <HugeiconsIcon icon={Delete01Icon} />
                </Button>
            </div>
        </Container>
    )
}