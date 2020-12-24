

/// returns true if item found in iterable
function contains<T>(itemToFind: T | HigherOrderFn<T, boolean>) {
	return (iter: Iterable<T>): boolean => {
		for (const item of iter) {
			const isItem =
				typeof itemToFind === 'function' ? (itemToFind as HigherOrderFn<T, boolean>)(item) : itemToFind === item;

			if (isItem) return true;
		}

		return false;
	};
}

export default contains;
