export * from "./regular";
export * from './utils';

export type hofFunc<T, U> = (item: T, index?: number) => U;