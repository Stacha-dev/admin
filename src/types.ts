export interface IRoute {
	path: string;
	name: string;
	component: React.FC;
	exact: boolean;
	menu: boolean;
}

export enum InputType {
	text = 'text',
	password = 'password',
	file = 'file',
}

export enum Type {
	primary = 'primary',
	secondary = 'secondary',
}
