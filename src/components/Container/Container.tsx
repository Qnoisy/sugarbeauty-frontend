import classNames from 'classnames';

import type { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
	children: ReactNode;
	section?: boolean;
	className?: string;
}

export const Container = ({
	children,
	section = false,
	className,
}: ContainerProps) => {
	return (
		<div
			className={classNames(
				styles.container,
				{
					[styles['container__padding-disabled']]: !section,
				},
				className
			)}
		>
			{children}
		</div>
	);
};
