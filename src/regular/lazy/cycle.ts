/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
///
/// By default, cycle uses a cache. If you're cycling an infinite iterable (for whatever reason), this will turn to a memory hog. 
function* cycle<T>(iter: Iterable<T>, shouldCache = true): Iterable<T> {
	const cache = [];

	for (const item of iter) {
		yield item;
		if (shouldCache) cache.push(item);
	}

	// arrays are not consumed when used as iterables, unlike generators
	while (true) yield* cache;
}

export default cycle;
