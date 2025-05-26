import { useMatch } from 'react-router-dom';
import './common/general.scss';
import { BottomNav } from './components/BottomNav';
import { NavProvider } from './context/useNav';
import useCustomMediaQueries from './hooks/useCustomMediaQueries';
import AppRouter from './router/AppRouter';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { MainHeader } from './sections/MainHeader';
const Wrapper: React.FC = () => {
	const { isTablet } = useCustomMediaQueries();
	const isLoginPage = useMatch('/');

	return (
		<NavProvider>
			<div className='wrapper'>
				<Header />
				{isLoginPage && <MainHeader />}

				<main>
					<AppRouter />
				</main>

				<Footer />

				{isTablet && <BottomNav />}
			</div>
		</NavProvider>
	);
};

export default Wrapper;
