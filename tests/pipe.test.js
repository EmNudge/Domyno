const { pipe, collect, pipeMap, pipeFilter } = require("../build/bundle");

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
});
