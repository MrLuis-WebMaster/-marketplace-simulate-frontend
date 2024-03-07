import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authSlice from './slices/auth.slice'
import { authApi } from '../services/auth.service';
import { productApi, productApiPublic } from '../services/products.service';
import { userApi, userApiPrivate } from '../services/user.service';

export type RootState = ReturnType<typeof store.getState>
export const store = configureStore({
    reducer: {
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [userApiPrivate.reducerPath]: userApiPrivate.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productApiPublic.reducerPath]: productApiPublic.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(userApiPrivate.middleware)
        .concat(productApi.middleware)
        .concat(productApiPublic.middleware)
})

setupListeners(store.dispatch)
