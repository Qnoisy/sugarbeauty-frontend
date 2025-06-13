import { useMatch } from 'react-router-dom';
import './common/general.scss';
import { BottomNav } from './components/BottomNav';
import { NavProvider } from './context/useNav';
import { useAppSelector } from './hooks/redux';
import { AppInitializer } from './router/AppInitializer';
import AppRouter from './router/AppRouter';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { MainHeader } from './sections/MainHeader';
const Wrapper: React.FC = () => {
	const isLoginPage = useMatch('/');
	const isLoading = useAppSelector(state => state.user.isLoading);

	return (
		<NavProvider>
			<div className='wrapper'>
				<Header />
				{isLoginPage && <MainHeader />}
				<AppInitializer />
				<main>{!isLoading ? <AppRouter /> : <></>}</main>
				<Footer />
				<BottomNav />
			</div>
		</NavProvider>
	);
};

export default Wrapper;
