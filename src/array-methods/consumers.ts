type boolFunc<T> = (item: T) => boolean;

export function some<T>(iter: Iterable<T>, func: boolFunc<T> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (func(item)) return true;
	}

	return false;
}

export function every<T>(iter: Iterable<T>, func: boolFunc<T> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (!func(item)) return false;
	}

	return true;
}

/// returns true if item found in iterable
export function contains<T>(iter: Iterable<T>, itemToFind: T | boolFunc<T>): boolean {
	for (const item of iter) {
    const isItem = typeof itemToFind === 'function' 
      ? (itemToFind as boolFunc<T>)(item) 
      : itemToFind === item;
		
		if (isItem) return true;
	}

	return false;
}

/// returns item if it is found in iterable and null if it isn't
export function find<T>(iter: Iterable<T>, itemToFind: T | boolFunc<T>): T {
	for (const item of iter) {
    const isItem = typeof itemToFind === 'function' 
      ? (itemToFind as boolFunc<T>)(item) 
      : itemToFind === item;
    
		if (isItem) return item;
	}

	return null;
}

/// return new iterable with valus missing that don't pass the filter function
export function reduce<T, U>(iter: Iterable<T>, initialVal: U, reduceFunc: (accum: U, current: T) => U): U {
	let accum = initialVal;

	for (const item of iter) {
		accum = reduceFunc(accum, item);
	}

	return accum;
}
