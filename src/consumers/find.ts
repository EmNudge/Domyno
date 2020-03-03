import { hofFunc } from '../index.d';

/// returns item if it is found in iterable and null if it isn't
function find<T>(itemToFind: T | hofFunc<T, boolean>) {
	return (iter: Iterable<T>): T | null => {
		for (const item of iter) {
			const isItem =
				typeof itemToFind === 'function' ? (itemToFind as hofFunc<T, boolean>)(item) : itemToFind === item;

			if (isItem) return item;
		}

		return null;
	};
}

export default find;
