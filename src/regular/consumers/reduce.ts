import { enumerate } from "../lazy";

/// return new iterable with valus missing that don't pass the filter function
export function reduce<T, U>(iter: Iterable<T>, initialVal: U, reduceFunc: (accum: U, current: T, index: number, iter: Iterable<T>) => U): U {
	let accum = initialVal;

	for (const [index, item] of enumerate(iter)) {
		accum = reduceFunc(accum, item, index, iter);
	}

	return accum;
}

export default reduce;
