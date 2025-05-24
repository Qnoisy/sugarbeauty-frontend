import './common/general.scss';
import { NavProvider } from './context/useNav';
import AppRouter from './router/AppRouter';
const Wrapper: React.FC = () => {
	// const { isMobile } = useCustomMediaQueries();
	// const isLoginPage = useMatch('/');

	return (
		<NavProvider>
			<div className='wrapper'>
				{/* <Header/>
			{isLoginPage && <MainHeader />} */}

				<main>
					<AppRouter />
				</main>

				{/* <Footer />

      {isMobile && <BottomNav/>}

      <AppInitializer /> */}
			</div>
		</NavProvider>
	);
};

export default Wrapper;
