import { enumerate } from '../index';
import type { hofFunc } from '../..';

/// return new iterable with valus missing that don't pass the filter function
function* filter<T>(
	iter: Iterable<T>,
	filterFunc: hofFunc<T, boolean>
): Iterable<T> {
	for (const [index, item] of enumerate(iter)) {
		if (!filterFunc(item, index)) continue;
		yield item;
	}
}
  

export default filter;
