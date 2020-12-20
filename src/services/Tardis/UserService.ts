import BaseService from './BaseService';
import type { IUser } from './types';

class UserService extends BaseService {
	constructor() {
		super();
		this.collection = 'user';
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

			if (response.status !== 200) {
				throw response.status;
			}

			return response.json();
		} catch (e) {
			throw e;
		}
	}
}

export default UserService;
