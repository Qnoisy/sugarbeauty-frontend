import type { ReactElement } from 'react';
import ReadImage from '../components/imagebase/ReadImage';
import BuyButton from '../pages/BuyButton/BuyButton';
import CancelPay from '../pages/CancelPay/CancelPay';
import CheckCourseAccess from '../pages/CheckCourseAccess/CheckCourseAccess';
import { Course } from '../pages/Course';
import { Profile } from '../pages/Profile';

import ResetPassword from '../pages/ResetPassword/ResetPassword';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import SuccessPay from '../pages/SuccessPay/SuccessPay';
import { GallerySection } from '../sections/GallerySection';
import Main from '../sections/Main/Main';

export interface RouteConfig {
	path: string;
	component: ReactElement;
}

export const sharedRoutes: RouteConfig[] = [
	{ path: '/', component: <Main /> },
	{ path: '/gallery', component: <GallerySection /> },
	{ path: '/success', component: <SuccessPay /> },
	{ path: '/cancel', component: <CancelPay /> },
	{ path: '/readImage', component: <ReadImage /> },
];

export const publicRoutes: RouteConfig[] = [
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/signUp', component: <SignUp /> },
	{ path: '/resetPassword', component: <ResetPassword /> },
];

export const privateRoutes: RouteConfig[] = [
	{ path: '/profile', component: <Profile /> },
	{ path: '/course', component: <Course /> },
	{ path: '/check', component: <CheckCourseAccess /> },
	{ path: '/buy', component: <BuyButton /> },
];

export interface MenuItem {
	title: string;
	path: string;
}

export const menuItems: MenuItem[] = [
	{ path: '/', title: 'Home' },
	{ path: '/signIn', title: 'In' },
	{ path: '/signUp', title: 'Up' },
	{ path: '/profile', title: 'Profile' },
];
