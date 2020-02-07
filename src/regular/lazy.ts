import { hofFunc } from "../main";

/// allows non-array iterables to have a comparable `.entries()` method
/// returns index along with item in a given iterable
export function* entries<T>(iter: Iterable<T>): Iterable<[number, T]> {
  let index = 0;
  for (const item of iter) {
    yield [index, item];
    index++;
  }
}

/// return new iterable with each function applied
export function* map<T, U>(
  iter: Iterable<T>,
  mapFunc: hofFunc<T, U>
): Iterable<U> {
  for (const [index, item] of entries(iter)) {
    yield mapFunc(item, index);
  }
}

/// return new iterable with valus missing that don't pass the filter function
export function* filter<T>(
  iter: Iterable<T>,
  filterFunc: hofFunc<T, boolean>
): Iterable<T> {
  for (const [index, item] of entries(iter)) {
    if (!filterFunc(item, index)) continue;
    yield item;
  }
}

/// flattens an iterator of iterators. Only flattens one level.
export function* flat<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
  for (const nestedIter of iter) {
    for (const item of nestedIter) {
      yield item;
    }
  }
}

/// maps and then flattens. A copy of Array.prototype.flatMap, but specifically iterables
export function* flatMap<T, U>(iter: Iterable<T>, mapFunc: hofFunc<T, Iterable<U>>) {
  yield* flat(map(iter, mapFunc));
}

/// mimics Array.prototype.slice
export function* slice<T>(
  iter: Iterable<T>,
  begin: number,
  end?: number
): Iterable<T> {
  for (const [index, item] of entries(iter)) {
    if (index < begin) continue;
    if (end && end > end) continue;

    yield item;
  }
}
