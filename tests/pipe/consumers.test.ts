import { pipe } from '../../src';
import { map } from '../../src/pipeable/lazy';
import {
	contains, every, find, nth, 
	reduce, some, tail, unzip
} from '../../src/pipeable/consumers';

describe('Basic Pipes', () => {
	test('every and some testing', () => {
		const arr = [1, 2, 3, 4, 5];

		const res1 = pipe(
			map((n: number) => n ** 2),
			every((n: number) => n < 10)
		)(arr);

		const res2 = pipe(
			map((n: number) => n ** 2),
			some((n: number) => n < 10)
		)(arr);

		expect(res1).toBe(false);
		expect(res2).toBe(true);
	});

	test('contains and find testing', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res1 = contains(10)(arr);
		const res2 = find(10)(arr);

		expect(res1).toBe(true);
		expect(res2).toBe(10);
	});

	test('nth and tail testing', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res1 = nth(0)(arr);
		const res2 = tail(arr);

		expect(res1).toBe(0);
		expect(res2).toBe(19);
	});

	test('reduce testing', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res = reduce(0, (accum, curr: number) => accum + curr)(arr);

		const expected = arr.reduce((accum, curr) => accum + curr);

		expect(res).toStrictEqual(expected);
	});

	test('unzip testing', () => {
		const arr = Array(5).fill(null).map((_, i) => [i, i]);

		const [res1, res2] = unzip(arr);

		const expect1 = [];
		const expect2 = [];
		for (const [item1, item2] of arr) {
			expect1.push(item1);
			expect2.push(item2);
		}

		expect(res1).toStrictEqual(expect1);
		expect(res2).toStrictEqual(expect2);
	});	
});
