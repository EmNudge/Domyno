import type { hofFunc } from '../..';

/// returns true if item found in iterable
function contains<T>(iter: Iterable<T>, itemToFind: T | hofFunc<T, boolean>): boolean {
	for (const item of iter) {
		const isItem = typeof itemToFind === 'function' 
			? (itemToFind as hofFunc<T, boolean>)(item) 
			: itemToFind === item;
		
		if (isItem) return true;
	}

	return false;
}

export default contains;
