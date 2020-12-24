import { flat } from '../regular/lazy';

/// chains iterables, one after the other. The code is identical to flatten.
function* chain(...iters: Iterable<any>[]): IterableIterator<any> {
	yield* flat(iters);
}

export default chain;
