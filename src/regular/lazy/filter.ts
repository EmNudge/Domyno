import { enumerate } from '../index';


/// return new iterable with valus missing that don't pass the filter function
export function* filter<T>(
	iter: Iterable<T>,
	filterFunc: HigherOrderFn<T, boolean>
): IterableIterator<T> {
	for (const [index, item] of enumerate(iter)) {
		if (!filterFunc(item, index, iter)) continue;
		yield item;
	}
}


export default filter;
