import { lazy } from 'react';
import type { IRoute } from '../types';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const GalleryDetail = lazy(() => import('../pages/GalleryDetail'));
const GalleryTagList = lazy(() => import('../pages/GalleryTagList'));

export const routes: Array<IRoute> = [
	{
		path: '/login',
		component: Login,
		exact: false,
	},
];

export const protectedRoutes: Array<IRoute> = [
	{
		path: '/',
		component: Dashboard,
		exact: true,
	},
	{
		path: '/gallery/:id',
		component: GalleryDetail,
		exact: true,
	},
	{
		path: '/gallery/tag/:tag',
		component: GalleryTagList,
		exact: true,
	},
];
