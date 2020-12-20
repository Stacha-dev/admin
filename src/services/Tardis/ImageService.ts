import BaseService from './BaseService';

class ImageService extends BaseService {
	constructor() {
		super();
		this.collection = 'image';
	}

	async getOneById(id: number) {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id));

			if (response.status !== 200) {
				throw response.status;
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}

	async upload(data: FormData, token: string) {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection), {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: data,
			});

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	}

	async update(id: number, data: object, token: string) {
		const version = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, id), {
				method: 'PUT',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
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
