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
