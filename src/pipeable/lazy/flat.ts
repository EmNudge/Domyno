import { flat as _flat } from "../../regular";

/// flattens an iterator of iterators. Only flattens one level.
export function* flat<T>() {
	return (iter:Iterable<Iterable<T>>) => _flat(iter)
}

export default flat;
