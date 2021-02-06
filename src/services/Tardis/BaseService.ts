import { Collection } from './types';

interface IBaseService {
	collection: Collection;
	getOrigin: () => URL;
	getEndpoint: () => string;
}

class BaseService implements IBaseService {
	collection: Collection = Collection.base;

	getOrigin(): URL {
		const origin =
			process.env.NODE_ENV === 'development'
				? (process.env.REACT_APP_DOMAIN_STAGING as string)
				: `${window.origin}/`;

		return new URL(origin);
	}

	getEndpoint(...path: Array<string | number>): string {
		path.unshift('api');
		return new URL(path.join('/'), this.getOrigin()).toString();
	}
}

export default BaseService;
