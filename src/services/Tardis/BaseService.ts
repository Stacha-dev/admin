interface IBaseService {
	collection: string;
	getOrigin: () => URL;
	getEndpoint: () => string;
}

class BaseService implements IBaseService {
	collection: string = '';

	getOrigin(): URL {
		const origin = process.env.NODE_ENV === 'development' ? 'https://pc.stacha.dev/' : `${window.origin}/`;
		return new URL(origin);
	}

	getEndpoint(...path: Array<string | number>): string {
		path.unshift('api');
		return new URL(path.join('/'), this.getOrigin()).toString();
	}
}

export default BaseService;
