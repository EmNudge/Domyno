import { flat, map } from './index';
import type { hofFunc } from '../..';

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
function flatMap<T, U>(mapFunc: hofFunc<T, Iterable<U>>) {
	return function*(iter: Iterable<T>) {
		yield* flat(map(mapFunc)(iter));
	};
}

export default flatMap;
