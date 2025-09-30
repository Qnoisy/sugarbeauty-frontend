import classNames from 'classnames';
import Hamburger from 'hamburger-react';
import { useNav } from '../../../shared/lib/hooks/useNav';
import styles from './Burger.module.scss';
interface BurgerProps {
	color?: string;
}

export const Burger = ({ color }: BurgerProps) => {
	const { isOpen, setOpen } = useNav();

	return (
		<div
			className={classNames(styles.burger, {
				[styles.burger__open]: isOpen,
			})}
		>
			<Hamburger toggled={isOpen} toggle={setOpen} color={color} />
		</div>
	);
};
