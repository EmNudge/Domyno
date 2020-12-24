import { enumerate } from './index';


/// return new iterable with valus missing that don't pass the filter function
function filter<T>(filterFunc: HigherOrderFn<T, boolean>) {
	return function*(iter: Iterable<T>): Iterable<T> {
		for (const [index, item] of enumerate(iter)) {
			if (!filterFunc(item, index)) continue;
			yield item;
		}
	};
}

export default filter;
