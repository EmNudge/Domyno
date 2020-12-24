import { enumerate } from './index';

/// Like filtering, but stopping execution when reaching a false value
export function* takeWhile<T>(iter: Iterable<T>, boolFunc: HigherOrderFn<T, boolean>): IterableIterator<T> {
	for (const [index, item] of enumerate(iter)) {
		if (!boolFunc(item, index, iter)) return;

		yield item;
	}
}

export default takeWhile;
