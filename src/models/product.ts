import { BaseEntity } from "./base-entity";

export interface Product extends BaseEntity {
    id: number;
    name: string;
    description: string;
    image: string;
    price: string;
}