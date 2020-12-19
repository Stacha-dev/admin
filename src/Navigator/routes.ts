import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Slideshow from '../pages/Slideshow';
import { IRoute } from '../types';

export const routes: Array<IRoute> = [
	{
		path: '/login',
		name: 'menu.login',
		component: Login,
		exact: false,
		menu: true,
	},
];

export const protectedRoutes = [
	{
		path: '/',
		name: 'menu.dashboard',
		component: Dashboard,
		exact: true,
		menu: true,
	},
	{
		path: '/slideshow',
		name: 'menu.slideshow',
		component: Slideshow,
		exact: true,
		menu: true,
	},
];
