// hooks/useCustomMediaQueries.ts
import useMediaQuery from './useMediaQuery';

const useCustomMediaQueries = () => {
	const isMobile = useMediaQuery('(max-width: 575.98px)');
	const isTablet = useMediaQuery(
		'(min-width: 576px) and (max-width: 991.98px)'
	);
	const isDesktop = useMediaQuery('(min-width: 992px)');

	return {
		isMobile,
		isTablet,
		isDesktop,
	};
};

export default useCustomMediaQueries;
