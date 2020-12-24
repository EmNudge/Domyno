import { take as _take } from "../../regular";

/// takes first n elements from an iter
export function take<T>(until: number) {
	return (iter:Iterable<T>) => _take(iter,until)
}

export default take;
