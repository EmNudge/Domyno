import { flatMap as _flatMap } from "../../regular";

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
export function flatMap<T, U>(mapFunc: HigherOrderFn<T, Iterable<U>>) {
	return (iter: Iterable<T>) => _flatMap(iter, mapFunc);
}

export default flatMap;
