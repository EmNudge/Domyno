import { 
	chain, zip, entries
} from '../../src/utils'

describe('chain and zip', () => {
	test('chain', () => {
		const res = [...chain([0, 1, 2], [3, 4, 5], [6, 7, 8, 9])];

		const expected = Array(10).fill(null).map((_, i) => i);

		expect(res).toStrictEqual(expected);
	});

	test('zip', () => {
		const arr = Array(10).fill(null).map((_, i) => i);

		const res = [...zip(arr, arr)];

		const expected = arr.map(n => [n, n]);

		expect(res).toStrictEqual(expected);
	});
});

describe('entries', () => {
	test('basic array entries', () => {
		const arr = Array(10).fill(5)

		const res = [...entries(arr)];

		const expected = arr.map((n, i) => [String(i), n]);

		expect(res).toStrictEqual(expected);
	});

	test('basic object entries', () => {
		const obj: any = { name: "Bert", age: 47 };

		const res = [...entries(obj)];

		const expected: [any, any][] = [];
		for (const key of Object.keys(obj)) {
			expected.push([key, obj[key]]);
		}

		expect(res).toStrictEqual(expected);
	});
});
