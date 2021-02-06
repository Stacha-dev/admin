import BaseService from './BaseService';
import { Direction } from './types';

class ImageService extends BaseService {
	constructor() {
		super();
		this.collection = 'image';
	}

	async getOneById(id: number) {
		const version = 1;
		const response = await fetch(this.getEndpoint(version, this.collection, id));

		if (!response.ok) {
			throw new Error(response.status.toString());
		}

		return await response.json();
	}

	async upload(data: FormData, token: string) {
		try {
			const version = 1;
			const response = await fetch(this.getEndpoint(version, this.collection), {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: data,
			});
			console.log(await response.json());
			if (!response.ok) {
				throw new Error(response.status.toString());
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async update(id: number, data: object, token: string) {
		const version = 1;
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

			return response.json();
		} catch (error) {
			throw error;
		}
	}

	async delete(id: number, token: string) {
		const version = 1;

		try {
			await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}

export default ImageService;
