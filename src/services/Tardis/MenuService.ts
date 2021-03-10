import BaseService from './BaseService';
import { IMenu, Collection } from './types';

class MenuService extends BaseService {
	constructor() {
		super();
		this.collection = Collection.menu;
	}

	async getById(id: number): Promise<IMenu> {
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
}

export default MenuService;
