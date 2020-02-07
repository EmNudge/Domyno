const {
  pipe,
  collect,
  pipeMap,
  pipeFilter,
  pipeTake,
  pipeTakeWhile,
  pipeSlice,
  pipeFlatMap,
  pipeReduce
} = require("../build/bundle");

// describe('Testing lazy evaluation', () => {
// 	test('map and filter', () => {
// 		const arr = [1, 2, 3, 4, 5];

//     let now = Date.now();
// 		const newArr1 = arr.map(n => n ** 2).filter(n => n < 10)
// 		console.log(newArr1)
// 		const time1 = Date.now() - now;
		
// 		now = Date.now();
// 		const newArr2 = pipe(
//       pipeMap(n => n ** 2),
//       pipeFilter(n => n < 10),
//       collect
//     )(arr)
// 		console.log(newArr2)
// 		const time2 = Date.now() - now;

// 		console.log({ time1, time2 })
// 	})
// })

describe("Basic Pipes", () => {
  test("mapping and filter", () => {
    const arr = [1, 2, 3, 4, 5];

    const res = pipe(
      pipeMap(n => n ** 2),
      pipeFilter(n => n < 30),
      collect
    )(arr);

    const expected = arr.map(n => n ** 2).filter(n => n < 30);

    expect(res).toStrictEqual(expected);
  });

  test("take and takewhile", () => {
    const arr = Array(20)
      .fill(null)
      .map((_, i) => i);

    const res = pipe(
      pipeTakeWhile(n => n < 15),
      pipeTake(10),
      collect
    )(arr);

    arr.length = 10;
    const expected = arr;

    expect(res).toStrictEqual(expected);
  });

  test("slice", () => {
    const arr = Array(20)
      .fill(null)
      .map((_, i) => i);

    const res = pipe(
      pipeFlatMap(n => [n, n]),
      pipeSlice(4),
      pipeTake(5),
      collect
    )(arr);

    const expected = arr
      .flatMap(n => [n, n])
      .slice(4)
      .slice(0, 5);

    expect(res).toStrictEqual(expected);
  });

  test("slice", () => {
    const arr = Array(20)
      .fill(null)
      .map((_, i) => i);

    const res = pipe(
      pipeMap(n => n + 2),
      pipeTake(10),
      pipeReduce(0, (accum, curr) => curr + accum)
    )(arr);

    const expected = arr
      .map(n => n + 2)
      .slice(0, 10)
      .reduce((accum, curr) => curr + accum, 0);

    expect(res).toStrictEqual(expected);
  });
});
