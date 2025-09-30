import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../shared/lib/hooks/redux';

const CheckCourseAccess = () => {
	const user = useAppSelector(state => state.user.user);
	const isAuth = useAppSelector(state => state.user.isAuth);

	const [access, setAccess] = useState<boolean | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkAccess = async () => {
			if (!user || !isAuth) {
				setAccess(false);
				setLoading(false);
				return;
			}

			try {
				const res = await axios.post(
					'http://localhost:5000/api/check-access',
					{},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
							'Content-Type': 'application/json',
						},
					}
				);

				setAccess(res.data.access);
			} catch (err) {
				console.error('Ошибка проверки доступа:', err);
				setError('Ошибка при проверке доступа');
			} finally {
				setLoading(false);
			}
		};

		checkAccess();
	}, [user, isAuth]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: 'red' }}>{error}</p>;

	return (
		<div>
			{access === null ? (
				<p>Unable to determine access</p>
			) : access ? (
				<p>You have access to the course! 🎉</p>
			) : (
				<p>Access to the course is not available</p>
			)}
		</div>
	);
};

export default CheckCourseAccess;
