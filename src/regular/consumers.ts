import { hofFunc } from '../main'
import { entries } from './index'

export function some<T>(iter: Iterable<T>, func: hofFunc<T, boolean> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (func(item)) return true;
	}

	return false;
}

export function every<T>(iter: Iterable<T>, func: hofFunc<T, boolean> = (item) => Boolean(item)): boolean {
	for (const item of iter) {
		if (!func(item)) return false;
	}

	return true;
}

/// returns true if item found in iterable
export function contains<T>(iter: Iterable<T>, itemToFind: T | hofFunc<T, boolean>): boolean {
	for (const item of iter) {
    const isItem = typeof itemToFind === 'function' 
      ? (itemToFind as hofFunc<T, boolean>)(item) 
      : itemToFind === item;
		
		if (isItem) return true;
	}

	return false;
}

/// returns item if it is found in iterable and null if it isn't
export function find<T>(iter: Iterable<T>, itemToFind: T | hofFunc<T, boolean>): T {
	for (const item of iter) {
    const isItem = typeof itemToFind === 'function' 
      ? (itemToFind as hofFunc<T, boolean>)(item) 
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

/// gets the nth element of an array. Has O(n) algorithmic complexity 
export function nth<T>(iter: Iterable<T>, index: number) {
	if (index < 0) throw new Error('index for nth cannot be negative');

	for (const [i, item] of entries(iter)) {
		if (index == i) return item;
	}

	return null;
}

/// splits iterable into 2 arrays by reversing a zip
export function unzip<T>(iter: Iterable<Iterable<T>>) {
	const arr1 = [];
	const arr2 = [];

	for (const [item1, item2] of iter) {
		arr1.push(item1);
		arr2.push(item2);
	}

	return [arr1, arr2];
}

/// splits iterable into chunks of size chunkSize
export function* chunk<T>(iter: Iterable<T>, chunkSize: number) {
	const arr = [];

	for (const item of iter) {
		if (arr.length === chunkSize) {
			yield arr;
			arr.length = 0;
		}

		arr.push(item);
	}

	// yield the last remaining elements
	if (arr.length)	yield arr;
}

/// splits iterable into 2 chunks based on result of the boolean function
export function partition<T>(iter: Iterable<T>, partFunc: hofFunc<T, boolean>) {
	const arr1 = [];
	const arr2 = [];

	for (const item of iter) {
		if (partFunc(item)) {
			arr1.push(item);
		} else {
			arr2.push(item);
		}
	}

	return [arr1, arr2];
}

export function tail<T>(iter: Iterable<T>): T {
	let value = null;
	for (const item of iter) value = item;

	return value;
} 