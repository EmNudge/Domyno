/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
import { cycle as _cycle } from "../../regular";

/// Although with that that brings possible other implications, what if the thing you're cycling is infinite, in which case caching is just a bit of an unecessary memory hog
export function cycle<T>(shouldCache = true) {
	return (iter:Iterable<T>) => _cycle(iter, shouldCache)
}

export default cycle;
