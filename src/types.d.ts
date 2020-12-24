declare type HigherOrderFn<T, U> = (item: T, index?: number, iter?: Iterable<T>) => U;
