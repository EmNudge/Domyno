import { take, takeWhile } from '../regular'
import { hofFunc } from '../main'

export function pipeTake<T>(until: number) {
	return (iter: Iterable<T>) => take(iter, until);
}

export function pipeTakeWhile<T>(boolFunc: hofFunc<T, boolean>) {
	return (iter: Iterable<T>) => takeWhile(iter, boolFunc);
}