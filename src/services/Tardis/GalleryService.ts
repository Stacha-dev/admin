import BaseService from './BaseService';
import type { IGallery } from './types';

class GalleryService extends BaseService {
	constructor() {
		super();
		this.collection = 'gallery';
	}

	async getAll() {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection));
			return response.json();
		} catch (error) {
			console.log(error);
		}
	}

	async getOneById(id: number): Promise<IGallery> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id));
			if (response.status !== 200) {
				throw response.status;
			}

			return response.json();
		} catch (error) {
			throw error;
		}
	}
	/*
	async create(data, token) {
		const version = 1;

		try {
			await fetch(this.getEndpoint(version, this.collection), {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.log(error);
		}
	}

	async update(id, data, token) {
		const version = 1;
		console.log(JSON.stringify(data));
		try {
			await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.log(error);
		}
	}

	async delete(id, token) {
		const version = 1;

		try {
			await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}
	*/
}

export default GalleryService;
