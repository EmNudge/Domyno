import { enumerate } from './index';


/// Like filtering, but stopping execution when reaching a false value
function takeWhile<T>(boolFunc: HigherOrderFn<T, boolean>) {
	return function*(iter: Iterable<T>): Iterable<T> {
		for (const [index, item] of enumerate(iter)) {
			if (!boolFunc(item, index)) return;

			yield item;
		}
	};
}

export default takeWhile;
