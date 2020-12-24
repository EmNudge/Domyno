import { takeWhile as _takeWhile } from "../../regular";

/// Like filtering, but stopping execution when reaching a false value
export function takeWhile<T>(boolFunc: HigherOrderFn<T, boolean>) {
	return (iter:Iterable<T>) => _takeWhile(iter, boolFunc)
}

export default takeWhile;
