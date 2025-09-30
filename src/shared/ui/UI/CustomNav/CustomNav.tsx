import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../../../../app/providers/router/Routes';
import styles from './CustomNav.module.scss';

interface CustomNavProps {
	items: MenuItem[];
	disableAnimation?: boolean;
	className?: string;
	color?: string;
}

export const CustomNav = ({
	items,
	disableAnimation = false,
	className,
	color,
}: CustomNavProps) => {
	const location = useLocation();

	return (
		<nav className={classNames(styles.customNav, className)}>
			{items.map((item: MenuItem, index: number) => {
				const isActive = location.pathname === item.path;
				return (
					<Link
						key={index}
						to={item.path}
						className={classNames(styles.customNav__items, color, {
							[styles.active]: isActive,
							[styles.noLine]: disableAnimation,
						})}
					>
						<strong className={styles.customNav__item}>{item.title}</strong>
					</Link>
				);
			})}
		</nav>
	);
};
