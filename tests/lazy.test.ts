import { 
	pipe, collect, map, filter, take, 
	takeWhile, flat, flatMap, slice, 
	chunk, reduce, tap, cycle
} from '../src'

describe('Basic Pipes', () => {
	test('mapping and filter', () => {
		const arr = [1, 2, 3, 4, 5];

		const res = pipe(
			map((n: number) => n ** 2), 
			filter((n) => n < 30), 
			collect
		)(arr);

		const expected = arr.map((n) => n ** 2).filter((n) => n < 30);

		expect(res).toStrictEqual(expected);
	});

	test('take and takewhile', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res = pipe(
			takeWhile((n) => n < 15), 
			take(10), 
			collect
		)(arr);

		arr.length = 10;
		const expected = arr;

		expect(res).toStrictEqual(expected);
	});

	test('slice', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res = pipe(
			flatMap((n) => [n, n]), 
			slice(4), 
			take(5), 
			collect
		)(arr);

		const expected = [0,0,1,1,2,2,3,3,4,4,5,5].slice(4).slice(0, 5);

		expect(res).toStrictEqual(expected);
	});

	test('slice', () => {
		const arr = Array(20).fill(null).map((_, i) => i);

		const res = pipe(map((n: number) => n + 2), take(10), reduce(0, (accum, curr: number) => curr + accum))(arr);

		const expected = arr.map((n) => n + 2).slice(0, 10).reduce((accum, curr) => curr + accum, 0);

		expect(res).toStrictEqual(expected);
	});
});

describe('Tap Testing', () => {
	test('map test', () => {
		const arr = [1, 2, 3];

		let num = 0; 
		const res = pipe(
			tap((n) => num++),
			map((n: number) => n ** 2),
			tap((n) => num++),
			filter((n) => n < 30),
			collect
		)(arr);

		const expected = arr.map((n) => n ** 2).filter((n) => n < 30);

		expect(res).toStrictEqual(expected);
		expect(num).toEqual(6);
	});
});

describe('Misc Testing', () => {
	test('cycle and take test', () => {
		const arr = [1, 2];
		const res = pipe(
			cycle, 
			take(5), 
			collect
		)(arr);

		const expected = [1, 2, 1, 2, 1];

		expect(res).toStrictEqual(expected);
	});

	test('chain and chunk test', () => {
		const arr = [1, 2, 3, 4, 5, 6];

		const res = pipe(
			chunk(3), 
			flat, 
			collect
		)(arr);

		expect(res).toStrictEqual(arr);
	});

	test('takeWhile testing', () => {
		const arr = [1, 2, 3, 4, 5, 6];

		const res = pipe(
			takeWhile(n => n < 4), 
			collect
		)(arr);

		const expected = arr.filter(n => n < 4);

		expect(res).toStrictEqual(expected);
	});
});
