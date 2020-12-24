/// flattens an iterator of iterators. Only flattens one level.
export function* flat<T>(iter: Iterable<Iterable<T>>): IterableIterator<T> {
	for (const nestedIter of iter) {
		for (const item of nestedIter) {
			yield item;
		}
	}
}

export default flat;
