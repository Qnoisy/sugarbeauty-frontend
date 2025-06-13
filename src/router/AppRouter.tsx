import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomLoader } from '../components/UI/CustomLoader';
import { useAppSelector } from '../hooks/redux';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import AdminRoute from '../pages/AdminPanel/AdminRoute';
import UpdateWriteImage from '../pages/AdminPanel/imagebase/UpdateWriteImage/UpdateWriteImage';
import { privateRoutes, publicRoutes, sharedRoutes } from './Routes';

const AppRouter: React.FC = () => {
	const { isAuth, isLoading } = useAppSelector(state => state.user);

	if (isLoading) {
		return <CustomLoader />;
	}

	return (
		<Routes>
			{sharedRoutes.map((route, index) => (
				<Route key={index} path={route.path} element={route.component} />
			))}

			{!isAuth &&
				publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.component} />
				))}

			{isAuth &&
				privateRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.component} />
				))}

			<Route path='/admin' element={<AdminRoute />}>
				<Route index element={<AdminPanel />} />
				<Route path='update-image/:id' element={<UpdateWriteImage />} />
			</Route>

			<Route
				path='*'
				element={<Navigate to={isAuth ? '/profile' : '/signIn'} />}
			/>
		</Routes>
	);
};

export default React.memo(AppRouter);
