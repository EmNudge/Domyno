import { zip, chain } from '../../src/utils';
import { map, enumerate, flat, filter, reduce } from '../../src/regular';

describe('Combining Iterables', () => {
	test('array double', () => {
		const arr = [1, 2, 3, 4, 5];
		const res = [...zip(arr, arr)];
		const expected = arr.map((n) => [n, n]);

		expect(res).toStrictEqual(expected);
	});

	test('array with index', () => {
		const arr = [1, 2, 3, 4, 5];

		const res = [...enumerate(arr)];
		const expected = arr.map((n, i) => [i, n]);

		expect(res).toStrictEqual(expected);
	});

	test('combining mismatched sizes shortens', () => {
		const arr = [1, 2, 3, 4, 5];
		const arr2 = [5, 4, 3];

		const res = [...zip(arr, arr2)];

		arr.length = arr2.length;
		const expected = arr.map((n, i) => [n, arr2[i]]);

		expect(res).toStrictEqual(expected);
	});
});

describe('Flatten Iterable', () => {
	test('2d array', () => {
		const arr = [[0, 1], [0, 1], [0, 1], [0, 1], [0, 1]];
        const res = [...flat(arr)];
        
        const expected = [];
        // pollyfill for arr.flat()
        for (const item of arr) {
            expected.push(...item);
        }

		expect(res).toStrictEqual(expected);
	});

	test('chain arrays via flatten', () => {
		const arr1 = [0, 1, 2, 3, 4];
		const arr2 = [5, 6, 7, 8, 9];

		const res = [...flat([arr1, arr2])];
		const expected = [...arr1, ...arr2];

		expect(res).toStrictEqual(expected);
	});

	test('chain arrays via chain', () => {
		const arr1 = [0, 1, 2, 3, 4];
		const arr2 = [5, 6, 7, 8, 9];

		const res = [...chain(arr1, arr2)];
		const expected = [...arr1, ...arr2];

		expect(res).toStrictEqual(expected);
	});
});

describe('map, filter, and reduce', () => {
	test('basic map', () => {
    const arr = [1, 2, 3, 4, 5]

		const res = [...map(arr, num => num ** 2)]

		const expected = arr.map(n => n ** 2)

		expect(res).toStrictEqual(expected);
  });
  
	test('basic filter', () => {
    const arr = [1, 2, 3, 4, 5]

		const res = [...filter(arr, num => num > 2)]

		const expected = arr.filter(n => n > 2)

		expect(res).toStrictEqual(expected);
	});
  
	test('basic reduce', () => {
    const arr = [1, 2, 3, 4, 5]

		const res = reduce(arr, 0, (accum, num) => num + accum)

		const expected = arr.reduce((accum, num) => num + accum, 0)

		expect(res).toStrictEqual(expected);
	});
});
