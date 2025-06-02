import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useNav } from '../../../context/useNav';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import styles from './BurgerModal.module.scss';

interface BurgerModalProps {
	children: ReactNode;
}

export const BurgerModal = ({ children }: BurgerModalProps) => {
	const { isOpen, setOpen } = useNav();
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setOpen(false);
		}
	};
	useEscapeKey(() => {
		if (isOpen) {
			setOpen(false);
		}
	});

	return (
		<div
			onClick={handleClick}
			className={classNames(styles.burgerModal, {
				[styles.active]: isOpen,
			})}
		>
			<div className={styles.burgerModal__content}>
				<div className={styles['burgerModal__content--block']}>{children}</div>
			</div>
		</div>
	);
};
