import { tap as _tap } from "../../regular";

/// a debugging function which doesn't affect the function
export function tap<T>(tapFunc: HigherOrderFn<any, void>) {
	return (iter:Iterable<T>) => _tap(iter, tapFunc)
}

export default tap;
