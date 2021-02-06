import BaseService from './BaseService';
import { IGallery, Collection } from './types';

class GalleryService extends BaseService {
	constructor() {
		super();
		this.collection = Collection.gallery;
	}

	async getAll(): Promise<IGallery[]> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection));

			if (!response.ok) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async getById(id: number): Promise<IGallery> {
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

	async getByTag(id: number): Promise<IGallery[]> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, 'tag', id));

			if (response.status !== 200) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async find(key: string, value: string): Promise<IGallery[]> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, 'find', key, value));

			if (response.status !== 200) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async create(data: { title: string; description: string; tag?: number }, token: string): Promise<IGallery> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection), {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.status !== 200) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async edit(id: number, data: { title: string; description: string }, token: string): Promise<IGallery> {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
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

	async remove(id: number, token: string) {
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

export default GalleryService;
