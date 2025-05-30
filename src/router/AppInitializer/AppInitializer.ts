import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setError, setLoading, setUser } from '../../redux/reducers/UserSlice';

export const AppInitializer = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setLoading(true));
		console.log('[Firebase] Инициализация onAuthStateChanged');

		const unsubscribe = onAuthStateChanged(getAuth(), async firebaseUser => {
			console.log('[Firebase] onAuthStateChanged вызван:', firebaseUser);

			if (firebaseUser) {
				try {
					const token = await firebaseUser.getIdToken(true);
					console.log('[Firebase] Получен токен:', token.slice(0, 20) + '...');

					dispatch(
						setUser({
							name: firebaseUser.displayName || '',
							email: firebaseUser.email || '',
							id: firebaseUser.uid,
							token,
							photoURL: firebaseUser.photoURL || null,
						})
					);
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
			console.log('[Firebase] Отписка от onAuthStateChanged');
			unsubscribe();
		};
	}, [dispatch]);

	return null;
};
