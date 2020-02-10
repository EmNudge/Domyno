import { map, filter, flatMap, slice, tap } from "../regular";
import { hofFunc } from '../main'

export function pipeMap<T, U>(mapFunc: (item: T) => U) {
  return (iter: Iterable<T>) => map(iter, mapFunc);
}

export function pipeFilter<T>(filterFunc: (item: T) => boolean) {
  return (iter: Iterable<T>) => filter(iter, filterFunc);
}

export function pipeFlatMap<T, U>(mapFunc: (item: T) => Iterable<U>) {
  return (iter: Iterable<T>) => flatMap(iter, mapFunc);
}

export function pipeSlice<T>(begin: number, end?: number) {
  return (iter: Iterable<T>) => slice(iter, begin, end);
}

export function pipeTap<T>(tapFunc: hofFunc<void, void>) {
  return (iter: Iterable<T>) => tap(iter, tapFunc);
}