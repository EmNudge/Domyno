import { map } from './index';
import type { hofFunc } from '../..';

/// a debugging function which doesn't affect the function
function* tap<T>(iter: Iterable<T>, tapFunc: hofFunc<void, void>) {
	yield* map(iter, item => {
	  tapFunc
	  console.log(item);
	  return item;
	});
}

export default tap;
