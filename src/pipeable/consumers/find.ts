import { find as _find } from "../../regular";

/// returns item if it is found in iterable and null if it isn't
export function find<T>(itemToFind: T | HigherOrderFn<T, boolean>) {
	return (iter: Iterable<T>) => _find(iter, itemToFind)
}

export default find;
