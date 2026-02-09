import { MutableRefObject } from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isloading?: boolean;
    isSecondary?: boolean;
}
