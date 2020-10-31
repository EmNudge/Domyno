/// flattens an iterator of iterators. Only flattens one level.
function* flat<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
	for (const nestedIter of iter) {
		for (const item of nestedIter) {
			yield item;
		}
	}
}

export default flat;
