import { enumerate } from './index';
import { hofFunc } from '../index.d';

/// return new iterable with valus missing that don't pass the filter function
function filter<T>(filterFunc: hofFunc<T, boolean>) {
	return function*(iter: Iterable<T>): Iterable<T> {
		for (const [index, item] of enumerate(iter)) {
			if (!filterFunc(item, index)) continue;
			yield item;
		}
	};
}

export default filter;
