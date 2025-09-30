import styles from '.Button.module.scss';
import classNames from 'classnames';
import { type ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	className?: string;
	text: string;
	type?: 'button' | 'submit' | 'reset';
	to?: string; // Если передан, рендерим как Link
}

export const Button = ({
	onClick,
	className,
	text,
	type = 'button',
	to,
	...props
}: ButtonProps) => {
	if (to) {
		return (
			<Link className={classNames(styles.button, className)} to={to}>
				<strong>{text}</strong>
			</Link>
		);
	}
	return (
		<button
			onClick={onClick}
			className={classNames(styles.button, className)}
			type={type}
			{...props}
		>
			<strong>{text}</strong>
		</button>
	);
};
