import { reduce as _reduce } from "../../regular";

/// return new iterable with valus missing that don't pass the filter function
export function reduce<T, U>(initialVal: U, reduceFunc: (accum: U, current: T) => U) {
	return (iter: Iterable<T>): U => _reduce(iter, initialVal, reduceFunc)
}

export default reduce;
