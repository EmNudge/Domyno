import { map } from './index';


/// a debugging function which doesn't affect the function
export function* tap<T>(iter: Iterable<T>, tapFunc: HigherOrderFn<T, void>):IterableIterator<T> {
	yield* map(iter, (item, ...args) => {
	  tapFunc(item, ...args);
	  return item;
	});
}

export default tap
