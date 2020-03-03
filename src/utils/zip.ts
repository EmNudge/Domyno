function* zip(...iters: Iterable<any>[]): Iterable<any[]> {
	// Using raw iterator protocol since for loops can be frustrating
	const rawIters = iters.map((iter) => iter[Symbol.iterator]());

	// values gained from rawIters
	let items = rawIters.map((iter) => iter.next());

	// while no item is done i.e. it has more output
	while (items.every((item) => !item.done)) {
		yield items.map((item) => item.value);

		// moving iterators down to the next element
		items = rawIters.map((iter) => iter.next());
	}
}

export default zip;
