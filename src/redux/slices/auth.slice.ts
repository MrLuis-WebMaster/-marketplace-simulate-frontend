
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";
import { AuthResponse } from '../../types/auth.type';
import { User } from '../../types/user.type';


interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const loadInitialState = (): AuthState => {
    const storedAuthState = sessionStorage.getItem('authState');
    return storedAuthState ? JSON.parse(storedAuthState) : { user: null, isAuthenticated: false };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<AuthResponse["data"]>) => {
            const decodedToken = jwtDecode(payload.authToken) as User;
            state.user = {
                name: decodedToken.name,
                email: decodedToken.email,
                id: decodedToken.id,
                token: payload.authToken,
                iat: decodedToken.iat,
                exp: decodedToken.exp,
                role: decodedToken.role,
            };
            state.isAuthenticated = true;
            sessionStorage.setItem('authState', JSON.stringify(state));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('authState');
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
