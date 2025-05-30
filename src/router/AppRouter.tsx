import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import UpdateWriteImage from '../components/imagebase/UpdateWirteImage';
import { CustomLoader } from '../components/UI/CustomLoader';
import { useAppSelector } from '../hooks/redux';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import AdminRoute from '../pages/admins/AdminRoute';
import { privateRoutes, publicRoutes, sharedRoutes } from './Routes';

const AppRouter: React.FC = () => {
	const { isAuth, isLoading } = useAppSelector(state => state.user);
	console.log(isAuth);

	if (isLoading) {
		return <CustomLoader />;
	}

	return (
		<Routes>
			{/* Общие роуты — всегда доступны */}
			{sharedRoutes.map((route, index) => (
				<Route key={index} path={route.path} element={route.component} />
			))}

			{/* Публичные — только если НЕ авторизован */}
			{!isAuth &&
				publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.component} />
				))}

			{/* Приватные — только если авторизован */}
			{isAuth &&
				privateRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.component} />
				))}

			<Route path='/admin' element={<AdminRoute />}>
				<Route index element={<AdminPanel />} />
				<Route path='update-image/:id' element={<UpdateWriteImage />} />
			</Route>

			{/* Редирект: в зависимости от статуса */}
			<Route path='*' element={<Navigate to={isAuth ? '/' : '/signIn'} />} />
		</Routes>
	);
};

export default React.memo(AppRouter);
