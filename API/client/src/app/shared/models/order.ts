import { Address } from "./user";

export interface OrderToCreate {
    basketId: string;
    deliveryMethodId: string;
    shipToAddress: Address;
}

export interface OrderItem {
    productId: string;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: Address;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
}