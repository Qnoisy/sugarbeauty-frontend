import { useState } from 'react';
import { NavContext } from '../context/nav-context';

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<NavContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</NavContext.Provider>
	);
};
