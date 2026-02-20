import { useCallback, useState } from "react";
import { UseHandleChangeTextProps } from "./props";

export function useHandleChangeText({ primaryText, secondaryText, duration }: UseHandleChangeTextProps) {
    const [text, setText] = useState(primaryText);

    const handleChangeText = useCallback(() => {
        setText(secondaryText);
        setTimeout(() => setText(primaryText), duration);
    }, [primaryText, secondaryText, duration]);

    return { text, handleChangeText };
}