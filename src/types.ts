export interface IRoute {
	path: string;
	component: React.FC;
	exact: boolean;
}

export interface IInput {
	name: string;
}

export enum InputType {
	text = 'text',
	password = 'password',
}

export enum Type {
	primary = 'primary',
	secondary = 'secondary',
}

export enum FileType {
	jpg = 'image/jpeg',
}
