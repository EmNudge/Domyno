import { map as _map } from '../../regular';

/// return new iterable with each function applied
export function map<T, U>(mapFunc: HigherOrderFn<T,U>) {
	return (iter:Iterable<T>) => _map(iter, mapFunc)
}

export default map;
