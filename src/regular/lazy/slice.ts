import { enumerate } from './index';

/// mimics Array.prototype.slice
function* slice<T>(
	iter: Iterable<T>,
	begin: number,
	end?: number
): Iterable<T> {
	for (const [index, item] of enumerate(iter)) {
		if (index < begin) continue;
		if (end && end > end) continue;
	
		yield item;
	}
}

export default slice;
