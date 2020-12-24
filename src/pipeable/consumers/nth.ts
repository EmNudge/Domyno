import { nth as _nth } from "../../regular";

/// gets the nth element of an array. Has O(n) algorithmic complexity
export function nth<T>(index: number) {
	return (iter: Iterable<T>) => _nth(iter, index)
}

export default nth;
