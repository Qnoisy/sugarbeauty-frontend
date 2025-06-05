import React, { useState } from 'react';
import { FaImage, FaInfo, FaUserLarge } from 'react-icons/fa6';

import axios from 'axios';
import { CustomButton } from '../../../components/UI/CustomButton';
import { CustomLoader } from '../../../components/UI/CustomLoader';
import auth from '../../../firebase/firebase';
import styles from './Dashboard.module.scss';

// Типы для статистики
interface Stats {
	totalUsers: number;
	galleryItems: number;
}

const Dashboard: React.FC = () => {
	const [stats, setStats] = useState<Stats>({
		totalUsers: 0,
		galleryItems: 0,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchStats = async () => {
		setLoading(true);
		setError(null);

		try {
			const user = auth.currentUser;
			if (!user) {
				throw new Error('Not authenticated');
			}

			const token = await user.getIdToken();

			const res = await axios.get('http://localhost:5000/api/admin/stats', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setStats(res.data);
		} catch (err: any) {
			console.error('Ошибка запроса:', err);
			setError('Не удалось загрузить статистику');
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <CustomLoader />;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<section className={styles.dashboard}>
			<ul className={styles.dashboard__list}>
				<li className={styles.dashboard__item}>
					<FaUserLarge className={styles.dashboard__icon} />
					<div>
						Количество пользователей: {stats.totalUsers ? stats.totalUsers : ''}
					</div>
				</li>
				<li className={styles.dashboard__item}>
					<FaInfo className={styles.dashboard__icon} />
					<CustomButton text='Load information' onClick={fetchStats} />
				</li>
				<li className={styles.dashboard__item}>
					<FaImage className={styles.dashboard__icon} />
					<div>
						Количество изображений:
						{stats.galleryItems ? stats.galleryItems : ''}
					</div>
				</li>
			</ul>
		</section>
	);
};

export default Dashboard;
