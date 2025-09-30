export interface User {
	name: string;
	email: string;
	token: string;
	id: string;
	photoURL?: string | null;
}

export interface UserSchema {
	user: User | null;
	isAuth: boolean;
	isLoading: boolean;
	error: string | null;
}
