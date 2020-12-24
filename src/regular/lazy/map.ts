import { enumerate } from './index';



/// return new iterable with each function applied
function* map<T, U>(
	iter: Iterable<T>,
	mapFunc: HigherOrderFn<T, U>
): Iterable<U> {
	for (const [index, item] of enumerate(iter)) {
	  	yield mapFunc(item, index);
	}
}

export default map;
