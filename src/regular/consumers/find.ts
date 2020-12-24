

/// returns item if it is found in iterable and null if it isn't
function find<T>(iter: Iterable<T>, itemToFind: T | HigherOrderFn<T, boolean>): T | null {
	for (const item of iter) {
		const isItem = typeof itemToFind === 'function'
			? (itemToFind as HigherOrderFn<T, boolean>)(item)
			: itemToFind === item;

		if (isItem) return item;
	}

	return null;
}

export default find;
