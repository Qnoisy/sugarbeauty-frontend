import { NavProvider } from 'app/providers/NavProvider';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import Wrapper from './app/Wrapper';
import './common/general.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StoreProvider>
			<BrowserRouter>
				<NavProvider>
					<ToastContainer
						position='bottom-right'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='light'
						transition={Bounce}
					/>
					<Wrapper />
				</NavProvider>
			</BrowserRouter>
		</StoreProvider>
	</StrictMode>
);
