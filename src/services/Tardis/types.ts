export interface IThumbnail {
	'2560': string;
	'1920': string;
	'1366': string;
	'1024': string;
	'640': string;
	'320': string;
	'160': string;
}

export interface ISource {
	'image/jpeg': IThumbnail;
}

export interface IImage {
	id: number;
	title: string;
	source: ISource;
	ordering: number;
	state: boolean;
}

export interface IGallery {
	id: number;
	title: string;
	description: string;
	alias: string;
	thumbnail: IImage;
	images: IImage[];
	state: boolean;
}

export interface IMenu {
	title: string;
	items: IMenuItem[];
	updated: string;
	created: string;
	state: boolean;
}

export interface IMenuItem {
	title: string;
	target: string;
	updated: string;
	created: string;
	state: boolean;
}

export interface IUser {
	name: string;
	surname: string;
	token: string;
}

export enum Collection {
	base = 'base',
	user = 'user',
	image = 'image',
	gallery = 'gallery',
	menu = 'menu',
}
