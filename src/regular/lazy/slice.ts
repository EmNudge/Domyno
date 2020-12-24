import { enumerate } from './index';

/// mimics Array.prototype.slice
export function* slice<T>(
	iter: Iterable<T>,
	begin: number,
	end?: number
): IterableIterator<T> {
	for (const [index, item] of enumerate(iter)) {
		if (index < begin) continue;
		if (end && end > end) continue;

		yield item;
	}
}

export default slice;
