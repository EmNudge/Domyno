import { partition as _partition } from "../../regular";

/// splits iterable into 2 chunks based on result of the boolean function
export function partition<T>(partFunc: HigherOrderFn<T, boolean>) {
  return (iter: Iterable<T>): [Iterable<T>, Iterable<T>] => _partition(iter, partFunc)
}

export default partition;
