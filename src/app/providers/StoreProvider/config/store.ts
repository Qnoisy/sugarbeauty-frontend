import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UserReducer } from 'entities/User';
import type { StateSchema } from './stateShema';

const rootReducer = combineReducers({
	user: UserReducer,
});

export const createReduxStore = (initialState?: StateSchema) => {
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		devTools: import.meta.env.DEV,
	});
	return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore['dispatch'];
