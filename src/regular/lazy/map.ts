import { enumerate } from './index';



/// return new iterable with each function applied
export function* map<T, U>(
	iter: Iterable<T>,
	mapFunc: HigherOrderFn<T, U>
): IterableIterator<U> {
	for (const [index, item] of enumerate(iter)) {
	  	yield mapFunc(item, index, iter);
	}
}

export default map;
