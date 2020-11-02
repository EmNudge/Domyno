/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
///
/// Although with that that brings possible other implications, what if the thing you're cycling is infinite, in which case caching is just a bit of an unecessary memory hog
function cycle<T>(shouldCache = true) {
	return function* (iter: Iterable<T>): Iterable<T> {
		const cache = [];

		for (const item of iter) {
			yield item;
			if (shouldCache) cache.push(item);
		}

		// arrays are not consumed when used as iterables, unlike generators
		while (true) yield* cache;
	}
}

export default cycle;
