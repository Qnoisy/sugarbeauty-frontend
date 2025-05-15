import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import App from './App.tsx';
import './common/general.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
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
			<App />
		</BrowserRouter>
	</StrictMode>
);
