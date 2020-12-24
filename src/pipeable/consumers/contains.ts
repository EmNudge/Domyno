import { contains as _contains } from "../../regular";

/// returns true if item found in iterable
export function contains<T>(itemToFind: T | HigherOrderFn<T, boolean>) {
	return (iter:Iterable<T>) => _contains(iter,itemToFind)
}

export default contains;
