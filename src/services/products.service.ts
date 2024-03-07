import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { Filters, ProductFormValues, ProductResponse, ProductResponseCreated } from '../types/produc.type';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/product`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.user?.token as string
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getPrivateProducts: builder.query<ProductResponse, Filters>({
            query: (params) => ({
                url: '/',
                params,
            }),
        }),
        createProduct: builder.mutation<ProductResponseCreated, ProductFormValues>({
            query: (productFormValues) => ({
                url: 'create',
                method: 'POST',
                body: productFormValues,
            }),
        })
    }),
});

export const productApiPublic = createApi({
    reducerPath: 'productApiPublic',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/product`,
    }),
    endpoints: (builder) => ({
        getPublicProducts: builder.query<ProductResponse, Filters>({
            query: (params) => ({
                url: '/customers',
                params,
            }),
        }),
    }),
});

export const { useGetPrivateProductsQuery, useCreateProductMutation } = productApi;
export const { useGetPublicProductsQuery } = productApiPublic;
