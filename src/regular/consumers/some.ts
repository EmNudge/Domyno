

export function some<T>(iter: Iterable<T>, func: HigherOrderFn<T, boolean> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (func(item)) return true;
	}

	return false;
}

export default some;
