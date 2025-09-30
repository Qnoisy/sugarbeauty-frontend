import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserSchema } from '../types/userTypes';

const initialState: UserSchema = {
	user: null,
	isAuth: false,
	isLoading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuth = true;
		},
		removeUser(state) {
			state.user = null;
			state.isAuth = false;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
	},
});

export const { actions: UserActions } = userSlice;
export const { reducer: UserReducer } = userSlice;
