import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import GalleryDetail from '../pages/GalleryDetail';
import GalleryTagList from '../pages/GalleryTagList';
import type { IRoute } from '../types';

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
