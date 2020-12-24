import { enumerate } from './index';

/// Like filtering, but stopping execution when reaching a false value
function* takeWhile<T>(iter: Iterable<T>, boolFunc: HigherOrderFn<T, boolean>): Iterable<T> {
	for (const [index, item] of enumerate(iter)) {
		if (!boolFunc(item, index)) return;

		yield item;
	}
}

export default takeWhile;
