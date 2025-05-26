import classNames from 'classnames';
import Hamburger from 'hamburger-react';
import { useNav } from '../../../context/useNav';
import styles from './Burger.module.scss';

export const Burger = () => {
	const { isOpen, setOpen } = useNav();

	return (
		<div
			className={classNames(styles.burger, {
				[styles.burger__open]: isOpen,
			})}
		>
			<Hamburger toggled={isOpen} toggle={setOpen} />
		</div>
	);
};
