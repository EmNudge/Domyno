import { map } from './index';
import type { hofFunc } from '../..';

/// a debugging function which doesn't affect the function
function tap<T>(tapFunc: hofFunc<any, void>) {
	return function*(iter: Iterable<T>) {
		yield* map((item: T) => {
			tapFunc(item);
			return item;
		})(iter);
	};
}

export default tap;
