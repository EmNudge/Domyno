import { flat } from '../regular/lazy';

/// chains iterables, one after the other. The code is identical to flatten.
function* chain(...iters: Iterable<any>[]): Iterable<any> {
	yield* flat(iters);
}

export default chain;