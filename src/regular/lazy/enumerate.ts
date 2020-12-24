/// returns index along with item in a given iterable
export function* enumerate<T>(iter: Iterable<T>): IterableIterator<[number, T]> {
	let index = 0;
	for (const item of iter) {
		yield [index, item];
		index++;
	}
}

export default enumerate;
