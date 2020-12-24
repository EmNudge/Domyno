import { enumerate } from "../lazy";


/// returns true if item found in iterable
export function contains<T>(iter: Iterable<T>, itemToFind: T | HigherOrderFn<T, boolean>): boolean {
	for (const [index, item] of enumerate(iter)) {
		const isItem = typeof itemToFind === 'function'
			? (itemToFind as HigherOrderFn<T, boolean>)(item, index, iter)
			: itemToFind === item;

		if (isItem) return true;
	}

	return false;
}

export default contains;
