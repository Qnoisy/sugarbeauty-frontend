import classNames from 'classnames';
import type { ReactNode } from 'react';

import { useNav } from 'shared/lib/hooks/useNav';
import { useEscapeKey } from '../../../shared/lib/hooks/useEscapeKey';
import styles from './BurgerModal.module.scss';

interface BurgerModalProps {
	children: ReactNode;
}

export const BurgerModal = ({ children }: BurgerModalProps) => {
	const { isOpen, setIsOpen } = useNav();
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};
	useEscapeKey(() => {
		if (isOpen) {
			setIsOpen(false);
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
