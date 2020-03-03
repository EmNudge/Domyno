import { pipe, map } from '../src'
import { 
	contains, every, find, nth, 
	partition, reduce, some, tail, unzip
} from '../src'

describe('Basic Pipes', () => {
	test('every and some testing', () => {
		const arr = [1, 2, 3, 4, 5];

		const res1 = pipe(
			map((n: number) => n ** 2),
			every(n => n < 10)
		)(arr);

		const res2 = pipe(
			map((n: number) => n ** 2),
			some(n => n < 10)
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

		const [expected1, expected2] = arr.reduce((accum, curr) => {
			accum[0].push(curr[0])
			accum[1].push(curr[1])
			return accum;
		}, [[], []]);

		expect(res1).toStrictEqual(expected1);
		expect(res2).toStrictEqual(expected2);
	});	
});
