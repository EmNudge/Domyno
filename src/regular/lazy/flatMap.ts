import { flat, map } from './index';
import type { hofFunc } from '../..';

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
function* flatMap<T, U>(iter: Iterable<T>, mapFunc: hofFunc<T, Iterable<U>>): Iterable<U> {
	yield* flat(map(iter, mapFunc));
}

export default flatMap;
