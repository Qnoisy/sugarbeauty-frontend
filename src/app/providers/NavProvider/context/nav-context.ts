import { createContext } from 'react';

export type NavContextType = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// экспортируем сам контекст
export const NavContext = createContext<NavContextType | undefined>(undefined);
NavContext.displayName = 'NavContext';
