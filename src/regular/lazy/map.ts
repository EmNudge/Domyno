import { enumerate } from './index';
import type { hofFunc } from '../..';


/// return new iterable with each function applied
function* map<T, U>(
	iter: Iterable<T>,
	mapFunc: hofFunc<T, U>
): Iterable<U> {
	for (const [index, item] of enumerate(iter)) {
	  	yield mapFunc(item, index);
	}
}

export default map;
