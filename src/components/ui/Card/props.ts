import { PropsWithChildren } from "react";
import { ContainerProps } from "../Container/props";

export interface CardProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>, ContainerProps { }