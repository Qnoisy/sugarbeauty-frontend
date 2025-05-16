import type React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { BuyButton } from './components/BuyButton';
import { Cancel } from './components/Cancel';
import { CheckCourseAccess } from './components/CheckCourseAccess';
import { SignInWithGoogle } from './components/SignInWithGoogle';
import { SignOutButton } from './components/SignOutButton';
import { Success } from './components/Success';

interface RouteInterface {
	path: string;
	component: React.FC;
}

const publicRoutes: RouteInterface[] = [
	{ path: '/course', component: BuyButton },
	{ path: '/signOut', component: SignOutButton },
	{ path: '/signIn', component: SignInWithGoogle },
	{ path: '/check', component: CheckCourseAccess },
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
				<Route path='/success' element={<Success />} />
				<Route path='/cancel' element={<Cancel />} />
			</Routes>
		</div>
	);
};
