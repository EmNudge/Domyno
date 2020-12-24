import { filter as _filter } from "../../regular";


/// return new iterable with valus missing that don't pass the filter function
export function filter<T>(filterFunc: HigherOrderFn<T, boolean>) {
	return (iter:Iterable<T>) => _filter(iter, filterFunc)
}

export default filter;
