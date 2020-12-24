import { flat, map } from './index';


/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
function flatMap<T, U>(mapFunc: HigherOrderFn<T, Iterable<U>>) {
	return function*(iter: Iterable<T>) {
		yield* flat(map(mapFunc)(iter));
	};
}

export default flatMap;
