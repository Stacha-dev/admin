export interface IRoute {
	path: string;
	name: string;
	component: React.FC;
	exact: boolean;
	menu: boolean;
}
