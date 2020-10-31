import type { hofFunc } from '../..';

function some<T>(iter: Iterable<T>, func: hofFunc<T, boolean> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (func(item)) return true;
	}

	return false;
}

export default some;