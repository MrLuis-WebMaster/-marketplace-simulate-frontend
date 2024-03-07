import { ResponseServer } from "./server.type";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface CreateUser extends LoginRequest {
    name: string
}

export interface AuthResponse extends ResponseServer {
    data: {
        authToken: string,
        userId: number
    }
}
