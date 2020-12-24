import { flat, map } from './index';


/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
export function* flatMap<T, U>(iter: Iterable<T>, mapFunc: HigherOrderFn<T, Iterable<U>>): IterableIterator<U> {
	yield* flat(map(iter, mapFunc));
}

export default flatMap;
