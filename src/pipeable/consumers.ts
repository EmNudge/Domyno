import { some, every, contains, find, reduce } from '../regular'
import { hofFunc } from '../main'

export function pipeSome<T>(func?: hofFunc<T, boolean>) {
  return (iter: Iterable<T>) => some(iter, func);
}

export function pipeEvery<T>(func?: hofFunc<T, boolean>) {
  return (iter: Iterable<T>) => every(iter, func);
}

export function pipeContains<T>(itemToFind: T | hofFunc<T, boolean>) {
  return (iter: Iterable<T>) => contains(iter, itemToFind);
}

export function pipeFind<T>(itemToFind: T | hofFunc<T, boolean>) {
  return (iter: Iterable<T>) => find(iter, itemToFind);
}

export function pipeReduce<T, U>(initialVal: U, reduceFunc: (accum: U, current: T) => U) {
  return (iter: Iterable<T>) => reduce(iter, initialVal, reduceFunc);
}
