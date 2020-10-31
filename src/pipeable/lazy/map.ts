import { enumerate } from './index';

/// return new iterable with each function applied
function map<T, U>(mapFunc: (item: T, index: number) => U) {
	return function*(iter: Iterable<T>): Iterable<U> {
		for (const [index, item] of enumerate(iter)) {
			yield mapFunc(item, index);
		}
	};
}

export default map;
