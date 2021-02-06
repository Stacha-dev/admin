import { IImage } from '.';
import BaseService from './BaseService';
import { Direction, Collection } from './types';

class ImageService extends BaseService {
	constructor() {
		super();
		this.collection = Collection.image;
	}

	async getOneById(id: number): Promise<IImage> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id));

			if (!response.ok) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async upload(data: FormData, token: string): Promise<IImage> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection), {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: data,
			});

			if (!response.ok) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async update(id: number, data: object, token: string): Promise<IImage> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(response.status.toString());
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async order(id: number, direction: Direction, token: string) {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, 'ordering', direction, id), {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.status.toString());
			}
		} catch (error) {
			throw error;
		}
	}

	async delete(id: number, token: string) {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.status.toString());
			}
		} catch (error) {
			throw error;
		}
	}
}

export default ImageService;
