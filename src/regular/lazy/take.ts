import { enumerate } from './index';

/// takes first n elements from an iter
function* take<T>(iter: Iterable<T>, until: number): Iterable<T> {
	for (const [index, item] of enumerate(iter)) {
		if (index === until) return;

		yield item;
	}
}

export default take;
