export type IImage = {
	id: number;
	title: string;
	source: object;
	ordering: number;
	state: boolean;
};

export interface IGallery {
	id: number;
	title: string;
	alias: string;
	state: boolean;
	images: IImage[];
}

export interface IUser {
	name: string;
	surname: string;
	token: string;
}
