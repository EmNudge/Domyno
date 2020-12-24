import { map } from './index';


/// a debugging function which doesn't affect the function
function* tap<T>(iter: Iterable<T>, tapFunc: HigherOrderFn<T, void>) {
	yield* map(iter, (item: T) => {
	  tapFunc(item);
	  return item;
	});
}

export default tap;
