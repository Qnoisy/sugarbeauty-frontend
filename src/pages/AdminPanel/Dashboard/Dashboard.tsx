import React, { useEffect, useState } from 'react';
import { FaImage, FaUserLarge, FaUserTie } from 'react-icons/fa6';

import styles from './Dashboard.module.scss';

// Типы для статистики
interface Stats {
	totalUsers: number;
	adminUsers: number;
	galleryItems: number;
}

const Dashboard: React.FC = () => {
	const [stats, setStats] = useState<Stats>({
		totalUsers: 0,
		adminUsers: 0,
		galleryItems: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				// Заменить на реальный API-запрос:
				// const res = await fetch('/api/admin/stats');
				// const data = await res.json();

				// Моковые данные:
				const data: Stats = {
					totalUsers: 123,
					adminUsers: 5,
					galleryItems: 42,
				};

				setStats(data);
			} catch (err: any) {
				setError('Ошибка загрузки данных');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;

	return (
		<section className={styles.dashboard}>
			<ul className={styles.dashboard__list}>
				<li className={styles.dashboard__item}>
					<FaUserLarge className={styles.dashboard__icon} />
					<div>Количество пользователей: {stats.totalUsers}</div>
				</li>
				<li className={styles.dashboard__item}>
					<FaUserTie className={styles.dashboard__icon} />
					<div>Количество администраторов: {stats.adminUsers}</div>
				</li>
				<li className={styles.dashboard__item}>
					<FaImage className={styles.dashboard__icon} />
					<div>Количество изображений: {stats.galleryItems}</div>
				</li>
			</ul>
		</section>
	);
};

export default Dashboard;
