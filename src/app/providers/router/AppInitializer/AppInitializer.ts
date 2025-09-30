import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {
	setError,
	setLoading,
	setUser,
} from '../../../../entities/User/model/slice/userSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/redux';

export const AppInitializer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setLoading(true));
		const unsubscribe = onAuthStateChanged(getAuth(), async firebaseUser => {
			if (firebaseUser) {
				try {
					const token = await firebaseUser.getIdToken(true);
					const userData = {
						name: firebaseUser.displayName || '',
						email: firebaseUser.email || '',
						id: firebaseUser.uid,
						token,
						photoURL: firebaseUser.photoURL || null,
					};
					dispatch(setUser(userData));
				} catch (err) {
					console.error('[Firebase] Ошибка при получении токена:', err);
					dispatch(setError('Ошибка при получении токена'));
				}
			} else {
				console.log('[Firebase] Пользователь не авторизован');
			}

			dispatch(setLoading(false));
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	return null;
};
