import type React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminPanel from './components/auth/admins/AdminPanels';
import AdminRoute from './components/auth/admins/AdminRoute';
import Profile from './components/auth/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import BuyButton from './components/BuyButton';
import Cancel from './components/Cancel';
import CheckCourseAccess from './components/CheckCourseAccess';
import ReadImage from './components/imagebase/ReadImage';
import UpdateImage from './components/imagebase/UpdateImage';
import UpdateWriteImage from './components/imagebase/UpdateWirteImage';
import WriteImage from './components/imagebase/WriteImage';
import Main from './components/Main';
import Success from './components/Success';

interface RouteInterface {
	path: string;
	component: React.FC;
}

const publicRoutes: RouteInterface[] = [
	{ path: '/', component: Main },
	{ path: '/course', component: BuyButton },
	{ path: '/check', component: CheckCourseAccess },
	{ path: '/signIn', component: SignIn },
	{ path: '/signUp', component: SignUp },
	{ path: '/profile', component: Profile },
	{ path: '/writeImage', component: WriteImage },
	{ path: '/readImage', component: ReadImage },
	{ path: '/updateImage', component: UpdateImage },
];
export const Wrapper = () => {
	const navigate = useNavigate();
	return (
		<div>
			<ul className='app__list'>
				{publicRoutes.map((route, index) => (
					<button
						key={index}
						className='app__link'
						onClick={() => navigate(route.path)}
					>
						<span className='app__link--text'>{route.component.name}</span>
					</button>
				))}
			</ul>
			<h1 className='container'>Stripe + Firebase example</h1>
			<Routes>
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={<route.component />} />
				))}
				<Route path='/updateWriteImage/:id' element={<UpdateWriteImage />} />{' '}
				<Route path='/admin' element={<AdminRoute />}>
					<Route index element={<AdminPanel />} />
				</Route>
				<Route path='/success' element={<Success />} />
				<Route path='/cancel' element={<Cancel />} />
			</Routes>
		</div>
	);
};
