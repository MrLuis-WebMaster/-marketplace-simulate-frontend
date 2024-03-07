import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUser } from '../types/auth.type';
import { RootState } from '../redux/store';
import { UserSellerResponse } from '../types/user.type';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/user` }),
    endpoints: (builder) => ({
        createCustomer: builder.mutation<boolean, CreateUser>({
            query: (createUser) => ({
                url: 'customer-register',
                method: 'POST',
                body: createUser,
            }),
        }),
        createSeller: builder.mutation<boolean, CreateUser>({
            query: (createUser) => ({
                url: 'seller-register',
                method: 'POST',
                body: createUser,
            }),
        }),
    }),
});

export const userApiPrivate = createApi({
    reducerPath: 'userApiPrivate',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.user?.token as string
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        sellersUsers: builder.mutation<UserSellerResponse, unknown>({
            query: () => ({
                url: '/sellers-users',
            }),
        }),
    }),
});


export const { useCreateCustomerMutation, useCreateSellerMutation } = userApi;
export const { useSellersUsersMutation } = userApiPrivate;
