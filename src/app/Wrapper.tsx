import { useMatch } from 'react-router-dom';
import { Footer } from '../pages/Footer';
import { Header } from '../pages/Header';
import { MainHeader } from '../pages/MainHeader';
import { useAppSelector } from '../shared/lib/hooks/redux';
import { BottomNav } from '../widgets/BottomNav';
import './common/general.scss';
import { AppInitializer } from './providers/router/AppInitializer';
import AppRouter from './providers/router/AppRouter';
const Wrapper: React.FC = () => {
	const isLoginPage = useMatch('/');
	const isLoading = useAppSelector(state => state.user.isLoading);

	return (
		<div className='wrapper'>
			<Header />
			{isLoginPage && <MainHeader />}
			<AppInitializer />
			<main>{!isLoading ? <AppRouter /> : <></>}</main>
			<Footer />
			<BottomNav />
		</div>
	);
};

export default Wrapper;
