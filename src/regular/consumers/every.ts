

export function every<T>(iter: Iterable<T>, func: HigherOrderFn<T, boolean> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (!func(item)) return false;
	}

	return true;
}

export default every;
