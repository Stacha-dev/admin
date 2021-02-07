import { lazy } from 'react';
import type { IRoute } from '../types';

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const GalleryDetail = lazy(() => import('../pages/Gallery/Detail'));
const GalleryTagList = lazy(() => import('../pages/Gallery/TagList'));
const ImageDetail = lazy(() => import('../pages/Image/Detail'));

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
	{
		path: '/image/:id',
		component: ImageDetail,
		exact: true,
	},
];
