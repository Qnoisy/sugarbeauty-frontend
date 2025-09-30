import { NavContext } from 'app/providers/NavProvider';
import { useContext } from 'react';

export const useNav = () => {
	const context = useContext(NavContext);
	if (!context) {
		throw new Error('useNav must be used within a NavProvider');
	}
	return context;
};
