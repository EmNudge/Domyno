import { enumerate } from "../lazy";


/// returns item if it is found in iterable and null if it isn't
export function find<T>(iter: Iterable<T>, itemToFind: T | HigherOrderFn<T, boolean>): T | undefined {
	for (const [index,item] of enumerate(iter)) {
		const isItem = typeof itemToFind === 'function'
			? (itemToFind as HigherOrderFn<T, boolean>)(item, index, iter)
			: itemToFind === item;

		if (isItem) return item;
	}

}

export default find;
