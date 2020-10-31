import { enumerate } from './index';

/// takes first n elements from an iter
function take<T>(until: number) {
	return function*(iter: Iterable<T>): Iterable<T> {
		for (const [index, item] of enumerate(iter)) {
			if (index === until) return;

			yield item;
		}
	};
}

export default take;
