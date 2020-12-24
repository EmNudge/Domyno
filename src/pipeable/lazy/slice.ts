import { slice as _slice } from '../../regular';

/// mimics Array.prototype.slice
export function slice<T>(begin: number, end?: number) {
	return (iter:Iterable<T>) => _slice(iter, begin, end)
}

export default slice;
