/// return new iterable with valus missing that don't pass the filter function
function reduce<T, U>(iter: Iterable<T>, initialVal: U, reduceFunc: (accum: U, current: T) => U): U {
	let accum = initialVal;

	for (const item of iter) {
		accum = reduceFunc(accum, item);
	}

	return accum;
}

export default reduce;
