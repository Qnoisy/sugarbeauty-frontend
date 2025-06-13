import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../components/UI/CustomButton';
import { useAppSelector } from '../../hooks/redux';
import styles from './BuyButton.module.scss';

const stripePromise = loadStripe(
	import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY! || ''
);

const BuyButton = () => {
	const user = useAppSelector(state => state.user.user);
	const isAuth = useAppSelector(state => state.user.isAuth);

	const [access, setAccess] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);
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
				console.error('Error checking access:', err);
				setError('Ошибка при проверке доступа');
			} finally {
				setLoading(false);
			}
		};

		checkAccess();
	}, [user, isAuth]);

	const handleBuy = async () => {
		if (!user || !isAuth) {
			setError('Please sign in first.');
			return;
		}

		try {
			const stripe = await stripePromise;
			if (!stripe) {
				setError('Stripe did not load');
				return;
			}

			const res = await axios.post(
				'http://localhost:5000/api/create-checkout-session',
				{},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (res.data.url) {
				window.location.href = res.data.url;
			}
		} catch (err: any) {
			console.error('Error creating payment session:', err);
			const errorMessage =
				err.response?.data?.error || 'Ошибка создания Stripe-сессии';
			setError(errorMessage);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className={styles.buyBtn}>
			{access ? (
				<div className={styles.buyBtn__content}>
					<p>You already own this course.</p>
				</div>
			) : (
				<div className={styles.buyBtn__content}>
					<img src='/img/frame1.jpg' alt='' />
					<CustomButton
						onClick={handleBuy}
						disabled={!user}
						text='Buy Course'
					/>
				</div>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default BuyButton;
