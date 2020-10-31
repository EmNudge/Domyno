/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
function* cycle<T>(iter: Iterable<T>): Iterable<T> {
	while (true) {
		for (const item of iter) {
			yield item;
		}
	}
}

export default cycle;
