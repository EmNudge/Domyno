export * from "./regular";

export * from "./pipeable";

export type hofFunc<T, U> = (item: T, index?: number) => U;

// generic pipe utility command
export const pipe = (...funcs: Function[]) => (val: any) =>
  funcs.reduce((accum, curr) => curr(accum), val);

// utility function for use in pipes when normal spread is difficult
export const collect = (iter: Iterable<any>) => [...iter];