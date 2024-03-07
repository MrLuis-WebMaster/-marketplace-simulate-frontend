import { ResponseServer } from "./server.type";

export enum UserRole {
    SELLER = 'SELLER',
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

export interface User {
    name: string;
    email: string;
    id: number;
    token: string;
    exp: number;
    iat: number;
    role: UserRole;
}

export interface UserSeller {
    name: string;
    email: string;
    id: number;
}

export interface UserSellerResponse extends ResponseServer {
    data: UserSeller[]
}
