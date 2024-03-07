import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse, LoginRequest } from '../types/auth.type';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth` }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (loginRequest) => ({
                url: 'login',
                method: 'POST',
                body: loginRequest,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
