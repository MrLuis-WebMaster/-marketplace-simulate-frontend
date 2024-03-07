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
    refetchOnFocus: true,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getPrivateProducts: builder.query<ProductResponse, Filters>({
            query: (params) => ({
                url: '/',
                params,
            }),
            providesTags: (result) => {
                return result
                    ? [...result.data.products.map(() => ({ type: 'Product' as const})), 'Product']
                    : ['Product']
            },
        }),
        createProduct: builder.mutation<ProductResponseCreated, ProductFormValues>({
            query: (productFormValues) => ({
                url: 'create',
                method: 'POST',
                body: productFormValues,
            }),
            invalidatesTags: ['Product'],
        })
    }),
});

export const productApiPublic = createApi({
    reducerPath: 'productApiPublic',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/product`,
    }),
    refetchOnFocus: true,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getPublicProducts: builder.query<ProductResponse, Filters>({
            query: (params) => ({
                url: '/customers',
                params,
            }),
            providesTags: (result) => {
                return result
                    ? [...result.data.products.map(() => ({ type: 'Product' as const })), 'Product']
                    : ['Product']
            },
        }),
    }),
});

export const { useGetPrivateProductsQuery, useCreateProductMutation } = productApi;
export const { useGetPublicProductsQuery } = productApiPublic;
