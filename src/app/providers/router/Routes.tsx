import type { ReactElement } from 'react';

import BuyButton from '../../../pages/BuyButton/BuyButton';
import { Course } from '../../../pages/Course';
import CheckCourseAccess from '../../../widgets/CheckCourseAccess/CheckCourseAccess';

import AboutMe from '../../../pages/AboutMe/AboutMe';
import ReadImage from '../../../pages/AdminPanel/imagebase/ReadImage/ReadImage';
import CancelPay from '../../../pages/CancelPay/CancelPay';
import { GallerySection } from '../../../pages/GallerySection';
import Main from '../../../pages/Main/Main';

import { Profile } from '../../../pages/Profile';
import SignIn from '../../../pages/SignIn/SignIn';
import SignUp from '../../../pages/SignUp/SignUp';
import SuccessPay from '../../../pages/SuccessPay/SuccessPay';
import ResetPassword from '../../../widgets/ResetPassword/ResetPassword';

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
	{ path: '/aboutMe', component: <AboutMe /> },
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
