import { map, filter, flatMap } from '../regular';

export function pipeMap<T, U>(mapFunc: (item: T) => U) {
  return (iter: Iterable<T>) => map(iter, mapFunc);
}

export function pipeFilter<T>(filterFunc: (item: T) => boolean) {
  return (iter: Iterable<T>) => filter(iter, filterFunc);
}

export function pipeFlatMap<T, U>(mapFunc: (item: T) => Iterable<U>) {
  return (iter: Iterable<T>) => flatMap(iter, mapFunc);
}