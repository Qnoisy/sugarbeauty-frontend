import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setError, setLoading, setUser } from '../../redux/reducers/UserSlice';

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
				} catch (err: any) {
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
