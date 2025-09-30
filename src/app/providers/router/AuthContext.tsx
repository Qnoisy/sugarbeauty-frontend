import { onAuthStateChanged, type User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '../../config/firebase';

interface AuthContextType {
	user: User | null;
	isAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	isAuth: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuth: !!user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
