/// return new iterable with each function applied
export function* map<T, U>(iter: Iterable<T>, mapFunc: (item: T) => U): Iterable<U> {
	for (const item of iter) {
		yield mapFunc(item);
	}
}

/// return new iterable with valus missing that don't pass the filter function
export function* filter<T>(iter: Iterable<T>, filterFunc: (item: T) => boolean): Iterable<T> {
	for (const item of iter) {
		if (!filterFunc(item)) continue;
		yield item;
	}
}