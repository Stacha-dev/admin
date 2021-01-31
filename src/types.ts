export interface IRoute {
	path: string;
	component: React.FC;
	exact: boolean;
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
