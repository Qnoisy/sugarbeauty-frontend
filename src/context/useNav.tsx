import { createContext, useContext, useState } from 'react';

type NavContextType = {
	isOpen: boolean;
	setOpen: (value: React.SetStateAction<boolean>) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<NavContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</NavContext.Provider>
	);
};

export const useNav = () => {
	const context = useContext(NavContext);
	if (!context) {
		throw new Error('useNav must be used within a NavProvider');
	}
	return context;
};
