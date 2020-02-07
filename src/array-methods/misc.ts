import { map } from './hofs'

/// allows non-array iterables to have a comparable `.entries()` method
/// returns index along with item in a given iterable
export function* entries<T>(iter: Iterable<T>): Iterable<[number, T]> {
	let index = 0;
	for (const item of iter) {
		yield [index, item];
		index++;
	}
}

/// flattens an iterator of iterators. Only flattens one level.
export function* flat<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
	for (const nestedIter of iter) {
		for (const item of nestedIter) {
			yield item;
		}
	}
}

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
export function* flatMap<T, U>(iter: Iterable<T>, mapFunc: (item: T) => Iterable<U>) {
  yield* flat(map(iter, mapFunc));
}
