import { PropsWithChildren } from "react";

export interface ContainerProps extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
    display?: 'flex' | 'grid';
    direction?: 'column' | 'row';
    gap?: number;
    justifyContent?: 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems?: 'center' | 'start' | 'end' | 'stretch' | 'baseline';
}