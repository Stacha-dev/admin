import BaseService from './BaseService';
import { Collection, IUser } from './types';

class UserService extends BaseService {
	constructor() {
		super();
		this.collection = Collection.user;
	}

	async login(username: string, password: string): Promise<IUser> {
		const version: number = 1;

		try {
			const response = await fetch(this.getEndpoint(version, this.collection, 'login'), {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({ username: username, password: password }),
			});

			if (!response.ok) {
				throw new Error(response.status.toString());
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
