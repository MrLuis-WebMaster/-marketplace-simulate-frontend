import { PaginationResponseServer, ResponseServer } from "./server.type"

export type Product = {
    id: number;
    name: string;
    price: number;
    sku: string;
    quantity: number;
    userId?: number;
    user?: {
        id: number;
        name: string;
        email: string;
    }
};

export interface ProductFormValues {
    name: string;
    sku: string;
    quantity: number;
    price: number;
}

export interface ProductResponse extends ResponseServer {
    data: {
        meta: PaginationResponseServer
        products: Product[]
    }
}

export interface ProductResponseCreated extends ResponseServer {
    data: {
        name: string,
        sku: string,
        quantity: number,
        price: number
    }
}

export interface Filters {
    page?: string;
    pageSize: string;
    searchName: string;
    searchSku: string;
    minPrice: number;
    maxPrice: number;
}